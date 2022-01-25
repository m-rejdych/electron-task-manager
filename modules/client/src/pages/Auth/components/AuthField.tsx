import React, { type FC } from 'react';
import { useField } from 'formik';

import Input from '../../../components/Input';
import type { Field } from './AuthForm';

const AuthField: FC<Field> = ({ placeholder, type, ...rest }) => {
  const [field, { touched, error }] = useField({ type, ...rest });

  return (
    <Input
      inputProps={{ ...field, placeholder, type, className: 'w-full' }}
      containerProps={{
        className: `mb-6${error && touched ? ' last:mb-12' : ''} w-full`,
      }}
      error={!!touched && !!error}
      helperText={touched ? error : ''}
    />
  );
};

export default AuthField;
