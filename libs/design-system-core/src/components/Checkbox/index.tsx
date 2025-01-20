import React, { ChangeEvent } from 'react';
import Text from '../Text';
import Stack from '../Stack';
import { tw, apply } from '@twind/core';
import { getBgColor } from './getBgColor';
import { getTextColor } from './getTextColor';
import { getInputColor } from './getInputColor';
import { getCheckmarkColor } from './getCheckmarkColor';
import { Color } from '../types/common.types';
import { getColorClasses } from '../../utils';

export type CheckboxSize = 'small' | 'large';

export type CheckboxProps = {
  id: string;
  label?: string;
  labelDirection?: 'left' | 'right';
  labelColor?: Color;
  value: string;
  name: string;
  size?: CheckboxSize;
  //status
  indeterminate?: boolean;
  error?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  //handler
  handleChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  customStyle?: string;
};

const basePseudoCheckboxStyles = `
cursor-pointer
before:absolute after:absolute before:visible after:visible
after:content-[''] before:content-['']
before:inline-block after:inline-block
before:rounded-[0.375rem]
before:left-2
after:left-2
`;

/**
 * A Checkbox component allows users to select one or more options from a list.
 * Checkboxes are most useful when you have multiple options to present. When there
 * is only one option available, consider using a toggle instead.
 * @param id - assign an ID to the checkbox
 * @param label - (optional) checkbox label
 * @param labelDirection - (optional) control where the label will be placed
 * @param labelColor - (optional) customize the label color
 * @param value - checkbox value
 * @param name - checkbox's name
 * @param size - (optional) customize checkbox' size
 * @param indeterminate - boolean (optional) whether the checkbox is in indeterminate state
 * @param error - boolean (optional) whether the checkbox is in error state
 * @param isSelected - boolean (optional) whether the checkbox is selected
 * @param isDisabled - boolean (optional) whether the checkbox is disabled
 * @param customStyle - (optional) custom styling if any
 * @param handleChange - (optional) change handler
 * @example
 * ```tsx
 *  <Checkbbox
 *    id='nsfw'
 *    label="NSFW"
 *    name="nsfw"
 *    value="nsfw"
 *    handleChange={onSelectCheckbox}
 *    isSelected={false}
 *   />
 * ```
 **/
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  labelDirection = 'right',
  labelColor = { light: 'black', dark: 'white' },
  value,
  name,
  size = 'small',
  isSelected = false,
  error = false,
  indeterminate = false,
  isDisabled = false,
  handleChange,
  customStyle = '',
}) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (indeterminate === true) {
      checkboxRef.current.indeterminate = true;
      checkboxRef.current.checked = false;
    }
  }, [indeterminate]);

  const textColor = getTextColor(isDisabled, error, getColorClasses(labelColor, 'text'));
  const textColorIndeterminate = isDisabled
    ? 'text-black dark:text-grey4'
    : getColorClasses(labelColor, 'text');
  const inputColor = getInputColor(isDisabled, error);
  const checkmarkColor = getCheckmarkColor(isDisabled, error);
  const minusMarkColor = isDisabled ? 'bg-grey6 dark:bg-grey5' : 'bg-white';
  const bgColor = getBgColor(isDisabled, isSelected, error);
  const checkboxSizes =
    size === 'small'
      ? 'before:w-5 before:h-5 before:-ml-2 before:mt-px'
      : 'before:w-6 before:h-6 before:-ml-2 before:mt-0';
  const tickMarkSizes =
    size === 'small'
      ? 'after:w-2.5 after:h-1.5 after:-ml-0.5 after:mt-1.5'
      : 'after:w-4 after:h-2 after:-ml-1 after:mt-1.5';

  const minusMarkSizes =
    size === 'small'
      ? 'after:w-2.5 after:h-[2px] after:-ml-[3px] after:mt-2.5'
      : 'after:w-3.5 after:h-[1.5px] after:-ml-[3px] after:mt-2.5';

  const cursorStyle = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

  const instancePseudoCheckboxStyle = apply`
  ${basePseudoCheckboxStyles}
  ${checkboxSizes}
  ${tickMarkSizes}
  before:border(1 ${inputColor})
  after:border(l-[1px] ${checkmarkColor}) after:border(b-[1px] ${checkmarkColor}) after:-rotate-45
  ${bgColor}
  `;

  const minusMarkStyles = apply`
  ${minusMarkSizes}
  after:${minusMarkColor}
  `;

  const instanceIndeterminateCheckboxStyle = apply`
  ${basePseudoCheckboxStyles}
  ${checkboxSizes}
  ${minusMarkStyles}
  before:border(1 ${isDisabled ? 'grey4' : 'secondaryLight dark:secondaryDark'})
  before:${isDisabled ? 'bg-grey4' : 'bg-(secondaryLight dark:secondaryDark)'}
  invisible w-4 h-4 relative
  `;

  const selectedPseudoCheckboxStyle = apply`
    ${instancePseudoCheckboxStyle}
    ${cursorStyle}
    invisible w-4 h-4 relative
    `;

  const unselectedPseudoCheckboxStyle = apply`
    ${instancePseudoCheckboxStyle}
    ${cursorStyle}
    after:content-none invisible w-4 h-4 relative
    `;

  const getInputClassname = () => {
    if (indeterminate) {
      return instanceIndeterminateCheckboxStyle;
    }
    if (isSelected) {
      return selectedPseudoCheckboxStyle;
    }
    return unselectedPseudoCheckboxStyle;
  };

  const labelUi = (
    <>
      {label && (
        <label htmlFor={id} className={'select-none'}>
          <Text variant="body2" customStyle={indeterminate ? textColorIndeterminate : textColor}>
            {label}
          </Text>
        </label>
      )}
    </>
  );

  return (
    <Stack
      direction="row"
      spacing="gap-x-2"
      customStyle={`cursor-pointer leading-6 hover:text-secondaryLight dark:hover:text-secondaryDark ${customStyle}`}
    >
      {labelDirection === 'left' && labelUi}
      <input
        ref={checkboxRef}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        aria-labelledby={value}
        checked={isSelected}
        onChange={handleChange}
        className={tw(getInputClassname())}
      />
      {labelDirection === 'right' && labelUi}
    </Stack>
  );
};

export default Checkbox;
