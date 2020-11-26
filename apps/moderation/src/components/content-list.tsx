import React from 'react';
import { useTranslation } from 'react-i18next';
import DS from '@akashaproject/design-system';

import ContentCard from './content-card';
import { ILocale } from '@akashaproject/design-system/lib/utils/time';

import { samplePostData, sampleContentCardData, sampleProfileData } from '../services/dummy-data';

const { Box, useViewportSize, ModalRenderer, ToastProvider, ModerateModal } = DS;

interface IContentListProps {
  slotId: string;
}

const ContentList: React.FC<IContentListProps> = props => {
  const { slotId } = props;

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [actionType, setActionType] = React.useState<string>('Delist');
  const [contentType, setContentType] = React.useState<string>('Delist');
  const [flagged, setFlagged] = React.useState<string>('');
  const [preselectedReasons, setPreselectedReasons] = React.useState<string[]>([]);
  const [flaggedItemData, setFlaggedItemData] = React.useState<any>({});

  const { t, i18n } = useTranslation();
  const locale = (i18n.languages[0] || 'en') as ILocale;
  const { size } = useViewportSize();

  // @TODO: Get logged ethAddress from Store state

  const handleButtonClick = (
    entryId: string,
    action: string,
    content: string,
    reasons: string[],
    item: any,
  ) => {
    setFlagged(entryId);
    setModalOpen(true);
    setActionType(action);
    setContentType(content);
    setPreselectedReasons(reasons);
    setFlaggedItemData(item);
  };

  return (
    <Box>
      <ModalRenderer slotId={slotId}>
        {modalOpen && (
          <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
            <ModerateModal
              titleLabel={t(
                `${
                  contentType === 'profile' && actionType === 'Delist' ? 'Remove' : actionType
                } a ${contentType}`,
              )}
              contentType={t(contentType)}
              optionsTitleLabel={t('Please select a reason')}
              optionLabels={[
                t('Suspicious, deceptive, or spam'),
                t('Abusive or harmful to others'),
                t('Self-harm or suicide'),
                t('Illegal'),
                t('Nudity'),
                t('Violence'),
              ]}
              preselectedReasons={preselectedReasons}
              flaggedItemData={flaggedItemData}
              repostsLabel={t('Repost')}
              repliesLabel={t('Replies')}
              locale={locale}
              descriptionLabel={t('Evaluation')}
              descriptionPlaceholder={
                actionType === 'Delist'
                  ? t('Please describe the issue')
                  : t('Please explain the reason(s)')
              }
              footerText1Label={t('If you are unsure, you can refer to our')}
              footerLink1Label={t('Code of Conduct')}
              footerUrl1={'https://akasha.slab.com/public/ethereum-world-code-of-conduct-e7ejzqoo'}
              footerText2Label={t('and')}
              footerLink2Label={t('Terms of Service')}
              footerUrl2={'https://ethereum.world/terms-of-service'}
              cancelLabel={t('Cancel')}
              reportLabel={t(actionType)}
              user={''}
              contentId={flagged}
              size={size}
              closeModal={() => {
                setModalOpen(false);
              }}
            />
          </ToastProvider>
        )}
      </ModalRenderer>
      {sampleContentCardData.map(post => (
        <ContentCard
          key={post.id}
          entryData={post.type === 'post' ? samplePostData : sampleProfileData}
          repostsLabel={t('Repost')}
          repliesLabel={t('Replies')}
          locale={locale}
          reportedLabel={t('Reported')}
          contentType={t(post.type)}
          forLabel={t('for')}
          additionalDescLabel={t('Additional description provided by user')}
          additionalDescContent={t(post.description)}
          reportedByLabel={t('Reported by')}
          ethAddress={t(post.ethAddress)}
          reasons={post.reasons.map(el => t(el))}
          reporterName={t(post.reporterName)}
          reporterENSName={t(post.reporterENSName)}
          reportedOnLabel={t('On')}
          dateTime={post.entryDate}
          keepContentLabel={
            post.type === 'post' ? t('Keep Post') : post.type === 'profile' ? t('Keep Profile') : ''
          }
          delistContentLabel={
            post.type === 'post'
              ? t('Delist Post')
              : post.type === 'profile'
              ? t('Remove Profile')
              : ''
          }
          handleButtonClick={handleButtonClick}
        />
      ))}
    </Box>
  );
};

export default ContentList;
