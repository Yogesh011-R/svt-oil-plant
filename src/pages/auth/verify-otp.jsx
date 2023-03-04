import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../../components/common/Form/AuthInput';
import AuthSubmitBtn from '../../components/common/Form/AuthSubmitBtn';

const VerifyOtp = () => {
  const initialValues = {
    otp: '',
  };

  const validationSchema = Yup.object({
    otp: Yup.string().required('OTP is required'),
  });
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='max-w-md w-full rounded-[10px]'>
        <div className='bg-primary py-7 text-white  rounded-t-[10px]  text-center'>
          <h1 className='text-2xl font-medium'>LOGIN OTP VERIFICATION</h1>
          <p className='text-sm py-1 text-white  text-opacity-80'>
            Please enter the OTP to get login
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
