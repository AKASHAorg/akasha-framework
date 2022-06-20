import { Box, Text, ThemeContext } from 'grommet';
import * as React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../ListModal/styled-modal';
import Icon from '../Icon';
import { ModalRenderer } from '../SignInModal/modal-renderer';

const StyledBox = styled(Box)`
  width: calc(100% - 1rem);
  position: fixed;
  bottom: 1rem;
  left: 0.5rem;
`;

export interface IMobileListModal {
  className?: string;
  cancelLabel?: string;
  closeModal: () => void;
  menuItems: IMenuItem[];
  headerMenuExt?: React.ReactElement;
  modalSlotId: string;
}

export interface IMenuItem {
  label?: string;
  icon?: string;
  iconColor?: string;
  plain?: boolean;
  handler?: (arg1?: React.SyntheticEvent) => void;
  disabled?: boolean;
}

const MobileListModal: React.FC<IMobileListModal> = props => {
  const { closeModal, menuItems, cancelLabel, modalSlotId } = props;

  const theme: any = React.useContext(ThemeContext);

  const redIcons = ['report', 'trash', 'block'];

  return (
    <ModalRenderer slotId={modalSlotId}>
      <ModalWrapper isTransparent={true} onClick={closeModal} zIndex={9999}>
        <StyledBox>
          <Box align="center" round="small" margin={{ bottom: 'medium' }}>
            {!!props.headerMenuExt &&
              React.cloneElement(props.headerMenuExt, { onWrapperClick: closeModal })}
            {menuItems.map((menuItem, index) => (
              <Box
                round={
                  menuItems.length === 1
                    ? 'small'
                    : index === 0
                    ? { corner: 'top', size: 'small' }
                    : index === menuItems.length - 1
                    ? { corner: 'bottom', size: 'small' }
                    : undefined
                }
                border={
                  index < menuItems.length - 1 && {
                    color: 'border',
                    size: 'xsmall',
                    style: 'solid',
                    side: 'bottom',
                  }
                }
                key={index}
                onClick={menuItem.disabled ? undefined : menuItem.handler}
                align="center"
                pad="medium"
                fill="horizontal"
                background="background"
              >
                <Box align="center" direction="row">
                  {menuItem.icon && (
                    <Icon
                      disabled={menuItem.disabled}
                      type={menuItem.icon}
                      size="md"
                      clickable={false}
                      color={
                        menuItem.icon && redIcons.includes(menuItem.icon)
                          ? theme.colors.errorText
                          : theme.colors.primaryText
                      }
                    />
                  )}
                  <Text
                    size="xlarge"
                    margin={{ left: 'xsmall' }}
                    color={
                      menuItem.icon && redIcons.includes(menuItem.icon)
                        ? 'errorText'
                        : 'primaryText'
                    }
                  >
                    {menuItem.label}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            pad="medium"
            onClick={closeModal}
            align="center"
            justify="center"
            round="small"
            background="background"
          >
            <Text color="secondaryText" size="xlarge">
              {cancelLabel}
            </Text>
          </Box>
        </StyledBox>
      </ModalWrapper>
    </ModalRenderer>
  );
};

MobileListModal.defaultProps = {
  cancelLabel: 'Cancel',
};

export default MobileListModal;
