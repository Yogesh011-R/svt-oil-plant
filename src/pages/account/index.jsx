import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb';
import TableHeader from '../../components/common/TableHeader';
import TableInstance from '../../components/Table/TableInstance';
import axios from 'axios';
import { useQuery } from 'react-query';
import { SERVER_URL } from '../../utils/config';
import { DELETE_MODAL, entriesOption } from '../../utils/constant';
import AddBtn from '../../components/common/AddBtn';
import { decrypt } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../redux/features/modalSlice';
import { useDebounce } from 'use-debounce';

const getAllUsers = async ({ queryKey }) => {
  const [_, limit, page, query] = queryKey;

  const res = await axios.get(
    `${SERVER_URL}/users?page=${page + 1}&limit=${
      limit?.value || 10
    }&sortBy=createdAt:desc&name=${query || ''}`
  );
  return res.data;
};

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => {
    return state.auth;
  });

  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',

      Cell: ({ row }) => {
        return +row.id + 1;
      },
    },
    {
      Header: 'Photo',
      accessor: 'photo',
      Cell: ({ row }) => {
        return (
          <div className='mx-auto flex justify-center'>
            <img
              src={row.original.photo}
              alt=''
              className='w-11 h-11 rounded-full'
            />
          </div>
        );
      },
    },

    {
      Header: 'Full Name',
      accessor: 'name',
      Cell: ({ row }) => {
        return (
          <>
            {row.original.name}{' '}
            <span className='text-[10px] text-black/60'>
              {' '}
              {row.original.name === user.name && '(YOU)'}
            </span>{' '}
          </>
        );
      },
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNo',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Password',
      accessor: 'password',
      Cell: ({ row }) => {
        return <div>{decrypt(row.original.plain)}</div>;
      },
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
          <>
            {row.original.role !== 'admin' && (
              <div className='flex space-x-3 justify-center'>
                <Link
                  to='edit-user'
                  state={row.original}
                  type='button'
                  title='Edit'
                  className='bg-primary p-1.5  text-xl text-white rounded'
                >
                  <HiPencil />
                </Link>
                <button
                  onClick={() => {
                    dispatch(
                      showModal({
                        modalType: DELETE_MODAL,
                        modalProps: {
                          id: row.original.id,
                          route: 'users',
                          invalidateKey: 'getAllUsers',
                        },
                      })
                    );
                  }}
                  type='button'
                  title='Delete'
                  className='bg-red  p-1.5  text-xl text-white rounded'
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            )}
          </>
        );
      },
      disableSortBy: true,
    },
  ];
  const [cSortBy, cSetSortBy] = useState();
  const [desc, setDesc] = useState(true);

  // Headers

  const [searchValue, setSearchValue] = useState('');
  const [entriesValue, setEntriesValue] = useState(entriesOption[0]);
  const [pageIndex, setPageIndex] = useState(0);

  const [query] = useDebounce(searchValue, 500);

  const { data, isLoading, isError, error } = useQuery(
    ['getAllUsers', entriesValue, pageIndex, query],
    getAllUsers
  );

  let component = null;

  if (isError) {
    component = (
      <p className='mt-6 ml-4 pb-10 text-center'>
        An error has occurred: {error.message}
      </p>
    );
  } else if (isLoading) {
    component = <p className='mt-6 ml-4 pb-10 text-center'>Loading...</p>;
  } else if (!data?.results.length) {
    component = (
      <p className='mt-6 ml-4 pb-10 text-center'>
        No user found{' '}
        {searchValue ? (
          <span>
            for the value <span className='font-bold '>{searchValue}</span>
          </span>
        ) : (
          '...'
        )}
      </p>
    );
  } else {
    component = (
      <TableInstance
        cSortBy={cSortBy}
        cSetSortBy={cSetSortBy}
        desc={desc}
        setDesc={setDesc}
        tableData={data?.results}
        columnName={TABLE_COLUMNS}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        cPageSize={entriesValue.value}
        cSetPageSize={setEntriesValue}
        pageCount={data?.totalPages ? data?.totalPages : -1}
        totalResults={data?.totalResults}
      />
    );
  }

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
          setPageIndex={setPageIndex}
          pageIndex={pageIndex}
          addLink='add-user'
          btnText='Add New User'
          detailsData={data?.results}
          downloadInfo={{
            data: data?.results,
            fields: {
              name: 'Name',
              email: 'Email',
              phoneNo: 'Phone Number',
              status: 'Status',
              plain: 'Password',
            },
            filename: 'Users.csv',
          }}
        />
        <div>
          {component}
          {/* <TableInstance
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
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            cPageSize={entriesValue.value}
            cSetPageSize={setEntriesValue}
            pageCount={
              data?.partners?.totalPages ? data?.partners?.totalPages : -1
            }
            totalResults={data?.partners?.totalResults}
          /> */}
        </div>
      </section>
    </div>
  );
};

export default Account;
