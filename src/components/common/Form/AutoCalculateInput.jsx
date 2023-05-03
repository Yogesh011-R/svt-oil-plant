import React, { useEffect, useState } from 'react';
import { Field, useField, useFormikContext } from 'formik';
import ErrorBox from './ErrorBox';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const AutoCalculateInput = ({
  label,
  type,
  placeholder,

  ...props
}) => {
  const [field, meta, setFn] = useField({ ...props, type });
  const { values, setFieldValue, setTouched } = useFormikContext();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // totalBillingAmount
    const totalBillingAmount =
      +values.billingQuantity * (+values.billingRate / 10);

    const withGST = totalBillingAmount * (values.gst / 100);

    setFieldValue(
      'totalBillingAmount',
      totalBillingAmount + withGST - +values.otherAmount || ''
    );
    //EO totalBillingAmount

    //Unload Amount
    const shortAmount = +values.billingQuantity - +values.unloadQuantity;

    setFieldValue('shortQuantity', shortAmount || '');
  }, [values]);

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

export default AutoCalculateInput;
