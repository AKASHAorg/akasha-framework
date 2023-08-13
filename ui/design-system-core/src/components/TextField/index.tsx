import React from 'react';

import Stack from '../Stack';

import Caption from './Caption';
import { Input } from './Input';
import Label from './Label';
import { Multiline } from './Multiline';

import { TextFieldProps } from './types';

const TextField: React.FC<TextFieldProps> = props => {
  const { required, label, status, caption, disabled, customStyle = '', inputRef, ...rest } = props;

  return (
    <Stack direction="column" spacing="gap-y-2" customStyle={customStyle}>
      {label && (
        <Label required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      {rest.type === 'multiline' ? (
        <Multiline
          required={required}
          status={status}
          disabled={disabled}
          ref={inputRef}
          {...rest}
        />
      ) : (
        <Input required={required} status={status} disabled={disabled} ref={inputRef} {...rest} />
      )}
      {caption && (
        <Caption status={status} disabled={disabled}>
          {caption}
        </Caption>
      )}
    </Stack>
  );
};
export default TextField;
