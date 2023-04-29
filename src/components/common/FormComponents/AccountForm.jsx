import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import DatePicker from '../Form/DatePicker';
import Input from '../Form/Input';
import SubmitBtn from '../Form/SubmitBtn';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { ERROR, SUCCESS } from '../../../utils/constant';
import { decrypt, handleError } from '../../../utils/helper';
import { addToast } from '../../../redux/features/toastSlice';
import { useDispatch } from 'react-redux';
import CustomSelect from '../Form/CustomSelect';

const AccountForm = ({ apiFunction, editValue, pricePerKG }) => {
  const { partnerId, consignmentId: bookedConsignmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const initialValues = {
    name: editValue ? editValue.name : '',
    phoneNo: editValue ? editValue.phoneNo : '',
    email: editValue ? editValue.email : '',
    status: editValue ? editValue.status : 'active',
    password: editValue ? decrypt(editValue.plain) : '',
    passwordConfirm: editValue ? editValue.passwordConfirm : '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phoneNo: Yup.number().typeError('Phone must be a number'),
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    status: Yup.string(),
    password: Yup.string().required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password Confirm  is required'),
  });

  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: apiFunction,
    onSuccess: () => {
      navigate(`/account`);
      dispatch(
        addToast({
          kind: SUCCESS,
          msg: `User  ${editValue ? 'updated' : 'added'} successfully`,
        })
      );
      queryClient.invalidateQueries('getReceivedConsignments');
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

  const [uploadUrl, setUploadUrl] = useState('');

  const [uploadImg, setUploadImg] = useState('');

  const handleUploadImage = e => {
    const [file] = e.target.files;

    setUploadUrl(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = e => {
      setUploadImg(e.target.result);
    };
  };

  const fileInput = useRef(null);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setFieldError }) => {
        if (editValue) {
          values.id = editValue.id;
        }

        mutate(values);
      }}
      validateOnMount={editValue && true}
    >
      {formik => {
        const {
          values,
          errors,
          dirty,
          setFieldValue,
          setFieldError,
          validateForm,
        } = formik;

        return (
          <Form className='form px-3'>
            <div className='grid lg:grid-cols-2 gap-x-10 '>
              <div className='relative  w-full'>
                <Input
                  label='Full Name*'
                  placeholder='Enter full name*'
                  id='name'
                  name='name'
                />
              </div>
              <div className=' w-full'>
                <Input
                  label='Phone number'
                  name='phoneNo'
                  id='phoneNo'
                  placeholder='Enter phone number'
                  type='number'
                />
              </div>
              <div className=' w-full'>
                <Input
                  label='Email id*'
                  name='email'
                  id='email'
                  type='email'
                  placeholder='Enter email id'
                />
              </div>
              <div className=' w-full'>
                <CustomSelect
                  name='status'
                  id='status'
                  label='Status'
                  placeholder='Status'
                  disabled={isLoading}
                  options={[
                    { id: 1, value: 'active', label: 'Active' },
                    { id: 2, value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </div>
              <div className=' w-full'>
                <Input
                  label='Password*'
                  name='password'
                  id='password'
                  placeholder='Enter password*'
                  type='password'
                />
              </div>

              <div className=' w-full'>
                <Input
                  label='Confirm password*'
                  name='passwordConfirm'
                  id='passwordConfirm'
                  placeholder='Enter confirm password'
                  type='password'
                />
              </div>
            </div>
            <div>
              <h1 className='text-sm'>User Photo</h1>
              {uploadImg && (
                <img
                  src={uploadImg}
                  alt=''
                  className='object-cover rounded-full w-16 h-16'
                />
              )}
              <div className='relative'>
                <button
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  type='button'
                  className='bg-secondary my-2 p-1 px-2.5 rounded-[5px] text-white text-sm'
                >
                  Upload Image
                </button>

                <input
                  className='absolute pointer-events-none left-0'
                  ref={fileInput}
                  type='file'
                  onChange={handleUploadImage}
                  accept='image/png, image/gif, image/jpeg'
                />
              </div>
              <p className='text-[#999999] text-xs'>
                Recommended image size is ---x---
              </p>
            </div>
            <div className='w-full h-[0.5px] bg-black/30 mt-5'></div>
            <div className='flex space-x-3 justify-end mt-8  w-full'>
              <button
                onClick={() => {
                  navigate(`/account`);
                }}
                disabled={isLoading}
                type='button'
                className='py-[11px]  font-medium max-w-[98.31px] text-sm  rounded-md px-5 bg-black bg-opacity-20'
                to='/all-purchase-partner'
              >
                Close
              </button>
              <SubmitBtn
                text={editValue ? 'Update' : 'Submit'}
                isSubmitting={isLoading}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountForm;
