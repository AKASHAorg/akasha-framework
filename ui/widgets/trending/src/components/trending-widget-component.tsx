import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnalyticsCategories } from '@akashaorg/typings/lib/ui';
import {
  useAnalytics,
  useRootComponentProps,
  getFollowList,
  useLoggedIn,
} from '@akashaorg/ui-awf-hooks';
import {
  useGetProfilesQuery,
  useGetInterestsStreamQuery,
  useGetInterestsByDidQuery,
  useCreateInterestsMutation,
  useGetFollowDocumentsQuery,
} from '@akashaorg/ui-awf-hooks/lib/generated/hooks-new';
import { useQueryClient, useIsMutating } from '@tanstack/react-query';

import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';

import { LatestProfiles, LatestTopics } from './cards';

const TrendingWidgetComponent: React.FC<unknown> = () => {
  const { plugins, uiEvents, navigateToModal } = useRootComponentProps();
  const navigateTo = plugins['@akashaorg/app-routing']?.routing?.navigateTo;

  const { t } = useTranslation('ui-widget-trending');
  const { isLoggedIn, loggedInProfileId } = useLoggedIn();
  const queryClient = useQueryClient();

  const [tagsQueue, setTagsQueue] = useState([]);

  const [analyticsActions] = useAnalytics();
  const latestProfilesReq = useGetProfilesQuery(
    { last: 4 },
    { select: result => result?.akashaProfileIndex?.edges.map(profile => profile.node) },
  );
  const latestTopicsReq = useGetInterestsStreamQuery(
    { last: 4 },
    {
      select: result =>
        result?.akashaInterestsStreamIndex?.edges.flatMap(interest => interest.node),
    },
  );
  const tagSubscriptionsReq = useGetInterestsByDidQuery(
    { id: loggedInProfileId },
    {
      enabled: isLoggedIn,
      select: resp => {
        const { akashaProfileInterests } = resp.node as {
          akashaProfileInterests: { topics: { value: string; labelType: string }[] };
        };

        return akashaProfileInterests?.topics ?? [];
      },
    },
  );
  const latestProfiles = useMemo(() => latestProfilesReq.data || [], [latestProfilesReq.data]);
  const followProfileIds = useMemo(
    () => latestProfiles.map(follower => follower.id),
    [latestProfiles],
  );
  const followDocumentsReq = useGetFollowDocumentsQuery(
    {
      following: followProfileIds,
      last: followProfileIds.length,
    },
    {
      select: response => response.viewer?.akashaFollowList,
      enabled: isLoggedIn && !!followProfileIds.length,
    },
  );
  const createInterestMutation = useCreateInterestsMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: useGetInterestsByDidQuery.getKey({ id: loggedInProfileId }),
      });
    },
  });

  const isMutatingInterests = useIsMutating({ mutationKey: useCreateInterestsMutation.getKey() });

  const latestTopics = latestTopicsReq.data || [];
  const tagSubscriptions = tagSubscriptionsReq.data;
  const followList = isLoggedIn
    ? getFollowList(followDocumentsReq.data?.edges?.map(edge => edge?.node))
    : null;

  const showLoginModal = () => {
    navigateToModal({ name: 'login' });
  };

  const handleTopicClick = (topic: string) => {
    navigateTo?.({
      appName: '@akashaorg/app-akasha-integration',
      getNavigationUrl: navRoutes => `${navRoutes.Tags}/${topic}`,
    });
  };

  const handleTopicSubscribe = (topic: string) => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }
    analyticsActions.trackEvent({
      category: AnalyticsCategories.TRENDING_WIDGET,
      action: 'Trending Topic Subscribed',
    });

    setTagsQueue(prevState => {
      return [...prevState, { topic: topic, type: 'sub' }];
    });
  };

  const handleTopicUnSubscribe = (topic: string) => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }
    analyticsActions.trackEvent({
      category: AnalyticsCategories.TRENDING_WIDGET,
      action: 'Trending Topic Unsubscribed',
    });

    setTagsQueue(prevState => {
      return [...prevState, { topic: topic, type: 'unsub' }];
    });
  };

  React.useEffect(() => {
    if (isMutatingInterests > 0 || tagSubscriptionsReq.status === 'loading') return;
    if (tagsQueue.length > 0) {
      const currentTag = tagsQueue[0];

      switch (currentTag?.type) {
        case 'sub':
          if (tagSubscriptions.find(tag => tag.value === currentTag?.topic)) return;
          (async () => {
            await createInterestMutation.mutateAsync({
              i: {
                content: {
                  topics: [...tagSubscriptions, { value: currentTag?.topic, labelType: 'TOPIC' }],
                },
              },
            });
            setTagsQueue(prev => prev.filter(tag => tag.topic !== currentTag.topic));
          })();
          break;
        case 'unsub':
          if (!tagSubscriptions.find(tag => tag.value === currentTag?.topic)) return;
          (async () => {
            await createInterestMutation.mutateAsync({
              i: {
                content: {
                  topics: tagSubscriptions.filter(tag => tag.value !== currentTag?.topic),
                },
              },
            });
            setTagsQueue(prev => prev.filter(tag => tag.topic !== currentTag.topic));
          })();
          break;
        default:
          break;
      }
    }
  }, [
    createInterestMutation,
    isMutatingInterests,
    tagsQueue,
    tagSubscriptions,
    tagSubscriptionsReq.status,
  ]);

  const handleProfileClick = (did: string) => {
    navigateTo?.({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: navRoutes => `${navRoutes.rootRoute}/${did}`,
    });
  };

  return (
    <Stack spacing="gap-y-4">
      {(latestTopicsReq.isError || latestProfilesReq.isError) && (
        <ErrorLoader
          type="script-error"
          title={t('Oops, this widget has an error')}
          details={
            latestTopicsReq.isError
              ? t('Cannot load latest topics')
              : t('Cannot load latest profiles')
          }
        />
      )}

      {!latestTopicsReq.isError && (
        <LatestTopics
          titleLabel={t('Latest Topics')}
          tagSubtitleLabel={t('mentions')}
          subscribeLabel={t('Subscribe')}
          subscribedLabel={t('Subscribed')}
          unsubscribeLabel={t('Unsubscribe')}
          noTagsLabel={t('No topics found!')}
          isLoadingTags={latestTopicsReq.isFetching}
          isProcessingTags={tagsQueue.map(tag => tag.topic)}
          tags={latestTopics}
          subscribedTags={tagSubscriptions?.map(el => el.value)}
          onClickTopic={handleTopicClick}
          handleSubscribeTopic={handleTopicSubscribe}
          handleUnsubscribeTopic={handleTopicUnSubscribe}
        />
      )}

      {!latestProfilesReq.isError && (
        <LatestProfiles
          titleLabel={t('Start Following')}
          noProfilesLabel={t('No profiles found!')}
          isLoadingProfiles={latestProfilesReq.isFetching}
          profiles={latestProfiles}
          followList={followList}
          isLoggedIn={isLoggedIn}
          loggedInProfileId={loggedInProfileId}
          uiEvents={uiEvents}
          onClickProfile={handleProfileClick}
        />
      )}
    </Stack>
  );
};

export default TrendingWidgetComponent;
