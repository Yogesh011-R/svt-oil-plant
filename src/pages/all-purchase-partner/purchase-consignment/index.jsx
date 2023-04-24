import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import AddBtn from '../../../components/common/AddBtn';
import BreadCrumb from '../../../components/common/BreadCrumb';
import ExportBtn from '../../../components/common/ExportBtn';
import SelectEntries from '../../../components/common/SelectEntries';
import TableHeader from '../../../components/common/TableHeader';
import TableSearch from '../../../components/common/TableSearch';
import TotalDetails from '../../../components/common/TotalDetails';
import TableInstance from '../../../components/Table/TableInstance';
import { useQuery } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';
import { format } from 'date-fns';
import { entriesOption } from '../../../utils/constant';

const getBookedConsignments = async ({ queryKey }) => {
  const [_, partnerId, page, limit] = queryKey;
  const res = await axios.get(
    `${SERVER_URL}/soudha/consignment/${partnerId}?page=${page + 1}&limit=${
      limit?.value || 10
    }&sortBy=createdAt:desc`
  );

  return res.data;
};

const PurchaseSoudha = () => {
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: ({ row }) => {
        return +row.id + 1;
      },
    },
    {
      Header: 'Oil Type',
      accessor: 'oilType',
    },

    {
      Header: 'Quantity in kg',
      accessor: 'bookedQuantity',
    },
    {
      Header: 'Rate',
      accessor: 'rate',
      Cell: ({ row }) => {
        return <span>₹{row.original.rate}</span>;
      },
    },
    {
      Header: 'Difference amount',
      accessor: 'advancePayment',
      Cell: ({ row }) => {
        return (
          <span>
            {row.original.advancePayment && '₹' + row.original.advancePayment}
          </span>
        );
      },
    },
    {
      Header: 'Pending consignment',
      accessor: 'pendingConsignment',
    },
    {
      Header: 'Soudha details',
      accessor: 'soudhaDetails',
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
      Header: 'Booking date',
      accessor: 'bookingDate',
      Cell: ({ row }) => {
        return (
          <div>
            <p>{format(new Date(row.original.bookingDate), 'MM/dd/yyyy')}</p>
          </div>
        );
      },
    },
    {
      Header: 'Created by',
      accessor: 'createdBy',
      Cell: ({ row }) => {
        return <h2>{data.partner.partnerName}</h2>;
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
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
  const [pageIndex, setPageIndex] = useState(0);

  const { partnerId } = useParams();

  const [searchValue, setSearchValue] = useState('');
  const [entriesValue, setEntriesValue] = useState(entriesOption[0]);

  const { data, isLoading, isError, error } = useQuery(
    ['getBookedConsignments', partnerId, pageIndex, entriesValue],
    getBookedConsignments
  );

  let component = null;

  if (error) {
    component = (
      <p className='mt-6 ml-4 pb-10 text-center'>
        An error has occurred: {error.message}
      </p>
    );
  } else if (isLoading) {
    component = <p className='mt-6 ml-4 pb-10 text-center'>Loading...</p>;
  } else if (!data.partner.consignments.length) {
    component = (
      <div className='py-20 flex flex-col items-center justify-center'>
        <p className=' text-center mb-5'>No Booking added yet!</p>
        <div>
          <AddBtn text='Add new booking' link='add-consignment' />
        </div>
      </div>
    );
  } else {
    component = (
      <TableInstance
        cSortBy={cSortBy}
        cSetSortBy={cSetSortBy}
        desc={desc}
        setDesc={setDesc}
        tableData={data?.consignments?.results}
        columnName={TABLE_COLUMNS}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        cPageSize={entriesValue.value}
        cSetPageSize={setEntriesValue}
        pageCount={
          data?.consignments?.totalPages ? data?.consignments?.totalPages : -1
        }
        totalResults={data?.consignments?.totalResults}
      />
    );
  }

  if (isLoading) {
    return <p className=' py-10 text-center'>Loading..</p>;
  }

  return (
    <div>
      <BreadCrumb
        paths={[
          { id: 1, name: 'Home', to: '/' },
          { id: 1, name: 'Purchase Partner', to: '/all-purchase-partner' },
        ]}
        currentPage='Booked Purchase consignment'
      />
      <section className='bg-white my-8 rounded-[10px]'>
        {/* <div className='py-20 flex flex-col items-center justify-center'>
          <p className=' text-center mb-5'>No Booking added yet!</p>{' '}
          <div>
            <AddBtn text='Add new booking' link='add-consignment' />{' '}
          </div>{' '}
        </div> */}
        <TableHeader
          title='Booked Purchase consignment'
          detailsData={data?.consignments?.results}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          setEntriesValue={setEntriesValue}
          partnerDetails={{
            id: data?.partner?.tableId,
            name: data?.partner?.partnerName,
            location: data?.partner?.location,
            whatsappNo: data?.partner?.whatsappNo,
          }}
          whatsApp={true}
          btnText='Add new booking'
          addLink='add-consignment'
        />
        <div>
          {/* <TableInstance
            cSortBy={cSortBy}
            cSetSortBy={cSetSortBy}
            desc={desc}
            setDesc={setDesc}
            tableData={[
              {
                id: 1,
                oilType: 'SO',
                quantityInKg: '50000',
                rate: '955.00',
                differenceAmount: '100000',
                pendingConsignment: '100000',
                bookingDate: 'Sat,20 Apr 2020',
                partnerStatus: true,
                soudhaStatus: false,
              },
              {
                id: 2,
                oilType: 'SO',
                quantityInKg: '20000',
                rate: '975.00',
                differenceAmount: '0',
                pendingConsignment: '0',
                bookingDate: 'Sat,21 Apr 2020',

                partnerStatus: false,
                soudhaStatus: true,
              },
              {
                id: 3,
                oilType: 'SO',
                quantityInKg: '60000',
                rate: '695.00',
                differenceAmount: '0',
                pendingConsignment: '0',
                bookingDate: 'Sat,22 Apr 2020',
                partnerStatus: true,
                soudhaStatus: true,
              },
            ]}
            columnName={TABLE_COLUMNS}
          /> */}
          {component}
        </div>
      </section>
      {/* <TotalDetails
        totalInfo={[
          {
            id: 1,
            name: 'Total',
            value:
              data?.soudhaDetails?.totalQuantity +
              ' ' +
              data?.soudhaDetails?.measure,
          },
          {
            id: 2,
            name: 'Average rate',
            value: '₹' + data?.soudhaDetails?.averageRate,
          },
          {
            id: 3,
            name: 'Total difference amount',
            value: '₹' + data?.soudhaDetails?.totalDifferenceAmount,
          },
          {
            id: 4,
            name: 'Total pending consignment',
            value: data?.soudhaDetails?.totalPendingConsignent,
          },
        ]}
      /> */}
    </div>
  );
};

export default PurchaseSoudha;
