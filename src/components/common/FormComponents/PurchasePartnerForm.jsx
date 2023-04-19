import React from 'react';
import { Formik, Form, Field } from 'formik';
import 'yup-phone-lite';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Input from '../Form/Input';
import CustomSelect from '../Form/CustomSelect';
import SubmitBtn from '../Form/SubmitBtn';

const PurchasePartnerForm = ({ apiFunction, values }) => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: '',
    location: '',
    whatsApp: '',
    status: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Partner Name is required'),
    location: Yup.string().required('Location is required'),
    whatsApp: Yup.string()
      .phone('IN', "'Whatsapp Number must be a valid phone number")
      .required('Whatsapp Number is required'),
    status: Yup.string().required('Status is required'),
  });

  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: apiFunction,
    onSuccess: () => {
      navigate('/all-purchase-partner');
    },
  });
  return (
    <div className='p-6'>
      <Formik
        initialValues={values || initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          mutate(values);
        }}
      >
        <Form className='form px-3'>
          <Input
            label='Partner Name*'
            name='firstName'
            id='firstName'
            placeholder='Enter Partner name'
          />
          <Input
            label='Location*'
            name='location'
            id='location'
            placeholder='Enter Location'
          />
          <Input
            label='Whatsapp Number*'
            name='whatsApp'
            id='whatsApp'
            placeholder='Enter Whatsapp number'
          />
          <CustomSelect
            name='status'
            id='status'
            label='Status*'
            placeholder='Status'
            options={[
              { id: 1, value: 'ACTIVE', label: 'Active' },
              { id: 2, value: 'INACTIVE', label: 'Inactive' },
            ]}
          />

          <div className='flex space-x-3 justify-end mt-8'>
            <button
              onClick={() => {
                navigate(-1);
              }}
              disabled={isLoading}
              type='button'
              className='py-[11px]  font-medium max-w-[98.31px] text-sm  rounded-md px-5 bg-black bg-opacity-20'
              to='/all-purchase-partner'
            >
              Close
            </button>
            <SubmitBtn text='Submit' isSubmitting={isLoading} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PurchasePartnerForm;
