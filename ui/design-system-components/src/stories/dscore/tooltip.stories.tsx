import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import Tooltip, { TooltipProps } from '@akashaorg/design-system-core/lib/components/Tooltip';

const meta: Meta<TooltipProps> = {
  title: 'DSCore/Tooltip/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    arrow: { control: 'boolean' },
    open: { control: 'boolean' },
    centerArrowToReference: { control: 'boolean' },
    placement: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
  },
};

type Story = StoryObj<TooltipProps>;

const baseArgs: Story = {
  args: {
    content: 'some useful tip',
    placement: 'top',
    arrow: false,
    children: <Text>Hover to learn more</Text>,
    customStyle: 'm-16',
  },
};

export const Default: Story = {
  args: { ...baseArgs.args },
};

export const TooltipWithArrow: Story = {
  args: { ...baseArgs.args, arrow: true },
};

export const ControlledTooltip: Story = {
  args: { ...baseArgs.args, arrow: true, open: true },
};

export const CenterArrowToReferenceTooltip: Story = {
  args: {
    ...baseArgs.args,
    arrow: true,
    centerArrowToReference: true,
    placement: 'bottom',
    content: (
      <Text>
        I am a tooltip...
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
        <br />
        ...more content
      </Text>
    ),
  },
};

export default meta;
