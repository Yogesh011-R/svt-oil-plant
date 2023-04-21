import React, { useMemo } from 'react';
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import Table from './Table';

const TableInstance = ({
  tableData,
  columnName,
  cPageSize,
  cSetPageSize,
  pageIndex,
  setPageIndex,
  totalResults,
  pageCount,
  cSortBy,
  cSetSortBy,
  desc,
  setDesc,
  q,
  setSelectedRows,
  setQ,
  selectRow = false,
  showArchive,
  currentTab,
  pinOptions,
}) => {
  const columns = useMemo(
    () => columnName,
    [showArchive, currentTab, pinOptions]
  );
  const data = useMemo(() => tableData, [tableData]);

  let component = <></>;

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: cPageSize,
        pageIndex,
        sortBy: cSortBy
          ? [
              {
                id: cSortBy,
                desc,
              },
            ]
          : [],
      },
      disableMultiSort: true,
      manualPagination: true,
      manualGlobalFilter: true,
      pageCount,
    },

    useSortBy,
    usePagination,
    selectRow ? useRowSelect : ''
    // selectRow
    //   ? hooks => {
    //       hooks.visibleColumns.push(columns => {
    //         return [
    //           {
    //             id: 'selection',
    //             minWidth: 35,
    //             width: 35,
    //             maxWidth: 35,
    //             Header: ({ getToggleAllRowsSelectedProps }) => {
    //               return (
    //                 <div className=' ml-4'>
    //                   <Checkbox {...getToggleAllRowsSelectedProps()} />
    //                 </div>
    //               );
    //             },
    //             Cell: ({ row }) => (
    //               <div className=' ml-4'>
    //                 <Checkbox {...row.getToggleRowSelectedProps()} />
    //               </div>
    //             ),
    //           },
    //           ...columns,
    //         ];
    //       });
    //     }
    //   : ''
  );

  component = (
    <Table
      {...tableInstance}
      setPageIndex={setPageIndex}
      cSetPageSize={cSetPageSize}
      cSetSortBy={cSetSortBy}
      setDesc={setDesc}
      totalResults={totalResults}
      q={q}
      key={'test'}
      setSelectedRows={setSelectedRows}
      setQ={setQ}
    />
  );
  return <>{component}</>;
};

export default TableInstance;
