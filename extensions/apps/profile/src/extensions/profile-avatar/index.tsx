import React from 'react';
import ProfileAvatar, { ProfileAvatarProps } from './profile-avatar';
import { useRootComponentProps, withProviders } from '@akashaorg/ui-core-hooks';
import { IRootExtensionProps } from '@akashaorg/typings/lib/ui';
import { I18nextProvider } from 'react-i18next';

const Index = (props: IRootExtensionProps<ProfileAvatarProps>) => {
  const { extensionData } = props;
  const { getTranslationPlugin } = useRootComponentProps();

  return (
    <I18nextProvider i18n={getTranslationPlugin().i18n}>
      <ProfileAvatar {...extensionData} />
    </I18nextProvider>
  );
};

export default withProviders(Index);
