import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb';
import AccountForm from '../../components/common/FormComponents/AccountForm';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';

const editUser = async data => {
  const res = await axios.patch(`${SERVER_URL}/users/${data.id}`, data);

  return res.data;
};

const EditUser = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate replace to='/all-purchase-partner' />;
  }

  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/' }]}
        currentPage='Edit User'
      />
      <div className='max-w-4xl w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Edit New User</h1>
        </div>
        <div className='p-6'>
          <AccountForm apiFunction={editUser} editValue={state} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
