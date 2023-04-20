import React from 'react';
import ModalHeader from './ModalHeader';

const DeleteModal = () => {
  return (
    <div className='bg-white p-5'>
      <ModalHeader
        Name={
          <>
            <span className='text-lg text-red'>Delete Confirmation</span>
          </>
        }
      />
    </div>
  );
};

export default DeleteModal;
