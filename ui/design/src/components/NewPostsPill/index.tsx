import * as React from 'react';
import { Box, Text } from 'grommet';

import Icon from '../Icon';
import StackedAvatar from '../StackedAvatar';
import { IProfileData } from '@akashaorg/typings/ui';

export interface INewPostsPill {
  infoLabel?: string;
  handleDismiss?: () => void;
  userData: { ethAddress: string; avatar?: IProfileData['avatar'] }[];
}

const NewPostsPill: React.FC<INewPostsPill> = props => {
  const { infoLabel, handleDismiss, userData } = props;
  return (
    <Box
      direction="row"
      gap="small"
      pad="small"
      round="large"
      fill="horizontal"
      width={{ max: '17rem' }}
      align="center"
      justify="center"
      border={{ side: 'all', color: 'border' }}
    >
      <StackedAvatar userData={userData} maxAvatars={3} />
      <Text color="accentText">{infoLabel}</Text>
      <Icon type="arrowUp" onClick={handleDismiss} clickable={true} accentColor={true} />
    </Box>
  );
};

NewPostsPill.defaultProps = {
  infoLabel: 'New posts recently published',
};

export default NewPostsPill;
