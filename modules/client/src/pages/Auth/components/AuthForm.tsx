import React, { type FC, type HTMLInputTypeAttribute } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';

import AuthField from './AuthField';
import Routes from '../../../types/Routes';
import { register, login } from '../../../store/ducks/user/actions';

export interface Field {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  validate: (value: string) => string | undefined;
}

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

const REGISTER_FIELDS: [Field, Field, Field] = [
  LOGIN_FIELDS[0],
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
  LOGIN_FIELDS[1],
];

const LOGIN_INITIAL_VALUES = {
  email: '',
  password: '',
};

const REGISTER_INITIAL_VALUES = {
  ...LOGIN_INITIAL_VALUES,
  username: '',
};

const AuthForm: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isSigningUp = pathname === Routes.Register;

  const handleSubmit = (
    values: typeof LOGIN_INITIAL_VALUES | typeof REGISTER_INITIAL_VALUES,
  ): void => {
    if (isSigningUp) {
      dispatch(register(values as typeof REGISTER_INITIAL_VALUES));
    } else {
      dispatch(login(values as typeof LOGIN_INITIAL_VALUES));
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={
        isSigningUp ? REGISTER_INITIAL_VALUES : LOGIN_INITIAL_VALUES
      }
    >
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
                className="text-red-400 hover:underline"
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
