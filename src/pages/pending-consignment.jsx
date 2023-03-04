import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/common/BreadCrumb';
import TableHeader from '../components/common/TableHeader';
import TotalDetails from '../components/common/TotalDetails';
import TableInstance from '../components/Table/TableInstance';

const PendingConsignment = () => {
  const TABLE_COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Partner Name',
      accessor: 'name',
    },

    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'OIl Type',
      accessor: 'oilType',
    },
    {
      Header: 'Total quantity',
      accessor: 'totalQuantity',
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
              to={`${row.original.id}`}
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
  const [entriesValue, setEntriesValue] = useState(10);
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
          setEntriesValue={setEntriesValue}
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
                name: 'Anil Kumar',

                location: 'Hassan',
                oilType: 'SO',
                totalQuantity: '4000',
                pendingQuantity: '10000',
                averageRate: '961.87',
              },
              {
                id: 2,
                name: 'Arun',

                location: 'Hubli',
                oilType: 'SO',
                totalQuantity: '4000',
                pendingQuantity: '15000',
                averageRate: '975.87',
              },
              {
                id: 3,
                name: 'Kumar',

                location: 'Mysore',
                oilType: 'SO',
                totalQuantity: '4000',
                pendingQuantity: '5000',
                averageRate: '1052.87',
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
            value: '40000',
          },
        ]}
      />
    </div>
  );
};

export default PendingConsignment;
