import * as React from 'react';
import DS from '@akashaproject/design-system';
import { useTranslation } from 'react-i18next';
import { useFollow } from '@akashaproject/ui-awf-hooks';
import { IAkashaError } from '@akashaproject/ui-awf-typings';
import routes, { POST } from '../../routes';
import { useComment, useEditComment } from '@akashaproject/ui-awf-hooks/lib/use-comments.new';
import { mapEntry, buildPublishObject } from '@akashaproject/ui-awf-hooks/lib/utils/entry-utils';

const {
  ErrorInfoCard,
  ErrorLoader,
  EntryCardHidden,
  EntryBox,
  Box,
  EntryCardLoading,
  TextIcon,
  StyledSelectBox,
  CommentEditor,
} = DS;

export interface PostRendererProps {
  logger: any;
  itemId?: string;
  itemData?: any;
  locale: any;
  ethAddress: string | null;
  onBookmark: (entryId: string) => void;
  onNavigate: (details: any) => void;
  onLinkCopy?: () => void;
  onFlag: (entryId: string, contentType: string) => () => void;
  onRepost: (withComment: boolean, entryData: any) => void;
  sharePostUrl: string;
  onAvatarClick: (ev: React.MouseEvent<HTMLDivElement>, authorEth: string) => void;
  onMentionClick: (pubKey: string) => void;
  onTagClick: (name: string) => void;
  singleSpaNavigate: (url: string) => void;
  bookmarkState?: any;
  style?: React.CSSProperties;
  contentClickable?: boolean;
  disableActions?: boolean;
  hidePublishTime?: boolean;
  handleFlipCard?: (entry: any, isQuote: boolean) => () => void;
  onEntryRemove?: (entryId: string) => void;
  removeEntryLabel?: string;
  removedByMeLabel?: string;
  removedByAuthorLabel?: string;
  loggedProfileData?: any;
}

