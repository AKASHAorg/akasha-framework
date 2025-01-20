import React, { MouseEventHandler } from 'react';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import { ExclamationTriangleIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';

export type BlockError = {
  errorTitle: string;
  errorDescription: string;
};

type BlockErrorCardProps = BlockError & {
  refreshLabel?: string;
  onRefresh?: MouseEventHandler<HTMLButtonElement>;
};

export const BlockErrorCard: React.FC<BlockErrorCardProps> = props => {
  const { errorTitle, errorDescription, refreshLabel, onRefresh } = props;
  return (
    <Stack direction="row">
      <Stack
        background={{ light: 'errorLight', dark: 'errorDark' }}
        customStyle="w-2.5 rounded-l-[0.5rem] border border(errorLight dark:errorDark)"
      />
      <Stack
        spacing="gap-y-1"
        padding="p-2"
        background={{ light: 'errorLight/30', dark: 'errorDark/30' }}
        customStyle="rounded-r-[0.5rem] border border(errorLight dark:errorDark)"
        fullWidth
      >
        <Stack direction="row" align="center" spacing="gap-x-1">
          <Icon icon={<ExclamationTriangleIcon />} color="error" />
          <Text variant="button-md">{errorTitle}</Text>
        </Stack>
        <Text variant="footnotes2" weight="normal" customStyle="pl-6">
          {errorDescription}
        </Text>
        {refreshLabel && (
          <Button
            variant="text"
            size="md"
            label={refreshLabel}
            onClick={onRefresh}
            customStyle="ml-auto mt-auto"
          />
        )}
      </Stack>
    </Stack>
  );
};
