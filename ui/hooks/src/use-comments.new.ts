import { QueryClient, useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { lastValueFrom } from 'rxjs';
import getSDK from '@akashaproject/awf-sdk';
import { DataProviderInput } from '@akashaproject/sdk-typings/lib/interfaces/common';
import { buildPublishObject } from './utils/entry-utils';
import { Comment_Response } from '@akashaproject/sdk-typings/lib/interfaces/responses';
import { logError } from './utils/error-handler';
import moderationRequest from './moderation-request';

export const COMMENT_KEY = 'Comment';
export const COMMENTS_KEY = 'Comments';

export const PUBLISH_PENDING_KEY = 'PendingPublish_Comments';

export interface PublishCommentData {
  metadata: {
    app: string;
    version: number;
    quote?: string;
    tags: string[];
    mentions: string[];
  };
  author: string;
  content: any;
  textContent: string;
  postID: string;
}

const getComments = async (
  queryClient: QueryClient,
  limit: number,
  postID: string,
  offset?: string,
) => {
  const sdk = getSDK();
  try {
    const res = await lastValueFrom(
      sdk.api.comments.getComments({
        limit: limit,
        offset: offset,
        postID: postID,
      }),
    );
    return {
      ...res.data.getComments,
      results: res.data.getComments.results.map(comment => {
        return comment._id;
      }),
    };
  } catch (error) {
    logError('useComments.getComments', error);
  }
};

export function useInfiniteComments(limit: number, postID: string, offset?: string) {
  const queryClient = useQueryClient();
  return useInfiniteQuery(
    [COMMENTS_KEY, postID],
    async ({ pageParam = offset }) => getComments(queryClient, limit, postID, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextIndex,
      //getPreviousPageParam: (lastPage, allPages) => lastPage.posts.results[0]._id,
      enabled: !!(offset || limit),
      keepPreviousData: true,
    },
  );
}

const getComment = async (commentID): Promise<Comment_Response & { isPublishing?: boolean }> => {
  const sdk = getSDK();

  const user = await lastValueFrom(sdk.api.auth.getCurrentUser());

  try {
    // check entry's moderation status
    const modStatus = await moderationRequest.checkStatus(true, {
      user: user.data.pubKey,
      contentIds: [commentID],
    });
    const res = await lastValueFrom(sdk.api.comments.getComment(commentID));
    return { ...res.data.getComment, ...modStatus[0] };
  } catch (error) {
    logError('useComments.getComments', error);
  }
};

// hook for fetching data for a specific commentID/entryID
export function useComment(commentID: string, enabler = true) {
  const queryClient = useQueryClient();
  return useQuery([COMMENT_KEY, commentID], () => getComment(commentID), {
    enabled: !!commentID && enabler,
    keepPreviousData: true,
    initialData: () => queryClient.getQueryData([COMMENT_KEY, commentID]),
  });
}

export interface Publish_Options {
  data: DataProviderInput[];
  comment: { title?: string; tags?: string[]; postID: string };
}
export function useDeleteComment(commentID: string) {
  const sdk = getSDK();
  const queryClient = useQueryClient();
  return useMutation(commentID => lastValueFrom(sdk.api.entries.removeEntry(commentID)), {
    // When mutate is called:
    onMutate: async (commentID: string) => {
      // Snapshot the previous value
      const previousComment: Comment_Response = queryClient.getQueryData([COMMENT_KEY, commentID]);
      // can add some optimistic updates here
      // ex: queryClient.setQueryData([COMMENT_KEY, commentID], {})
      queryClient.setQueryData([COMMENT_KEY, commentID], {
        ...previousComment,
        content: [
          {
            property: 'removed',
            provider: 'awf.graphql.comments.api',
            value: '1',
          },
        ],
      });
      return { previousComment };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousComment) {
        queryClient.setQueryData([COMMENT_KEY, commentID], context.previousComment);
      }
      logError('useComments.deleteComment', err as Error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries([COMMENT_KEY, commentID]);
      await queryClient.invalidateQueries(COMMENTS_KEY);
    },
  });
}

export function useCreateComment() {
  const sdk = getSDK();
  const queryClient = useQueryClient();

  const pendingID = 'pending' + new Date().getTime();
  return useMutation(
    async (publishObj: PublishCommentData) => {
      const comment = buildPublishObject(publishObj, publishObj.postID);
      const res = await lastValueFrom(sdk.api.comments.addComment(comment));
      return res?.data?.addComment;
    },
    {
      onMutate: async (publishObj: PublishCommentData) => {
        await queryClient.cancelQueries([COMMENTS_KEY, publishObj.postID]);

        const optimisticComment = Object.assign({}, publishObj);

        return { optimisticComment, entryId: pendingID };
      },
      onError: (err, variables, context) => {
        if (context?.optimisticComment) {
          return Promise.resolve({
            optimisticComment: { ...context.optimisticComment },
          });
        }
        logError('useComments.createComment', err as Error);
      },
      onSuccess: async id => {
        await queryClient.fetchQuery([COMMENT_KEY, id], () => getComment(id));
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(COMMENTS_KEY);
      },
      mutationKey: PUBLISH_PENDING_KEY,
    },
  );
}

// hook used for editing a comment
export function useEditComment(commentID: string) {
  const sdk = getSDK();
  const queryClient = useQueryClient();

  return useMutation(
    (comment: PublishCommentData) => {
      const { postID, ...commentData } = comment;
      const publishObj: Publish_Options = buildPublishObject(commentData, postID);
      return lastValueFrom(sdk.api.comments.editComment({ commentID, ...publishObj }));
    },
    {
      onMutate: async (comment: PublishCommentData) => {
        queryClient.setQueryData([COMMENT_KEY, commentID], (current: Comment_Response) => {
          return {
            ...current,
            content: comment.content,
            isPublishing: true,
          };
        });

        return { comment };
      },
      onError: (err, variables, context) => {
        if (context?.comment) {
          queryClient.setQueryData(
            [COMMENT_KEY, commentID],
            Object.assign({}, context.comment, { hasErrored: true }),
          );
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries([COMMENT_KEY, commentID]);
        await queryClient.fetchQuery([COMMENT_KEY, commentID], () => getComment(commentID));
      },
      onSettled: async () => {
        await queryClient.invalidateQueries([COMMENT_KEY, commentID]);
        // await queryClient.invalidateQueries(COMMENTS_KEY);
      },
    },
  );
}
