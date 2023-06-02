import React from 'react';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import AvatarBlock from '@akashaorg/design-system-core/lib/components/AvatarBlock';
import Divider from '@akashaorg/design-system-core/lib/components/Divider';
import AppList, { AppListProp } from '../AppList';
import { Developer } from '../types/common.types';

export type DevInfoProps = {
  developerTitle: string;
  developers: Developer[];
  apps: AppListProp['apps'];
};

const DevInfo: React.FC<DevInfoProps> = ({ developerTitle, developers, apps }) => {
  return (
    <Card elevation="1" padding={16} radius={20}>
      <Stack direction="column" spacing="gap-y-2">
        <Text variant="h5">{developerTitle}</Text>
        {developers.map(developer => (
          <Stack key={developer.profileId} direction="column" spacing="gap-y-2">
            <AvatarBlock {...developer} />
            <Divider />
            <AppList apps={apps} />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default DevInfo;