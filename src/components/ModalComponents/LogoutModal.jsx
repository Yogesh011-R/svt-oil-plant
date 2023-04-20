import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import { handleError } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '../../redux/features/toastSlice';
import { ERROR } from '../../utils/constant';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { logoutUser } from '../../redux/features/authSlice';

const LogoutModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { refreshToken } = useSelector(state => state.auth);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${SERVER_URL}/auth/logout`, {
        refreshToken,
      });

      if (res) {
        dispatch(logoutUser());
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      const message = handleError(error);

      dispatch(
        addToast({
          kind: ERROR,
          msg: message,
        })
      );
    }
  };
  return (
    <div className='bg-white p-5 rounded-[10px] max-w-lg w-full'>
      <ModalHeader
        name={
          <>
            <span className='text-lg text-red font-semibold'>
              Logout Confirmation
            </span>
          </>
        }
      />
      <div className='w-full bg-black/40 h-[0.5px] my-5'></div>
      <div className='text-center'>
        <h1 className='text-lg font-medium'>
          Are you sure, you want to logout?
        </h1>
        <div className='my-4 mt-6 flex justify-center items-center space-x-4'>
          <button
            onClick={handleClose}
            className='max-w-[100px] rounded-[5px] text-sm font-medium w-full py-2.5 bg-black/20 text-black/80'
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={isSubmitting}
            className='max-w-[100px] rounded-[5px] text-sm font-medium w-full py-2.5 bg-red text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
