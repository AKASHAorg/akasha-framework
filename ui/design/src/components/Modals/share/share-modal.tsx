import { Box, Text } from 'grommet';
import * as React from 'react';
import { Button } from '../../Buttons/index';
import { Icon } from '../../Icon/index';
import { StyledLayer } from '../common/styled-modal';
import { StyledIconDiv, StyledShareSocialDiv, StyledTextInput } from './styled-share-modal';

export interface IShareModal {
  className?: string;
  link: string;
  closeModal: () => void;
  copyLabel?: string;
  shareTitleLabel?: string;
  shareSubtitleLabel?: string;
  shareSocialLabel?: string;
}

const socialApps = [
  { name: 'twitter', link: 'https://twitter.com/' },
  { name: 'reddit', link: 'https://www.reddit.com/' },
  { name: 'facebook', link: 'https://www.facebook.com/' },
];

const ShareModal: React.FC<IShareModal> = props => {
  const {
    closeModal,
    link,
    className,
    copyLabel,
    shareTitleLabel,
    shareSubtitleLabel,
    shareSocialLabel,
  } = props;

  const linkRef: React.Ref<any> = React.useRef(null);

  const handleCopyLink = () => {
    linkRef?.current.select();
    document.execCommand('copy');
    closeModal();
  };

  const handleShareSocial = (url: string) => () => {
    // @TODO: add logic for social sharing
    window.open(url, '_blank');
    closeModal();
  };

  return (
    <StyledLayer onEsc={closeModal} onClickOutside={closeModal} modal={true} className={className}>
      <Box direction="column" align="center" justify="evenly" pad="large" gap="medium">
        <Text size="large" weight="bold">
          {shareTitleLabel}
        </Text>
        {shareSubtitleLabel && <Text color="secondaryText">{shareSubtitleLabel}</Text>}
        <Box
          fill="horizontal"
          direction="row"
          align="center"
          pad={{ horizontal: 'xxsmall', vertical: 'xxsmall' }}
          round="small"
          border={{
            side: 'all',
            color: 'border',
          }}
        >
          <StyledIconDiv>
            <Icon type="link" />
          </StyledIconDiv>
          <StyledTextInput plain={true} readOnly={true} ref={linkRef} value={link} size="medium" />
          <Button label={copyLabel} onClick={handleCopyLink} primary={true} />
        </Box>
        <Text color="secondaryText">{shareSocialLabel}</Text>
        <Box direction="row" align="center" justify="center" gap="xsmall">
          {socialApps.map((app, index) => (
            <StyledShareSocialDiv key={index}>
              <Icon type={app.name} onClick={handleShareSocial(app.link)} color="white" />
            </StyledShareSocialDiv>
          ))}
        </Box>
      </Box>
    </StyledLayer>
  );
};

ShareModal.defaultProps = {
  copyLabel: 'Copy',
  shareTitleLabel: 'Share',
  shareSubtitleLabel: '',
  shareSocialLabel: 'Or share it on',
};

export default ShareModal;
