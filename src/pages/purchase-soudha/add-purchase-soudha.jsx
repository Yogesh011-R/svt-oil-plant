import { Formik, Form, Field } from 'formik';
import React from 'react';
import BreadCrumb from '../../components/common/BreadCrumb';
import * as Yup from 'yup';
import 'yup-phone-lite';
import Input from '../../components/common/Form/Input';
import { Link } from 'react-router-dom';
import SubmitBtn from '../../components/common/Form/SubmitBtn';

const AddPurchaseSoudha = () => {
  const initialValues = {
    partnerName: '',
    location: '',
    whatsappNo: '',
    status: '',
  };
  const validationSchema = Yup.object({
    partnerName: Yup.string().required('Partner Name is required'),
    location: Yup.string().required('Location is required'),
    whatsappNo: Yup.string()
      .phone('IN', "'Whatsapp Number must be a valid phone number")
      .required('Whatsapp Number is required'),
    status: Yup.string().required('Status is required'),
  });

  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/purchase-soudha' }]}
        currentPage='New Purchase soudha'
      />
      <div className='max-w-md w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Add Soudha Partner</h1>
        </div>
        <div className='p-6'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(
                '🚀 ~ file: add-purchase-soudha.jsx:46 ~ AddPurchaseSoudha ~ values:',
                values
              );
            }}
          >
            <Form className='form px-3'>
              <Input
                label='Partner Name*'
                name='partnerName'
                id='partnerName'
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
                name='whatsappNo'
                id='whatsappNo'
                placeholder='Enter Whatsapp number'
              />

              <div className='flex space-x-3 justify-end mt-2'>
                <Link
                  className='py-[11px] text-sm font-medium  rounded-md px-5 bg-black bg-opacity-20'
                  to='/purchase-soudha'
                >
                  Close
                </Link>
                <SubmitBtn text='Submit' />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseSoudha;
