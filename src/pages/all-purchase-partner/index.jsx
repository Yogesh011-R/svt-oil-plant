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
import { useQuery } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { DELETE_MODAL, entriesOption } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/features/modalSlice';
import { combineToSingleObject } from '../../utils/helper';
import { useDebounce } from 'use-debounce';

const getAllPartners = async ({ queryKey }) => {
  const [_, limit, page, query] = queryKey;
  const res = await axios.get(
    `${SERVER_URL}/soudha/partners?page=${page + 1}&limit=${
      limit?.value || 10
    }&sortBy=soudhaStatus:desc,updatedAt:desc&partnerName=${query}`
  );

  return res.data;
};

const PurchaseSoudha = () => {
  const dispatch = useDispatch();

  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'partnerId',
      Cell: ({ row }) => {
        return <span>{+row.id + 1}</span>;
      },
    },
    {
      Header: 'Name',
      accessor: 'partnerName',
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
      accessor: 'totalQuantity',
      Cell: ({ row }) => {
        return (
          <span>
            {' '}
            {row?.original?.totalInfo?.totalBookQuantity
              ? row?.original?.totalInfo?.totalBookQuantity
              : '-'}
          </span>
        );
      },
    },
    {
      Header: 'Average rate',
      accessor: 'averageRate',
      Cell: ({ row }) => {
        // const averageRate = data.totalInfo.filter(
        //   item => item.id === row.original.id
        // )[0]?.totalInfo?.averageRate;

        return (
          <span>
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
      Header: 'Soudha Status',
      accessor: 'soudhaStatus',
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.soudhaStatus === 'completed' ? (
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
            <Link
              to={`edit-purchase-partner`}
              state={row.original}
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
                      route: 'soudha/partner',
                      invalidateKey: 'getAllPartners',
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
  const [searchValue, setSearchValue] = useState('');
  const [entriesValue, setEntriesValue] = useState(entriesOption[0]);
  const [query] = useDebounce(searchValue, 500);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['getAllPartners', entriesValue, pageIndex, query],
    getAllPartners,
    {
      select: data => {
        const newResult = data.partners.results.map((item, idx) => {
          return {
            ...item,
            totalInfo: data.totalInfo.filter(info => info.id === item.id)[0]
              ?.totalInfo,
          };
        });

        return { partners: { ...data.partners, results: newResult } };
      },
    }
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
  } else if (!isLoading && !data?.partners?.results.length) {
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
            <AddBtn link='add-purchase-partner' text='Add new Partner' />
          </div>
        )}
      </div>
    );
  } else if (searchValue && isFetching) {
    component = (
      <div className='py-20 flex flex-col items-center justify-center'>
        <span>
          Searching for the value
          <span className='font-bold '>{searchValue}</span>
        </span>
      </div>
    );
  } else {
    component = (
      <TableInstance
        cSortBy={cSortBy}
        cSetSortBy={cSetSortBy}
        desc={desc}
        setDesc={setDesc}
        tableData={data?.partners?.results}
        columnName={TABLE_COLUMNS}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        cPageSize={entriesValue.value}
        cSetPageSize={setEntriesValue}
        pageCount={data?.partners?.totalPages ? data?.partners?.totalPages : -1}
        totalResults={data?.partners?.totalResults}
      />
    );
  }

  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/' }]}
        currentPage='New Purchase soudha'
      />
      <section className='bg-white my-8 rounded-[10px]'>
        <TableHeader
          title='All Purchase Soudha Partner'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          detailsData={data?.partners?.results}
          setEntriesValue={setEntriesValue}
          addLink='add-purchase-partner'
          btnText='Add new Partner'
          setPageIndex={setPageIndex}
          pageIndex={pageIndex}
          downloadInfo={{
            data: combineToSingleObject(data?.partners.results),
            fields: {
              tableId: 'ID',
              partnerName: 'Name',
              location: 'Email',
              whatsappNo: 'Whats App Number',
              status: 'Status',
              averageRate: 'Average Rate',
              totalBookQuantity: 'Total Book Quantity',
            },
            filename: 'Purchase Soudha Partners.csv',
          }}
        />

        <div>{component}</div>
      </section>
    </div>
  );
};

export default PurchaseSoudha;
