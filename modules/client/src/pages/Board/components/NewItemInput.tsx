import React, { useState } from 'react';

import Input from '../../../components/Input';

interface Props {
  onBlur: () => void;
  onCreate: (value: string) => void;
}

const NewItemInput: React.FC<Props> = ({ onCreate, onBlur }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key !== 'Enter') return;
    onCreate(value);
    onBlur();
  };

  return (
    <Input
      inputProps={{
        autoFocus: true,
        className:
          'rounded-md w-full outline-none bg-gray-100 bg-opacity-10 py-2.5 px-2',
        onChange: handleChange,
        onKeyPress: handleKeyPress,
        onBlur,
      }}
    />
  );
};

export default NewItemInput;
