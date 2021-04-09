/* eslint-disable import/first */
import DS from '@akashaproject/design-system';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import {
  IFeedbackModalProps,
  IReportModalProps,
  ProfileCompletedModal,
} from '@akashaproject/design-system/lib/components/Modals';

const { Box, ShareModal, Icon, MobileListModal, ReportModal, FeedbackModal, ToastProvider } = DS;

const ShareModalComponent = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Box fill={true} justify="center" align="center">
      <Icon
        type="share"
        onClick={() => {
          setModalOpen(true);
        }}
      />
      {modalOpen && (
        <ShareModal
          handleProfileShare={() => null}
          link={text('Link', 'ethereum.world/gilbert')}
          closeModal={() => setModalOpen(false)}
          copyLabel="Copy"
          shareTitleLabel="Share the profile"
          shareSubtitleLabel="Share a profile by copying the link below"
          shareSocialLabel="Or share it on every social platform"
        />
      )}
    </Box>
  );
};

interface IMobileListModalProps {
  repostLabel: string;
  repostWithCommentLabel: string;
}

const MobileListModalComponent = ({
  repostLabel,
  repostWithCommentLabel,
}: IMobileListModalProps) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const menuItems = [
    {
      label: repostLabel,
      icon: 'transfer',
      handler: (e: any) => {
        e.stopPropagation();
      },
    },
    {
      label: repostWithCommentLabel,
      icon: 'edit',
      handler: (e: any) => {
        e.stopPropagation();
      },
    },
  ];

  return (
    <Box fill={true} justify="center" align="center">
      <Icon
        type="eye"
        onClick={() => {
          setModalOpen(true);
        }}
      />
      {modalOpen && (
        <MobileListModal
          menuItems={menuItems}
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}
    </Box>
  );
};

const ReportModalComponent = (props: Omit<IReportModalProps, 'closeModal' | 'width'>) => {
  const {
    titleLabel,
    successTitleLabel,
    successMessageLabel,
    optionsTitleLabel,
    optionLabels,
    optionValues,
    descriptionLabel,
    descriptionPlaceholder,
    footerText1Label,
    footerLink1Label,
    footerUrl1,
    cancelLabel,
    reportLabel,
    blockLabel,
    closeLabel,
  } = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Box fill={true} justify="center" align="center">
      <Icon
        type="eye"
        onClick={() => {
          setModalOpen(true);
        }}
      />
      {modalOpen && (
        <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
          <ReportModal
            titleLabel={titleLabel}
            successTitleLabel={successTitleLabel}
            successMessageLabel={successMessageLabel}
            optionsTitleLabel={optionsTitleLabel}
            optionLabels={optionLabels}
            optionValues={optionValues}
            descriptionLabel={descriptionLabel}
            descriptionPlaceholder={descriptionPlaceholder}
            footerText1Label={footerText1Label}
            footerLink1Label={footerLink1Label}
            footerUrl1={footerUrl1}
            cancelLabel={cancelLabel}
            reportLabel={reportLabel}
            blockLabel={blockLabel}
            closeLabel={closeLabel}
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        </ToastProvider>
      )}
    </Box>
  );
};

const FeedbackModalComponent = (props: IFeedbackModalProps) => {
  const {
    titleLabel,
    subtitleLabel,
    openAnIssueLabel,
    emailUsLabel,
    footerTextLabel,
    footerLinkText1Label,
    footerLinkText2Label,
    openIssueLink,
    emailUsLink,
    joinDiscordLink,
    closeModal,
  } = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    closeModal();
    setModalOpen(false);
  };

  return (
    <Box fill={true} justify="center" align="center">
      <Icon
        type="eye"
        onClick={() => {
          setModalOpen(true);
        }}
      />
      {modalOpen && (
        <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
          <FeedbackModal
            titleLabel={titleLabel}
            subtitleLabel={subtitleLabel}
            openAnIssueLabel={openAnIssueLabel}
            emailUsLabel={emailUsLabel}
            footerTextLabel={footerTextLabel}
            footerLinkText1Label={footerLinkText1Label}
            footerLinkText2Label={footerLinkText2Label}
            openIssueLink={openIssueLink}
            emailUsLink={emailUsLink}
            joinDiscordLink={joinDiscordLink}
            closeModal={handleCloseModal}
          />
        </ToastProvider>
      )}
    </Box>
  );
};

