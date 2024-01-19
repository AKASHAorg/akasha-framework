import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card, { TCardProps } from '@akashaorg/design-system-core/lib/components/Card';

const meta: Meta<React.FC<TCardProps>> = {
  title: 'DSCore/Cards/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<TCardProps>;

const CardContents = (
  <>
    <div>Card content</div>
    <div>Card content</div>
    <div>Card content</div>
  </>
);

export const BaseCard: Story = {
  render: () => <Card customStyle="w-[25%]">{CardContents}</Card>,
};

export const CardWithElevation: Story = {
  render: () => (
    <Card elevation="2" customStyle="w-[25%]">
      {CardContents}
    </Card>
  ),
};

export const CardWithDashedBorder: Story = {
  render: () => (
    <Card dashedBorder={true} customStyle="w-[25%]">
      {CardContents}
    </Card>
  ),
};
