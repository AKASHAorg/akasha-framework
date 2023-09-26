import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLoggedIn, useRootComponentProps } from '@akashaorg/ui-awf-hooks';

import Card from '@akashaorg/design-system-core/lib/components/Card';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Image from '@akashaorg/design-system-core/lib/components/Image';
import Text from '@akashaorg/design-system-core/lib/components/Text';

import routes, { ONBOARDING_STEP_ONE } from '../routes';

export type DevDashOnboardingIntroProps = {
  publicImgPath?: string;
  assetName?: string;
  assetExtension?: string;
};

export const ONBOARDING_STATUS = 'ewa-dev-dashboard-onboarding-status';

export const DevDashOnboardingIntro: React.FC<DevDashOnboardingIntroProps> = props => {
  const {
    assetName = 'dev-dashboard-intro',
    assetExtension = 'webp',
    publicImgPath = '/images',
  } = props;

  const { baseRouteName, getRoutingPlugin } = useRootComponentProps();

  const navigateTo = getRoutingPlugin().navigateTo;

  const { t } = useTranslation('app-dev-dashboard');

  const { isLoggedIn } = useLoggedIn();

  const handleOnboardingCTAClick = () => {
    // if logged in, navigate to step 1
    if (isLoggedIn) {
      return navigateTo?.({
        appName: '@akashaorg/app-dev-dashboard',
        getNavigationUrl: () => routes[ONBOARDING_STEP_ONE],
      });
    }

    /**
     * if guest, redirect to onboarding step 1 after authentication
     */
    navigateTo?.({
      appName: '@akashaorg/app-auth-ewa',
      getNavigationUrl: (routes: Record<string, string>) => {
        return `${routes.Connect}?${new URLSearchParams({
          redirectTo: `${baseRouteName}${routes[ONBOARDING_STEP_ONE]}`,
        }).toString()}`;
      },
    });
  };

  return (
    <Card>
      <Stack fullWidth={true} align="center" customStyle="p-2">
        <Text variant="h5" align="center" weight="bold">
          {t('Developer Dashboard')}
        </Text>

        <Stack customStyle="w-[17.5rem] h-[17.5rem] my-6">
          <Image src={`${publicImgPath}/${assetName}.${assetExtension}`} />
        </Stack>

        <Text variant="h5" align="center" weight="bold" customStyle="mt-2">
          {t('✨ Your journey begins here ✨')}
        </Text>

        <Text align="start" customStyle="mt-2">
          {t(
            'Welcome to our vibrant community of developers! Get ready to embark on an exciting journey where you can unleash your creativity and contribute to making the AKASHA World an even better place. Join us now and start building and publishing incredible applications that will shape the future.',
          )}
        </Text>

        <Button
          size="md"
          customStyle="self-end mt-6"
          variant="primary"
          label={t('Unleash your creativity')}
          onClick={handleOnboardingCTAClick}
        />
      </Stack>
    </Card>
  );
};
