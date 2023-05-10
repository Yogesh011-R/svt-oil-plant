import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../../../components/common/Form/AuthInput';
import AuthSubmitBtn from '../../../components/common/Form/AuthSubmitBtn';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { addToast } from '../../../redux/features/toastSlice';
import { ERROR, SUCCESS } from '../../../utils/constant';
import { handleError } from '../../../utils/helper';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';
import { loginUser, setCurrentUser } from '../../../redux/features/authSlice';

const VerifyOtp = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    otp: '',
    name: state?.userInfo?.name,
  };

  const validationSchema = Yup.object({
    otp: Yup.string().required('OTP is required'),
  });
  // if (!state) {
  //   return <Navigate replace to='/' />;
  // }

  const { userInfo } = state;

  if (!userInfo) {
    return <Navigate replace to='/' />;
  }

  const [userDetails, setUserDetails] = useState(userInfo);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifyOtp = async values => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/auth/verify-reset-password-otp`,
        values
      );

      if (data) {
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

        navigate(`/auth/forgot-password?token=${data.resetPasswordToken}`);

        dispatch(
          addToast({
            kind: SUCCESS,
            msg: 'Verified Successful',
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

  const otpInput = useRef(null);

  useEffect(() => {
    otpInput.current.focus();
  }, []);

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='max-w-md w-full rounded-[10px]'>
        <div className='bg-primary py-7 text-white  rounded-t-[10px]  text-center'>
          <h1 className='text-2xl font-medium'>RESET PASSWORD</h1>
          <p className='text-sm py-1 text-white  text-opacity-80'>
            OTP is sent to admin
          </p>
          <p>Test OTP {userDetails.otp.value}</p>
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
                inputRef={otpInput}
              />

              <div className='w-full mt-10'>
                <AuthSubmitBtn text='Verify' />
              </div>
              <div className='w-full mt-5'>
                <button
                  type='button'
                  className='text-secondary w-full font-medium text-sm'
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        `${SERVER_URL}/auth/resend-otp`,
                        {
                          name: userInfo.name,
                        }
                      );
                      setUserDetails(res.data);
                    } catch (error) {}
                  }}
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
