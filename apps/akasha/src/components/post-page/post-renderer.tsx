import * as React from 'react';
import DS from '@akashaproject/design-system';
import { useTranslation } from 'react-i18next';
import { useFollow } from '@akashaproject/ui-awf-hooks';
import { IAkashaError } from '@akashaproject/ui-awf-typings';
import { IBookmarkState } from '@akashaproject/ui-awf-hooks/lib/use-entry-bookmark';

const { ErrorInfoCard, ErrorLoader, EntryBox, Box, EntryCardLoading } = DS;

export interface PostRendererProps {
  sdkModules: any;
  logger: any;
  globalChannel: any;
  itemId?: string;
  itemData?: any;
  locale: any;
  ethAddress: string | null;
  onBookmark: (entryId: string) => void;
  onNavigate: (details: any) => void;
  onLinkCopy?: () => void;
  onRepliesClick: () => void;
  onFlag: (entryId: string, user: string | null) => () => void;
  onRepost: (withComment: boolean, entryData: any) => void;
  onShare: (service: string, entryId: string, authorEthAddress: string) => void;
  onAvatarClick: (ev: React.MouseEvent<HTMLDivElement>, authorEth: string) => void;
  onMentionClick: (ethAddress: string) => void;
  bookmarkState?: IBookmarkState;
  style?: React.CSSProperties;
  contentClickable?: boolean;
  hidePublishTime?: boolean;
}

const PostRenderer = (props: PostRendererProps) => {
  const {
    itemData,
    style,
    ethAddress,
    sdkModules,
    logger,
    globalChannel,
    contentClickable,
    bookmarkState,
    hidePublishTime,
  } = props;

  const { t } = useTranslation();

  const [followedProfiles, followActions] = useFollow({
    globalChannel,
    profileService: sdkModules.profiles.profileService,
    onError: (errorInfo: IAkashaError) => {
      logger.error(errorInfo.error.message, errorInfo.errorKey);
    },
  });

  const isBookmarked = React.useMemo(() => {
    if (
      bookmarkState &&
      !bookmarkState.isFetching &&
      itemData.entryId &&
      bookmarkState.bookmarks.findIndex(bm => bm.entryId === itemData.entryId) >= 0
    ) {
      return true;
    }
    return false;
  }, [bookmarkState]);

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

  const isFollowing = followedProfiles.includes(itemData.author.ethAddress);

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
              {(!itemData || !itemData.author?.ethAddress) && <EntryCardLoading />}
              {itemData && itemData.author.ethAddress && (
                <Box
                  pad={{ horizontal: 'medium' }}
                  border={{ side: 'bottom', size: '1px', color: 'border' }}
                  style={style}
                >
                  <EntryBox
                    isBookmarked={isBookmarked}
                    entryData={itemData}
                    sharePostLabel={t('Share Post')}
                    shareTextLabel={t('Share this post with your friends')}
                    sharePostUrl={'https://ethereum.world'}
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
                    flagAsLabel={t('Report Post')}
                    loggedProfileEthAddress={ethAddress}
                    locale={props.locale}
                    bookmarkLabel={t('Save')}
                    bookmarkedLabel={t('Saved')}
                    onRepost={props.onRepost}
                    onEntryShare={props.onShare}
                    onEntryFlag={props.onFlag(itemData.entryId, null)}
                    onClickReplies={props.onRepliesClick}
                    handleFollowAuthor={handleFollow}
                    handleUnfollowAuthor={handleUnfollow}
                    isFollowingAuthor={isFollowing}
                    onContentClick={props.onNavigate}
                    contentClickable={contentClickable}
                    onMentionClick={props.onMentionClick}
                    hidePublishTime={hidePublishTime}
                  />
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
