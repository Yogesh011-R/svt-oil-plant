import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const TableSearch = () => {
  return (
    <div className='max-w-[230px] w-full relative'>
      <input
        type='text'
        className='p-[13px] w-full  text-xs border border-black border-opacity-30 rounded-md focus:outline-none'
        placeholder='Search for anything....'
      />
      <HiOutlineSearch className='absolute top-3.5 right-3  text-black text-opacity-50 text-lg' />
    </div>
  );
};

export default TableSearch;
