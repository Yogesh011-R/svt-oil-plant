import React, { Fragment, useEffect } from 'react';

const Table = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  state,
  gotoPage,
  pageCount,
  setPageSize,
  cSetPageSize,
  selectedFlatRows,
  prepareRow,
  setPageIndex,
  cSetSortBy,
  setDesc,
  setSelectedRows,
  totalResults,
}) => {
  // server side pagination
  const { pageIndex, pageSize } = state;

  useEffect(() => {
    if (typeof setSelectedRows === 'function') {
      setSelectedRows(selectedFlatRows.map(row => row.original));
    }
  }, [selectedFlatRows]);

  return (
    <div className='pb-8 w-full'>
      <div className=' '>
        <div>
          <div>
            <table
              {...getTableProps()}
              className='w-full align-middle px-10    '
              style={{
                borderRadius: '10px',
                // borderSpacing: '0 2px',
                // borderCollapse: 'separate',
              }}
            >
              <thead className='bg-primary bg-opacity-40  h-16   '>
                {headerGroups.map(headerGroup => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className='rounded-xl'
                  >
                    {headerGroup.headers.map((column, idx) => {
                      if (column.isSorted) {
                        cSetSortBy(column.id);
                        setDesc(column.isSortedDesc);
                      }
                      return (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className='text-center '
                        >
                          <div>
                            <span
                              className={`capitalize px-5 !text-center flex flex-col   text-sm  text-black text-opacity-80  `}
                            >
                              {column.render('Header')}
                            </span>
                            {column.canSort && (
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <span className=' text-sm'>▼</span>
                                  ) : (
                                    <span className=' text-sm'>▲</span>
                                  )
                                ) : (
                                  ''
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row);

                  return (
                    <tr
                      {...row.getRowProps()}
                      className='relative table-row w-full dark:bg-opacity-50 bg-white-950  dark:bg-darkPrimary-800  dark:border-gray-800 '
                      style={{
                        height: '62px',
                        borderBottom: '0.5px solid rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            id={cell?.column?.id}
                            className='text-center text-sm'
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* extras */}
          <div className='my-8 mt-10 px-6 flex items-center justify-between'>
            <div>
              <h2 className='text-black text-opacity-60'>
                Showing {pageIndex + 1} to {pageCount} of {totalResults} entries
              </h2>
            </div>
            <div className='flex space-x-3 items-center'>
              <button
                disabled={!canPreviousPage}
                onClick={() => {
                  if (canPreviousPage) {
                    setPageIndex(pageIndex - 1);
                  }
                }}
                className='bg-white py-2 px-5 border border-black border-opacity-30 rounded-md'
              >
                Previous
              </button>
              <div className='bg-primary  text-white p-2 px-4  rounded-md '>
                {pageIndex + 1}
              </div>
              <button
                disabled={!canNextPage}
                onClick={() => {
                  if (canNextPage) {
                    setPageIndex(pageIndex + 1);
                  }
                }}
                className='bg-white py-2 px-5 border border-black border-opacity-30 rounded-md'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
