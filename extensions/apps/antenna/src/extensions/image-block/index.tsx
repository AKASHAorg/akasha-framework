import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { useRootComponentProps, withProviders } from '@akashaorg/ui-core-hooks';
import {
  BlockInstanceMethods,
  ContentBlockModes,
  ContentBlockRootProps,
} from '@akashaorg/typings/lib/ui';
import { ImageEditorBlock } from './image-editor-block';
import { ImageReadonlyBlock } from './image-readonly-block';

const ImageBlockExtension = (
  props: ContentBlockRootProps & { blockRef?: React.RefObject<BlockInstanceMethods> },
) => {
  const { getTranslationPlugin } = useRootComponentProps();
  return (
    <I18nextProvider i18n={getTranslationPlugin().i18n}>
      {props.blockInfo.mode === ContentBlockModes.EDIT && <ImageEditorBlock {...props} />}
      {props.blockInfo.mode === ContentBlockModes.READONLY && <ImageReadonlyBlock {...props} />}
    </I18nextProvider>
  );
};
export default withProviders<ContentBlockRootProps>(ImageBlockExtension);
