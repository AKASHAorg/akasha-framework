import React from 'react';
import FollowProfileButton from '../components/follow-profile-button';
import { I18nextProvider } from 'react-i18next';
import { useRootComponentProps, withProviders } from '@akashaorg/ui-core-hooks';
import { IModalNavigationOptions, IRootExtensionProps } from '@akashaorg/typings/lib/ui';
import { FollowButtonProps } from '../components/follow-profile-button/follow-button';

type FollowProfileButtonExtensionData = Pick<
  FollowButtonProps,
  'profileID' | 'activeVariant' | 'inactiveVariant'
>;

const Index = (props: IRootExtensionProps<FollowProfileButtonExtensionData>) => {
  const { navigateToModal, extensionData } = props;
  const { profileID, activeVariant, inactiveVariant } = extensionData;
  const { getTranslationPlugin } = useRootComponentProps();
  const showLoginModal = (redirectTo?: { modal: IModalNavigationOptions }) => {
    navigateToModal({
      name: 'login',
      redirectTo,
    });
  };

  return (
    <I18nextProvider i18n={getTranslationPlugin().i18n}>
      <FollowProfileButton
        profileID={profileID}
        showLoginModal={showLoginModal}
        activeVariant={activeVariant}
        inactiveVariant={inactiveVariant}
      />
    </I18nextProvider>
  );
};

export default withProviders(Index);
