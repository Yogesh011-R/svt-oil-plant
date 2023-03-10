import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AddBtn from '../../components/common/AddBtn';
import BreadCrumb from '../../components/common/BreadCrumb';
import ExportBtn from '../../components/common/ExportBtn';
import SelectEntries from '../../components/common/SelectEntries';
import TableHeader from '../../components/common/TableHeader';
import TableSearch from '../../components/common/TableSearch';
import TableInstance from '../../components/Table/TableInstance';

const PurchaseSoudha = () => {
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },

    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Whatsapp number',
      accessor: 'whatsappNo',
    },
    {
      Header: 'Total quantity in kg',
      accessor: 'totalQuantityInKg',
    },
    {
      Header: 'Average rate',
      accessor: 'averageRate',
      Cell: ({ row }) => {
        return <span>₹{row.original.averageRate}</span>;
      },
    },
    {
      Header: 'All Soudha',
      accessor: 'allSoudha',
      Cell: ({ row }) => {
        return (
          <div>
            <Link
              to={`${row.original.id}`}
              className='bg-secondary py-2.5 px-5 rounded-md text-white text-[11px]'
            >
              View
            </Link>
          </div>
        );
      },
    },
    {
      Header: 'Partner Status',
      accessor: 'partnerStatus',
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.partnerStatus ? (
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
      Header: 'Soudha Status',
      accessor: 'soudhaStatus',
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.soudhaStatus ? (
              <div className='bg-green text-green  bg-opacity-20  w-fit px-5 p-1 rounded-full text-[11px] mx-auto'>
                Complete
              </div>
            ) : (
              <div className='bg-yellow text-yellow  bg-opacity-20  w-fit px-5 p-1 rounded-full text-[11px] mx-auto'>
                Pending
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
        currentPage='New Purchase soudha'
      />
      <section className='bg-white my-8 rounded-[10px]'>
        <TableHeader
          title='All Purchase Soudha Partnerst'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          setEntriesValue={setEntriesValue}
          addLink='add-purchase-partner'
          btnText='Add new Partner'
        />

        <div>
          <TableInstance
            cSortBy={cSortBy}
            cSetSortBy={cSetSortBy}
            desc={desc}
            setDesc={setDesc}
            tableData={[
              {
                id: '123anil',
                name: 'Anil Kumar',
                location: 'Bangalore',
                whatsappNo: '1234567890',
                totalQuantityInKg: 100,
                averageRate: '50.5',
                partnerStatus: true,
                soudhaStatus: false,
              },
              {
                id: '456arun',
                name: 'Arun',
                location: 'Mumbai',
                whatsappNo: '0987654321',
                totalQuantityInKg: 50,
                averageRate: 30.25,
                partnerStatus: false,
                soudhaStatus: true,
              },
              {
                id: '789kumar ',
                name: 'Kumar',
                location: 'Delhi',
                whatsappNo: '9876543210',
                totalQuantityInKg: 75,
                averageRate: 40.75,
                partnerStatus: true,
                soudhaStatus: true,
              },
            ]}
            columnName={TABLE_COLUMNS}
          />
        </div>
      </section>
    </div>
  );
};

export default PurchaseSoudha;
