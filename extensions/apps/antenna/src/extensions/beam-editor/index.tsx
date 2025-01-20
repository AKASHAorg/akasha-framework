import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { useRootComponentProps, withProviders } from '@akashaorg/ui-core-hooks';
import { BeamEditor } from './beam-editor';
import { IRootExtensionProps } from '@akashaorg/typings/lib/ui';

const Wrapped = (_: IRootExtensionProps) => {
  const { getTranslationPlugin } = useRootComponentProps();
  return (
    <I18nextProvider i18n={getTranslationPlugin().i18n}>
      <BeamEditor />
    </I18nextProvider>
  );
};

export default withProviders(Wrapped);
