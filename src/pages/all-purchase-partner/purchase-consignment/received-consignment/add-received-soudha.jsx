import React from 'react';
import BreadCrumb from '../../../../components/common/BreadCrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import DatePicker from '../../../../components/common/Form/DatePicker';
import Input from '../../../../components/common/Form/Input';
import SubmitBtn from '../../../../components/common/Form/SubmitBtn';
import { SERVER_URL } from '../../../../utils/config';
import axios from 'axios';
import { useMutation } from 'react-query';

const addPartSoudha = async data => {
  const res = await axios.post(
    `${SERVER_URL}/part-soudha/savePartSoudha`,
    data
  );
  return res.data;
};

const AddReceivedSoudha = () => {
  const { partnerId, consignmentId } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    id: consignmentId,
    bookingDate: new Date(),
    billNumber: '',
    quantity: '',
    rate: '',
    totalAmount: '',
    differenceAmount: '',
    vehicleNumber: '',
    unloadWeight: '',
    shortWeight: '',
    paidAmount: '',
  };
  const validationSchema = Yup.object({
    bookingDate: Yup.string('Please Select a Date').required(
      'Date is required'
    ),
    billNumber: Yup.string().required('Bill Number is required'),
    quantity: Yup.string().required('Bill Quantity is required'),
    rate: Yup.string().required('Bill Rate is required'),
    totalAmount: Yup.string().required('Totla Bill Amount is required'),
    differenceAmount: Yup.string(),
    vehicleNumber: Yup.string().required('Vehicle Number is required'),
    unloadWeight: Yup.string().required('Unload Quantity is required'),
    shortWeight: Yup.string().required('Short Quantity is required'),
    paidAmount: Yup.string(),
  });

  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: addPartSoudha,
    onSuccess: () => {
      navigate(`/all-purchase-partner/${partnerId}/${consignmentId}`);
    },
  });

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
          <Formik
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
                        id='bookingDate'
                        name='bookingDate'
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
                        name='billNumber'
                        id='billNumber'
                        placeholder='Enter bill no'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Vehicle number*'
                        name='vehicleNumber'
                        id='vehicleNumber '
                        placeholder='Enter vehicle number'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Billing quantity*'
                        name='quantity'
                        id='quantity'
                        placeholder='Billing quantity*'
                      />
                    </div>

                    <div className=' w-full'>
                      <Input
                        label='Unload quantity*'
                        name='unloadWeight'
                        id='unloadWeight'
                        placeholder='Enter unload quantity'
                      />
                    </div>

                    <div className=' w-full'>
                      <Input
                        label='Billing rate for 10kg*'
                        name='rate'
                        id='rate'
                        placeholder='Enter price'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Short quantity*'
                        name='shortWeight'
                        id='shortWeight'
                        placeholder='Enter short quantity'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Total billing amount*'
                        name='totalAmount'
                        id='totalAmount'
                        placeholder='Enter price'
                      />
                    </div>
                    <div className=' w-full'>
                      <Input
                        label='Payment'
                        name='paidAmount'
                        id='paidAmount'
                        placeholder='Enter paid amount'
                      />
                    </div>
                  </div>
                  <div className='flex space-x-3 justify-end mt-8  w-full'>
                    <button
                      onClick={() => {
                        navigate(
                          `/all-purchase-partner/${partnerId}/${consignmentId}`
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
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddReceivedSoudha;
