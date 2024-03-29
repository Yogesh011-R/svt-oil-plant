import React from 'react';
import BreadCrumb from '../../../../components/common/BreadCrumb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import DatePicker from '../../../../components/common/Form/DatePicker';
import Input from '../../../../components/common/Form/Input';
import SubmitBtn from '../../../../components/common/Form/SubmitBtn';
import { SERVER_URL } from '../../../../utils/config';
import axios from 'axios';
import { useMutation } from 'react-query';
import ReceivedConsignmentForm from '../../../../components/common/FormComponents/ReceivedConsignmentForm';

const addReceivedConsignment = async data => {
  const res = await axios.post(
    `${SERVER_URL}/soudha/consignmentReceived`,
    data
  );
  return res.data;
};

const AddReceivedSoudha = () => {
  const { partnerId, consignmentId: bookedConsignmentId } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <BreadCrumb
        paths={[
          { id: 1, name: 'Home', to: '/' },
          { id: 1, name: 'Purchase Partner', to: '/all-purchase-partner' },
          {
            id: 1,
            name: 'Booked Consignment',
            to: `/all-purchase-partner/${partnerId}`,
          },
        ]}
        currentPage='Received consignment'
      />
      <div className='max-w-[846.77px] w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Add New Received Soudha</h1>
        </div>
        <div className='p-6'>
          <ReceivedConsignmentForm
            apiFunction={addReceivedConsignment}
            bookedConsignmentInfo={state?.bookedConsignment}
          />
          {/* <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setFieldError }) => {
              mutate(values);
            }}
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
                    <div className='relative mb-4  w-full'>
                      <DatePicker
                        label='Booking Date*'
                        placeholder='Select Booking Date*'
                        id='date'
                        name='date'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Other amount'
                        name='otherAmount'
                        id='otherAmount'
                        placeholder='Enter amount'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Bill no*'
                        name='billNo'
                        id='billNo'
                        placeholder='Enter bill no'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Vehicle number*'
                        name='vehicleNo'
                        id='vehicleNo '
                        placeholder='Enter vehicle number'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Billing Quantity*'
                        name='billingQuantity'
                        id='billingQuantity'
                        placeholder='Billing Quantity*'
                      />
                    </div>

                    <div className=' w-full'>
                      <Input
                        label='Unload Quantity*'
                        name='unloadQuantity'
                        id='unloadQuantity'
                        placeholder='Enter unload Quantity'
                      />
                    </div>

                    <div className=' w-full'>
                      <Input
                        label='Billing Rate for 10kg*'
                        name='billingRate'
                        id='billingRate'
                        placeholder='Enter price'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Short Quantity*'
                        name='shortQuantity'
                        id='shortQuantity'
                        placeholder='Enter short Quantity'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Total Billing amount*'
                        name='totalBillingAmount'
                        id='totalBillingAmount'
                        placeholder='Enter price'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Payment'
                        name='payment'
                        id='payment'
                        placeholder='Enter paid amount'
                      />
                    </div>
                  </div>
                  <div className='flex space-x-3 justify-end mt-8  w-full'>
                    <button
                      onClick={() => {
                        navigate(
                          `/all-purchase-partner/${partnerId}/${bookedConsignmentId}`
                        );
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
              );
            }}
          </Formik> */}
        </div>
      </div>
    </div>
  );
};

export default AddReceivedSoudha;
