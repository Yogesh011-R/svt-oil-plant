import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import BreadCrumb from '../../../../components/common/BreadCrumb';
import TableHeader from '../../../../components/common/TableHeader';
import TotalDetails from '../../../../components/common/TotalDetails';
import TableInstance from '../../../../components/Table/TableInstance';
import axios from 'axios';
import { SERVER_URL } from '../../../../utils/config';
import { useQuery } from 'react-query';
import AddBtn from '../../../../components/common/AddBtn';
import { DELETE_MODAL, entriesOption } from '../../../../utils/constant';
import { format } from 'date-fns';
import { calculateGST, combineToSingleObject } from '../../../../utils/helper';
import { showModal } from '../../../../redux/features/modalSlice';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import Loading from '../../../../components/Loading';

const getReceivedConsignments = async ({ queryKey }) => {
  const [_, bookedConsignmentId, limit, page, query] = queryKey;
  const res = await axios.get(
    `${SERVER_URL}/soudha/consignmentReceived/${bookedConsignmentId}?page=${
      page + 1
    }&limit=${limit?.value || 10}&sortBy=createdAt:desc&billNo=${query}`
  );

  return res.data;
};
const ReceivedConsignment = () => {
  const dispatch = useDispatch();
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: ({ row }) => {
        return +row.id + 1;
      },
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ row }) => {
        return (
          <div>
            <p>{format(new Date(row.original.date), 'EEE, d MMM yy')}</p>
          </div>
        );
      },
    },

    {
      Header: 'Bill No',
      accessor: 'billNo',
    },
    {
      Header: 'Billing Quantity in kg',
      accessor: 'billingQuantity',
    },
    {
      Header: 'Billing Rate',
      accessor: 'billingRate',
      Cell: ({ row }) => {
        return (
          <span>
            {row.original.billingRate ? '₹' + row.original.billingRate : '-'}
          </span>
        );
      },
    },
    {
      Header: 'Total Billing Amount',
      accessor: 'totalBillingAmount',
      Cell: ({ row }) => {
        return <span>₹{row.original.totalBillingAmount}</span>;
      },
    },
    {
      Header: 'Difference',
      accessor: 'difference',
      Cell: ({ row }) => {
        return (
          <span className='text-red font-semibold'>
            {row.original.difference}
          </span>
        );
      },
    },
    {
      Header: 'Vehicle no',
      accessor: 'vehicleNo',
    },
    {
      Header: 'Unload weight',
      accessor: 'unloadQuantity',
    },
    {
      Header: 'Short weight',
      accessor: 'shortQuantity',
    },
    {
      Header: 'Payment',
      accessor: 'payment',
      Cell: ({ row }) => {
        return (
          <span>{row.original.payment ? '₹' + row.original.payment : '-'}</span>
        );
      },
    },
    {
      Header: 'Created by',
      accessor: 'createdBy',
      Cell: ({ row }) => {
        return (
          <span className='capitalize'>{row.original?.createdBy?.name}</span>
        );
      },
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => {
        return (
          <div className='flex space-x-3 justify-center'>
            <Link
              state={{
                ...row.original,
                bookedConsignment: data?.bookedConsignment,
              }}
              to='edit-received-soudha'
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
                      route: 'soudha/consignmentReceived',
                      invalidateKey: 'getReceivedConsignments',
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
        );
      },
      disableSortBy: true,
    },
  ];
  let { consignmentId: bookedConsignmentId, partnerId } = useParams();

  const [cSortBy, cSetSortBy] = useState();
  const [desc, setDesc] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const [searchValue, setSearchValue] = useState('');
  const [query] = useDebounce(searchValue, 500);
  const [entriesValue, setEntriesValue] = useState(entriesOption[0]);

  const { data, isLoading, isError, error } = useQuery(
    [
      'getReceivedConsignments',
      bookedConsignmentId,
      entriesValue,
      pageIndex,
      query,
    ],
    getReceivedConsignments
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
  } else if (!data?.receivedConsignments.results.length) {
    component = (
      <div className='py-20 flex flex-col items-center justify-center'>
        <p className=' text-center mb-5'>
          No Received consignment details
          {searchValue ? (
            <span>
              for the value <span className='font-bold '>{searchValue}</span>
            </span>
          ) : (
            'added yet!'
          )}
        </p>
        {!searchValue && (
          <div>
            <AddBtn
              state={{ bookedConsignment: data?.bookedConsignment }}
              text='Add new received Soudha'
              link='add-received-soudha'
            />
          </div>
        )}
      </div>
    );
  } else {
    component = (
      <TableInstance
        cSortBy={cSortBy}
        cSetSortBy={cSetSortBy}
        desc={desc}
        setDesc={setDesc}
        tableData={data.receivedConsignments.results}
        columnName={TABLE_COLUMNS}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        cPageSize={entriesValue.value}
        cSetPageSize={setEntriesValue}
        pageCount={
          data?.receivedConsignments?.totalPages
            ? data?.receivedConsignments?.totalPages
            : -1
        }
        totalResults={data?.receivedConsignments?.totalResults}
      />
    );
  }

  return (
    <div>
      {isLoading && <Loading />}
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
          title='Received consignment  details:'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          setEntriesValue={setEntriesValue}
          setPageIndex={setPageIndex}
          pageIndex={pageIndex}
          partnerDetails={{
            id: data?.bookedConsignment?.partnerId?.id,
            name: data?.bookedConsignment?.partnerId?.partnerName,
            location: data?.bookedConsignment?.partnerId?.location,
            whatsappNo: data?.bookedConsignment?.partnerId?.whatsappNo,
            oilType: data?.bookedConsignment?.oilType,
            bookedQuantity: data?.bookedConsignment?.bookedQuantity,
            rate: data?.bookedConsignment?.rate,
            advancePayment: data?.bookedConsignment?.advancePayment,
            gst: data?.bookedConsignment?.gst,
          }}
          morePartnerDetails={true}
          detailsData={data?.receivedConsignments.results}
          whatsApp={true}
          btnText='Add new received Soudha '
          addLink='add-received-soudha'
          linkState={{ bookedConsignment: data?.bookedConsignment }}
          downloadInfo={{
            data: combineToSingleObject(data?.receivedConsignments?.results),
            fields: {
              billNo: 'Bill No',
              billingQuantity: 'Booked Quantity in KG',
              billingRate: 'Billing Rate',
              difference: 'Difference Amount',
              totalBillingAmount: 'Total Billing Amount',
              vehicleNo: 'Vehicle No',
              unloadQuantity: 'Unload Quantity',
              shortQuantity: 'Short Quantity',
              payment: 'Payment',
            },
            filename: 'Received-consignments.csv',
          }}
          detailInfo={
            <>
              {data?.totalInfo && (
                <TotalDetails
                  totalInfo={[
                    {
                      id: 1,
                      name: 'Total Pending consignment',
                      value: data.totalInfo?.totalPendingConsignment || '-',
                    },
                    // {
                    //   id: 2,
                    //   name: 'Total payment pending',
                    //   value:
                    //     // '₹' +
                    //     `₹ ${
                    //       +data?.totalInfo?.pendingPayment +
                    //       +data?.bookedConsignment.advancePayment -
                    //       +data?.bookedConsignment.bookedQuantity *
                    //         (+data.bookedConsignment.rate / 10)
                    //     }`,
                    // },
                    {
                      id: 3,
                      name: 'Difference amount',
                      value: '₹' + data?.totalInfo?.differenceAmount,
                    },
                  ]}
                />
              )}
            </>
          }
        />
        <div>{component}</div>
      </section>
    </div>
  );
};

export default ReceivedConsignment;
