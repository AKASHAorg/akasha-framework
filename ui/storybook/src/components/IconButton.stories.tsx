/* eslint-disable import/first */
import DS from '@akashaproject/design-system';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const { Box, Icon, IconButton, IconLink, ProfileAvatarButton, VoteIconButton } = DS;
storiesOf('Buttons|IconLink', module).add('default', () => (
  <Box pad="large" align="start">
    <IconLink
      label="Click Me"
      onClick={() => {
        /*placeholder*/
      }}
      iconPosition="start"
      icon={<Icon type="wallet" />}
    />
  </Box>
));

storiesOf('Buttons|IconButton', module)
  .add('secondary (default)', () => (
    <Box pad="large" align="start">
      <IconButton
        onClick={() => {
          /*placeholder*/
        }}
        icon={<Icon type="wallet" />}
        label="My Wallet"
      />
    </Box>
  ))
  .add('primary', () => (
    <Box pad="large" align="start">
      <IconButton
        primary={true}
        onClick={() => {
          /*placeholder*/
        }}
        icon={<Icon type="wallet" />}
        label="My Wallet"
      />
    </Box>
  ))
  .add('share', () => (
    <Box pad="large" align="start">
      <IconButton
        share={true}
        onClick={() => {
          /*placeholder*/
        }}
        icon={<Icon type="share" />}
        label="Share Profile"
      />
    </Box>
  ));

storiesOf('Buttons|ProfileIconButton', module).add('default', () => (
  <Box pad="large" align="start">
    <ProfileAvatarButton
      avatarImage="https://placebeard.it/360x360"
      onClick={() => action('Avatar Button Click')()}
      label="AKASHA World"
      info="22 July 2019 | 20h30"
      size="sm"
      seed={'0x000000'}
    />
  </Box>
));

storiesOf('Buttons|VoteIconButton', module).add('upvote -default', () => (
  <Box pad="large" align="start">
    <VoteIconButton
      voteType="upvote"
      voteCount={24}
      onClick={() => {
        /*placeholder*/
      }}
    />
  </Box>
));

storiesOf('Buttons|VoteIconButton', module).add('upvote -voted', () => (
  <Box pad="large" align="start">
    <VoteIconButton
      voteType="upvote"
      voteCount={24}
      onClick={() => {
        /*placeholder*/
      }}
      voted={true}
    />
  </Box>
));

storiesOf('Buttons|VoteIconButton', module).add('downvote -default', () => (
  <Box pad="large" align="start">
    <VoteIconButton
      voteType="downvote"
      voteCount={24}
      onClick={() => {
        /*placeholder*/
      }}
    />
  </Box>
));

storiesOf('Buttons|VoteIconButton', module).add('downvote -voted', () => (
  <Box pad="large" align="start">
    <VoteIconButton
      voteType="downvote"
      voteCount={24}
      onClick={() => {
        /*placeholder*/
      }}
      voted={true}
    />
  </Box>
));
