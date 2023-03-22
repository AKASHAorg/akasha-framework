import React from 'react';
import { useTranslation } from 'react-i18next';

import { RootComponentProps } from '@akashaorg/typings/ui';

import { values } from '../services/values';
import { externalLinks } from '../utils/external-links';
import ModerationIntroCard from '@akashaorg/design-system-core/lib/components/ModerationIntroCard';
import ModerationValuesCard from '@akashaorg/design-system-core/lib/components/ModerationValuesCard';

export const Overview: React.FC<RootComponentProps> = props => {
  const { plugins } = props;
  const { t } = useTranslation('app-moderation-ewa');

  const routing = plugins['@akashaorg/app-routing']?.routing;

  const handleCodeOfConductClick = () => {
    routing.navigateTo({
      appName: '@akashaorg/app-legal',
      getNavigationUrl: () => '/legal/code-of-conduct',
    });
  };

  const handleValueClick = (path: string) => () => {
    routing.navigateTo({
      appName: '@akashaorg/app-moderation-ewa',
      getNavigationUrl: () => `/overview/values/${path}`,
    });
  };

  return (
    <div>
      <ModerationIntroCard
        titleLabel={t('Overview')}
        introLabel={t('Welcome to Akasha Moderation')}
        subtitleLabel={t(
          'The Moderation app facilitates cooperation and prevents abuse. The app is open and transparent. Take part in the process of governing this community.',
        )}
        codeOfConductLabel={t('Read our Code of Conduct')}
        overviewCTAArr={[
          {
            label: t('CoC discussions'),
            url: externalLinks.discourse.CoC,
            iconType: 'explore',
          },
          {
            label: t('Moderation thoughts'),
            url: externalLinks.discord,
            iconType: 'chatBubble',
          },
          {
            label: t('Send us a message'),
            url: externalLinks.email,
            iconType: 'message',
          },
        ]}
        onCodeOfConductClick={handleCodeOfConductClick}
      />

      <ModerationValuesCard
        titleLabel={t('Our Values')}
        subtitleLabel={t('The principles guiding our behaviour')}
        ctaLabel={t('Propose your own')}
        ctaUrl={externalLinks.discourse.values}
        values={values.map(value => ({
          path: value.path,
          title: t('{{title}}', { title: value.title }),
          assetName: value.assetName,
          description: value.description,
        }))}
        onValueClick={handleValueClick}
      />
    </div>
  );
};
