import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import AuthInput from '../../components/common/Form/AuthInput';
import { FiUser } from 'react-icons/fi';
import { VscLock } from 'react-icons/vsc';
import AuthSubmitBtn from '../../components/common/Form/AuthSubmitBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, setCurrentUser } from '../../redux/features/authSlice';
import { handleError } from '../../utils/helper';
import { SERVER_URL } from '../../utils/config';
import axios from 'axios';
import { addToast } from '../../redux/features/toastSlice';
import { ERROR, SUCCESS } from '../../utils/constant';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: 'admin',
    password: 'password@',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log('🚀 ~ file: login.jsx:28 ~ Login ~ isSubmitting:', isSubmitting);

  const login = async (user, fn) => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${SERVER_URL}/auth/login`, user);

      console.log('🚀 ~ file: login.jsx:36 ~ login ~ data:', data);
      if (data) {
        console.log('🚀 ~ file: login.jsx:36 ~ login ~ data:', data);
        setIsSubmitting(false);
        // update state
        // if (!data.user.isActive) {
        //   dispatch(
        //     addToast({
        //       kind: ERROR,
        //       msg: 'Your account is not active, please contact admin',
        //     })
        //   );
        //   // if (fn) {
        //   //   fn.resetForm();
        //   // }
        //   return;
        // }

        // dispatch(setCurrentUser(data.user));
        // dispatch(
        //   loginUser({
        //     accessToken: data.tokens.access.token,
        //     refreshToken: data.tokens.refresh.token,
        //   })
        // );

        navigate('/auth/verify-otp', {
          state: {
            userInfo: data,
          },
        });

        dispatch(
          addToast({
            kind: SUCCESS,
            msg: 'Please Verify OTP',
          })
        );

        // redirect to the home page
        // navigate('/');
        // window.location.href = config.client_url;
      }
    } catch (err) {
      setIsSubmitting(false);
      const message = handleError(err);

      dispatch(
        addToast({
          kind: ERROR,
          msg: message,
        })
      );
    }
  };
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='max-w-md w-full rounded-[10px]'>
        <div className='bg-primary py-7 text-white  rounded-t-[10px] text-6xl font-[800] text-center'>
          <h1>LOGO</h1>
        </div>
        <div className='bg-white  py-7'>
          <h2 className='text-xl text-black text-opacity-60 text-center'>
            Login to Dashboard
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(value, fn) => {
              login(value, fn);
            }}
          >
            <Form className='form px-10 mt-10'>
              <AuthInput
                name='name'
                id='name'
                placeholder='USERNAME'
                type='text'
                Icon={
                  <FiUser className='text-2xl text-black text-opacity-60' />
                }
              />
              <AuthInput
                name='password'
                id='password'
                type='password'
                placeholder='PASSWORD'
                Icon={
                  <VscLock className='text-2xl text-black text-opacity-60' />
                }
              />
              <div className='w-full mt-10'>
                <AuthSubmitBtn text='login' isSubmitting={isSubmitting} />
              </div>
              <div className='py-4'>
                <Link
                  to='/auth/forgot-password'
                  className='text-right text-sm block text-black text-opacity-60 font-medium'
                >
                  Forgot password?
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
