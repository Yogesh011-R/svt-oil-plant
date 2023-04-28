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
  const res = await axios.post(`${SERVER_URL}/soudha/partner`, data);
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
      </div>
    </div>
  );
};

export default AddPurchaseConsignment;
