import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/features/toastSlice';
import { ERROR, SUCCESS } from '../../utils/constant';
import { handleError } from '../../utils/helper';

const DeleteModal = ({ handleClose, ...props }) => {
  const { id, route, invalidateKey } = props;

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      const res = await axios.delete(`${SERVER_URL}/${route}/${id}`);

      if (res) {
        dispatch(
          addToast({
            kind: SUCCESS,
            msg: 'Deleted successfully',
          })
        );
        queryClient.invalidateQueries(invalidateKey);
        handleClose();
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
    <div className='bg-white p-5 rounded-[10px]   w-[500px]'>
      <ModalHeader
        name={
          <>
            <span className='text-lg text-red font-semibold'>
              Delete Confirmation
            </span>
          </>
        }
      />
      <div className='w-full bg-black/40 h-[0.5px] my-5'></div>
      <div className='text-center'>
        <h1 className='text-lg font-medium'>
          Are you sure, you want to delete this?
        </h1>
        <div className='my-4 mt-6 flex justify-center items-center space-x-4'>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className='max-w-[100px] rounded-[5px] text-sm font-medium w-full py-2.5 bg-black/20 text-black/80'
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isSubmitting}
            className='max-w-[100px] rounded-[5px] text-sm font-medium w-full py-2.5 bg-red text-white'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
