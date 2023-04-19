import { Formik, Form, Field } from 'formik';
import 'yup-phone-lite';
import * as Yup from 'yup';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb';
import SubmitBtn from '../../components/common/Form/SubmitBtn';
import Input from '../../components/common/Form/Input';
import CustomSelect from '../../components/common/Form/CustomSelect';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { useMutation } from 'react-query';
import PurchasePartnerForm from '../../components/common/FormComponents/PurchasePartnerForm';

const addPartner = async data => {
  const res = await axios.post(`${SERVER_URL}/partner/addPartner`, data);
  return res.data;
};

const AddPurchaseConsignment = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/all-purchase-partner' }]}
        currentPage='New Purchase soudha'
      />
      <div className='max-w-md w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Add new Soudha Partner</h1>
        </div>
        <PurchasePartnerForm apiFunction={addPartner} />
        {/* <div className='p-6'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              mutate(values);
              console.log(
                '🚀 ~ file: add-purchase-soudha.jsx:46 ~ AddPurchaseSConsignment~ values:',
                values
              );
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
        </div> */}
      </div>
    </div>
  );
};

export default AddPurchaseConsignment;
