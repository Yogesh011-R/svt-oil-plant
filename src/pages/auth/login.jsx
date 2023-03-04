import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import AuthInput from '../../components/common/Form/AuthInput';
import { FiUser } from 'react-icons/fi';
import { VscLock } from 'react-icons/vsc';
import AuthSubmitBtn from '../../components/common/Form/AuthSubmitBtn';
import { Link } from 'react-router-dom';

const Login = () => {
  const initialValues = {
    name: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
  });
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
            onSubmit={e => {
              console.log(e);
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
                <AuthSubmitBtn text='login' />
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
