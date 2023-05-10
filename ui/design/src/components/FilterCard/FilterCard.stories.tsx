import React from 'react';
import { Box, Grommet } from 'grommet';

import FilterCard, { IFilterCard } from '.';

import ProfileAvatarButton from '../ProfileAvatarButton';
import ViewportSizeProvider from '../Providers/viewport-dimension';

import lightTheme from '../../styles/themes/light/light-theme';
import { userData } from '../../utils/dummy-data';

export default {
  title: 'Cards/FilterCard',
  component: FilterCard,
  argType: {
    handleClickAll: { action: 'clicked all' },
    handleClickFollowing: { action: 'clicked following' },
    handleClickLatest: { action: 'clicked latest' },
    handleClickOldest: { action: 'clicked oldest' },
  },
};

const Template = (args: IFilterCard) => (
  <Grommet theme={lightTheme}>
    <Box align="center" width="30%" pad={{ top: '40px' }} height="600px">
      <ViewportSizeProvider>
        <FilterCard {...args} />
      </ViewportSizeProvider>
    </Box>
  </Grommet>
);

const titleElement = (
  <ProfileAvatarButton
    avatarImage={userData[0].avatar}
    onClick={() => null}
    label="@ivacarter"
    info="ivacarter.akasha.eth"
    size="sm"
    profileId={'did:pkh:0x000000'}
  />
);

export const BaseFilterCard = Template.bind({});

BaseFilterCard.args = {
  titleElement: titleElement,
};
