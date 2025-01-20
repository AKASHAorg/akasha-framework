import * as React from 'react';
import { tw } from '@twind/core';
import EntryLoadingPlaceholder from '../EntryCardLoading';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import { Square3Stack3DIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';

export interface PublishErrorCardProps {
  style?: React.CSSProperties;
  isCard?: boolean;
  message: string;
  children?: React.ReactNode;
}

const EntryPublishErrorCard: React.FC<PublishErrorCardProps> = props => {
  return (
    <EntryLoadingPlaceholder>
      <div
        className={tw(
          `absolute inset-2 p-2 border(dashed secondaryLight dark:secondaryDark) rounded-[0.5rem] flex justify-center items-center`,
        )}
      >
        <Icon icon={<Square3Stack3DIcon />} color="grey1" />
        {props.message}
        <div>{props.children}</div>
      </div>
    </EntryLoadingPlaceholder>
  );
};

export default EntryPublishErrorCard;
