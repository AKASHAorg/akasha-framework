import type { Meta, StoryObj } from '@storybook/react';
import Image, { ImageProps } from '@akashaorg/design-system-core/lib/components/Image';

Image.displayName = 'Image';

const meta: Meta<ImageProps> = {
  title: 'DSCore/Images/Image',
  component: Image,
  argTypes: {
    src: { control: 'text' },
  },
};

type Story = StoryObj<ImageProps>;

export const Default: Story = { args: { src: 'https://placebeard.it/320x320' } };

export default meta;
