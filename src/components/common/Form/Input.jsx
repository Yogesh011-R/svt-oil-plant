import React from 'react';
import { Field, useField } from 'formik';
import ErrorBox from './ErrorBox';

const Input = ({ label, type, placeholder, ...props }) => {
  const [field, meta] = useField({ ...props, type });
  return (
    <div className='form-group  mb-5'>
      <label className='block mb-1 text-sm'>{label}</label>
      <input {...field} {...props} placeholder={placeholder} />
      {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
    </div>
  );
};

export default Input;
