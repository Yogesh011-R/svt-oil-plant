import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import BreadCrumb from '../../../components/common/BreadCrumb';
import * as Yup from 'yup';
import 'yup-phone-lite';
import Input from '../../../components/common/Form/Input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from '../../../components/common/Form/SubmitBtn';
import CustomSelect from '../../../components/common/Form/CustomSelect';
import DatePicker from '../../../components/common/Form/DatePicker';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';

const addBookings = async data => {
  const res = await axios.post(`${SERVER_URL}/soudha/saveSoudha`, data);
  return res.data;
};

const AddPurchaseConsignment = () => {
  const navigate = useNavigate();
  const { partnerId } = useParams();

  const [oilTypes, setOilTypes] = useState([
    { id: 1, label: 'EDIBLE OIL', value: 'EDIBLEOIL' },
    { id: 2, label: 'ARGAN OIL', value: 'ARGANOIL' },
    { id: 3, label: 'SOYABEAN OIL', value: 'SOYABEANOIL' },
    { id: 4, label: 'NUT OIL', value: 'NUTOIL' },
  ]);

  const [showAddNewOil, setShowAddNewOil] = useState(false);
  const initialValues = {
    partnerViewData: {
      id: partnerId,
    },
    bookingDate: new Date(),
    oilType: '',
    newOilType: '',
    quantity: '',
    rate: '',

    // advancePayment: '',
  };
  const validationSchema = Yup.object({
    bookingDate: Yup.string('Please Select a Date').required(
      'Date is required'
    ),
    oilType: Yup.string().required('Oil Type is required'),
    newOilType: Yup.string(),
    quantity: Yup.string().required('Booked Quantity is required'),
    rate: Yup.string().required('Rate is required'),
    // advancePayment: Yup.string(),
  });

  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: addBookings,
    onSuccess: () => {
      navigate(`/all-purchase-partner/${partnerId}`);
    },
  });

  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/purchase-soudha' }]}
        currentPage='New Purchase soudha'
      />
      <div className='max-w-[480px] w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Book New Purchase Consignment</h1>
        </div>
        <div className='p-6'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setFieldError }) => {
              if (showAddNewOil && !values.newOilType) {
                return setFieldError('newOilType', 'NewOilType is required');
              }
              delete values.newOilType;
              values.status = 'CREATED';
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
                  <div className='relative mb-4 max-w-[360px] w-full'>
                    <DatePicker
                      label='Booking Date*'
                      placeholder='Select Booking Date*'
                      id='bookingDate'
                      name='bookingDate'
                    />
                  </div>
                  <div className='flex  space-x-3'>
                    <div className='max-w-[360px] w-full '>
                      <CustomSelect
                        name='oilType'
                        id='oilType'
                        label='Oil type/name*'
                        placeholder='Select Oil type/name'
                        options={oilTypes}
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setShowAddNewOil(prev => !prev);
                          validateForm();
                        }}
                        type='button'
                        className='mt-9'
                        title={
                          showAddNewOil
                            ? ' Hide Add New Oil Type '
                            : 'Add New Oil Type'
                        }
                      >
                        {!showAddNewOil ? (
                          <svg
                            width='35'
                            height='36'
                            viewBox='0 0 35 36'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              y='0.54306'
                              width='35'
                              height='35'
                              rx='17.5'
                              fill='#16ABE5'
                            />
                            <path
                              d='M11.56 19.1471V16.8331H16.474V12.2311H18.866V16.8331H23.78V19.1471H18.866V23.7751H16.474V19.1471H11.56Z'
                              fill='white'
                            />
                          </svg>
                        ) : (
                          <svg
                            width='35'
                            height='36'
                            viewBox='0 0 35 36'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              y='0.54306'
                              width='35'
                              height='35'
                              rx='17.5'
                              fill='#16ABE5'
                            />
                            <path
                              d='M12.9742 19.6471V17.3331H23.5562V19.6471H12.9742Z'
                              fill='white'
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {/* {showAddNewOil && ( */}
                  <div
                    className={`max-w-[360px] w-full relative ${
                      showAddNewOil ? 'block' : 'hidden'
                    }`}
                  >
                    <Input
                      label='New Oil type*'
                      name='newOilType'
                      id='newOilType'
                      placeholder='Enter new oil type'
                    />
                    <div className='absolute top-9 right-5'>
                      <button
                        type='button'
                        onClick={() => {
                          if (!values.newOilType)
                            return setFieldError(
                              'newOilType',
                              'NewOilType is required'
                            );
                          if (
                            oilTypes.some(item => {
                              return (
                                item.value.toLowerCase() ===
                                values.newOilType.toLowerCase()
                              );
                            })
                          ) {
                            return setFieldError(
                              'newOilType',
                              'Oil Type already exists'
                            );
                          }

                          setOilTypes(prev => {
                            return [
                              ...prev,
                              {
                                id: new Date().valueOf(),
                                value: values.newOilType.toUpperCase(),
                                label: values.newOilType.toUpperCase(),
                              },
                            ];
                          });
                          setFieldValue('newOilType', '');
                          setShowAddNewOil(prev => !prev);
                        }}
                        className='text-sm text-primary font-bold'
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  {/* )} */}

                  <div className='max-w-[360px] w-full'>
                    <Input
                      label='Booked Quantity in kg*'
                      name='quantity'
                      id='quantity'
                      placeholder='Enter Booked quantity'
                    />
                  </div>
                  <div className='max-w-[360px] w-full'>
                    <Input
                      label='Rate for 10 kg*'
                      name='rate'
                      id='rate'
                      placeholder='Enter rate for 10 kg'
                    />
                  </div>

                  <div className='max-w-[360px] w-full '>
                    <Input
                      label='Advance Payment'
                      name='advancePayment'
                      id='advancePayment'
                      placeholder='Enter paid amount'
                    />
                  </div>

                  <div className='flex space-x-3 justify-end mt-8 max-w-[360px] w-full'>
                    <button
                      onClick={() => {
                        navigate(`/all-purchase-partner/${partnerId}`);
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

export default AddPurchaseConsignment;
