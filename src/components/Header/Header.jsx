import React from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';

const Header = () => {
  return (
    <header className='bg-primary  py-[12.5px] px-4 text-white  flex items-center justify-between w-full'>
      <div>
        <h1 className='text-lg'>Welcome Back,</h1>
        <p className='text-[10px] text-[#A6A6A6]'>
          Here’s what’s happening with your plant today.
        </p>
      </div>
      <div className='flex items-center space-x-8'>
        <button>
          <IoNotificationsOutline className='text-white text-2xl' />
        </button>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-[#B0F6FF] rounded-full'></div>
          <h2 className='text-xl'>Admin</h2>
          <button>
            <HiChevronDown className='text-white text-2xl' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
