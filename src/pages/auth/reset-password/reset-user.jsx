import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from '../../../components/common/Form/AuthInput';
import AuthSubmitBtn from '../../../components/common/Form/AuthSubmitBtn';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';
import { useDispatch } from 'react-redux';
import { ERROR, SUCCESS } from '../../../utils/constant';
import { handleError } from '../../../utils/helper';
import { addToast } from '../../../redux/features/toastSlice';

const verifyUser = async user => {
  const res = await axios.post(`${SERVER_URL}/auth/forgot-password`, user);
  return res?.data;
};

const ResetUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
  });

  const { data, mutate, isLoading, isError } = useMutation({
    mutationFn: verifyUser,
    onSuccess: data => {
      navigate(`/auth/reset-verify-otp`, {
        state: {
          userInfo: data,
        },
      });
      // navigate;
      dispatch(
        addToast({
          kind: SUCCESS,
          msg: `Verify Otp send successfully`,
        })
      );
      // queryClient.invalidateQueries('getReceivedConsignments');
    },
    onError: error => {
      const message = handleError(error);

      dispatch(
        addToast({
          kind: ERROR,
          msg: message,
        })
      );
    },
  });
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='max-w-md w-full rounded-[10px]'>
        <div className='bg-primary py-7 text-white  rounded-t-[10px]  text-center'>
          <h1 className='text-2xl font-medium'>RESET PASSWORD</h1>
          <p className='text-sm py-1 text-white  text-opacity-80'>
            Please enter the username you wish to reset your password
          </p>
        </div>
        <div className='bg-white  py-7'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
              mutate(values);
            }}
          >
            <Form className='form px-10 mt-2'>
              <AuthInput
                name='name'
                id='name'
                type='text'
                placeholder='USERNAME'
              />

              <div className='w-full mt-10'>
                <AuthSubmitBtn text='Submit' />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetUser;
