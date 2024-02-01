import React from 'react';
import { tw } from '@twind/core';

import Anchor from '@akashaorg/design-system-core/lib/components/Anchor';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import Text from '@akashaorg/design-system-core/lib/components/Text';

export type OverviewCTA = {
  label: string;
  url: string;
  icon?: React.ReactElement;
};

export type ModerationIntroCardProps = {
  assetName?: string;
  assetExtension?: string;
  titleLabel: string;
  introLabel: string;
  subtitleLabel: string;
  publicImgPath?: string;
  codeOfConductLabel: string;
  overviewCTAArr: OverviewCTA[];
  onCodeOfConductClick?: () => void;
};

const ModerationIntroCard: React.FC<ModerationIntroCardProps> = props => {
  const {
    assetName = 'vibe-overview',
    titleLabel,
    introLabel,
    subtitleLabel,
    assetExtension = 'webp',
    publicImgPath = '/images',
    codeOfConductLabel,
    overviewCTAArr,
    onCodeOfConductClick,
  } = props;

  return (
    <Card padding={16}>
      <Stack spacing="gap-4" customStyle="grid grid-cols-1">
        <Text variant="h5" align="center">
          {titleLabel}
        </Text>

        <Stack customStyle="w-40 h-40 my-2 mx-auto">
          <img
            className={tw('object-contain')}
            aria-label={assetName}
            src={`${publicImgPath}/${assetName}.${assetExtension}`}
            alt={assetName}
            data-testid={`${assetName}-image`}
          />
        </Stack>

        {introLabel && (
          <Text weight="bold" align="center">
            {introLabel}
          </Text>
        )}

        <Stack justify="center" spacing="gap-y-1">
          {subtitleLabel && (
            <Text variant="subtitle2" align="center">
              {subtitleLabel}
            </Text>
          )}

          {codeOfConductLabel && (
            <Button plain={true} onClick={onCodeOfConductClick}>
              <Text
                variant="subtitle2"
                color={{ light: 'secondaryLight', dark: 'secondaryDark' }}
                weight="bold"
                align="center"
                customStyle="cursor-pointer"
              >
                {codeOfConductLabel}
              </Text>
            </Button>
          )}
        </Stack>

        {overviewCTAArr && overviewCTAArr.length > 0 && (
          <Stack
            direction={codeOfConductLabel ? 'row' : 'column'}
            justify="between"
            customStyle="md:px-20"
            {...(!codeOfConductLabel && { spacing: 'gap-y-4' })}
          >
            {overviewCTAArr.map(({ url, label, icon }) => (
              <Stack
                key={label + icon}
                customStyle={codeOfConductLabel ? 'grid gap-1 grid-cols-1 w-[30%]' : ''}
              >
                {icon && (
                  <Icon size="sm" accentColor={true} icon={icon} customStyle="mx-auto my-0" />
                )}

                <Anchor
                  href={url}
                  dataTestId={`${label}-link`}
                  customStyle="text-sm text-center font-bold"
                >
                  {label}
                </Anchor>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default ModerationIntroCard;
