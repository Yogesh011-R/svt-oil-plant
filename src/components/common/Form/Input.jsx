import React, { useState } from 'react';
import { Field, useField } from 'formik';
import ErrorBox from './ErrorBox';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Input = ({ label, type, placeholder, ...props }) => {
  const [field, meta] = useField({ ...props, type });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='form-group  mb-5 relative'>
      <label className={`${props.disabled && 'opacity-60'} block mb-1 text-sm`}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        type={showPassword && type === 'password' ? 'text' : type}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <div className='absolute right-4 top-[36px]'>
          <button type='button' onClick={() => setShowPassword(prev => !prev)}>
            {!showPassword ? (
              <AiFillEyeInvisible size={24} className='text-black/30' />
            ) : (
              <AiFillEye size={24} className='text-black/30' />
            )}
          </button>
        </div>
      )}
      {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
    </div>
  );
};

export default Input;
