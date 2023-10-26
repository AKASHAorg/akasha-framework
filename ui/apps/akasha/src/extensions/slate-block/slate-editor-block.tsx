import React, { useImperativeHandle } from 'react';
import EditorBox from '@akashaorg/design-system-components/lib/components/Editor';
import {
  serializeSlateToBase64,
  useLoggedIn,
  useRootComponentProps,
} from '@akashaorg/ui-awf-hooks';
import {
  BlockInfo,
  BlockInstanceMethods,
  ContentBlockRootProps,
  IEntryData,
  RootExtensionProps,
} from '@akashaorg/typings/lib/ui';
import { Draft } from '../../utils';
import { useCreateContentBlockMutation } from '@akashaorg/ui-awf-hooks/lib/generated/hooks-new';
import {
  AkashaContentBlockBlockDef,
  AkashaContentBlockLabeledValueInput,
} from '@akashaorg/typings/lib/sdk/graphql-types-new';

// @TODO: replace this with actual data
const TEST_APP_VERSION_ID = 'kjzl6kcym7w8y5yp2ew8mc4ryswawpn914fm6qhe6bpoobipgu9r1pcwsu441cf';

export const SlateEditorBlock = (
  props: ContentBlockRootProps & { blockRef?: React.RefObject<BlockInstanceMethods> },
) => {
  const { name } = useRootComponentProps<RootExtensionProps>();
  const { loggedInProfileId } = useLoggedIn();

  const createContentBlock = useCreateContentBlockMutation();

  const postDraft = new Draft<IEntryData['slateContent']>({
    storage: localStorage,
    appName: name,
    userId: loggedInProfileId,
    action: 'post',
  });

  const canSaveDraft = !props.blockInfo.mode; //action === 'post' || action === 'repost';
  const draftPostData = canSaveDraft ? postDraft.get() : null;

  const [editorState, setEditorState] = React.useState(draftPostData);

  useImperativeHandle(
    props.blockRef,
    () => ({
      createBlock: async () => {
        const content = serializeSlateToBase64(editorState);
        const contentBlockValue: AkashaContentBlockLabeledValueInput = {
          label: props.blockInfo.appName,
          propertyType: props.blockInfo.propertyType,
          value: content,
        };
        try {
          const resp = await createContentBlock.mutateAsync({
            i: {
              content: {
                // @TODO: replace this mock appVersionID
                appVersionID: TEST_APP_VERSION_ID,
                createdAt: new Date().toISOString(),
                content: [contentBlockValue],
                active: true,
                kind: AkashaContentBlockBlockDef.Text,
              },
            },
          });
          return {
            response: { blockID: resp.createAkashaContentBlock.document.id },
            blockInfo: props.blockInfo,
          };
        } catch (err) {
          console.error('error creating content block', err);
          return {
            response: {
              error: err.message,
            },
            blockInfo: props.blockInfo,
          };
        }
      },
    }),
    [editorState, props.blockInfo],
  );

  return (
    <EditorBox
      profileId={'profileId'}
      placeholderLabel={'write here'}
      onPublish={() => {
        // void
      }}
      getMentions={() => {
        //void
      }}
      getTags={() => {
        // void
      }}
      withMeter={false}
      editorState={editorState}
      setEditorState={(value: IEntryData['slateContent']) => {
        setEditorState(value);
      }}
      showCancelButton={false}
      showPostButton={false}
    />
  );
};
