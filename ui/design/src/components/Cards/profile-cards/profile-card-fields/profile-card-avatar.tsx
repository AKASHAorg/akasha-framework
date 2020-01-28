import * as React from 'react';
import { Avatar } from '../../../Avatar/index';
import { SelectPopover } from '../../../Popovers/index';
import { IProfileDataProvider, IProfileProvidersData } from '../profile-card';
import { AvatarDiv, StyledAvatarEditDiv } from '../styled-profile-card';
import { EditFieldIcon } from './ edit-field-icon';

export interface IProfileCardAvatarProps {
  editable: boolean;
  avatar?: string;
  avatarIcon?: string;
  avatarPopoverOpen: boolean;
  setAvatarPopoverOpen: (value: boolean) => void;
  handleChangeAvatar: (provider: IProfileDataProvider) => void;
  profileProvidersData?: IProfileProvidersData;
  ethAddress: string;
}

const ProfileCardAvatar: React.FC<IProfileCardAvatarProps> = props => {
  const {
    editable,
    avatar,
    avatarIcon,
    avatarPopoverOpen,
    setAvatarPopoverOpen,
    profileProvidersData,
    ethAddress,
    handleChangeAvatar,
  } = props;

  const editAvatarRef: React.RefObject<HTMLDivElement> = React.useRef(null);

  return (
    <>
      <AvatarDiv>
        <Avatar size="xl" withBorder={true} ethAddress={ethAddress} src={avatar} />
        {editable && (
          <StyledAvatarEditDiv>
            <EditFieldIcon
              ref={editAvatarRef}
              popoverHandler={() => setAvatarPopoverOpen(true)}
              providerIcon={avatarIcon}
            />
          </StyledAvatarEditDiv>
        )}
      </AvatarDiv>
      {editAvatarRef.current &&
        avatarPopoverOpen &&
        profileProvidersData &&
        profileProvidersData.avatarProviders &&
        profileProvidersData.avatarProviders.length !== 0 && (
          <SelectPopover
            currentValue={avatar}
            target={editAvatarRef.current}
            dataSource={profileProvidersData.avatarProviders}
            onClickElem={handleChangeAvatar}
            closePopover={() => {
              setAvatarPopoverOpen(false);
            }}
          />
        )}
    </>
  );
};

export default ProfileCardAvatar;
