import * as React from 'react';
import { forkJoin, lastValueFrom } from 'rxjs';
import { IAkashaError } from '@akashaproject/ui-awf-typings';

import { mapEntry } from './utils/entry-utils';
import { getMediaUrl } from './utils/media-utils';
import { createErrorHandler } from './utils/error-handler';
import moderationRequest from './moderation-request';

export interface UseSearchActions {
  /**
   * global search for a specific keyword, searches posts, comments, tags, profiles
   * @param keyword - text to search for
   */
  search: (keyword: string) => void;
  /**
   * updates an entry state from outside the hook
   */
  updateSearchState: (updatedEntry: any) => void;
}

export interface ISearchState {
  profiles: any[];
  entries: any[];
  comments: any[];
  tags: any[];
  isFetching: string | null;
}

const initialSearchState: ISearchState = {
  profiles: [],
  entries: [],
  comments: [],
  tags: [],
  isFetching: null,
};

export interface UseSearchProps {
  user: string | null;
  onError: (error: IAkashaError) => void;
  logger: any;
  ipfsService: any;
  profileService: any;
  postsService: any;
}

export type ISearchAction =
  | { type: 'GET_SEARCH_RESULTS'; payload: string }
  | {
      type: 'GET_SEARCH_RESULTS_SUCCESS';
      payload: { entries: any[]; comments: any[]; profiles: any[]; tags: any[] };
    }
  | { type: 'UPDATE_ENTRY'; payload: any };

const SearchStateReducer = (state: ISearchState, action: ISearchAction) => {
  switch (action.type) {
    case 'GET_SEARCH_RESULTS':
      return { ...state, isFetching: action.payload };
    case 'GET_SEARCH_RESULTS_SUCCESS': {
      const { entries, comments, profiles, tags } = action.payload;

      return {
        ...state,
        entries: entries || [],
        comments: comments || [],
        profiles: profiles || [],
        tags: tags || [],
        isFetching: null,
      };
    }

    case 'UPDATE_ENTRY': {
      const { updatedEntry } = action.payload;
      const updatedEntries = state.entries.map((entry: any) =>
        entry.entryId === updatedEntry.entryId ? updatedEntry : entry,
      );
      return {
        ...state,
        entries: updatedEntries,
      };
    }

    default:
      throw new Error('[UseSearchReducer] action is not defined!');
  }
};

/* A hook to get search results and resolve the data within */
export const useSearch = (props: UseSearchProps): [ISearchState, UseSearchActions] => {
  const { user, onError, logger, ipfsService, profileService, postsService } = props;
  const [searchResultsState, dispatch] = React.useReducer(SearchStateReducer, initialSearchState);

  async function fetchSearchResults(searchQuery: string) {
    const searchResp: any = await lastValueFrom(profileService.globalSearch(searchQuery));
    const ipfsGatewayResp: any = await lastValueFrom(ipfsService.getSettings(null));

    // get profiles data
    const getProfilesCalls = searchResp.data?.globalSearch?.profiles?.map(
      (profile: { id: string }) => {
        return profileService.getProfile({ pubKey: profile.id });
      },
    );
    const profilesResp: any = await lastValueFrom(forkJoin(getProfilesCalls));
    const completeProfiles = profilesResp?.map((profileResp: any) => {
      const { avatar, coverImage, ...other } = profileResp.data?.resolveProfile;
      const images: { avatar: string | null; coverImage: string | null } = {
        avatar: null,
        coverImage: null,
      };
      if (avatar) {
        images.avatar = getMediaUrl(ipfsGatewayResp.data, avatar);
      }
      if (coverImage) {
        images.coverImage = getMediaUrl(ipfsGatewayResp.data, coverImage);
      }
      const profileData = { ...images, ...other };
      return profileData;
    });

    // get posts data
    const getEntriesCalls = searchResp.data?.globalSearch?.posts?.map((entry: { id: string }) =>
      postsService.entries.getEntry({ entryId: entry.id }),
    );
    const entriesResp: any = await lastValueFrom(forkJoin(getEntriesCalls));

    const entryIds: string[] = [];

    let completeEntries = entriesResp?.map((entryResp: any) => {
      entryIds.push(entryResp.data?.getPost._id);
      return mapEntry(entryResp.data?.getPost, ipfsGatewayResp.data, logger);
    });

    try {
      // check moderation status for all entry ids
      const status = await moderationRequest.checkStatus(true, { user, contentIds: entryIds });

      if (status && status.constructor === Array) {
        // if valid response is returned and is an array, reduce to an object
        const statusObject = status.reduce(
          (obj: any, el: any) => ({ ...obj, [el.contentId]: el }),
          {},
        );

        // map through the completeEntries and update moderation props for each entry
        completeEntries = completeEntries.map((entry: any) => ({
          ...entry,
          reported: statusObject[entry.entryId].moderated
            ? false
            : statusObject[entry.entryId].reported,
          delisted: statusObject[entry.entryId].delisted,
        }));
      }
    } catch (err) {
      entryIds.forEach(id => {
        createErrorHandler(
          `${id}`,
          false,
          onError,
        )(new Error(`Failed to fetch moderated content. ${err.message}`));
      });
    }

    // get comments data
    const getCommentsCalls = searchResp.data?.globalSearch?.comments?.map(
      (comment: { id: string }) => postsService.comments.getComment({ commentID: comment.id }),
    );
    const commentsResp: any = await lastValueFrom(forkJoin(getCommentsCalls));

    const completeComments = commentsResp?.map((commentResp: any) => {
      return mapEntry(commentResp.data?.getComment, ipfsGatewayResp.data, logger);
    });

    // get tags data
    const completeTags = searchResp.data?.globalSearch?.tags;

    dispatch({
      type: 'GET_SEARCH_RESULTS_SUCCESS',
      payload: {
        profiles: completeProfiles || [],
        entries: completeEntries || [],
        comments: completeComments || [],
        tags: completeTags || [],
      },
    });
  }

  React.useEffect(() => {
    if (searchResultsState?.isFetching) {
      fetchSearchResults(searchResultsState.isFetching);
    }
    return;
  }, [searchResultsState?.isFetching]);

  const actions: UseSearchActions = {
    async search(keyword) {
      dispatch({ type: 'GET_SEARCH_RESULTS', payload: keyword });
    },
    updateSearchState: (updatedEntry: any) => {
      dispatch({ type: 'UPDATE_ENTRY', payload: updatedEntry });
    },
  };

  return [searchResultsState, actions];
};

export default useSearch;
