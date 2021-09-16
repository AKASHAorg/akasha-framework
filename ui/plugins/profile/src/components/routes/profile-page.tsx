import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import DS from '@akashaproject/design-system';
import { useGetProfile } from '@akashaproject/ui-awf-hooks/lib/use-profile.new';
import { RootComponentProps } from '@akashaproject/ui-awf-typings';
import useLoginState, { ILoginState } from '@akashaproject/ui-awf-hooks/lib/use-login-state';
import FeedWidget from '@akashaproject/ui-widget-feed/lib/components/App';
import { IContentClickDetails } from '@akashaproject/design-system/lib/components/EntryCard/entry-box';
// import { useFollowers } from '@akashaproject/ui-awf-hooks/lib/use-profile.new';
import { ProfilePageHeader } from '../profile-cards/profile-page-header';
import menuRoute, { MY_PROFILE } from '../../routes';
import { ItemTypes } from '@akashaproject/ui-awf-typings/lib/app-loader';
import { ENTRY_KEY, useInfinitePostsByAuthor } from '@akashaproject/ui-awf-hooks/lib/use-posts.new';
import { useQueryClient } from 'react-query';
import { IProfileData } from '@akashaproject/ui-awf-typings/lib/profile';
import { ModalNavigationOptions } from '@akashaproject/ui-awf-typings/lib/app-loader';

const { Box, Helmet, EntryCardHidden, ErrorLoader, ProfileDelistedCard } = DS;

export interface ProfilePageProps extends RootComponentProps {
  loggedProfileData: IProfileData;
  showLoginModal: (redirectTo?: ModalNavigationOptions) => void;
  loginState: ILoginState;
}

