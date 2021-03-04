import * as React from 'react';
import DS from '@akashaproject/design-system';
import { ILocale } from '@akashaproject/design-system/lib/utils/time';
import { useParams } from 'react-router-dom';
import { IAkashaError, RootComponentProps } from '@akashaproject/ui-awf-typings';
import { useTranslation } from 'react-i18next';
import {
  constants,
  useBookmarks,
  useFollow,
  useSearch,
  useTagSubscribe,
} from '@akashaproject/ui-awf-hooks';
import { UseLoginState } from '@akashaproject/ui-awf-hooks/lib/use-login-state';

const {
  Box,
  Icon,
  BasicCardBox,
  ErrorLoader,
  Spinner,
  DuplexButton,
  EntryCard,
  EntryCardHidden,
  ProfileCard,
  ReportModal,
  ToastProvider,
  ModalRenderer,
  useViewportSize,
} = DS;

interface SearchPageProps {
  onError?: (err: Error) => void;
  sdkModules: any;
  logger: any;
  globalChannel: any;
  singleSpa: any;
  loginState: UseLoginState;
  flagged: string;
  reportModalOpen: boolean;
  showLoginModal: () => void;
  setFlagged: React.Dispatch<React.SetStateAction<string>>;
  setReportModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchPage: React.FC<SearchPageProps & RootComponentProps> = props => {
  const {
    sdkModules,
    logger,
    singleSpa,
    globalChannel,
    loginState,
    flagged,
    reportModalOpen,
    showLoginModal,
    setFlagged,
    setReportModalOpen,
  } = props;

  const { searchKeyword } = useParams<{ searchKeyword: string }>();

  const { t, i18n } = useTranslation();
  const locale = (i18n.languages[0] || 'en') as ILocale;

  const [bookmarkState, bookmarkActions] = useBookmarks({
    onError: (err: IAkashaError) => {
      logger.error('useBookmark error %j', err);
    },
    dbService: sdkModules.db,
  });

  const [searchState, searchActions] = useSearch({
    user: loginState.ethAddress,
    logger: logger,
    postsService: sdkModules.posts,
    ipfsService: sdkModules.commons.ipfsService,
    profileService: sdkModules.profiles.profileService,
    onError: (err: IAkashaError) => {
      logger.error('useSearch error %j', err);
    },
  });

  const [followedProfiles, followActions] = useFollow({
    globalChannel,
    profileService: sdkModules.profiles.profileService,
    onError: (errorInfo: IAkashaError) => {
      logger.error(errorInfo.error.message, errorInfo.errorKey);
    },
  });

  const [tagSubscriptionState, tagSubscriptionActions] = useTagSubscribe({
    globalChannel,
    profileService: sdkModules.profiles.profileService,
    onError: (errorInfo: IAkashaError) => {
      logger.error(errorInfo.error.message, errorInfo.errorKey);
    },
  });

  const {
    size,
    dimensions: { width },
  } = useViewportSize();

  React.useEffect(() => {
    if (loginState.currentUserCalled) {
      searchActions.search(searchKeyword);
      // if user successfully logs in after attempting to report a post
      if (loginState.ethAddress && !!flagged.length) {
        // show the report modal
        setReportModalOpen(true);
      }
    }
  }, [searchKeyword, loginState.currentUserCalled, loginState.ethAddress]);

  React.useEffect(() => {
    if (loginState.waitForAuth && !loginState.ready) {
      return;
    }
    if ((loginState.waitForAuth && loginState.ready) || loginState.currentUserCalled) {
      bookmarkActions.getBookmarks();
      tagSubscriptionActions.getTagSubscriptions();
    }
  }, [JSON.stringify(loginState)]);

  React.useEffect(() => {
    if (loginState.ethAddress) {
      searchState.profiles.slice(0, 4).forEach(async (profile: any) => {
        if (loginState.ethAddress && profile.ethAddress) {
          followActions.isFollowing(loginState.ethAddress, profile.ethAddress);
        }
      });
    }
  }, [searchState, loginState.ethAddress]);

  const handleTagSubscribe = (tagName: string) => {
    if (!loginState.ethAddress) {
      showLoginModal();
      return;
    }
    tagSubscriptionActions.toggleTagSubscription(tagName);
  };
  const handleTagUnsubscribe = (tagName: string) => {
    if (!loginState.ethAddress) {
      showLoginModal();
      return;
    }
    tagSubscriptionActions.toggleTagSubscription(tagName);
  };
  const handleProfileClick = (pubKey: string) => {
    singleSpa.navigateToUrl(`/profile/${pubKey}`);
  };
  const handleFollowProfile = (ethAddress: string) => {
    if (!loginState.ethAddress) {
      showLoginModal();
      return;
    }
    followActions.follow(ethAddress);
  };

  const handleUnfollowProfile = (ethAddress: string) => {
    if (!loginState.ethAddress) {
      showLoginModal();
      return;
    }
    followActions.unfollow(ethAddress);
  };

  const handlePostClick = (entryId: string) => {
    singleSpa.navigateToUrl(`/AKASHA-app/post/${entryId}`);
  };

  const handleEntryBookmark = (entryId: string) => {
    if (!loginState.ethAddress) {
      showLoginModal();
      return;
    }
    if (bookmarkState.bookmarks.findIndex(bm => bm.entryId === entryId) >= 0) {
      return bookmarkActions.removeBookmark(entryId);
    }
    return bookmarkActions.bookmarkPost(entryId);
  };

  const handleEntryFlag = (entryId: string) => {
    if (!loginState.ethAddress) {
      // setting entryId to state first, if not logged in
      setFlagged(entryId);
      return showLoginModal();
    }
    setFlagged(entryId);
    setReportModalOpen(true);
  };

  const handleFlipCard = (entry: any, isQuote: boolean) => () => {
    // modify the entry
    const modifiedEntry = isQuote
      ? { ...entry, quote: { ...entry.quote, reported: false } }
      : { ...entry, reported: false };
    // update state
    searchActions.updateSearchState(modifiedEntry);
  };

  const updateEntry = (entryId: string) => {
    // find and modify the entry from state using the entryId
    const modifiedEntry = {
      ...searchState.entries.find((entry: any) => entry.entryId === entryId),
      reported: true,
    };
    // update state
    searchActions.updateSearchState(modifiedEntry);
  };

  const emptySearchState =
    searchState.profiles.length === 0 &&
    searchState.entries.length === 0 &&
    searchState.comments.length === 0 &&
    searchState.tags.length === 0;

  return (
    <Box fill="horizontal">
      <ModalRenderer slotId={props.layout.app.modalSlotId}>
        {reportModalOpen && (
          <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
            <ReportModal
              titleLabel={t('Report a Post')}
              successTitleLabel={t('Thank you for helping us keep Ethereum World safe! 🙌')}
              successMessageLabel={t('We will investigate this post and take appropriate action.')}
              optionsTitleLabel={t('Please select a reason')}
              optionLabels={[
                t('Suspicious, deceptive, or spam'),
                t('Abusive or harmful to others'),
                t('Self-harm or suicide'),
                t('Illegal'),
                t('Nudity'),
                t('Violence'),
              ]}
              descriptionLabel={t('Explanation')}
              descriptionPlaceholder={t('Please explain your reason(s)')}
              footerText1Label={t('If you are unsure, you can refer to our')}
              footerLink1Label={t('Code of Conduct')}
              footerUrl1={'https://akasha.slab.com/public/ethereum-world-code-of-conduct-e7ejzqoo'}
              footerText2Label={t('and')}
              footerLink2Label={t('Terms of Service')}
              footerUrl2={'https://ethereum.world/terms-of-service'}
              cancelLabel={t('Cancel')}
              reportLabel={t('Report')}
              blockLabel={t('Block User')}
              closeLabel={t('Close')}
              user={loginState.ethAddress ? loginState.ethAddress : ''}
              contentId={flagged}
              contentType="post"
              baseUrl={constants.BASE_FLAG_URL}
              size={size}
              width={width}
              updateEntry={updateEntry}
              closeModal={() => {
                setReportModalOpen(false);
              }}
            />
          </ToastProvider>
        )}
      </ModalRenderer>
      {searchState.isFetching && (
        <BasicCardBox>
          <Box pad="large">
            <Spinner />
          </Box>
        </BasicCardBox>
      )}
      {!searchState.isFetching && emptySearchState && (
        <BasicCardBox>
          <ErrorLoader
            type="no-login"
            title={`${t('No matching results found')} 😞`}
            details={t(
              'Make sure you spelled everything correctly or try searching for something else',
            )}
          />
        </BasicCardBox>
      )}

      {!searchState.isFetching && !emptySearchState && (
        <Box>
          <Box align="start" pad={{ bottom: 'medium' }} gap="small" direction="row">
            {searchState.tags.map((tag: any, index: number) => (
              <Box key={index}>
                <DuplexButton
                  activeHoverLabel={`#${tag}`}
                  active={tagSubscriptionState.includes(tag)}
                  activeLabel={`#${tag}`}
                  inactiveLabel={`#${tag}`}
                  onClickActive={() => handleTagUnsubscribe(tag)}
                  onClickInactive={() => handleTagSubscribe(tag)}
                  icon={<Icon type="subscribe" />}
                />
              </Box>
            ))}
          </Box>

          {searchState.profiles.slice(0, 4).map((profileData: any, index: number) => (
            <Box
              key={index}
              onClick={() => handleProfileClick(profileData.pubKey)}
              pad={{ bottom: 'medium' }}
            >
              <ProfileCard
                onENSChangeClick={() => null}
                onUpdateClick={() => null}
                onClickFollowers={() => null}
                onClickFollowing={() => null}
                onClickPosts={() => null}
                handleFollow={() => handleFollowProfile(profileData.ethAddress)}
                handleUnfollow={() => handleUnfollowProfile(profileData.ethAddress)}
                handleShareClick={() => null}
                isFollowing={followedProfiles.includes(profileData?.ethAddress)}
                loggedEthAddress={loginState.ethAddress}
                profileData={profileData}
                followLabel={t('Follow')}
                unfollowLabel={t('Unfollow')}
                descriptionLabel={t('About me')}
                followingLabel={t('Following')}
                followersLabel={t('Followers')}
                postsLabel={t('Posts')}
                shareProfileLabel={t('Share')}
                flaggable={true}
                // uncomment this to enable report profile
                // flagAsLabel={t('Report Profile')}
                onEntryFlag={() => null}
              />
            </Box>
          ))}
          {searchState.entries.slice(0, 4).map((entryData: any) => (
            <Box key={entryData.entyId} pad={{ bottom: 'medium' }}>
              {entryData.delisted ? (
                <EntryCardHidden
                  moderatedContentLabel={t('This content has been moderated')}
                  isDelisted={true}
                />
              ) : entryData.reported ? (
                <EntryCardHidden
                  awaitingModerationLabel={t(
                    'You have reported this post. It is awaiting moderation.',
                  )}
                  ctaLabel={t('See it anyway')}
                  handleFlipCard={handleFlipCard && handleFlipCard(entryData, false)}
                />
              ) : (
                <EntryCard
                  isBookmarked={
                    bookmarkState.bookmarks.findIndex(bm => bm.entryId === entryData.entryId) >= 0
                  }
                  entryData={entryData}
                  sharePostLabel={t('Share Post')}
                  shareTextLabel={t('Share this post with your friends')}
                  sharePostUrl={`${window.location.origin}/AKASHA-app/post/`}
                  onClickAvatar={() => handleProfileClick(entryData.author.pubKey)}
                  onEntryBookmark={handleEntryBookmark}
                  repliesLabel={t('Replies')}
                  repostsLabel={t('Reposts')}
                  repostLabel={t('Repost')}
                  repostWithCommentLabel={t('Repost with comment')}
                  shareLabel={t('Share')}
                  copyLinkLabel={t('Copy Link')}
                  flagAsLabel={t('Report Post')}
                  loggedProfileEthAddress={loginState.ethAddress}
                  locale={locale || 'en'}
                  style={{ height: 'auto' }}
                  bookmarkLabel={t('Save')}
                  bookmarkedLabel={t('Saved')}
                  onRepost={() => null}
                  onEntryFlag={handleEntryFlag}
                  handleFollowAuthor={() => handleFollowProfile(entryData.author.ethAddress)}
                  handleUnfollowAuthor={() => handleUnfollowProfile(entryData.author.ethAddress)}
                  isFollowingAuthor={followedProfiles.includes(entryData.author)}
                  onContentClick={() => handlePostClick(entryData.entryId)}
                  onMentionClick={() => handleProfileClick(entryData.author.pubKey)}
                  contentClickable={true}
                  handleFlipCard={handleFlipCard}
                />
              )}
            </Box>
          ))}
          {searchState.comments.slice(0, 4).map((commentData: any, index: number) => (
            <Box key={index} pad={{ bottom: 'medium' }}>
              <EntryCard
                isBookmarked={
                  bookmarkState.bookmarks.findIndex(bm => bm.entryId === commentData.entryId) >= 0
                }
                entryData={commentData}
                sharePostLabel={t('Share Post')}
                shareTextLabel={t('Share this post with your friends')}
                sharePostUrl={'https://ethereum.world'}
                onClickAvatar={() => handleProfileClick(commentData.author.pubKey)}
                onEntryBookmark={handleEntryBookmark}
                repliesLabel={t('Replies')}
                repostsLabel={t('Reposts')}
                repostLabel={t('Repost')}
                repostWithCommentLabel={t('Repost with comment')}
                shareLabel={t('Share')}
                copyLinkLabel={t('Copy Link')}
                flagAsLabel={t('Report Post')}
                loggedProfileEthAddress={loginState.ethAddress}
                locale={locale || 'en'}
                style={{ height: 'auto' }}
                bookmarkLabel={t('Save')}
                bookmarkedLabel={t('Saved')}
                onRepost={() => null}
                onEntryFlag={handleEntryFlag}
                handleFollowAuthor={() => handleFollowProfile(commentData.author.ethAddress)}
                handleUnfollowAuthor={() => handleUnfollowProfile(commentData.author.ethAddress)}
                isFollowingAuthor={followedProfiles.includes(commentData.author)}
                onContentClick={() => handlePostClick(commentData.postId)}
                onMentionClick={() => handleProfileClick(commentData.author.pubKey)}
                contentClickable={true}
                handleFlipCard={handleFlipCard}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
