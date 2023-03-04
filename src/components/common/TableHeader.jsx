import React from 'react';
import AddBtn from './AddBtn';
import ExportBtn from './ExportBtn';
import SelectEntries from './SelectEntries';
import TableSearch from './TableSearch';

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
}) => {
  return (
    <div>
      <div className='p-[18px] border-b'>
        <h1 className='text-xl font-medium'>{title}</h1>
      </div>
      {partnerDetails && (
        <div className='p-[18px] max-w-[260px]'>
          <div className='grid grid-cols-[1fr_max-content_1fr] gap-2 gap-y-1'>
            <div>Partner ID</div>
            <div>:</div>
            <div className='ml-3'>{partnerDetails}</div>
            <div>Partner name</div>
            <div>:</div>
            <div className='ml-3'>Anil Kumar</div>
            <div>Location</div>
            <div>:</div>
            <div className='ml-3'>Hassan</div>
            <div>Whatapp no</div>
            <div>:</div>
            <div className='ml-3'>1234567890</div>
          </div>
        </div>
      )}
      <div className='px-[18px] py-8'>
        <div className='flex items-center justify-between'>
          <div className='flex space-x-5 items-center'>
            <h2>Export</h2>
            <div className='flex space-x-3 items-center'>
              <ExportBtn text='PDF' />
              <ExportBtn text='CVS' />
              <ExportBtn text='EXCEL' />
              {whatsApp && <ExportBtn text='WHATSAPP' />}
            </div>
          </div>
          {addLink && (
            <div>
              <AddBtn text={btnText} link={addLink} />
            </div>
          )}
        </div>
        <div className='my-5 flex items-center justify-between'>
          <div className='flex space-x-7 items-center'>
            <h2>Show</h2>
            <SelectEntries setEntriesValue={setEntriesValue} />
          </div>
          <TableSearch value={searchValue} setValue={setSearchValue} />
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
