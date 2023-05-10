import React from 'react';
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import AuthInput from '../../../components/common/Form/AuthInput';
import AuthSubmitBtn from '../../../components/common/Form/AuthSubmitBtn';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';
import { ERROR, SUCCESS } from '../../../utils/constant';
import { addToast } from '../../../redux/features/toastSlice';
import { handleError } from '../../../utils/helper';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  if (!searchParams.get('token')) {
    return <Navigate replace to='/' />;
  }

  const resetPassword = async data => {
    const res = await axios.post(
      `${SERVER_URL}/auth/reset-password?token=${searchParams.get('token')}`,
      data
    );
    return res.data;
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password Confirm  is required'),
  });

  const { mutate, data, isLoading, isError } = useMutation({
    mutationFn: resetPassword,
    onSuccess: data => {
      dispatch(
        addToast({
          kind: SUCCESS,
          msg: `Password reset successfully`,
        })
      );
      navigate(`/`, {
        replace: true,
      });

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
            Hello there, here you can reset your password
          </p>
        </div>
        <div className='bg-white  py-7'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
              delete values.confirmPassword;
              mutate(values);
            }}
          >
            <Form className='form px-10 mt-2'>
              <AuthInput
                name='password'
                id='password'
                type='password'
                placeholder='PASSWORD'
              />
              <AuthInput
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                placeholder='CONFIRM PASSWORD'
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

export default ForgotPassword;
