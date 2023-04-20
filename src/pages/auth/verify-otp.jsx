import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../../components/common/Form/AuthInput';
import AuthSubmitBtn from '../../components/common/Form/AuthSubmitBtn';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addToast } from '../../redux/features/toastSlice';
import { ERROR, SUCCESS } from '../../utils/constant';
import { handleError } from '../../utils/helper';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { loginUser, setCurrentUser } from '../../redux/features/authSlice';

const VerifyOtp = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    otp: '',
    name: state?.userInfo?.user?.name,
  };

  const validationSchema = Yup.object({
    otp: Yup.string().required('OTP is required'),
  });
  if (!state) {
    return <Navigate replace to='/' />;
  }

  const { userInfo } = state;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifyOtp = async otp => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${SERVER_URL}/auth/verify-otp`, otp);

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

        dispatch(setCurrentUser(data.user));
        dispatch(
          loginUser({
            accessToken: data.tokens.access.token,
            refreshToken: data.tokens.refresh.token,
          })
        );

        navigate('/');

        dispatch(
          addToast({
            kind: SUCCESS,
            msg: 'Login Successful',
          })
        );
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
        <div className='bg-primary py-7 text-white  rounded-t-[10px]  text-center'>
          <h1 className='text-2xl font-medium'>LOGIN OTP VERIFICATION</h1>
          <p className='text-sm py-1 text-white  text-opacity-80'>
            Please enter the OTP to get login
          </p>
          <p>Test OTP {userInfo.user.otp.value}</p>
        </div>
        <div className='bg-white  py-7'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
              verifyOtp(values);
            }}
          >
            <Form className='form px-10 mt-2'>
              <AuthInput
                name='otp'
                id='otp'
                type='text'
                placeholder='Enter OTP'
              />

              <div className='w-full mt-10'>
                <AuthSubmitBtn text='Verify' />
              </div>
              <div className='w-full mt-5'>
                <button
                  type='button'
                  className='text-secondary w-full font-medium text-sm'
                >
                  Resend OTP
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
