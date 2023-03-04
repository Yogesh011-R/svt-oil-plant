import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb';
import TableHeader from '../../components/common/TableHeader';
import TableInstance from '../../components/Table/TableInstance';

const Account = () => {
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Photo',
      accessor: 'photo',
      Cell: ({ row }) => {
        return (
          <img
            src={row.original.photo}
            alt=''
            className='w-11 h-11 rounded-full'
          />
        );
      },
    },

    {
      Header: 'Full Name',
      accessor: 'fullName',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Password',
      accessor: 'password',
    },

    {
      Header: ' Status',
      accessor: 'status',
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.status === 'active' ? (
              <div className='bg-green text-green  bg-opacity-20  w-fit px-5 p-1 rounded-full text-[11px] mx-auto'>
                Active
              </div>
            ) : (
              <div className='bg-red text-red  bg-opacity-20  w-fit px-5 p-1 rounded-full text-[11px] mx-auto'>
                Inactive
              </div>
            )}
          </div>
        );
      },
    },

    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => {
        return (
          <div className='flex space-x-3 justify-center'>
            <button
              type='button'
              title='Edit'
              className='bg-primary p-1.5  text-xl text-white rounded'
            >
              <HiPencil />
            </button>
            <button
              type='button'
              title='Delete'
              className='bg-red  p-1.5  text-xl text-white rounded'
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        );
      },
      disableSortBy: true,
    },
  ];
  const [cSortBy, cSetSortBy] = useState();
  const [desc, setDesc] = useState(true);

  // Headers

  const [searchValue, setSearchValue] = useState('');
  const [entriesValue, setEntriesValue] = useState(10);
  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/' }]}
        currentPage='All Account'
      />
      <section className='bg-white my-8 rounded-[10px]'>
        <TableHeader
          title='All Users List'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          setEntriesValue={setEntriesValue}
          addLink='Add New User'
          btnText='Add New User'
        />
        <div>
          <TableInstance
            cSortBy={cSortBy}
            cSetSortBy={cSetSortBy}
            desc={desc}
            setDesc={setDesc}
            tableData={[
              {
                id: 1,
                photo: 'https://randomuser.me/api/portraits/women/10.jpg',
                fullName: 'Jane Doe',
                phoneNumber: '+1-202-555-0168',
                email: 'janedoe@example.com',
                password: 'P@ssw0rd1',
                status: 'active',
              },
              {
                id: 2,
                photo: 'https://randomuser.me/api/portraits/men/11.jpg',
                fullName: 'John Smith',
                phoneNumber: '+1-202-555-0177',
                email: 'johnsmith@example.com',
                password: 'P@ssw0rd2',
                status: 'inactive',
              },
              {
                id: 3,
                photo: 'https://randomuser.me/api/portraits/women/12.jpg',
                fullName: 'Alice Johnson',
                phoneNumber: '+1-202-555-0186',
                email: 'alicejohnson@example.com',
                password: 'P@ssw0rd3',
                status: 'active',
              },
              {
                id: 4,
                photo: 'https://randomuser.me/api/portraits/men/13.jpg',
                fullName: 'Bob Brown',
                phoneNumber: '+1-202-555-0195',
                email: 'bobbrown@example.com',
                password: 'P@ssw0rd4',
                status: 'inactive',
              },
              {
                id: 5,
                photo: 'https://randomuser.me/api/portraits/women/14.jpg',
                fullName: 'Emily Davis',
                phoneNumber: '+1-202-555-0204',
                email: 'emilydavis@example.com',
                password: 'P@ssw0rd5',
                status: 'active',
              },
            ]}
            columnName={TABLE_COLUMNS}
          />
        </div>
      </section>
    </div>
  );
};

export default Account;
