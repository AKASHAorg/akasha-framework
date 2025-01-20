import React from 'react';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import ProfileAvatarButton from '@akashaorg/design-system-core/lib/components/ProfileAvatarButton';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import { Portal } from './helpers';
import type { Image, Profile } from '@akashaorg/typings/lib/ui';
import { getElevationClasses } from '@akashaorg/design-system-core/lib/utils';

const MAX_MENTIONS_DISPLAY = 3;

const PROFILE_AVATAR_HEIGHT = 52;

export type MentionPopover = {
  values: Profile[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  handleSelect: (index: number) => void;
  transformSource: (src: Image) => Image;
  noMentionsLabel?: string;
  customStyle?: string;
};

export const MentionPopover = React.forwardRef<HTMLDivElement, MentionPopover>((props, ref) => {
  const {
    values,
    noMentionsLabel,
    customStyle = '',
    setIndex,
    handleSelect,
    transformSource,
  } = props;

  const boxShadow = getElevationClasses('2');

  // create portal on editor page, so that it clears when the component unmounts
  const beamEditorPage = document.getElementById('beam-editor_feed_page');

  return (
    <Portal targetNode={beamEditorPage}>
      <Stack
        padding="p-0"
        background={{ light: 'white', dark: 'grey3' }}
        customStyle={`absolute -top-[9999px] -left-[9999px] z-50 rounded-[0.5rem] border(grey8 dark:grey8) ${boxShadow} overflow-auto ${`max-h-[${PROFILE_AVATAR_HEIGHT * MAX_MENTIONS_DISPLAY}px]`} ${customStyle}`}
        ref={ref}
      >
        {values.length === 0 && (
          <Card customStyle="py-2 px-4" type="plain">
            <Text variant="body2" align="start" color={{ light: 'grey4', dark: 'grey6' }}>
              {noMentionsLabel}
            </Text>
          </Card>
        )}
        {values.length > 0 &&
          values.map((value, i) => (
            <Button
              key={i}
              plain={true}
              onClick={() => {
                handleSelect(i);
              }}
              onMouseEnter={() => {
                setIndex(i);
              }}
              hover={true}
              customStyle={`px-4 py-2 h-[${PROFILE_AVATAR_HEIGHT}px]`}
            >
              <ProfileAvatarButton
                label={value.name}
                avatar={transformSource(value?.avatar?.default)}
                alternativeAvatars={value?.avatar?.alternatives?.map(alternative =>
                  transformSource(alternative),
                )}
                profileId={value.did.id}
              />
            </Button>
          ))}
      </Stack>
    </Portal>
  );
});
