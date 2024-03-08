import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import { ApplicantDataCard, ApplicationDetail } from '../components/applications/application';
import { generateApplicationData, generateModeratorApplicationHistory } from '../utils';
import routes, { APPLICATIONS } from '../routes';

export type ApplicationDetailProp = {
  applicationId: string;
};

export const ApplicationDetailPage: React.FC<ApplicationDetailProp> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('vibes-console');

  const handleClickViewProfile = () => {
    navigate({
      to: routes[APPLICATIONS],
    });
  };

  const applicationData = generateApplicationData();
  const applicant = generateModeratorApplicationHistory()[0];

  return (
    <Stack spacing="gap-y-4">
      <ApplicantDataCard
        isMini={true}
        applicant={applicant}
        tenureInfoLabel={t('Member since')}
        appliedOnLabel={t('Applied on')}
        viewProfileLabel={t('View profile')}
        onClickViewProfile={handleClickViewProfile}
      />

      <ApplicationDetail
        label={t('Vibes Application')}
        sections={[
          {
            title: t('Application status'),
            description: t('{{description}}', { description: applicationData.description }),
            reason: applicationData.reason,
            status: applicationData.status,
          },
          {
            title: t('Applied on'),
            ...(applicationData.status === 'pending' && {
              description: t(
                "You can't modify your application but you can withdraw it and re-apply.",
              ),
            }),
            applicationDate: new Date('2024-02-07'),
          },
          ...(applicationData.status !== 'pending'
            ? [
                {
                  title: t('Resolved on'),
                  applicationDate: new Date(),
                },
              ]
            : []),
        ]}
        {...(applicationData.status === 'pending' && {
          cancelButtonLabel: t('Withdraw Application'),
          cancelButtonVariant: 'secondary',
          onCancelButtonClick: () => {
            /** */
          },
        })}
      />
    </Stack>
  );
};
