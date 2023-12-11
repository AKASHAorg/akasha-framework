import React from 'react';
import EntryCard, {
  EntryCardProps,
} from '@akashaorg/design-system-components/lib/components/Entry/EntryCard';
import { ContentBlockExtension } from '@akashaorg/ui-lib-extensions/lib/react/content-block';
import { transformImageVersions, hasOwn, sortByKey, useLoggedIn } from '@akashaorg/ui-awf-hooks';
import { AkashaBeam } from '@akashaorg/typings/lib/sdk/graphql-types-new';
import { ContentBlockModes, EntityTypes } from '@akashaorg/typings/lib/ui';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { useGetProfileByDidQuery } from '@akashaorg/ui-awf-hooks/lib/generated';
import { useTranslation } from 'react-i18next';

type BeamCardProps = Pick<
  EntryCardProps,
  | 'contentClickable'
  | 'noWrapperCard'
  | 'onContentClick'
  | 'onReflect'
  | 'hidePublishTime'
  | 'hideActionButtons'
  | 'disableActions'
> & {
  entryData: AkashaBeam;
};

const BeamCard: React.FC<BeamCardProps> = props => {
  const { entryData, onReflect, ...rest } = props;
  const { t } = useTranslation('ui-lib-feed');
  const { getRoutingPlugin } = useRootComponentProps();
  const { getTranslationPlugin } = useRootComponentProps();

  const navigateTo = getRoutingPlugin().navigateTo;

  const { authenticatedDID } = useLoggedIn();

  const profileDataReq = useGetProfileByDidQuery(
    { id: entryData.author.id },
    { select: response => response.node },
  );

  const { akashaProfile: profileData } =
    profileDataReq.data && hasOwn(profileDataReq.data, 'akashaProfile')
      ? profileDataReq.data
      : { akashaProfile: null };
  const locale = getTranslationPlugin().i18n?.languages?.[0] || 'en';

  const onAvatarClick = (id: string) => {
    navigateTo({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: routes => `${routes.rootRoute}/${id}`,
    });
  };

  const sortedEntryContent = React.useMemo(() => {
    return sortByKey(entryData.content, 'order');
  }, [entryData.content]);

  return (
    <EntryCard
      entryData={entryData}
      authorProfile={{ data: profileData, status: profileDataReq.status }}
      locale={locale}
      repliesAnchorLink="/@akashaorg/app-akasha-integration/beam"
      profileAnchorLink="/@akashaorg/app-profile"
      sortedContents={sortedEntryContent}
      flagAsLabel={t('Report')}
      editLabel={t('Edit')}
      isViewer={authenticatedDID === entryData.author.id}
      removed={{
        author: {
          firstPart: t('AKASHA world members won’t be able to see the content '),
          secondPart: t('of your beam because you have violated the following '),
          thirdPart: { url: '' /*@TODO */, content: t('Code of Conduct.') },
          tapToViewLabel: t('Tap to view'),
        },
        others: {
          firstLine: t('This beam has been delisted for the violation of our Code of Conduct.'),
          secondLine: t('All reflections are disabled.'),
        },
      }}
      nsfw={{
        sensitiveContentLabel: t('Sensitive Content!'),
        clickToViewLabel: t('Click to View'),
      }}
      itemType={EntityTypes.BEAM}
      transformImageVersions={transformImageVersions}
      onAvatarClick={onAvatarClick}
      onReflect={onReflect}
      {...rest}
    >
      {({ blockID }) => (
        <React.Suspense fallback={<></>}>
          <ContentBlockExtension readMode={{ blockID }} mode={ContentBlockModes.READONLY} />
        </React.Suspense>
      )}
    </EntryCard>
  );
};

export default BeamCard;
