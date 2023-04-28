import React from 'react';
import AddBtn from './AddBtn';
import ExportBtn from './ExportBtn';
import SelectEntries from './SelectEntries';
import TableSearch from './TableSearch';
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';

const TableHeader = ({
  title,
  whatsApp,
  partnerDetails,
  searchValue,
  setSearchValue,
  entriesValue,
  setEntriesValue,
  addLink,
  btnText,
  detailsData,
  morePartnerDetails,
  linkState,
  downloadInfo,
}) => {
  const { saveAsCsv } = useJsonToCsv();
  return (
    <div>
      <div className='p-[18px] border-b'>
        <h1 className='text-xl font-medium'>{title}</h1>
      </div>
      {partnerDetails && (
        <div className='p-[18px] max-w-[380px]'>
          <div className='grid grid-cols-[150px_max-content_1fr] gap-2 gap-y-1'>
            {!morePartnerDetails && (
              <>
                <div>Partner ID</div>
                <div>:</div>
                <div className='ml-3'>{partnerDetails.id}</div>
              </>
            )}
            <div>Partner name</div>
            <div>:</div>
            <div className='ml-3'>{partnerDetails.name}</div>
            <div>Location</div>
            <div>:</div>
            <div className='ml-3'>{partnerDetails.location}</div>
            <div>Whatapp no</div>
            <div>:</div>
            <div className='ml-3'>{partnerDetails.whatsappNo}</div>
            {morePartnerDetails && (
              <>
                <div>Oil Type</div>
                <div>:</div>
                <div className='ml-3'>{partnerDetails.oilType}</div>
                <div>Booked Quantity</div>
                <div>:</div>
                <div className='ml-3'>
                  {partnerDetails.bookedQuantity + ' KG'}
                </div>
                <div>Price for 10KG</div>
                <div>:</div>
                <div className='ml-3'>₹{partnerDetails.rate}</div>
                <div>Total Booked rate</div>
                <div>:</div>
                <div className='ml-3'>
                  {'₹' +
                    partnerDetails.bookedQuantity *
                      (partnerDetails.rate / 10) || '-'}
                </div>
                <div>Advance Payment</div>
                <div>:</div>
                <div className='ml-3'>₹{partnerDetails.advancePayment}</div>
              </>
            )}
          </div>
        </div>
      )}
      {detailsData?.length > 0 && (
        <div className='px-[18px] py-8'>
          <div className='flex items-center justify-between'>
            <div className='flex space-x-5 items-center'>
              <h2>Export</h2>
              <div className='flex space-x-3 items-center'>
                <ExportBtn text='PDF' />
                <ExportBtn
                  text='CVS'
                  onClick={() => {
                    if (!downloadInfo) return;
                    saveAsCsv({ ...downloadInfo });
                  }}
                />
                <ExportBtn text='EXCEL' />
                {whatsApp && <ExportBtn text='WHATSAPP' />}
              </div>
            </div>
            {addLink && (
              <div>
                <AddBtn text={btnText} link={addLink} state={linkState} />
              </div>
            )}
          </div>
          <div className='my-5 flex items-center justify-between'>
            <div className='flex space-x-7 items-center'>
              <h2>Show</h2>
              <SelectEntries
                entries={entriesValue}
                setEntriesValue={setEntriesValue}
              />
            </div>
            <TableSearch value={searchValue} setValue={setSearchValue} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHeader;
