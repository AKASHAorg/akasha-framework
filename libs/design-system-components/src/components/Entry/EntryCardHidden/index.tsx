import * as React from 'react';
import { tw, tx } from '@twind/core';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import {
  NoSymbolIcon,
  ExclamationTriangleIcon,
} from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';

export interface IEntryCardHiddenProps {
  moderatedContentLabel?: string;
  ctaLabel?: string;
  isDelisted?: boolean;
  handleFlipCard?: () => void;
  // labels for reported account page
  delistedAccount?: boolean;
  reportedAccount?: boolean;
  // generic labels
  ctaUrl?: string;
  reason?: string;
  headerTextLabel?: string;
  footerTextLabel?: string;
  onCTAClick?: () => void;
}

const EntryCardHidden: React.FC<IEntryCardHiddenProps> = props => {
  const {
    moderatedContentLabel,
    ctaLabel,
    isDelisted,
    handleFlipCard,
    delistedAccount,
    reportedAccount,
    ctaUrl,
    reason,
    headerTextLabel,
    footerTextLabel,
    onCTAClick,
  } = props;

  return (
    <div
      className={tx(
        `flex mb-1 rounded-[0.5rem] border border-dashed ${
          delistedAccount && 'border-color(errorLight dark:errorDark)'
        }`,
      )}
    >
      <div className={tw(`flex flex-row items-start p-4`)}>
        <Icon icon={delistedAccount ? <NoSymbolIcon /> : <ExclamationTriangleIcon />} />
        {reportedAccount && (
          <Text variant={'h4'}>
            {`${headerTextLabel}:`}
            {reason.length > 0 && (
              <div className={tw(`flex w-fit mb-2 px-[0.2rem] rounded-xs bg-secondary/10`)}>
                <Text color={{ light: 'secondaryLight', dark: 'secondaryDark' }} weight={'bold'}>
                  {reason}
                </Text>
              </div>
            )}
            {footerTextLabel}
          </Text>
        )}
        {!reportedAccount && (
          <Text variant={'h4'}>
            {isDelisted && moderatedContentLabel}
            {headerTextLabel && `${headerTextLabel}:`}
            {reason && reason.length > 0 && (
              <div className={tw(`flex w-fit mb-2 px-[0.2rem] rounded-xs bg-secondary/10`)}>
                <Text color={{ light: 'secondaryLight', dark: 'secondaryDark' }} weight={'bold'}>
                  {reason}
                </Text>
              </div>
            )}
            {footerTextLabel && footerTextLabel}
            {ctaLabel && (
              <Button
                plain={true}
                onClick={e => {
                  e.stopPropagation();
                  // open call to action url if specified
                  ctaUrl ? onCTAClick() : handleFlipCard();
                }}
              >
                <Text variant={'h4'} color={{ light: 'secondaryLight', dark: 'secondaryDark' }}>
                  {ctaLabel}
                </Text>
              </Button>
            )}
          </Text>
        )}
      </div>
    </div>
  );
};

export default EntryCardHidden;
