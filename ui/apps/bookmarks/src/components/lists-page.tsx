import React from 'react';
import { useTranslation } from 'react-i18next';

import DS from '@akashaorg/design-system';
import Box from '@akashaorg/design-system-core/lib/components/Box';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import Spinner from '@akashaorg/design-system-core/lib/components/Spinner';
import ListAppTopbar from '@akashaorg/design-system-components/lib/components/ListAppTopbar';
import SearchDefaultCard from '@akashaorg/design-system-components/lib/components/SearchDefaultCard';
import { RootComponentProps, EntityTypes, ModalNavigationOptions } from '@akashaorg/typings/ui';
import FeedWidget from '@akashaorg/ui-lib-feed/lib/components/App';
import { useGetBookmarks, usePosts, checkEntryActive } from '@akashaorg/ui-awf-hooks';
import { useGetMyProfileQuery } from '@akashaorg/ui-awf-hooks/lib/generated/hooks-new';

const { StartCard } = DS;

type ListsPageProps = Omit<
  RootComponentProps,
  'layout' | 'events' | 'domElement' | 'name' | 'unmountSelf' | 'activeWhen' | 'rootNodeId'
>;

const ListsPage: React.FC<ListsPageProps> = props => {
  const { t } = useTranslation('app-lists');

  const profileDataReq = useGetMyProfileQuery(null, {
    select: resp => {
      return resp.viewer?.profile;
    },
  });
  const loggedProfileData = profileDataReq.data;

  const isLoggedIn = React.useMemo(() => {
    return loggedProfileData?.did?.id;
  }, [loggedProfileData?.did?.id]);

  const listsReq = useGetBookmarks(isLoggedIn);
  /**
   * Currently react query's initialData isn't working properly so listsReq.data will return undefined even if we supply initialData.
   * This will be fixed in v4 of react query(https://github.com/DamianOsipiuk/vue-query/issues/124).
   * In the mean time, the following check will ensure undefined data is handled.  */
  const lists = listsReq.data || [];

  const bookmarkedBeamsIds = lists.map((bm: Record<string, string>) => bm.itemId);
  const bookmarkedBeams = usePosts({ postIds: bookmarkedBeamsIds, enabler: true });
  const numberOfBookmarkedInactivePosts = React.useMemo(
    () => bookmarkedBeams.filter(({ data }) => (data ? !checkEntryActive(data) : false)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookmarkedBeamsIds],
  );

  const showLoginModal = (redirectTo?: { modal: ModalNavigationOptions }) => {
    props.navigateToModal({ name: 'login', redirectTo });
  };

  const handleEntryFlag = (itemId: string, itemType: EntityTypes) => () => {
    if (!loggedProfileData?.did?.id) {
      return showLoginModal({ modal: { name: 'report-modal', itemId, itemType } });
    }
    props.navigateToModal({ name: 'report-modal', itemId, itemType });
  };

  const handleEntryRemove = (itemId: string) => {
    props.navigateToModal({
      name: 'entry-remove-confirmation',
      itemId,
      itemType: EntityTypes.POST,
    });
  };

  const description = t('Lists help you save your favorite posts for quick access at any time.');

  const getInactivePostsText = (numberOfBookmarkedInactivePosts: number) => {
    const linkingVerb = numberOfBookmarkedInactivePosts > 1 ? t('are') : t('is');
    const result = numberOfBookmarkedInactivePosts
      ? t('{{ deletedCount }} of which {{ linkingVerb }} deleted', {
          deletedCount: numberOfBookmarkedInactivePosts,
          linkingVerb,
        })
      : '';
    return result ? ` (${result})` : '';
  };

  const getSubtitleText = () => {
    if (isLoggedIn && lists?.length) {
      return t('You have {{ bookmarkCount }} lists.{{ inactivePostsText }}', {
        bookmarkCount: lists.length,
        inactivePostsText: getInactivePostsText(numberOfBookmarkedInactivePosts),
      });
    }
    if (isLoggedIn && !lists?.length) {
      return description;
    }
    return t('Check out the posts saved in your lists');
  };

  return (
    <>
      <ListAppTopbar resetLabel={t('Reset')} />
      {listsReq.status === 'error' && (
        <ErrorLoader
          type="script-error"
          title={t('There was an error loading the lists')}
          details={listsReq.error as string}
        />
      )}
      {listsReq.status !== 'error' && (
        <Box data-testid="lists" customStyle="space-x-8 space-y-8">
          <StartCard
            title={t('Lists')}
            subtitle={getSubtitleText()}
            heading={t('✨ Save what inspires you ✨')}
            description={description}
            image={'/images/no-saved-posts-error.webp'}
            showMainArea={!isLoggedIn}
          />
          {!listsReq.isFetched && isLoggedIn && <Spinner />}
          {listsReq.isFetched && (!lists || !lists.length) && (
            <SearchDefaultCard infoText={t('You don’t have any saved content in your List')} />
          )}
          {listsReq.status === 'success' && lists.length > 0 && (
            <FeedWidget
              modalSlotId={props.layoutConfig.modalSlotId}
              itemType={EntityTypes.POST}
              logger={props.logger}
              onLoadMore={() => {
                /* if next page, load more */
              }}
              getShareUrl={(itemId: string) =>
                `${window.location.origin}/@akashaorg/app-akasha-integration/post/${itemId}`
              }
              pages={[{ results: bookmarkedBeamsIds, total: bookmarkedBeamsIds.length }]}
              requestStatus={listsReq.status}
              loggedProfileData={loggedProfileData}
              navigateTo={props.plugins['@akashaorg/app-routing']?.routing?.navigateTo}
              navigateToModal={props.navigateToModal}
              onLoginModalOpen={showLoginModal}
              hasNextPage={false}
              contentClickable={true}
              onEntryFlag={handleEntryFlag}
              onEntryRemove={handleEntryRemove}
              removeEntryLabel={t('Delete Post')}
              removedByMeLabel={t('You deleted this post')}
              removedByAuthorLabel={t('This post was deleted by its author')}
              uiEvents={props.uiEvents}
              itemSpacing={8}
              i18n={props.plugins['@akashaorg/app-translation']?.translation?.i18n}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default ListsPage;
