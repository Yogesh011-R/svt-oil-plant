import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import useClose from '../../hooks/useClose';
import { hideModal } from '../../redux/features/modalSlice';
import { DELETE_MODAL, LOGOUT_MODAL } from '../../utils/constant';
import DeleteModal from '../ModalComponents/DeleteModal';
import LogoutModal from '../ModalComponents/LogoutModal';

const Modal = ({ modalType, modalProps }) => {
  const dispatch = useDispatch();

  const ref = useClose(() => dispatch(hideModal()));

  const handleClose = () => {
    dispatch(hideModal());
  };

  let Component = null;

  switch (modalType) {
    case DELETE_MODAL: {
      Component = DeleteModal;
      break;
    }
    case LOGOUT_MODAL: {
      Component = LogoutModal;
      break;
    }

    default: {
      Component = null;
    }
  }

  console.log('🚀 ~ file: Modal.jsx:19 ~ Modal ~ Component:', Component);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    };
  });

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black backdrop bg-opacity-60'
      style={{
        maxHeight: '100vh',
      }}
    >
      <div className='absolute z-10 top-[20%]' ref={ref}>
        {/* <div className="absolute top-16" ref={ref}> */}
        {/* <div className='w-auto modal' ref={ref}> */}
        <div
          className='relative z-10 modal'
          style={{
            minWidth: '400px',
          }}
        >
          {/* <button
            type='button'
            onClick={handleClose}
            className='absolute z-10 flex items-center justify-center w-8 h-8 rounded-full bg-redPrimary dark:bg-opacity-20 bg-opacity-10 text-redPrimary btn-p0 right-5 top-5'
          >
            <FaTimes />
          </button> */}

          {Component !== null && (
            <Component {...{ ...modalProps }} handleClose={handleClose} />
          )}
        </div>
        <div className='empty-space pb-14'></div>
      </div>
    </div>
  );
};

export default Modal;
