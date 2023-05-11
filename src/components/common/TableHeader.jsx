import React from 'react';
import AddBtn from './AddBtn';
import ExportBtn from './ExportBtn';
import SelectEntries from './SelectEntries';
import TableSearch from './TableSearch';
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';
import { downloadAsExcel, handleError } from '../../utils/helper';
import { useEffect } from 'react';
import DateRangeSelect from './Form/DateRangeSelect';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToast } from '../../redux/features/toastSlice';
import { ERROR, SUCCESS } from '../../utils/constant';
import { format } from 'date-fns';
import {
  WHATSAPP_RECIPIENT_NUMBER,
  WHATS_APP_ACCESS_TOKEN,
} from '../../utils/config';

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
  pageIndex,
  setPageIndex,
  dateFilter,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  detailInfo,
}) => {
  const { saveAsCsv } = useJsonToCsv();
  const dispatch = useDispatch();
  const sendFileWhatsInApp = async (link, filename) => {
    const newAxios = axios.create();
    try {
      const res = await newAxios.post(
        `https://graph.facebook.com/v16.0/103186509444905/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: `91${WHATSAPP_RECIPIENT_NUMBER}`,
          type: 'document',
          document: {
            link,
            filename,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${WHATS_APP_ACCESS_TOKEN}`,
            Accept: 'application/json',
          },
        }
      );

      if (res.status === 200) {
        dispatch(
          addToast({
            kind: SUCCESS,
            msg: `Message sent successfully`,
          })
        );
      }
    } catch (error) {
      const message = handleError(error);

      dispatch(
        addToast({
          kind: ERROR,
          msg: message,
        })
      );
    }
  };

  return (
    <div>
      <div className='p-[18px] border-b flex items-center justify-between'>
        <h1 className='text-xl font-medium flex-1'>{title}</h1>
        {detailInfo && (
          <div className='px-4'>
            <h1 className='text-xl font-medium'>Total details</h1>
          </div>
        )}
      </div>
      <div className='flex  justify-between'>
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
        {detailInfo}
      </div>
      {/* {(detailsData?.length || searchValue) > 0 && ( */}
      <div className='px-[18px] py-8'>
        <div className='flex items-center justify-between'>
          {detailsData?.length > 0 ? (
            <div className='flex space-x-5 items-center'>
              <h2>Export</h2>
              <div className='flex space-x-3 items-center'>
                {/* <ExportBtn text='PDF' /> */}
                <ExportBtn
                  text='CVS'
                  onClick={() => {
                    if (!downloadInfo) return;
                    saveAsCsv({ ...downloadInfo });
                  }}
                />
                <ExportBtn
                  text='EXCEL'
                  onClick={() => {
                    if (!downloadInfo) return;
                    downloadAsExcel(
                      downloadInfo.data,
                      downloadInfo.filename.split('.')[0],
                      downloadInfo.fields
                    );
                  }}
                />
                {whatsApp && (
                  <ExportBtn
                    text='WHATSAPP'
                    onClick={async () => {
                      if (!downloadInfo) return;
                      const data = await downloadAsExcel(
                        downloadInfo.data,
                        downloadInfo.filename.split('.')[0],
                        downloadInfo.fields,
                        'isWhatsapp'
                      );

                      sendFileWhatsInApp(data.Location, data.filename);
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {addLink && (
            <div>
              <AddBtn text={btnText} link={addLink} state={linkState} />
            </div>
          )}
        </div>
        <div className='my-5 flex items-center justify-between'>
          <div className='flex space-x-7 items-center  '>
            <h2>Show</h2>
            <SelectEntries
              entries={entriesValue}
              setEntriesValue={setEntriesValue}
              setPageIndex={setPageIndex}
              pageIndex={pageIndex}
            />
          </div>
          <div className={dateFilter ? 'grid grid-cols-2' : 'w-full ml-auto'}>
            <TableSearch
              setPageIndex={setPageIndex}
              pageIndex={pageIndex}
              value={searchValue}
              setValue={setSearchValue}
            />
            {dateFilter && (
              <DateRangeSelect
                startDate={startDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
              />
            )}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default TableHeader;
