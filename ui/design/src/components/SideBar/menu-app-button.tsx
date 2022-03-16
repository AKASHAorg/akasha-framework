import * as React from 'react';
import { AppTypes } from '@akashaproject/ui-awf-typings';
import { IMenuItem, MenuItemAreaType } from '@akashaproject/ui-awf-typings/lib/app-loader';

import { AppIcon } from '../Icon/app-icon';
import AppAvatar from '../AppAvatar';

import { StyledAppIconWrapper } from './styled-sidebar';

export interface IMenuAppButton {
  active: boolean;
  plain?: boolean;
  menuItem: IMenuItem;
  onClick?: React.EventHandler<React.SyntheticEvent>;
}

const MenuAppButton: React.FC<IMenuAppButton> = props => {
  const { active, plain, menuItem, onClick } = props;

  const renderItem = () => {
    if (menuItem.area?.includes(MenuItemAreaType.UserAppArea)) {
      return (
        <AppAvatar
          size="md"
          src={menuItem.logo.value}
          backgroundColor="transparent"
          appType={
            !menuItem.logo.value || menuItem.logo.value.length < 1 ? AppTypes.APP : AppTypes.NONE
          }
        />
      );
    }
    if (menuItem.area?.includes(MenuItemAreaType.UserWidgetArea)) {
      return (
        <AppAvatar
          size="md"
          src={menuItem.logo.value}
          backgroundColor="transparent"
          appType={
            !menuItem.logo.value || menuItem.logo.value.length < 1 ? AppTypes.WIDGET : AppTypes.NONE
          }
        />
      );
    }
    return (
      <AppIcon
        size="md"
        plain={plain}
        onClick={onClick}
        appImg={menuItem.logo}
        placeholderIconType="app"
        backgroundColor="transparent"
      />
    );
  };
  return (
    <StyledAppIconWrapper active={active} backgroundColor="transparent">
      {renderItem()}
    </StyledAppIconWrapper>
  );
};

export { MenuAppButton };
