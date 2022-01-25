import React, { type FC, type HTMLInputTypeAttribute, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Form, Formik } from 'formik';

import AuthField from './AuthField';
import Routes from '../../../types/Routes';

export interface Field {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  validate: (value: string) => string | undefined;
}

const INITIAL_VALUES = {
  email: '',
  username: '',
  password: '',
};

const LOGIN_FIELDS: [Field, Field] = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email address',
    validate: (value) => {
      let error;
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value,
        )
      ) {
        error = 'Enter a valid email.';
      }
      return error;
    },
  },
  {
    type: 'text',
    name: 'username',
    placeholder: 'Username',
    validate: (value) => {
      let error;
      if (!value.trim()) {
        error = 'Username can not be empty.';
      }
      return error;
    },
  },
];

const REGISTER_FIELDS: [Field, Field, Field] = [
  ...LOGIN_FIELDS,
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    validate: (value) => {
      let error;

      if (!/^(?=.*\d).{4,8}$/.test(value)) {
        error =
          'Password needs to be at least 4 characters long and contain at least 1 digit.';
      }

      return error;
    },
  },
];

const AuthForm: FC = () => {
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const { pathname } = useLocation();

  const isSigningUp = pathname === Routes.Register;

  const handleMouseEnter = (): void => {
    setIsLinkHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsLinkHovered(false);
  };

  return (
    <Formik onSubmit={() => {}} initialValues={INITIAL_VALUES}>
      {({ handleReset }) => (
        <Form className="w-full">
          <div>
            {(isSigningUp ? REGISTER_FIELDS : LOGIN_FIELDS).map((field) => (
              <AuthField key={`auth-field-${field.name}`} {...field} />
            ))}
          </div>
          <div className="flex justify-between">
            <button type="submit" className="text-rose-200">
              Submit
            </button>
            <p className="text-xs">
              {'or '}
              <span
                className={`text-red-400${isLinkHovered ? ' underline' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleReset}
              >
                <Link to={isSigningUp ? Routes.Login : Routes.Register}>
                  {isSigningUp ? 'login' : 'register'}
                </Link>
              </span>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
