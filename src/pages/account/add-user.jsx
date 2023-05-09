import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb';
import AccountForm from '../../components/common/FormComponents/AccountForm';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { useSelector } from 'react-redux';

const addUser = async data => {
  const res = await axios.post(`${SERVER_URL}/users`, data);

  return res.data;
};

const AddUser = () => {
  const { user } = useSelector(state => {
    return state.auth;
  });

  if (user.role !== 'admin') {
    return <Navigate replace to='/' />;
  }
  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/' }]}
        currentPage='New User'
      />
      <div className='max-w-4xl w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Add New User</h1>
        </div>
        <div className='p-6'>
          <AccountForm apiFunction={addUser} />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
