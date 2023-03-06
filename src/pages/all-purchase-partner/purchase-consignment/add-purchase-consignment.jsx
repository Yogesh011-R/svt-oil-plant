import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../../components/common/BreadCrumb';

function AddPurchaseConsignment() {
  const navigate = useNavigate();
  const [Date, setDate] = useState('');
  const [Oil, setOil] = useState('');
  const [newoil, setnewoil] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Rate, setRate] = useState('');
  const [Payment, setPayment] = useState('');
  const [error, setError] = useState(false);
  const [show, toggleShow] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      Date.length === 0 ||
      Oil.length === 0 ||
      newoil.length === 0 ||
      Quantity.length === 0 ||
      Rate.length === 0 ||
      Payment.length === 0
    ) {
      setError(true);
    }
    if (Date && Oil && Quantity && Oil && Rate && Payment && newoil) {
      console.log(
        'Date: ',
        Date,
        'Oil: ',
        Oil,
        'newoil:',
        newoil,
        'Quantity: ',
        Quantity,
        'Rate: ',
        Rate,
        'Payment: ',
        Payment
      );
    }
  };
  return (
    <div className='auth-form-login w-[450px] h-[718.35px] bg-white rounded-lg mt-10 ml-10 '>
      <form onSubmit={handleSubmit} className='rounded-[10px]'>
        <div
          className='text-xl	leading-[23px]	 mb-8 w-[450px] h-[60px] 	flex justify-center items-center font-extrabold
     bg-[#A9B9CD] text-[#000000CC] rounded-t-lg font-medium'
        >
          BOOK NEW PURCHASE CONSIGNMENT
        </div>

        {error && Date.length <= 0 ? (
          <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-8'>
            Booking Date*
          </label>
        ) : (
          ''
        )}
        <div className='form-wrapper  ml-7 '>
          <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
            <img src='Calendar.png' />
            <input
              type='date'
              value='2023-01-03'
              placeholder='Enter Partner name'
              className='pl-3 w-[304px] text-xs font-regular text-[#00000080] '
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>

        {error && Oil.length <= 0 ? (
          <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-8'>
            Oil type/name*
          </label>
        ) : (
          ''
        )}
        <div className='form-wrapper  ml-7'>
          <div className='wrap flex'>
            <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-3 mb-6'>
              <div className='select-wrap '>
                <select
                  onChange={e => setOil(e.target.value)}
                  className=' w-[320px]  text-xs font-normal	leading-[14px] text-[#00000080] '
                >
                  <option selected disabled>
                    Select
                  </option>
                  <option value='EDIBLE OIL'>EDIBLE OIL</option>
                  <option value='ARGAN OIL'>ARGAN OIL</option>
                  <option value='SOYABEAN OIL'>SOYABEAN OIL</option>
                  <option value='NUT OIL'>NUT OIL</option>
                </select>
              </div>
            </div>
            <button
              className='circle flex  bg-[#16ABE5] w-[35px] h-[35px] rounded-[32px] ml-4 mt-1'
              onClick={() => toggleShow(!show)}
            >
              {show ? (
                <div className='text-white items-center text-[26px] font-medium leading-[18px] pt-2 pl-[12px]'>
                  -
                </div>
              ) : (
                <div className='text-white items-center text-[26px] font-medium leading-[18px] pt-2 pl-[10px]'>
                  +
                </div>
              )}
            </button>
          </div>
        </div>

        {show && (
          <div className='form-wrapper  ml-7 '>
            {error && newoil.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                New Oil type*
              </label>
            ) : (
              ''
            )}
            <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
              <input
                type='text'
                placeholder='Enter new oil type'
                className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                onChange={e => setnewoil(e.target.value)}
              />
            </div>
          </div>
        )}

        {error && Quantity.length <= 0 ? (
          <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-8'>
            Booked Quantity in kg*
          </label>
        ) : (
          ''
        )}
        <div className='form-wrapper  ml-7 '>
          <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
            <input
              type='text'
              placeholder='Enter quantity'
              className=' text-xs font-normal	leading-[14px] text-[#00000080] '
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
        </div>

        {error && Rate.length <= 0 ? (
          <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-8'>
            Rate for 10 kg*
          </label>
        ) : (
          ''
        )}
        <div className='form-wrapper  ml-7 '>
          <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
            <input
              type='phone'
              placeholder='Enter price'
              className=' text-xs font-normal	leading-[14px] text-[#00000080] '
              onChange={e => setRate(e.target.value)}
            />
          </div>
        </div>

        {error && Payment.length <= 0 ? (
          <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-8'>
            Advance Payment*
          </label>
        ) : (
          ''
        )}
        <div className='form-wrapper ml-7'>
          <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
            <input
              type='phone'
              placeholder='Enter paid amount'
              className=' text-xs font-normal	leading-[14px] text-[#00000080] '
              onChange={e => setPayment(e.target.value)}
            />
          </div>
        </div>

        <div className='button-wrap flex justify-end mr-[74px] mt-4'>
          <div className='w-[119px] h-[38px] bg-[#00000033] flex items-center mr-4 rounded'>
            <button
              onClick={() => {
                navigate(-1);
              }}
              href='#'
              className='text-sm ml-10  font-medium text-black'
            >
              Close
            </button>
          </div>
          <div>
            <button className='w-[119px] h-[38px] text-sm rounded font-medium text-white bg-[#16ABE5]'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPurchaseConsignment;
