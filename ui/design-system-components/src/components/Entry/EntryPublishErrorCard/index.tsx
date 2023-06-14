import * as React from 'react';
import { tw } from '@twind/core';
import EntryLoadingPlaceholder from '../EntryCardLoading';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';

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
          `absolute inset-2 p-2 border(dashed secondaryLight dark:secondaryDark) rounded-lg flex justify-center items-center`,
        )}
      >
        <Icon type="Square3Stack3DIcon" color="#8b9FFF" />
        {props.message}
        <div>{props.children}</div>
      </div>
    </EntryLoadingPlaceholder>
  );
};

export default EntryPublishErrorCard;