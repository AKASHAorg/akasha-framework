import { Box } from 'grommet';
import * as React from 'react';
import { AppIcon, Icon } from '../../Icon/index';
import { SecondarySidebar } from './secondary-sidebar';
import {
  SidebarBox,
  StyledAppIconWrapper,
  StyledAppsContainer,
  StyledBottomDiv,
  StyledHiddenScrollContainer,
} from './styled-sidebar';
import { UserSection } from './user-section';

export interface ISidebarProps {
  ethAddress: string;
  avatarImage?: string;
  notifications?: INotification[];
  installedApps: IApp[];
  onClickOption: (option: string) => void;
  onClickAddApp: () => void;
}

export interface IApp {
  name: string;
  image?: string;
  ethAddress: string;
  options: string[];
}

export interface INotification {
  ethAddress: string;
  user?: string;
  userAvatar?: string;
  time: string;
  action: string;
}

const Sidebar: React.FC<ISidebarProps> = props => {
  const {
    avatarImage,
    ethAddress,
    notifications,
    installedApps,
    onClickAddApp,
    onClickOption,
  } = props;

  const [currentAppData, setCurrentAppData] = React.useState<{
    name: string;
    ethAddress: string;
    image?: string;
    options: string[];
    index: number;
  }>({
    name: '',
    ethAddress: '',
    image: '',
    options: [],
    index: 0,
  });

  const popoversRef: React.Ref<any> = React.useRef(installedApps?.map(() => React.createRef()));

  React.useEffect(() => {
    const firstAppData = { ...installedApps[0], index: 0 };
    setCurrentAppData(firstAppData);
  }, []);

  const handleAppIconClick = (app: IApp, index: number) => () => {
    const appData = { ...app, index };
    setCurrentAppData(appData);
  };

  const handleActiveBorder: any = (index: number) => {
    if (index === currentAppData.index) {
      return { color: 'accent', size: '2px', side: 'left' };
    }
    return { color: 'background', size: '2px', side: 'left' };
  };

  return (
    <Box fill="vertical" direction="row">
      <SidebarBox
        direction="column"
        align="center"
        border={{
          color: 'border',
          size: 'xsmall',
          style: 'solid',
          side: 'right',
        }}
      >
        <UserSection
          avatarImage={avatarImage}
          ethAddress={ethAddress}
          notifications={notifications}
        />
        <Box align="center" pad="xsmall" justify="between" fill={true}>
          <StyledAppsContainer>
            <StyledHiddenScrollContainer>
              {installedApps.map((app, index) => (
                <Box pad={{ vertical: 'small' }} key={index}>
                  <Box pad={{ horizontal: '0.8em' }} border={handleActiveBorder(index)}>
                    <StyledAppIconWrapper active={index === currentAppData.index}>
                      <AppIcon
                        placeholderIconType="app"
                        ref={popoversRef.current[index]}
                        appImg={app.image}
                        onClick={handleAppIconClick(app, index)}
                        size="md"
                      />
                    </StyledAppIconWrapper>
                  </Box>
                </Box>
              ))}
            </StyledHiddenScrollContainer>
          </StyledAppsContainer>
          <StyledBottomDiv>
            <Icon type="plusGrey" onClick={onClickAddApp} clickable={true} />
          </StyledBottomDiv>
        </Box>
      </SidebarBox>
      <SecondarySidebar appData={currentAppData} onClickOption={onClickOption} />
    </Box>
  );
};

export { Sidebar };
