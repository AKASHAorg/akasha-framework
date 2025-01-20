import * as React from 'react';
import { tw } from '@twind/core';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import { RssIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';

export interface ITagButton {
  tagName: string;
  isSubscribed?: boolean;
  onClickTag?: () => void;
}

export const TagButton: React.FC<ITagButton> = props => {
  const { tagName, isSubscribed, onClickTag } = props;
  const bgClass = isSubscribed
    ? 'secondaryLight dark:secondaryDark'
    : 'secondaryLight/60 dark:secondaryDark/60';
  const flexClass = ' flex flex-row items-center justify-center';
  return (
    <button
      className={tw(
        `max-w-[150px] border(grey8 dark:grey3) rounded-[0.5rem] px-4 py-1 gap-2 ${bgClass} ${flexClass}`,
      )}
      onClick={onClickTag}
    >
      <Text truncate={true}>{tagName}</Text>
      <Icon icon={<RssIcon />} />
    </button>
  );
};
