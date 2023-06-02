import React from 'react';

import BasicCardBox from '@akashaorg/design-system-core/lib/components/BasicCardBox';
import Box from '@akashaorg/design-system-core/lib/components/Box';
import Divider from '@akashaorg/design-system-core/lib/components/Divider';
import Table, { ITableProps } from '@akashaorg/design-system-core/lib/components/Table';
import Text from '@akashaorg/design-system-core/lib/components/Text';

export type IModerationActivityProps = ITableProps & {
  label: string;
};

const ModerationActivity: React.FC<IModerationActivityProps> = props => {
  const { label } = props;

  return (
    <BasicCardBox pad="pt-0 px-0 pb-2">
      <Box customStyle="px-4 py-6">
        <Text variant="h5" align="center">
          {label}
        </Text>
      </Box>

      <Divider />

      <Table {...props} />
    </BasicCardBox>
  );
};

export default ModerationActivity;