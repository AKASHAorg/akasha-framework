import React from 'react';

import Toggle from './index';

export default {
  title: 'Buttons/Toggle',
  component: Toggle,
};

const Template = args => {
  const [selected, setSelected] = React.useState(false);

  const changeHandler = e => {
    setSelected(!selected);
  };
  return <Toggle {...args} onChange={changeHandler} />;
};

export const BaseToggle = Template.bind({});
BaseToggle.args = {
  label: 'small toggle',
};

export const LargeToggle = Template.bind({});
LargeToggle.args = {
  label: 'large toggle',
  size: 'large',
};

export const IconToggle = Template.bind({});
IconToggle.args = {
  iconChecked: 'SunIcon',
  iconUnchecked: 'MoonIcon',
};

export const DisabledToggle = Template.bind({});
DisabledToggle.args = {
  checked: false,
  size: 'large',
  disabled: true,
};

export const DisabledCheckedToggle = Template.bind({});
DisabledCheckedToggle.args = {
  checked: true,
  size: 'large',
  disabled: true,
};

export const DisabledCheckedIconToggle = Template.bind({});
DisabledCheckedIconToggle.args = {
  checked: true,
  iconChecked: 'SunIcon',
  iconUnchecked: 'MoonIcon',
  disabled: true,
};
