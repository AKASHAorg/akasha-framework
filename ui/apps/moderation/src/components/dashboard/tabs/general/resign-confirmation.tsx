import React from 'react';

import BasicCardBox from '@akashaorg/design-system-core/lib/components/BasicCardBox';
import Box from '@akashaorg/design-system-core/lib/components/Box';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';

import Text from '@akashaorg/design-system-core/lib/components/Text';

export type IResignConfirmationProps = {
  titleLabel: string;
  subtitleLabel: string;
  assetName?: string;
  onCloseButtonClick: () => void;
};

const ResignConfirmation: React.FC<IResignConfirmationProps> = props => {
  const { titleLabel, subtitleLabel, onCloseButtonClick } = props;

  return (
    <BasicCardBox pad="p-5">
      <Box customStyle="self-end">
        <Button plain={true} onClick={onCloseButtonClick}>
          <Icon type="XMarkIcon" />
        </Button>
      </Box>
      <Box customStyle="flex flex-col items-center space-y-6">
        <Text variant="h5" align="center">
          {titleLabel}
        </Text>
        <Box customStyle="w-36 h-36 rounded-xl bg(grey7 dark:grey5)" />
        <Text variant="footnotes2" align="center">
          {subtitleLabel}
        </Text>
      </Box>
    </BasicCardBox>
  );
};

export default ResignConfirmation;