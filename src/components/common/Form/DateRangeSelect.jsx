import React from 'react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { FaRegCalendarAlt } from 'react-icons/fa';

const DateRangeSelect = ({ startDate, endDate, setEndDate, setStartDate }) => {
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className='relative'>
      <ReactDatePicker
        placeholderText='Select a date Range'
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={update => {
          onChange(update);
        }}
        className='border border-black/30 pl-9 pr-4  p-2 ml-4 rounded-[5px]'
        isClearable={false}
      />
      <div className='absolute left-6 top-3'>
        <FaRegCalendarAlt className='text-black/50 text-lg' />
      </div>
    </div>
  );
};

export default DateRangeSelect;
