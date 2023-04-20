import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DEFAULT, ERROR, INFO, SUCCESS, WARNING } from '../../utils/constant';
import { removeToast } from '../../redux/features/toastSlice';
import { toast } from 'react-toastify';

const Toasts = () => {
  const { toasts } = useSelector(state => state.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    toasts &&
      toasts.forEach(t => {
        if (t.kind === ERROR)
          toast.error(t.msg, {
            toastId: t.kind + t.msg,
            onClose: () => {
              dispatch(removeToast(t));
            },
          });
        if (t.kind === SUCCESS)
          toast.success(t.msg, {
            toastId: t.kind + t.msg,
            onClose: () => {
              dispatch(removeToast(t));
            },
          });
        if (t.kind === INFO)
          toast.info(t.msg, {
            toastId: t.kind + t.msg,
            onClose: () => {
              dispatch(removeToast(t));
            },
          });
        if (t.kind === WARNING)
          toast.warn(t.msg, {
            toastId: t.kind + t.msg,
            onClose: () => {
              dispatch(removeToast(t));
            },
          });
        if (t.kind === DEFAULT)
          toast(t.msg, {
            toastId: t.kind + t.msg,
            onClose: () => {
              dispatch(removeToast(t));
            },
          });
      });
  }, [toasts]);
  return <></>;
};

export default Toasts;
