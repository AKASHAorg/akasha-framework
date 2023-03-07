import * as React from 'react';
import { tw } from '@twind/core';
import DS from '@akashaorg/design-system-core';

const { Icon, Text } = DS;

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
      className={tw(
        `flex mb-1 rounded-lg border border-dashed ${
          delistedAccount && 'border-color(error-light dark:error-dark)'
        }`,
      )}
    >
      <div className={tw(`flex flex-row items-start p-4`)}>
        <Icon type={delistedAccount ? 'NoSymbolIcon' : 'ExclamationTriangleIcon'} />
        {reportedAccount && (
          <Text variant={'h4'}>
            {`${headerTextLabel}:`}
            {reason.length > 0 && (
              <div className={tw(`flex w-fit mb-2 px-[0.2rem] rounded-xs bg-secondary/10`)}>
                <Text color={'secondary'} weight={'bold'}>
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
                <Text color={'secondary'} weight={'bold'}>
                  {reason}
                </Text>
              </div>
            )}
            {footerTextLabel && footerTextLabel}
            {ctaLabel && (
              <div
                className={'cursor-pointer'}
                onClick={e => {
                  e.stopPropagation();
                  // open call to action url if specified
                  ctaUrl ? onCTAClick() : handleFlipCard();
                }}
              >
                <Text variant={'h4'} color={'text-secondary'}>
                  {ctaLabel}
                </Text>
              </div>
            )}
          </Text>
        )}
      </div>
    </div>
  );
};

export { EntryCardHidden };
