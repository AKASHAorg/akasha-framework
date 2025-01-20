import React from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import {
  Caption,
  AlignCenter,
  AlignLeft,
  AlignRight,
} from '@akashaorg/design-system-core/lib/components/Icon/akasha-icons';
import {
  PencilIcon,
  PlusIcon,
} from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';

export type ImageBlockToolbar = {
  handleCaptionClick: () => void;
  handleLeftAlignClick: () => void;
  handleCenterAlignClick: () => void;
  handleRightAlignClick: () => void;
  handleEditClick: () => void;
  handleAddClick: () => void;
  showCaption: boolean;
  alignState: 'start' | 'center' | 'end';
};

/**
 * Component used in the image editor content block to align images, add captions
and add/edit images
 * @param alignState - flexbox alignment state
 */
const ImageBlockToolbar: React.FC<ImageBlockToolbar> = props => {
  const {
    handleCaptionClick,
    handleLeftAlignClick,
    handleCenterAlignClick,
    handleRightAlignClick,
    handleEditClick,
    handleAddClick,
    showCaption,
    alignState,
  } = props;
  return (
    <Stack direction="row" justify="between">
      <Stack direction="row">
        <button onClick={handleCaptionClick}>
          <Stack
            align="center"
            justify="center"
            customStyle="relative w-8 h-8 rounded-l-[0.125rem]"
            background={
              showCaption
                ? { light: 'secondaryLight/30', dark: 'grey7' }
                : { light: 'grey8', dark: 'grey5' }
            }
          >
            <Icon size="lg" icon={<Caption />} customStyle="absolute" accentColor />
          </Stack>
        </button>
        <button onClick={handleLeftAlignClick}>
          <Stack
            align="center"
            justify="center"
            customStyle="relative w-8 h-8"
            background={
              alignState === 'start'
                ? { light: 'secondaryLight/30', dark: 'grey7' }
                : { light: 'grey8', dark: 'grey5' }
            }
          >
            <Icon size="lg" icon={<AlignLeft />} customStyle="absolute" accentColor />
          </Stack>
        </button>
        <button onClick={handleCenterAlignClick}>
          <Stack
            align="center"
            justify="center"
            customStyle="relative w-8 h-8"
            background={
              alignState === 'center'
                ? { light: 'secondaryLight/30', dark: 'grey7' }
                : { light: 'grey8', dark: 'grey5' }
            }
          >
            <Icon size="lg" icon={<AlignCenter />} customStyle="absolute" accentColor />
          </Stack>
        </button>
        <button onClick={handleRightAlignClick}>
          <Stack
            align="center"
            justify="center"
            customStyle="relative w-8 h-8 rounded-r-[0.125rem]"
            background={
              alignState === 'end'
                ? { light: 'secondaryLight/30', dark: 'grey7' }
                : { light: 'grey8', dark: 'grey5' }
            }
          >
            <Icon size="lg" icon={<AlignRight />} customStyle="absolute" accentColor />
          </Stack>
        </button>
      </Stack>
      <Stack direction="row" spacing="gap-2">
        <button onClick={handleEditClick}>
          <Stack
            align="center"
            justify="center"
            customStyle={'h-8 w-8 group relative rounded-full bg(grey9 dark:grey5)'}
          >
            <Icon size="md" icon={<PencilIcon />} accentColor />
          </Stack>
        </button>
        <button onClick={handleAddClick}>
          <Stack
            align="center"
            justify="center"
            customStyle={'h-8 w-8 group relative rounded-full bg(grey9 dark:grey5)'}
          >
            <Icon size="md" icon={<PlusIcon />} accentColor />
          </Stack>
        </button>
      </Stack>
    </Stack>
  );
};

export default ImageBlockToolbar;
