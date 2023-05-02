import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import DatePicker from '../Form/DatePicker';
import CustomSelect from '../Form/CustomSelect';
import Input from '../Form/Input';
import SubmitBtn from '../Form/SubmitBtn';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addToast } from '../../../redux/features/toastSlice';
import { ERROR, SUCCESS } from '../../../utils/constant';
import { handleError } from '../../../utils/helper';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';
import CustomAsyncSelect from '../Form/CustomAsyncSelect';
import AsyncSelect from 'react-select/async';

const BookingConsignmentForm = ({ apiFunction, editValue }) => {
  const getOilTypes = async () => {
    const res = await axios.get(`${SERVER_URL}/soudha/oilType`);
    // const oilTypes = res.data.oilTypes;
    // const data = oilTypes?.map(({ oilName, id }) => ({
    //   id: id,
    //   value: oilName,
    //   label: oilName,
    // }));

    // return data;
    return res.data;
  };
  const navigate = useNavigate();
  const { partnerId } = useParams();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const [showAddNewOil, setShowAddNewOil] = useState(false);

  const [oilTypes, setOilTypes] = useState([
    { id: 1, label: 'EDIBLE OIL', value: 'EDIBLE OIL' },
    { id: 2, label: 'ARGAN OIL', value: 'ARGAN OIL' },
    { id: 3, label: 'SOYABEAN OIL', value: 'SOYABEAN OIL' },
    { id: 4, label: 'NUT OIL', value: 'NUT OIL' },
  ]);

  const initialValues = {
    partnerId,
    bookingDate: editValue ? editValue.bookingDate : new Date(),
    oilType: editValue ? editValue.oilType : '',
    newOilType: '',
    bookedQuantity: editValue ? editValue.bookedQuantity : '',
    rate: editValue ? editValue.rate : '',
    advancePayment: editValue ? editValue.advancePayment : '',
  };
  const validationSchema = Yup.object({
    bookingDate: Yup.string('Please Select a Date').required(
      'Date is required'
    ),
    oilType: Yup.string().required('Oil Type is required'),
    newOilType: Yup.string(),
    bookedQuantity: Yup.string().required('Booked quantity is required'),
    rate: Yup.string().required('Rate is required'),
    advancePayment: Yup.string(),
  });

  const {
    data: oilTypesData,
    isError,
    isLoading: isLoadingOilTypes,
  } = useQuery(['getOilTypes'], getOilTypes);

  useEffect(() => {
    if (isLoadingOilTypes) return;

    setOilTypes(
      oilTypesData?.oilTypes?.map(item => {
        return {
          id: item.id,
          label: item.oilName,
          value: item.oilName,
        };
      })
    );
  }, [oilTypesData, isLoadingOilTypes]);

  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: apiFunction,
    onSuccess: () => {
      navigate(`/all-purchase-partner/${partnerId}`);
      dispatch(
        addToast({
          kind: SUCCESS,
          msg: `Consignment  ${editValue ? 'updated' : 'added'} successfully`,
        })
      );
      queryClient.invalidateQueries('getBookedConsignments', 'getAllPartners');
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

  const addOilType = async data => {
    const finalData = {
      oilName: data,
    };
    try {
      const res = await axios.post(`${SERVER_URL}/soudha/oilType`, finalData);
      queryClient.invalidateQueries('getOilTypes');
      dispatch(
        addToast({
          kind: SUCCESS,
          msg: `Oil Type added successfully`,
        })
      );
    } catch (error) {
      const message = handleError(error);

      dispatch(
        addToast({
          kind: ERROR,
          msg: message,
        })
      );
    }
  };

  return (
    <div className='p-6'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(formValue, { setFieldError }) => {
          if (showAddNewOil && !formValue.newOilType) {
            return setFieldError('newOilType', 'NewOilType is required');
          }
          if (editValue) {
            formValue.id = editValue.id;
            delete formValue.partnerId;
          }
          delete formValue.newOilType;

          mutate(formValue);
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
                    cacheOptions
                    name='oilType'
                    id='oilType'
                    label='Oil type/name*'
                    placeholder='Select Oil type/name'
                    options={oilTypes}

                    // defaultOptions={oilTypes}
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

                      addOilType(values.newOilType);
                      // if (
                      //   oilTypes.some(item => {
                      //     return (
                      //       item.value.toLowerCase() ===
                      //       values.newOilType.toLowerCase()
                      //     );
                      //   })
                      // ) {
                      //   return setFieldError(
                      //     'newOilType',
                      //     'Oil Type already exists'
                      //   );
                      // }

                      // setOilTypes(prev => {
                      //   return [
                      //     ...prev,
                      //     {
                      //       id: new Date().valueOf(),
                      //       value: values.newOilType.toUpperCase(),
                      //       label: values.newOilType.toUpperCase(),
                      //     },
                      //   ];
                      // });
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
                  name='bookedQuantity'
                  id='bookedQuantity'
                  placeholder='Enter Booked Quantity'
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
                <SubmitBtn
                  text={editValue ? 'Update' : 'Submit'}
                  isSubmitting={isLoading}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingConsignmentForm;