storiesOf('Modals/Share Modal', module).add('Share modal', () => <ShareModalComponent />);
storiesOf('Modals/List Modal', module).add('Mobile list modal', () => (
  <MobileListModalComponent
    repostLabel={text('Repost Label', 'Repost')}
    repostWithCommentLabel={text('Repost With Comment Label', 'Repost with comment')}
  />
));
storiesOf('Modals/Report Modal', module)
  .add('Report post modal', () => (
    <ReportModalComponent
      titleLabel={text('Title Label', 'Report a Post')}
      successTitleLabel={text(
        'Success Title Label',
        'Thank you for helping us keep Ethereum World safe! 🙌',
      )}
      successMessageLabel={text(
        'Success Content Label',
        'We will investigate this post and take appropriate action.',
      )}
      optionsTitleLabel={text('Subtitle Label', 'Please select a reason')}
      optionLabels={[
        text('Option 1 Label', 'Suspicious, deceptive, or spam'),
        text('Option 2 Label', 'Abusive or harmful to others'),
        text('Option 3 Label', 'Self-harm or suicide'),
        text('Option 4 Label', 'Illegal'),
        text('Option 5 Label', 'Nudity'),
        text('Option 6 Label', 'Violence'),
      ]}
      optionValues={[
        text('Option 1 Value', 'Suspicious, deceptive, or spam'),
        text('Option 2 Value', 'Abusive or harmful to others'),
        text('Option 3 Value', 'Self-harm or suicide'),
        text('Option 4 Value', 'Illegal'),
        text('Option 5 Value', 'Nudity'),
        text('Option 6 Value', 'Violence'),
      ]}
      descriptionLabel={text('Explanation Label', 'Explanation')}
      descriptionPlaceholder={text('Description Placeholder', 'Please explain your reason(s)')}
      footerText1Label={text('Footer Text 1 Label', 'If you are unsure, you can refer to our')}
      footerLink1Label={text('Footer Link 1 Label', 'Code of Conduct')}
      footerUrl1={text('Footer URL 1', 'https://ethereum.world/code-of-conduct')}
      cancelLabel={text('Cancel Label', 'Cancel')}
      reportLabel={text('Save Label', 'Report')}
      blockLabel={text('Block User Label', 'Block User')}
      closeLabel={text('Close Label', 'Close')}
    />
  ))
  .add('Report account modal', () => (
    <ReportModalComponent
      titleLabel={text('Title Label', 'Report an Account')}
      successTitleLabel={text(
        'Success Title Label',
        'Thank you for helping us keep Ethereum World safe! 🙌',
      )}
      successMessageLabel={text(
        'Success Content Label',
        'We will investigate this post and take appropriate action',
      )}
      optionsTitleLabel={text('Subtitle Label', 'Please select a reason')}
      optionLabels={[
        text('Option 1 Label', 'Suspicious, deceptive, or spam'),
        text('Option 2 Label', 'Abusive or harmful to others'),
        text('Option 3 Label', 'Self-harm or suicide'),
        text('Option 4 Label', 'Illegal'),
        text('Option 5 Label', 'Nudity'),
        text('Option 6 Label', 'Violence'),
      ]}
      optionValues={[
        text('Option 1 Value', 'Suspicious, deceptive, or spam'),
        text('Option 2 Value', 'Abusive or harmful to others'),
        text('Option 3 Value', 'Self-harm or suicide'),
        text('Option 4 Value', 'Illegal'),
        text('Option 5 Value', 'Nudity'),
        text('Option 6 Value', 'Violence'),
      ]}
      descriptionLabel={text('Explanation Label', 'Explanation')}
      descriptionPlaceholder={text('Description Placeholder', 'Please explain your reason(s)')}
      footerText1Label={text('Footer Text 1 Label', 'If you are unsure, you can refer to our')}
      footerLink1Label={text('Footer Link 1 Label', 'Code of Conduct')}
      footerUrl1={text('Footer URL 1', 'https://ethereum.world/code-of-conduct')}
      cancelLabel={text('Cancel Label', 'Cancel')}
      reportLabel={text('Save Label', 'Report')}
      blockLabel={text('Block User Label', 'Block User')}
      closeLabel={text('Close Label', 'Close')}
    />
  ));
storiesOf('Modals/Feeback Modal', module).add('Feedback modal', () => (
  <FeedbackModalComponent
    titleLabel={text('Title Label', "We'd love to hear your feedback!")}
    subtitleLabel={text('Subtitle Label', 'If you find any bugs or problems, please let us know')}
    openAnIssueLabel={text('Open An Issue Label', 'Open an Issue')}
    emailUsLabel={text('Email Us Label', 'Email Us')}
    footerTextLabel={text(
      'Footer Text Label',
      'Join our Discord channel to meet everyone, say "Hello!", provide feedback and share ideas.',
    )}
    footerLinkText1Label={text('Footer Link Text 1 Label', 'Join in')}
    footerLinkText2Label={text('Footer Link Text 2 Label', 'Discord')}
    openIssueLink={''}
    emailUsLink={''}
    joinDiscordLink={''}
    closeModal={() => action('Close Modal')('Synthetic Event')}
  />
));
storiesOf('Modals/Profile Completed Modal', module).add('Profile completed modal', () => (
  <ProfileCompletedModal
    titleLabel={text('Title Label', 'Welcome to the alpha!🙌')}
    subtitleLabel={text(
      'Subtitle Label',
      'So happy to see you! Thank you for being part of this adventure! 🚀',
    )}
    buttonLabel={text('Button Label', "Let's rock")}
    onClick={() => action('OnClick')('Synthetic Event')}
  />
));
