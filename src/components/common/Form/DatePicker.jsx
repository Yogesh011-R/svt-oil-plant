import { useField } from 'formik';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ErrorBox from './ErrorBox';

const DatePicker = ({ label, type, placeholder, ...props }) => {
  const test = useField({ ...props, type });
  const [field, meta, setField] = useField({ ...props, type });

  return (
    <div>
      <label className='block mb-1 text-sm'>{label}</label>

      <div className='relative mb-4'>
        <ReactDatePicker
          {...field}
          {...props}
          dateFormat='dd/MM/yy'
          onTouch={setField.setTouched}
          placeholder={placeholder}
          selected={field.value}
          onChange={date => setField.setValue(date)}
          className='border border-black/30  text-sm bg-[#F0F0EF] w-full !py-3.5 rounded-md   pl-12'
        />
        <div className='absolute left-4 top-3'>
          <FaRegCalendarAlt className='text-black/50 text-lg' />
        </div>
        {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
      </div>
    </div>
  );
};

export default DatePicker;
