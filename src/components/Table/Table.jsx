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
        <div className=''>
          <table
            {...getTableProps()}
            className='w-full align-middle px-10   min-w-[1094.09px] overflow-auto  '
            style={{
              borderRadius: '10px',
              // borderSpacing: '0 2px',
              // borderCollapse: 'separate',
            }}
          >
            <thead className='bg-primary bg-opacity-40  h-16  '>
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
                      >
                        <div>
                          <span
                            className={`capitalize px-6  text-black text-opacity-80  `}
                          >
                            {column.render('Header')}
                          </span>
                          {column.canSort && (
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <span className='ml-1'>▼</span>
                                ) : (
                                  <span className='ml-1'>▲</span>
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
                    className='relative table-row w-full dark:bg-opacity-50 bg-white-950  dark:bg-darkPrimary-800  dark:border-gray-800  '
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

          {/* extras */}
          <div className='my-8 mt-10 px-6 flex items-center justify-between'>
            <div>
              <h2 className='text-black text-opacity-60'>
                Showing 1 to 3 of 3 entries
              </h2>
            </div>
            <div className='flex space-x-3 items-center'>
              <button className='bg-white py-2 px-5 border border-black border-opacity-30 rounded-md'>
                Previous
              </button>
              <button className='bg-primary  text-white p-2 px-4  rounded-md '>
                1
              </button>
              <button className='bg-white py-2 px-5 border border-black border-opacity-30 rounded-md'>
                Next
              </button>
            </div>
          </div>
          {/* <div className='flex items-center  my-5 w-full p-2  relative text-sm text-gray-600 extras dark:text-gray-200'>
            <Listbox
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e));
                setPageIndex(0);
                cSetPageSize(Number(e));
              }}
            >
              {({ open }) => (
                <>
                  <div className='mt-1 relative'>
                    <Listbox.Button className='relative bg-grey-700 dark:bg-darkPrimary-600 bg-opacity-30 border  rounded-md shadow-sm  pl-2 pr-6 py-2 h-7 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border-none sm:text-sm'>
                      <span className='block text-xs font-semibold dark:text-white text-darkPrimary-700 text-opacity-90 truncate capitalize  '>
                        show {pageSize}
                      </span>
                      <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                        <svg
                          width='9'
                          height='6'
                          viewBox='0 0 9 6'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M1.30974 0.785544L4.51036 4.34711L7.71098 0.785544C7.81825 0.666665 7.96337 0.599939 8.11463 0.599939C8.2659 0.599939 8.41101 0.666665 8.51829 0.785544C8.62493 0.905132 8.68478 1.0669 8.68478 1.23553C8.68478 1.40415 8.62493 1.56592 8.51829 1.68551L4.8768 5.74492C4.77925 5.8525 4.64758 5.91284 4.51036 5.91284C4.37315 5.91284 4.24147 5.8525 4.14392 5.74492L0.502434 1.68551C0.395794 1.56592 0.335938 1.40415 0.335938 1.23553C0.335938 1.0669 0.395794 0.905132 0.502434 0.785544C0.60971 0.666665 0.754827 0.599939 0.906089 0.599939C1.05735 0.599939 1.20247 0.666665 1.30974 0.785544Z'
                            fill='#1E1E1E'
                            fill-opacity='0.8'
                          />
                        </svg>
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='absolute z-10 mt-2 w-full bg-grey-700 dark:bg-darkPrimary-600  bg-opacity-30 shadow-lg max-h-60 rounded-md text-xs ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none '>
                        {DEFAULT_PAGE_SIZES.map(items => (
                          <Listbox.Option
                            key={items.id}
                            className={({ active }) =>
                              `
                                      ${
                                        active
                                          ? 'text-white bg-primary'
                                          : 'text-darkPrimary-700 dark:text-white'
                                      }
                                      cursor-default border-b border-white border-opacity-20 select-none relative `
                            }
                            value={items.name}
                          >
                            {({ selected, active }) => {
                              return (
                                <div
                                  className={`   ${
                                    selected
                                      ? 'bg-primary text-white '
                                      : 'font-normal'
                                  } h-full w-full py-2 px-2`}
                                >
                                  <span
                                    className={`
                                          ${
                                            selected
                                              ? 'font-semibold '
                                              : 'font-normal'
                                          }
                                          block truncate capitalize 
                                          `}
                                  >
                                    show {items.name}
                                  </span>
                                </div>
                              );
                            }}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            {pageCount > 1 && (
              <div className='flex absolute left-1/3 items-center h-10 gap-4 px-4  pagination-container'>
                <ReactPaginate
                  previousLabel={
                    <div className='flex items-center gap-1 text-sm'>
                      <HiChevronLeft className='text-lg' /> Prev
                    </div>
                  }
                  nextLabel={
                    <div className='flex items-center gap-1 text-sm'>
                      Next <HiChevronRight className='text-lg' />
                    </div>
                  }
                  breakLabel={'...'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={({ selected }) => setPageIndex(selected)}
                  // onPageChange={this.handlePageClick}
                />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Table;
