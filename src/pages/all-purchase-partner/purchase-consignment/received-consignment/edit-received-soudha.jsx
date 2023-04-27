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

const editReceivedConsignment = async data => {
  const res = await axios.patch(
    `${SERVER_URL}/soudha/consignmentReceived/${data.id}`,
    data
  );
  return res.data;
};

const EditReceivedSoudha = () => {
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
          <h1 className='text-xl font-medium'>Edit Received Soudha</h1>
        </div>
        <div className='p-6'>
          <ReceivedConsignmentForm
            editValue={state}
            apiFunction={editReceivedConsignment}
          />
        </div>
      </div>
    </div>
  );
};

export default EditReceivedSoudha;
