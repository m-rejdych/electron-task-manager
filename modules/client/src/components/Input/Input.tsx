import React, { HTMLProps } from 'react';

interface Props {
  inputProps?: HTMLProps<HTMLInputElement>;
  containerProps?: HTMLProps<HTMLDivElement>;
  helperText?: string;
  error?: boolean;
}

const Input: React.FC<Props> = ({
  inputProps,
  containerProps,
  helperText,
  error,
}) => (
  <div
    {...containerProps}
    className={`relative overflow-visible ${
      containerProps?.className ? ` ${containerProps.className}` : ''
    }`}
  >
    <input
      {...inputProps}
      className={`rounded-md outline-none bg-gray-100 bg-opacity-10 py-2.5 px-2${
        inputProps?.className ? ` ${inputProps.className}` : ''
      }`}
    />
    {helperText && (
      <p
        className={`absolute top[calc(100%+1rem)] text-xs left-2${
          error ? ' text-red-600' : ''
        }`}
      >
        {helperText}
      </p>
    )}
  </div>
);

export default Input;
