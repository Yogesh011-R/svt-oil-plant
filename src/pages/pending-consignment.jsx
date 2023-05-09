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
import { useDebounce } from 'use-debounce';

const getAllPendingConsignments = async ({ queryKey }) => {
  const [_, limit, page, query] = queryKey;
  const res = await axios.get(
    `${SERVER_URL}/soudha/partner/pendingPartners?page=${page + 1 || 1}&limit=${
      limit?.value || 10
    }&sortBy=soudhaStatus:desc,updatedAt:desc&partnerName=${query}`
  );

  return res.data;
};

const PendingConsignment = () => {
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'tableId',
    },
    {
      Header: 'Partner Name',
      accessor: 'partnerName',
    },

    {
      Header: 'Location',
      accessor: 'location',
    },

    {
      Header: 'Total quantity',
      accessor: 'bookedQuantity',
      Cell: ({ row }) => {
        return <span>{row.original?.totalInfo?.totalBookQuantity || '-'}</span>;
      },
    },
    {
      Header: 'Pending  quantity ',
      accessor: 'pendingQuantity',
      Cell: ({ row }) => {
        return (
          <span>{row.original?.totalInfo?.totalPendingQuantity || '-'}</span>
        );
      },
    },
    {
      Header: 'Average rate',
      accessor: 'averageRate',
      Cell: ({ row }) => {
        return (
          <span>
            {' '}
            {row?.original?.totalInfo?.averageRate
              ? '₹' +
                parseFloat(
                  row?.original?.totalInfo?.averageRate /
                    row?.original?.totalInfo?.totalBookQuantity
                ).toFixed(2)
              : '-'}
          </span>
        );
      },
    },
    {
      Header: 'All Soudha',
      accessor: 'allSoudha',
      Cell: ({ row }) => {
        return (
          <div>
            <Link
              to={`/all-purchase-partner/${row.original.id}?pending=true`}
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
  const [query] = useDebounce(searchValue, 500);
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isLoading, isError, error } = useQuery(
    ['getAllPendingConsignment', entriesValue, pageIndex, query],
    getAllPendingConsignments,
    {
      select: data => {
        const newResult = data.pendingPartners.results.map((item, idx) => {
          return {
            ...item,
            totalInfo: data.totalInfo.filter(info => {
              return info.id === item.id;
            })[0]?.totalInfo,
          };
        });

        const totalFu = () => {
          let totalPendingConsignment = 0;
          for (let i = 0; i < data?.receivedConsignTotalInfo?.length; i++) {
            if (data?.receivedConsignTotalInfo[i]?.totalInfo) {
              totalPendingConsignment =
                totalPendingConsignment +
                +data?.receivedConsignTotalInfo[i]?.totalInfo
                  ?.totalPendingConsignment;
            }
          }

          return { totalPendingConsignment };
        };

        return {
          pendingPartners: {
            ...data.pendingPartners,
            results: newResult,
          },
          totalInfo: totalFu(),
        };
      },
    }
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
  } else if (!data?.pendingPartners?.results?.length) {
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
        tableData={data?.pendingPartners?.results}
        columnName={TABLE_COLUMNS}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        cPageSize={entriesValue.value}
        cSetPageSize={setEntriesValue}
        pageCount={
          data?.pendingPartners?.totalPages
            ? data?.pendingPartners?.totalPages
            : -1
        }
        totalResults={data?.pendingPartners?.totalResults}
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
          detailsData={data?.pendingPartners?.results}
          setEntriesValue={setEntriesValue}
          whatsApp={true}
          downloadInfo={{
            data: combineToSingleObject(data?.pendingPartners.results),
            fields: {
              partnerName: 'Partner Name',
              location: 'Location',
              oilType: 'Oil Type',
              bookedQuantity: 'Booked Quantity in KG',
              rate: 'Rate',
              totalQuantity: 'Total Quantity',
              status: 'Status',
            },
            filename: 'Booked-Pending-consignments.csv',
          }}
          detailInfo={
            <TotalDetails
              totalInfo={[
                {
                  id: 1,
                  name: 'Total Pending consignment',
                  value: `${data?.totalInfo?.totalPendingConsignment || '-'}`,
                },
              ]}
            />
          }
        />

        <div>{component}</div>
      </section>

      {/* <TotalDetails
        totalInfo={[
          {
            id: 1,
            name: 'Total Pending consignment',
            value: `${data?.totalInfo?.totalPendingConsignment || '-'}`,
          },
        ]}
      /> */}
    </div>
  );
};

export default PendingConsignment;