const PostRenderer = (props: PostRendererProps) => {
  const {
    style,
    ethAddress,
    logger,
    contentClickable,
    bookmarkState,
    hidePublishTime,
    handleFlipCard,
    disableActions,
    sharePostUrl,
  } = props;

  const { t } = useTranslation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [followedProfiles, followActions] = useFollow({
    onError: (errorInfo: IAkashaError) => {
      logger.error(errorInfo.error.message, errorInfo.errorKey);
    },
  });
  const postReq = useComment(props.itemId);
  const itemData = React.useMemo(() => {
    if (postReq.data) {
      if (postReq.data.isPublishing) {
        return postReq.data as unknown as ReturnType<typeof mapEntry>;
      }
      return mapEntry(postReq.data);
    }
    return undefined;
  }, [postReq.data]);

  const editReq = useEditComment(itemData.entryId);
  const isBookmarked = React.useMemo(() => {
    if (
      bookmarkState &&
      !bookmarkState.isFetching &&
      itemData.entryId &&
      bookmarkState.data?.findIndex(bm => bm.entryId === itemData.entryId) >= 0
    ) {
      return true;
    }
    return false;
  }, [bookmarkState.data]);

  React.useEffect(() => {
    if (ethAddress && itemData.author.ethAddress) {
      followActions.isFollowing(ethAddress, itemData.author.ethAddress);
    }
  }, [ethAddress, itemData.author.ethAddress]);

  const handleFollow = () => {
    if (itemData.author.ethAddress) {
      followActions.follow(itemData.author.ethAddress);
    }
  };

  const handleUnfollow = () => {
    if (itemData.author.ethAddress) {
      followActions.unfollow(itemData.author.ethAddress);
    }
  };
  // when the edit button is clicked, show the editor
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // when cancel is clicked, set isEditing the state back to false
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleEditComment = (commentData: any) => {
    // save edited comment;
    editReq.mutate({ ...commentData, postID: itemData.postId });
    setIsEditing(false);
  };

  const isFollowing = followedProfiles.includes(itemData.author.ethAddress);

  if (itemData.reported) {
    return (
      <EntryCardHidden
        awaitingModerationLabel={t('You have reported this content. It is awaiting moderation.')}
        moderatedContentLabel={t('This content has been moderated')}
        ctaLabel={t('See it anyway')}
        handleFlipCard={handleFlipCard && handleFlipCard(itemData, false)}
      />
    );
  }

  return (
    <ErrorInfoCard errors={{}}>
      {(errorMessages: any, hasCriticalErrors: boolean) => (
        <>
          {errorMessages && (
            <ErrorLoader
              type="script-error"
              title={t('There was an error loading the entry')}
              details={t('We cannot show this entry right now')}
              devDetails={errorMessages}
            />
          )}
          {!hasCriticalErrors && (
            <>
              {(!itemData || !itemData.author) && <EntryCardLoading />}
              {itemData && itemData.author.ethAddress && (
                <Box
                  pad={{ horizontal: 'medium' }}
                  border={{ side: 'bottom', size: '1px', color: 'border' }}
                  style={style}
                >
                  {isEditing && (
                    <Box margin="medium">
                      <CommentEditor
                        avatar={itemData.author.avatar}
                        ethAddress={ethAddress}
                        postLabel={t('Save')}
                        emojiPlaceholderLabel={t('Search')}
                        onPublish={handleEditComment}
                        getMentions={() => {
                          /*  */
                        }}
                        getTags={() => {
                          /*  */
                        }}
                        tags={[]}
                        mentions={[]}
                        uploadRequest={() => {
                          /*  */
                        }}
                        editorState={itemData.content}
                        isShown={true}
                        showCancelButton={true}
                        onCancelClick={handleCancelClick}
                        cancelButtonLabel={t('Cancel')}
                      />
                    </Box>
                  )}
                  {!isEditing && itemData && (
                    <EntryBox
                      style={itemData.isPublishing ? { backgroundColor: '#4e71ff0f' } : {}}
                      isBookmarked={isBookmarked}
                      isRemoved={
                        itemData.content.length === 1 && itemData.content[0].property === 'removed'
                      }
                      entryData={itemData}
                      sharePostLabel={t('Share Post')}
                      shareTextLabel={t('Share this post with your friends')}
                      sharePostUrl={sharePostUrl}
                      onClickAvatar={(ev: React.MouseEvent<HTMLDivElement>) =>
                        props.onAvatarClick(ev, itemData.author.pubKey)
                      }
                      onEntryBookmark={props.onBookmark}
                      repliesLabel={t('Replies')}
                      repostsLabel={t('Reposts')}
                      repostLabel={t('Repost')}
                      repostWithCommentLabel={t('Repost with comment')}
                      shareLabel={t('Share')}
                      copyLinkLabel={t('Copy Link')}
                      flagAsLabel={t('Report Comment')}
                      loggedProfileEthAddress={ethAddress}
                      locale={props.locale}
                      bookmarkLabel={t('Save')}
                      bookmarkedLabel={t('Saved')}
                      profileAnchorLink={'/profile'}
                      repliesAnchorLink={routes[POST]}
                      onRepost={props.onRepost}
                      onEntryFlag={props.onFlag(itemData.entryId, 'reply')}
                      handleFollowAuthor={handleFollow}
                      handleUnfollowAuthor={handleUnfollow}
                      isFollowingAuthor={isFollowing}
                      onContentClick={props.onNavigate}
                      contentClickable={contentClickable}
                      onMentionClick={props.onMentionClick}
                      onTagClick={props.onTagClick}
                      singleSpaNavigate={props.singleSpaNavigate}
                      hidePublishTime={hidePublishTime}
                      disableActions={disableActions}
                      hideActionButtons={true}
                      onEntryRemove={props.onEntryRemove}
                      removeEntryLabel={props.removeEntryLabel}
                      removedByMeLabel={props.removedByMeLabel}
                      removedByAuthorLabel={props.removedByAuthorLabel}
                      headerMenuExt={
                        props.ethAddress === itemData.author.ethAddress && (
                          <StyledSelectBox onClick={handleEditClick}>
                            <TextIcon label={t('Edit Reply')} iconType="edit" />
                          </StyledSelectBox>
                        )
                      }
                    />
                  )}
                </Box>
              )}
            </>
          )}
        </>
      )}
    </ErrorInfoCard>
  );
};

export default PostRenderer;
