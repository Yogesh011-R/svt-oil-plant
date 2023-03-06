import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import BreadCrumb from '../../../../components/common/BreadCrumb';
import TableHeader from '../../../../components/common/TableHeader';
import TotalDetails from '../../../../components/common/TotalDetails';
import TableInstance from '../../../../components/Table/TableInstance';

const ReceivedConsignment = () => {
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },

    {
      Header: 'Bill No',
      accessor: 'billNo',
    },
    {
      Header: 'Billing Quantity in kg',
      accessor: 'billingQuantityInKg',
    },
    {
      Header: 'Billing Rate',
      accessor: 'billingRate',
      Cell: ({ row }) => {
        return <span>₹{row.original.billingRate}</span>;
      },
    },
    {
      Header: 'Total Billing Amount',
      accessor: 'totalBillingAmt',
      Cell: ({ row }) => {
        return <span>₹{row.original.totalBillingAmt}</span>;
      },
    },
    {
      Header: 'Difference',
      accessor: 'difference',
    },
    {
      Header: 'Vehicle no',
      accessor: 'vehicleNo',
    },
    {
      Header: 'Unload weight',
      accessor: 'unloadWeight',
    },
    {
      Header: 'Short weight',
      accessor: 'shortWeight',
    },
    {
      Header: 'Payment',
      accessor: 'payment',
      Cell: ({ row }) => {
        return <span>₹{row.original.payment}</span>;
      },
    },
    {
      Header: 'Created by',
      accessor: 'createdBy',
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
  let { partnerId, consignmentId } = useParams();

  const [cSortBy, cSetSortBy] = useState();
  const [desc, setDesc] = useState(true);

  const [searchValue, setSearchValue] = useState('');
  const [entriesValue, setEntriesValue] = useState(10);
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
      <section className='bg-white my-8 rounded-[10px]'>
        <TableHeader
          title='Recieved consignment  details:'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          setEntriesValue={setEntriesValue}
          partnerDetails={partnerId}
          whatsApp={true}
          btnText='Add new received Soudha '
          addLink='add-received-soudha'
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
                date: 'Sat,20 Apr 2020',
                billNo: '1000',
                billingQuantityInKg: '50000',
                billingRate: '955.00',
                totalBillingAmt: '120000',
                difference: '100000',
                vehicleNo: 'KA635771',
                unloadWeight: '20000',
                shortWeight: '0',
                payment: '120000',
                createdBy: 'Chandrika',
              },
              {
                id: 2,
                date: 'Sat,21 Apr 2020',
                billNo: '1001',
                billingQuantityInKg: '20000',
                billingRate: '975.00',
                totalBillingAmt: '120000',
                difference: '0',
                vehicleNo: 'KA635772',
                unloadWeight: '12490',
                shortWeight: '10',
                payment: '0',
                createdBy: 'Chandrika',
              },
              {
                id: 3,
                date: 'Sat,22 Apr 2020',
                billNo: '1002',
                billingQuantityInKg: '60000',
                billingRate: '695.00',
                totalBillingAmt: '120000',
                difference: '0',
                vehicleNo: 'KA635773',
                unloadWeight: '9500',
                shortWeight: '0',
                payment: '20000',
                createdBy: 'Chandrika',
              },
            ]}
            columnName={TABLE_COLUMNS}
          />
        </div>
      </section>
      <TotalDetails
        totalInfo={[
          {
            id: 1,
            name: 'Total Pending consignment',
            value: '10000',
          },
          {
            id: 2,
            name: 'Total payment pending',
            value: '₹120000',
          },
          {
            id: 3,
            name: 'Difference amount',
            value: '₹150000',
          },
        ]}
      />
    </div>
  );
};

export default ReceivedConsignment;
