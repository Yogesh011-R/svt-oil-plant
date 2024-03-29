import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useParams, useSearchParams } from 'react-router-dom';
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
import { format, formatISO } from 'date-fns';
import { DELETE_MODAL, entriesOption } from '../../../utils/constant';
import { showModal } from '../../../redux/features/modalSlice';
import { useDispatch } from 'react-redux';
import { combineToSingleObject } from '../../../utils/helper';
import { useDebounce } from 'use-debounce';
import Loading from '../../../components/Loading';

const getBookedConsignments = async ({ queryKey }) => {
  const [_, partnerId, page, limit, query, showPending, dates] = queryKey;

  const res = await axios.get(
    `${SERVER_URL}/soudha/consignment/${partnerId}?page=${page + 1}&limit=${
      limit?.value || 10
    }&sortBy=status:desc,updatedAt:desc&oilType=${query}&startDate=${
      dates?.startDate
    }&endDate=${dates?.endDate}&status=${showPending ? 'pending' : ''}`
  );

  return res.data;
};

const PurchaseSoudha = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    for (const entry of searchParams.entries()) {
      if (entry.includes('pending')) {
        setShowPending(true);
      } else {
        setShowPending(false);
      }
    }
  }, []);

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
        return (
          <span>
            {' '}
            {/* {row.original.status === 'completed' ? (
              <div>₹0</div>
            ) : (
              )} */}
            <div>₹{row.original.rate}</div>
          </span>
        );
      },
    },
    {
      Header: 'Difference amount',
      accessor: 'differenceAmount',
      Cell: ({ row }) => {
        return (
          <span className='text-red font-semibold'>
            {row?.original?.totalInfo?.differenceAmount
              ? '₹' + row?.original?.totalInfo?.differenceAmount
              : '-'}
          </span>
        );
      },
    },
    {
      Header: 'Pending consignment',
      accessor: 'pendingConsignment',
      // Cell: ({ row }) => {
      //   return (
      //     <span>
      //       {row?.original?.totalInfo?.totalPendingConsignment || '-'}
      //     </span>
      //   );
      // },
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
            <p>{format(new Date(row.original.bookingDate), 'EEE, d MMM yy')}</p>
          </div>
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
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.status === 'pending' ? (
              <div className='bg-yellow text-yellow  bg-opacity-20  w-fit px-5 p-1 rounded-full text-[11px] mx-auto'>
                Pending
              </div>
            ) : (
              <div className='bg-green text-green  bg-opacity-20  w-fit px-5 p-1 rounded-full text-[11px] mx-auto'>
                Completed
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
            <Link
              state={row.original}
              to='edit-consignment'
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
                      route: 'soudha/consignment',
                      invalidateKey: 'getBookedConsignments',
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
  const [cSortBy, cSetSortBy] = useState();
  const [desc, setDesc] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const { partnerId } = useParams();

  const [searchValue, setSearchValue] = useState('');
  const [query] = useDebounce(searchValue, 500);
  const [entriesValue, setEntriesValue] = useState(entriesOption[0]);

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const [finalDate, setFinalDate] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      setFinalDate({
        startDate,
        endDate,
      });
    } else {
      setFinalDate(null);
    }
  }, [startDate, endDate]);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    [
      'getBookedConsignments',
      partnerId,
      pageIndex,
      entriesValue,
      query,
      showPending,
      finalDate,
    ],
    getBookedConsignments,
    {
      select: data => {
        const newResult = data.consignments.results.map((item, idx) => {
          return {
            ...item,
            totalInfo: data.receivedConsignTotalInfo.filter(info => {
              return info.id === item.id;
            })[0]?.totalInfo,
          };
        });

        const bookedQuantityPlusRate = data.consignments.results.map(
          (item, idx) => {
            if (item.status === 'completed') return 0;

            const rate = item.bookedQuantity * item.rate;

            return rate;
          }
        );

        const bookedQuantity = data.consignments.results.map((item, idx) => {
          if (item.status === 'completed') return 0;

          return item.bookedQuantity;
        });
        let bookedQuantityPlusRateTotal = 0;

        let bookedQuantityTotal = 0;

        for (let i = 0; i < bookedQuantityPlusRate.length; i++) {
          bookedQuantityPlusRateTotal += bookedQuantityPlusRate[i];
        }
        for (let i = 0; i < bookedQuantity.length; i++) {
          bookedQuantityTotal += bookedQuantity[i];
        }

        const averageRate = bookedQuantityPlusRateTotal / bookedQuantityTotal;

        const totalFu = () => {
          let differenceAmount = 0;
          for (let i = 0; i < data?.receivedConsignTotalInfo?.length; i++) {
            if (data?.receivedConsignTotalInfo[i]?.totalInfo) {
              differenceAmount =
                differenceAmount +
                +data?.receivedConsignTotalInfo[i]?.totalInfo?.differenceAmount;
            }
          }

          return { differenceAmount };
        };

        return {
          ...data,
          consignments: { ...data.consignments, results: newResult },
          totalInfo: {
            ...data.totalInfo,
            ...totalFu(),
            averageRate,
          },
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
  } else if (!data?.consignments?.results?.length) {
    component = (
      <div className='py-20 flex flex-col items-center justify-center'>
        <p className=' text-center mb-5'>
          No Partner{' '}
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
            <AddBtn text='Add new booking' link='add-consignment' />
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

  // if (isLoading) {
  //   return <p className=' py-10 text-center'>Loading..</p>;
  // }

  return (
    <div>
      {isLoading && <Loading />}
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
          setPageIndex={setPageIndex}
          pageIndex={pageIndex}
          partnerDetails={{
            id: data?.partner?.tableId,
            name: data?.partner?.partnerName,
            location: data?.partner?.location,
            whatsappNo: data?.partner?.whatsappNo,
          }}
          whatsApp={true}
          btnText='Add new booking'
          addLink='add-consignment'
          downloadInfo={{
            data: combineToSingleObject(data?.consignments.results),
            fields: {
              oilType: 'Oil Type',
              bookedQuantity: 'Booked Quantity in KG',
              rate: 'Rate',
              differenceAmount: 'Difference Amount',
              status: 'Status',
            },
            filename: 'Booked-Purchase-consignments.csv',
          }}
          dateFilter={true}
          startDate={startDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          detailInfo={
            <>
              {data?.totalInfo && (
                <TotalDetails
                  totalInfo={[
                    {
                      id: 1,
                      name: 'Total kgs',
                      value: data?.totalInfo?.totalBookQuantity || '-',
                    },
                    {
                      id: 2,
                      name: 'Average rate',
                      value:
                        '₹' +
                        parseFloat(data?.totalInfo?.averageRate).toFixed(2),
                    },
                    {
                      id: 3,
                      name: 'Total difference amount',
                      value: '₹' + data?.totalInfo?.differenceAmount,
                    },
                    {
                      id: 4,
                      name: 'Total pending consignment',
                      value: data?.totalInfo?.totalPendingConsignment,
                    },
                  ]}
                />
              )}
            </>
          }
          placeholder='Search based on oilType...'
        />
        <div>{component}</div>
      </section>
      {/* {data?.totalInfo && (
        <TotalDetails
          totalInfo={[
            {
              id: 1,
              name: 'Total kgs',
              value: data?.totalInfo?.totalBookQuantity || '-',
            },
            {
              id: 2,
              name: 'Average rate',
              value:
                '₹' +
                parseFloat(
                  data?.totalInfo?.averageRate /
                    data?.totalInfo?.totalBookQuantity || 0
                ).toFixed(2),
            },
            {
              id: 3,
              name: 'Total difference amount',
              value: '₹' + data?.totalInfo?.differenceAmount,
            },
            {
              id: 4,
              name: 'Total pending consignment',
              value: data?.totalInfo?.totalPendingConsignment,
            },
          ]}
        />
      )} */}
    </div>
  );
};

export default PurchaseSoudha;
