import React from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../../components/common/Form/AuthInput';
import AuthSubmitBtn from '../../components/common/Form/AuthSubmitBtn';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
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
            onSubmit={e => {
              console.log(e);
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