const ProfilePage = (props: ProfilePageProps) => {
  const { t, i18n } = useTranslation();
  const { loggedProfileData, showLoginModal } = props;
  const [erroredHooks, setErroredHooks] = React.useState([]);

  const location = useLocation();
  const queryClient = useQueryClient();

  const { pubKey } = useParams<{ pubKey: string }>();

  const publicKey = React.useMemo(() => {
    if (location.pathname.includes(menuRoute[MY_PROFILE])) {
      if (loggedProfileData && loggedProfileData.pubKey) {
        return loggedProfileData.pubKey;
      }
      return undefined;
    }
    return pubKey;
  }, [pubKey, loggedProfileData, location.pathname]);

  const [loginState] = useLoginState({});

  const profileDataQuery = useGetProfile(
    publicKey,
    loginState.pubKey,
    loginState.currentUserCalled,
  );
  const profileState = profileDataQuery.data;

  const reqPosts = useInfinitePostsByAuthor(
    publicKey,
    15,
    !!publicKey && !erroredHooks.includes('useInfinitePostsByAuthor'),
  );

  React.useEffect(() => {
    if (reqPosts.status === 'error' && !erroredHooks.includes('useInfinitePostsByAuthor')) {
      setErroredHooks(['useInfinitePostsByAuthor']);
    }
  }, [reqPosts, erroredHooks]);

  const handleLoadMore = React.useCallback(() => {
    if (!reqPosts.isLoading && reqPosts.hasNextPage && loginState.currentUserCalled) {
      reqPosts.fetchNextPage();
    }
  }, [reqPosts, loginState.currentUserCalled]);

  const handleNavigation = (itemType: ItemTypes, details: IContentClickDetails) => {
    let url;
    switch (itemType) {
      case ItemTypes.PROFILE:
        if (details.entryId === pubKey) {
          return;
        }
        url = `/profile/${details.entryId}`;
        break;
      case ItemTypes.TAG:
        url = `/social-app/tags/${details.entryId}`;
        break;
      case ItemTypes.ENTRY:
        url = `/social-app/post/${details.entryId}`;
        break;
      case ItemTypes.COMMENT:
        /* Navigate to parent post because we don't have the comment page yet */
        url = `/social-app/post/${
          queryClient.getQueryData<{ postId: string }>([ENTRY_KEY, details.entryId]).postId
        }`;
        break;
      default:
        break;
    }
    props.singleSpa.navigateToUrl(url);
  };

  const profileUserName = React.useMemo(() => {
    if (profileState && profileState.name) {
      return profileState.name;
    }
    return pubKey;
  }, [profileState, pubKey]);

  const postPages = React.useMemo(() => {
    if (reqPosts.data) {
      return reqPosts.data.pages;
    }
    return [];
  }, [reqPosts.data]);

  const handleEntryFlag = (entryId: string, itemType: string) => () => {
    if (!loginState.pubKey) {
      return showLoginModal({ name: 'report-modal', entryId, itemType });
    }
    props.navigateToModal({ name: 'report-modal', entryId, itemType });
  };

  const handleEntryRemove = (entryId: string) => {
    props.navigateToModal({ name: 'entry-remove-confirmation', entryId, entryType: 'Post' });
  };

  return (
    <Box fill="horizontal">
      <Helmet>
        <title>
          {t("{{profileUsername}}'s Page", { profileUsername: profileUserName || '' })} | Ethereum
          World
        </title>
      </Helmet>
      {profileDataQuery.status === 'loading' && <></>}
      {(profileDataQuery.status === 'error' ||
        (profileDataQuery.status === 'success' && !profileState)) && (
        <ErrorLoader
          type="script-error"
          title={t('There was an error loading this profile')}
          details={t('We cannot show this profile now')}
          devDetails={profileDataQuery.error}
        />
      )}
      {profileDataQuery.status === 'success' && profileState && (
        <>
          {profileState.moderated && profileState.delisted && (
            <EntryCardHidden
              isDelisted={profileState.delisted}
              delistedAccount={profileState.delisted}
              moderatedContentLabel={t('This account was suspended for violating the')}
              ctaLabel={t('Code of Conduct')}
              ctaUrl="/legal/code-of-conduct"
            />
          )}
          {!profileState.moderated && profileState.reported && (
            <EntryCardHidden
              reportedAccount={profileState.reported}
              reason={profileState.reason}
              headerTextLabel={t(`You reported this account for the following reason`)}
              footerTextLabel={t('It is awaiting moderation.')}
            />
          )}
          {profileState.moderated && profileState.delisted && (
            <ProfileDelistedCard
              name={t('Suspended Account')}
              userName={profileState.userName || ''}
            />
          )}
          {!profileState.moderated && !profileState.delisted && (
            <>
              <ProfilePageHeader
                {...props}
                slotId={props.layoutConfig.modalSlotId}
                profileData={profileState}
                profileId={pubKey}
                loginState={loginState}
              />
              {reqPosts.status === 'error' && reqPosts.error && (
                <ErrorLoader
                  type="script-error"
                  title="Cannot get posts for this profile"
                  details={(reqPosts.error as Error).message}
                />
              )}
              {reqPosts.status === 'success' && !postPages && <div>There are no posts!</div>}
              {reqPosts.status === 'success' && postPages && (
                <FeedWidget
                  itemType={ItemTypes.ENTRY}
                  logger={props.logger}
                  onLoadMore={handleLoadMore}
                  getShareUrl={(itemId: string) =>
                    `${window.location.origin}/social-app/post/${itemId}`
                  }
                  pages={postPages}
                  requestStatus={reqPosts.status}
                  ethAddress={loginState.ready?.ethAddress}
                  onNavigate={handleNavigation}
                  singleSpaNavigate={props.singleSpa.navigateToUrl}
                  navigateToModal={props.navigateToModal}
                  onLoginModalOpen={showLoginModal}
                  hasNextPage={reqPosts.hasNextPage}
                  profilePubKey={pubKey}
                  loggedProfile={loggedProfileData}
                  contentClickable={true}
                  onEntryFlag={handleEntryFlag}
                  onEntryRemove={handleEntryRemove}
                  removeEntryLabel={t('Delete Post')}
                  removedByMeLabel={t('You deleted this post')}
                  removedByAuthorLabel={t('This post was deleted by its author')}
                  uiEvents={props.uiEvents}
                  itemSpacing={8}
                  i18n={i18n}
                />
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
