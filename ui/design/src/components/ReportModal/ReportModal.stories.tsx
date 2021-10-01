import React from 'react';
import { Box, Grommet } from 'grommet';

import ReportModal from '.';
import { IReportModalProps } from './report-modal';

import lightTheme from '../../styles/themes/light/light-theme';
import Icon from '../Icon';
import ReportSuccessModal, { IReportSuccessModalProps } from './report-success-modal';

export default {
  title: 'Modals/ReportModal',
  component: ReportModal,
  argTypes: {
    titleLabel: { control: 'text' },
    successTitleLabel: { control: 'text' },
    successMessageLabel: { control: 'text' },
    optionsTitleLabel: { control: 'text' },
    optionLabels: [{ control: 'text' }],
    optionValues: [{ control: 'text' }],
    descriptionLabel: { control: 'text' },
    descriptionPlaceholder: { control: 'text' },
    footerText1Label: { control: 'text' },
    footerLink1Label: { control: 'text' },
    footerUrl1: { control: 'text' },
    footerText2Label: { control: 'text' },
    footerLink2Label: { control: 'text' },
    footerUrl2: { control: 'text' },
    cancelLabel: { control: 'text' },
    reportLabel: { control: 'text' },
    blockLabel: { control: 'text' },
    closeLabel: { control: 'text' },
    requesting: { control: 'boolean' },
    success: { control: 'boolean' },

    closeModal: { action: 'modal closed' },
  },
};

const Template = (args: IReportModalProps) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Grommet theme={lightTheme}>
      <Box fill={true} justify="center" align="center">
        <Icon
          type="eye"
          onClick={() => {
            setModalOpen(true);
          }}
        />
        {modalOpen && <ReportModal {...args} closeModal={() => setModalOpen(false)} />}
      </Box>
    </Grommet>
  );
};

const Template2 = (args: IReportSuccessModalProps) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Grommet theme={lightTheme}>
      <Box fill={true} justify="center" align="center">
        <Icon
          type="eye"
          onClick={() => {
            setModalOpen(true);
          }}
        />
        {modalOpen && <ReportSuccessModal {...args} closeModal={() => setModalOpen(false)} />}
      </Box>
    </Grommet>
  );
};

export const BaseReportModal = Template.bind({});

BaseReportModal.args = {
  titleLabel: 'Report a Post',
  successTitleLabel: 'Thank you for helping us keep Ethereum World safe! 🙌',
  successMessageLabel: 'We will investigate this post and take appropriate action.',
  optionsTitleLabel: 'Please select a reason',
  optionLabels: [
    'Suspicious, deceptive, or spam',
    'Abusive or harmful to others',
    'Self-harm or suicide',
    'Illegal',
    'Nudity',
    'Violence',
  ],
  optionValues: [
    'Suspicious, deceptive, or spam',
    'Abusive or harmful to others',
    'Self-harm or suicide',
    'Illegal',
    'Nudity',
    'Violence',
  ],
  descriptionLabel: 'Explanation',
  descriptionPlaceholder: 'Please explain your reason(s)',
  footerText1Label: 'If you are unsure, you can refer to our',
  footerLink1Label: 'Code of Conduct',
  footerUrl1: 'https://akasha.ethereum.world/legal/code-of-conduct',
  footerText2Label: 'and',
  footerLink2Label: 'Terms of Service',
  footerUrl2: 'https://akasha.ethereum.world/legal/terms-of-service',
  cancelLabel: 'Cancel',
  reportLabel: 'Report',
  blockLabel: 'Block User',
  closeLabel: 'Close',
  requesting: false,
  success: false,
};

export const BaseReportSuccessModal = Template2.bind({});

BaseReportSuccessModal.args = {
  successTitleLabel: 'Thank you for helping us keep Ethereum World safe! 🙌',
  successMessageLabel: 'We will investigate this post and take appropriate action.',
  blockLabel: 'Block User',
  closeLabel: 'Close',
};
