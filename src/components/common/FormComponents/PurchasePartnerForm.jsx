import React from 'react';
import { Formik, Form, Field } from 'formik';
import 'yup-phone-lite';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import Input from '../Form/Input';
import CustomSelect from '../Form/CustomSelect';
import SubmitBtn from '../Form/SubmitBtn';
import { useDispatch } from 'react-redux';
import { addToast } from '../../../redux/features/toastSlice';
import { ERROR, SUCCESS } from '../../../utils/constant';
import { handleError } from '../../../utils/helper';

const PurchasePartnerForm = ({ apiFunction, values }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const queryClient = useQueryClient();

  const { mutate, data, error, isLoading } = useMutation({
    mutationFn: apiFunction,
    onSuccess: () => {
      navigate('/all-purchase-partner');
      if (!values) {
        dispatch(
          addToast({
            kind: SUCCESS,
            msg: 'Partner added successfully',
          })
        );
        queryClient.invalidateQueries('getAllPartners');
      } else {
        dispatch(
          addToast({
            kind: SUCCESS,
            msg: 'Partner updated successfully',
          })
        );
        queryClient.invalidateQueries('getAllPartners');
      }
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
    <div className='p-6'>
      <Formik
        initialValues={values || initialValues}
        validationSchema={validationSchema}
        onSubmit={(formValues, { resetForm }) => {
          if (values) {
            mutate({
              id: values.id,
              status: formValues.status,
            });
          } else {
            mutate(formValues);
          }
        }}
      >
        <Form className='form px-3'>
          <Input
            label='Partner Name*'
            name='partnerName'
            id='partnerName'
            placeholder='Enter Partner name'
            disabled={isLoading || values}
          />
          <Input
            label='Location*'
            name='location'
            id='location'
            placeholder='Enter Location'
            disabled={isLoading || values}
          />
          <Input
            label='Whatsapp Number*'
            name='whatsappNo'
            id='whatsappNo'
            placeholder='Enter Whatsapp number'
            disabled={isLoading || values}
          />
          <CustomSelect
            name='status'
            id='status'
            label='Status*'
            placeholder='Status'
            disabled={isLoading}
            options={[
              { id: 1, value: 'active', label: 'Active' },
              { id: 2, value: 'inactive', label: 'Inactive' },
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
            <SubmitBtn
              text={values ? 'Update' : 'Submit'}
              isSubmitting={isLoading}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PurchasePartnerForm;
