import React from 'react';

import Avatar from '@akashaorg/design-system-core/lib/components/Avatar';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import DidField from '@akashaorg/design-system-core/lib/components/DidField';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import Tooltip from '@akashaorg/design-system-core/lib/components/Tooltip';
import { formatDate, getModeratorStatusIndicator } from '../../utils';
import { Moderator } from '@akashaorg/typings/lib/ui';
import { ChevronRightIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';
import { transformSource } from '@akashaorg/ui-awf-hooks';

export type ModeratorDetailMiniCardProps = {
  moderator: Moderator;
  hasBorderBottom: boolean;
  tenureInfoLabel: string;
  onCardClick: (profileId: string) => void;
};

const ModeratorDetailMiniCard: React.FC<ModeratorDetailMiniCardProps> = props => {
  const { moderator, hasBorderBottom, tenureInfoLabel, onCardClick } = props;

  const borderBottomStyle = `${hasBorderBottom ? 'border(b-1 solid grey8 dark:grey3)' : ''}`;

  const textStyle = 'max-w([12.5rem] md:[7.5rem]) w-fit cursor-default';

  return (
    <Stack padding="py-4" direction="row" customStyle={`flex-none ${borderBottomStyle}`}>
      <Stack
        direction="row"
        spacing="gap-x-2"
        align="start"
        padding="px-4"
        customStyle=" w([50%] md:[35%]) border(r-1 solid grey8 dark:grey3)"
      >
        <Avatar
          avatar={transformSource(moderator?.avatar?.default)}
          alternativeAvatars={moderator?.avatar?.alternatives?.map(alternative =>
            transformSource(alternative),
          )}
        />
        <Stack>
          <Tooltip content={moderator.name} placement="right">
            <Text variant="body2" weight="bold" truncate={true} customStyle={textStyle}>
              {moderator.name}
            </Text>
          </Tooltip>

          <DidField did={moderator.did.id} />

          <Stack direction="row" align="center" spacing="gap-x-1.5">
            <Stack
              customStyle={`w-1.5 h-1.5 rounded-full ${getModeratorStatusIndicator(
                moderator.status,
              )}`}
            />
            <Text variant="button-md" weight="normal" customStyle="capitalize">
              {moderator.status}
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        padding="px-4"
        justify="between"
        align="center"
        customStyle="w([50%] md:[65%])"
      >
        <Stack>
          <Text variant="button-md" weight="normal" color={{ light: 'grey4', dark: 'grey7' }}>
            {tenureInfoLabel}:
          </Text>

          <Text variant="button-md" weight="normal" color={{ light: 'grey4', dark: 'grey7' }}>
            {moderator.status === 'active'
              ? formatDate(new Date(moderator.createdAt))
              : formatDate(moderator.moderatorEndDate)}
          </Text>
        </Stack>

        <Button plain={true} onClick={() => onCardClick(moderator.did.id)}>
          <Icon icon={<ChevronRightIcon />} accentColor={true} customStyle="justify-end" />
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModeratorDetailMiniCard;
