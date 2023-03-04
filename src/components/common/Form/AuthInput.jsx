import React from 'react';
import { Field, useField } from 'formik';
import ErrorBox from './ErrorBox';

const AuthInput = ({ label, type, placeholder, Icon, ...props }) => {
  const [field, meta] = useField({ ...props, type });
  return (
    <div className='auth-form-group relative  mb-5'>
      <input
        {...field}
        {...props}
        className={`${Icon && '!pr-12'}`}
        placeholder={placeholder}
      />
      {Icon && <div className='absolute top-3 right-4'> {Icon}</div>}
      {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
    </div>
  );
};

export default AuthInput;
