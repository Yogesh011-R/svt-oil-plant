import React from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../redux/features/modalSlice';

const ModalHeader = ({ name }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <header className='flex justify-between items-center'>
      <div>{name}</div>
      <button onClick={handleClose}>
        <svg
          width={27}
          height={27}
          viewBox='0 0 27 27'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx={13.7412}
            cy={13.4414}
            r={12.834}
            fill='black'
            fillOpacity={0.4}
          />
          <path
            d='M18.0199 9.1652L9.46387 17.7212'
            stroke='white'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.46387 9.1652L18.0199 17.7212'
            stroke='white'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </header>
  );
};

export default ModalHeader;
