import { Form, Formik } from 'formik';
import React from 'react';
import DatePicker from '../Form/DatePicker';
import Input from '../Form/Input';
import SubmitBtn from '../Form/SubmitBtn';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { ERROR, SUCCESS } from '../../../utils/constant';
import { handleError } from '../../../utils/helper';
import { addToast } from '../../../redux/features/toastSlice';
import { useDispatch } from 'react-redux';
import AutoCalculateInput from '../Form/AutoCalculateInput';
import Loading from '../../Loading';

const ReceivedConsignmentForm = ({ apiFunction, editValue, pricePerKG }) => {
  const { partnerId, consignmentId: bookedConsignmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const initialValues = {
    bookedConsignmentId,
    date: editValue ? new Date(editValue.date) : new Date(),
    billNo: editValue ? editValue.billNo : '',
    billingQuantity: editValue ? editValue.billingQuantity : '',
    billingRate: editValue ? editValue.billingRate : '',
    totalBillingAmount: editValue ? editValue.totalBillingAmount : '',
    otherAmount: editValue ? editValue.otherAmount : '',
    vehicleNo: editValue ? editValue.vehicleNo : '',
    unloadQuantity: editValue ? editValue.unloadQuantity : '',
    shortQuantity: editValue ? editValue.shortQuantity : '',
    payment: editValue ? editValue.payment : '',
    gst: editValue ? editValue.gst : '',
  };
  const validationSchema = Yup.object({
    date: Yup.string('Please Select a Date').required('Date is required'),
    billNo: Yup.string().required('Bill Number is required'),
    billingQuantity: Yup.string().required('Bill Quantity is required'),
    billingRate: Yup.string().required('Bill Rate is required'),
    totalBillingAmount: Yup.string().required('Total Bill Amount is required'),
    otherAmount: Yup.number().nullable(),
    vehicleNo: Yup.string().required('Vehicle Number is required'),
    unloadQuantity: Yup.string().required('Unload Quantity is required'),
    shortQuantity: Yup.string().required('Short Quantity is required'),
    payment: Yup.string(),
    gst: Yup.string().required('GST is required'),
  });

  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: apiFunction,
    onSuccess: () => {
      navigate(`/all-purchase-partner/${partnerId}/${bookedConsignmentId}`);
      dispatch(
        addToast({
          kind: SUCCESS,
          msg: `Consignment  ${editValue ? 'updated' : 'added'} successfully`,
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
  return (
    <>
      {isLoading && <Loading />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          if (editValue) {
            values.id = editValue.id;
            delete values.bookedConsignmentId;
          }

          if (editValue) {
            values.difference =
              +values.billingQuantity * (+values.billingRate / 10) -
              +values.billingQuantity * (+editValue.pricePerKG / 10);
          }
          if (pricePerKG) {
            values.difference =
              +values.billingQuantity * (+values.billingRate / 10) -
              +values.billingQuantity * (+pricePerKG / 10);
          }

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
                    disabled={isLoading}
                  />
                </div>
                <div className=' w-full'>
                  <Input
                    label='Other amount'
                    name='otherAmount'
                    id='otherAmount'
                    placeholder='Enter amount'
                    disabled={isLoading}
                  />
                </div>
                <div className=' w-full'>
                  <Input
                    label='Bill no*'
                    name='billNo'
                    id='billNo'
                    placeholder='Enter bill no'
                    disabled={isLoading}
                  />
                </div>
                <div className=' w-full'>
                  <Input
                    label='Vehicle number*'
                    name='vehicleNo'
                    id='vehicleNo '
                    placeholder='Enter vehicle number'
                    disabled={isLoading}
                  />
                </div>
                <div className=' w-full'>
                  <Input
                    label='Billing Quantity*'
                    name='billingQuantity'
                    id='billingQuantity'
                    placeholder='Billing Quantity*'
                    disabled={isLoading}
                  />
                </div>

                <div className=' w-full'>
                  <Input
                    label='Unload Quantity*'
                    name='unloadQuantity'
                    id='unloadQuantity'
                    placeholder='Enter unload Quantity'
                    disabled={isLoading}
                  />
                </div>

                <div className=' w-full'>
                  <Input
                    label='Billing Rate for 10kg*'
                    name='billingRate'
                    id='billingRate'
                    placeholder='Enter price'
                    disabled={isLoading}
                  />
                </div>
                <div className=' w-full'>
                  <AutoCalculateInput
                    label='Short Quantity*'
                    name='shortQuantity'
                    id='shortQuantity'
                    placeholder='Enter short Quantity'
                    disabled={true}
                  />
                </div>
                <div className=' w-full'>
                  <Input
                    label='GST*'
                    name='gst'
                    id='gst'
                    placeholder='Enter GST percentage'
                    disabled={isLoading}
                  />
                </div>

                <div className=' w-full'>
                  <Input
                    label='Payment'
                    name='payment'
                    id='payment'
                    placeholder='Enter paid amount'
                    disabled={true}
                  />
                </div>
                <div className=' w-full'>
                  <AutoCalculateInput
                    label='Total Billing amount*'
                    name='totalBillingAmount'
                    id='totalBillingAmount'
                    placeholder='Enter price'
                    disabled={true}
                  />
                </div>
              </div>
              <div className='flex space-x-3 justify-end mt-8  w-full'>
                <button
                  onClick={() => {
                    navigate(
                      `/all-purchase-partner/${partnerId}/${bookedConsignmentId}`,
                      {
                        replace: true,
                      }
                    );
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
    </>
  );
};

export default ReceivedConsignmentForm;
