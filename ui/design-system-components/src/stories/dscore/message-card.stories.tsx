import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import MessageCard, {
  MessageCardProps,
} from '@akashaorg/design-system-core/lib/components/MessageCard';

const meta: Meta<MessageCardProps> = {
  title: 'DSCore/Cards/MessageCard',
  component: MessageCard,
};

export default meta;
type Story = StoryObj<MessageCardProps>;

export const BaseMessageCard: Story = {
  render: () => (
    <MessageCard title="Title" elevation="1" message="A sample message ..." onClose={() => ({})} />
  ),
};