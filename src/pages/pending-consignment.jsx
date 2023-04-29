import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/common/BreadCrumb';
import TableHeader from '../components/common/TableHeader';
import TotalDetails from '../components/common/TotalDetails';
import TableInstance from '../components/Table/TableInstance';
import axios from 'axios';
import { SERVER_URL } from '../utils/config';
import { useQuery } from 'react-query';
import { entriesOption } from '../utils/constant';
import { combineToSingleObject } from '../utils/helper';

const getAllPendingConsignments = async ({ queryKey }) => {
  const [_, limit, page] = queryKey;
  const res = await axios.get(
    `${SERVER_URL}/soudha/consignment/pendingConsignment?page=${
      page + 1 || 1
    }&limit=${limit?.value || 10}&sortBy=createdAt:desc`
  );

  return res.data;
};

const PendingConsignment = () => {
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: ({ row }) => {
        return +row.id + 1;
      },
    },
    {
      Header: 'Partner Name',
      accessor: 'partnerName',
      Cell: ({ row }) => {
        return <div>{row.original?.partnerId?.partnerName}</div>;
      },
    },

    {
      Header: 'Location',
      accessor: 'location',
      Cell: ({ row }) => {
        return <div>{row.original?.partnerId?.location}</div>;
      },
    },
    {
      Header: 'OIl Type',
      accessor: 'oilType',
    },
    {
      Header: 'Total quantity',
      accessor: 'bookedQuantity',
    },
    {
      Header: 'Pending  quantity ',
      accessor: 'pendingQuantity',
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
              to={`/all-purchase-partner/${row.original?.partnerId?.id}/${row.original.id}`}
              className='bg-secondary py-2.5 px-5 rounded-md text-white text-[11px]'
            >
              View
            </Link>
          </div>
        );
      },
    },
  ];
  const [cSortBy, cSetSortBy] = useState();
  const [desc, setDesc] = useState(true);

  const [searchValue, setSearchValue] = useState('');
  const [entriesValue, setEntriesValue] = useState(entriesOption[0]);
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isLoading, isError, error } = useQuery(
    ['getAllPendingConsignment', entriesValue, pageIndex],
    getAllPendingConsignments
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
  } else if (!data?.pendingConsignments?.results?.length) {
    component = (
      <div className='py-20 flex flex-col items-center justify-center'>
        <p className=' text-center mb-5'>No Pending consignments!</p>
      </div>
    );
  } else {
    component = (
      <TableInstance
        cSortBy={cSortBy}
        cSetSortBy={cSetSortBy}
        desc={desc}
        setDesc={setDesc}
        tableData={data?.pendingConsignments?.results}
        columnName={TABLE_COLUMNS}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        cPageSize={entriesValue.value}
        cSetPageSize={setEntriesValue}
        pageCount={
          data?.pendingConsignments?.totalPages
            ? data?.pendingConsignments?.totalPages
            : -1
        }
        totalResults={data?.pendingConsignments?.totalResults}
      />
    );
  }
  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/' }]}
        currentPage='Pending Consignment  '
      />
      <section className='bg-white my-8 rounded-[10px]'>
        <TableHeader
          title='Purchase Pending Consignment '
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          detailsData={data?.pendingConsignments?.results}
          setEntriesValue={setEntriesValue}
          downloadInfo={{
            data: combineToSingleObject(data?.pendingConsignments.results),
            fields: {
              partnerName: 'Partner Name',
              location: 'Location',
              oilType: 'Oil Type',
              bookedQuantity: 'Booked Quantity in KG',
              rate: 'Rate',
              totalQuantity: 'Total Quantity',
              status: 'Status',
            },
            filename: 'Booked Pending consignments.csv',
          }}
        />

        <div>{component}</div>
      </section>
      {/* <TotalDetails
        totalInfo={[
          {
            id: 1,
            name: 'Total Pending consignment',
            value: '40000',
          },
        ]}
      /> */}
    </div>
  );
};

export default PendingConsignment;
