import React from 'react';
import { useTranslation } from 'react-i18next';

import DS from '@akashaorg/design-system';
import { RootComponentProps } from '@akashaorg/typings/ui';

import { ISharedModerationProps } from '../interfaces';

import routes, { UNAUTHENTICATED, HOME } from '../routes';

const { ModerationIntroCard } = DS;

const GuestPage: React.FC<ISharedModerationProps & RootComponentProps> = props => {
  const {
    user,
    isAuthorised,
    plugins: { routing },
  } = props;
  const { t } = useTranslation('app-moderation-ewa');

  React.useEffect(() => {
    if (!user) {
      // if not authenticated, prompt to authenticate
      routing.navigateTo({
        appName: '@akashaorg/app-moderation-ewa',
        getNavigationUrl: () => routes[UNAUTHENTICATED],
      });
    }
    if (user && isAuthorised) {
      // if authenticated and authorised, navigate to home
      routing.navigateTo({
        appName: '@akashaorg/app-moderation-ewa',
        getNavigationUrl: () => routes[HOME],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthorised]);

  const handleCodeOfConductClick = () => {
    routing.navigateTo({
      appName: '@akashaorg/app-legal',
      getNavigationUrl: routes => routes.codeOfConduct,
    });
  };

  return (
    <ModerationIntroCard
      titleLabel={t('Moderating')}
      subtitleLabel={t('Welcome to the Dashboard')}
      isIntro={true}
      introLabel={t('Are you interested in Moderating?')}
      descriptionLine1Label={t(
        "We are currently creating new Moderating Systems for Ethereum World, If you'd like to join us click",
      )}
      ctaLabel="here"
      ctaUrl="https://www.notion.so/akasha-foundation/The-AKASHA-Moderating-Open-Design-Challenge-15cb49cf57e740be92534958828ca210"
      descriptionLine2IntroLabel={t('Visit our')}
      codeOfConductLabel={t('Code of Conduct')}
      descriptionLine2Label={t('to learn more about our moderation criteria')}
      onCodeOfConductClick={handleCodeOfConductClick}
    />
  );
};

export default GuestPage;
