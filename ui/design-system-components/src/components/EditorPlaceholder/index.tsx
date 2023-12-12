import React from 'react';
import { tw } from '@twind/core';
import Avatar from '@akashaorg/design-system-core/lib/components/Avatar';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import type { Image, Profile } from '@akashaorg/typings/lib/ui';

export type EditorPlaceholderType = {
  avatar?: Profile['avatar'];
  profileId: string | null;
  placeholderLabel?: string;
  actionLabel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  transformSource: (src: Image) => Image;
};

const EditorPlaceholder: React.FC<EditorPlaceholderType> = props => {
  const { avatar, profileId, placeholderLabel, actionLabel, onClick, transformSource } = props;
  return (
    <Card border={true} padding={0} background={{ light: 'grey9', dark: 'grey3' }}>
      <div className={tw(`flex justify-between p-4 `)}>
        <div className={tw(`flex flex-row items-center gap-4`)}>
          <Avatar
            avatar={transformSource(avatar?.default)}
            alternativeAvatars={avatar?.alternatives?.map(alternative =>
              transformSource(alternative),
            )}
            profileId={profileId}
            size="sm"
          />
          <Text variant="subtitle2" truncate={true}>
            {placeholderLabel}
          </Text>
        </div>

        <Button variant="primary" label={actionLabel} size="sm" onClick={onClick} />
      </div>
    </Card>
  );
};

EditorPlaceholder.defaultProps = {
  placeholderLabel: 'From Your Mind to the World 🧠 🌏 ✨',
};

export default EditorPlaceholder;
