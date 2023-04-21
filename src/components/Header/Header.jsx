import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';
import useClose from '../../hooks/useClose';
import { showModal } from '../../redux/features/modalSlice';
import { LOGOUT_MODAL } from '../../utils/constant';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useClose(() => setShowDropDown(false));
  return (
    <header className='bg-primary    py-[12.5px] px-4  w-full'>
      <nav className='max-w-[1680px] mx-auto text-white  flex items-center justify-between w-full'>
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
          <div className='flex items-center space-x-2 relative'>
            <div className='w-8 h-8 bg-[#B0F6FF] rounded-full'></div>
            <h2 className='text-xl'>Admin</h2>
            <button
              onClick={() => {
                setShowDropDown(prev => !prev);
              }}
            >
              <HiChevronDown className='text-white text-2xl' />
            </button>
            {showDropDown && (
              <div
                ref={ref}
                className='absolute bg-white left-[-50px] top-[50px] w-[180px] rounded-xl'
                style={{
                  boxShadow: `4px 4px 20px rgba(0, 0, 0, 0.2)`,
                }}
              >
                <button
                  onClick={() => {
                    dispatch(
                      showModal({
                        modalType: LOGOUT_MODAL,
                      })
                    );
                  }}
                  className='text-[#464E5F] text-left font-semibold w-full p-2.5 pl-6 '
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
