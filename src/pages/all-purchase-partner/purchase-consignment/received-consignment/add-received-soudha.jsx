import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddReceivedSoudha = () => {
  const navigate = useNavigate();

  const [Date, setDate] = useState('');
  const [Bill, setBill] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Rate, setRate] = useState('');
  const [Total, setTotal] = useState('');
  const [Other, setOther] = useState('');
  const [Vehicle, setVehicle] = useState('');
  const [Unload, setUnload] = useState('');
  const [Short, setShort] = useState('');
  const [Payment, setPayment] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      Date.length === 0 ||
      Bill.length === 0 ||
      Quantity.length === 0 ||
      Rate.length === 0 ||
      Other.length === 0 ||
      Vehicle.length === 0 ||
      Unload.length === 0 ||
      Short.length === 0 ||
      Total.length === 0 ||
      Payment.length === 0
    ) {
      setError(true);
    }
    if (
      Date &&
      Bill &&
      Quantity &&
      Rate &&
      Other &&
      Vehicle &&
      Unload &&
      Short &&
      Total &&
      Payment
    ) {
      console.log(
        'Date:',
        Date,
        'Bill:',
        Bill,
        'Quantity:',
        Quantity,
        'Rate:',
        Rate,
        'Other:',
        Other,
        'Vehicle:',
        Vehicle,
        'Unload:',
        Unload,
        'Short:',
        Short,
        'Total:',
        Total,
        'Payment:',
        Payment
      );
    }
  };
  return (
    <div className='auth-form-login w-[847.57px] h-[649.16px] bg-white rounded-lg mt-10 ml-10 '>
      <form onSubmit={handleSubmit} className='rounded-[10px]'>
        <div
          className='logo text-xl	leading-[23px]	 mb-8 w-[847.57px] h-[60px] 	flex justify-start pl-10 items-center 
     bg-[#A9B9CD] text-[#000000CC] rounded-t-lg font-medium'
        >
          ADD NEW RECEIVED SOUDHA
        </div>

        <div className='main-wrapper flex  justify-around'>
          <div className='sub-wrapper'>
            {error && Date.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Date*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper'>
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

            {error && Bill.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Bill no*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper '>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter bill no'
                  className=' text-xs font-regular text-[#00000080] '
                  onChange={e => setBill(e.target.value)}
                />
              </div>
            </div>

            {error && Quantity.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Billing quantity*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter billing quantity'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>
            </div>

            {error && Rate.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Billing rate for 10kg*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='phone'
                  placeholder='Enter price'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setRate(e.target.value)}
                />
              </div>
            </div>

            {error && Total.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Total billing amount*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='phone'
                  placeholder='Enter price'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setTotal(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='sub-wrapper'>
            {error && Other.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Other amount*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper  ml-2 '>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter amount'
                  className=' text-xs font-regular text-[#00000080] '
                  onChange={e => setOther(e.target.value)}
                />
              </div>
            </div>

            {error && Vehicle.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Vehicle number*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper  ml-2'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter vehicle number'
                  className=' text-xs font-regular text-[#00000080] '
                  onChange={e => setVehicle(e.target.value)}
                />
              </div>
            </div>

            {error && Unload.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Unload quantity*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper  ml-2 '>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter unload quantity'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setUnload(e.target.value)}
                />
              </div>
            </div>

            {error && Short.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Short quantity*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper  ml-2 '>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='phone'
                  placeholder='Enter short quantity'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setShort(e.target.value)}
                />
              </div>
            </div>

            {error && Payment.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Payment*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper ml-2'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='phone'
                  placeholder='Enter paid amount'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setPayment(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex align-center justify-center mt-2'>
          <svg
            width='778'
            height='2'
            viewBox='0 0 778 2'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <line
              x1='0.148926'
              y1='0.924713'
              x2='777.818'
              y2='0.924713'
              stroke='black'
              stroke-opacity='0.3'
              stroke-width='0.5'
            />
          </svg>
        </div>
        <div className='button-wrap flex justify-end mr-[40px] mt-6'>
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
};

export default AddReceivedSoudha;
