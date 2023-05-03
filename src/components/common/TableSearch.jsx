import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDebouncedEffect } from '../../hooks/useDebounce';
import { useDebouncedCallback } from 'use-debounce';

const TableSearch = ({ value, setValue, setPageIndex, pageIndex }) => {
  return (
    <div className='max-w-[250px] ml-auto w-full relative'>
      <input
        type='text'
        value={value}
        onChange={e => {
          if (pageIndex > 0) setPageIndex(0);
          setValue(e.target.value);
        }}
        // onChange={e => {
        //   onChange={(e) => debounced(e.target.value)}
        //   setSearchInput(e.target.value);
        // }}
        className='p-[13px] w-full  text-xs border border-black border-opacity-30 rounded-md focus:outline-none'
        placeholder='Search for anything....'
      />
      <HiOutlineSearch className='absolute top-3.5 right-3  text-black text-opacity-50 text-lg' />
    </div>
  );
};

export default TableSearch;
