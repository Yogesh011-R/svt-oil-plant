import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../../components/common/BreadCrumb';

function AddPurchaseConsignment() {
  const navigate = useNavigate();

  const [partnerName, setpartnerName] = useState('');
  const [location, setlocation] = useState('');
  const [number, setnumber] = useState('');
  const [status, setstatus] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      partnerName.length === 0 ||
      location.length === 0 ||
      number.length === 0 ||
      status.length === 0
    ) {
      setError(true);
    }
    if (partnerName && location && number && status) {
      console.log(
        'Partner name: ',
        partnerName,
        'Location: ',
        location,
        'Number: ',
        number,
        'Status: ',
        status
      );
    }
  };
  return (
    <>
      <BreadCrumb
        paths={[
          { id: 1, name: 'Home', to: '/' },
          { id: 1, name: 'Purchase Partner', to: '/all-purchase-partner' },
        ]}
        currentPage='Booked Purchase consignment'
      />
      <div className='auth-form-login w-[421.21px] h-[532.84px] bg-white rounded-lg mt-10 ml-10 '>
        <form onSubmit={handleSubmit} className='rounded-[10px]'>
          <div
            className='logo mb-8 w-[421px] h-[60px] text-[20px]	flex justify-center items-center font-extrabold
     bg-[#A9B9CD] text-[#000000] rounded-t-lg leading-{70px} font-medium'
          >
            Book new Purchase consignment
          </div>

          {error && partnerName.length <= 0 ? (
            <label className='text-sm text-[#000000] leading-[14px] font-regular text-left  mt-8 pl-12'>
              Partner Name*
            </label>
          ) : (
            ''
          )}
          <div className='form-wrapper  grid justify-items-center'>
            <div className='input-wrap w-[340px] h-[45px] border-black rounded flex items-center pl-4 mb-6'>
              <input
                type='text'
                placeholder='Enter Partner name'
                className=' text-xs font-regular text-[#000000] '
                onChange={e => setpartnerName(e.target.value)}
              />
            </div>
          </div>

          {error && location.length <= 0 ? (
            <label className='text-sm text-[#000000] leading-[14px] font-regular text-left  mt-4  pl-12'>
              Location*
            </label>
          ) : (
            ''
          )}
          <div className='form-wrapper  grid justify-items-center'>
            <div className='input-wrap w-[340px] h-[45px] border-black rounded flex items-center pl-4 mb-6'>
              <input
                type='text'
                placeholder='Enter Location'
                className=' text-xs font-regular text-[#000000] '
                onChange={e => setlocation(e.target.value)}
              />
            </div>
          </div>

          {error && number.length <= 0 ? (
            <label className='text-sm text-[#000000] leading-[14px] font-regular text-left  mt-4  pl-12'>
              Whatsapp Number*
            </label>
          ) : (
            ''
          )}
          <div className='form-wrapper  grid justify-items-center'>
            <div className='input-wrap w-[340px] h-[45px] border-black rounded flex items-center pl-4 mb-6'>
              <input
                type='phone'
                placeholder='Enter Whatsapp number'
                className=' text-xs font-regular text-[#000000] '
                onChange={e => setnumber(e.target.value)}
              />
            </div>
          </div>

          {error && status.length <= 0 ? (
            <label className='text-sm text-[#000000] leading-[14px] font-regular text-left mt-4  pl-12'>
              Satuts*
            </label>
          ) : (
            ''
          )}
          <div className='form-wrapper  grid justify-items-center'>
            <div className='input-wrap w-[340px] h-[45px] border-black rounded flex items-center pl-4 mb-4'>
              <div className='select-wrap '>
                <select
                  onChange={e => setstatus(e.target.value)}
                  className=' w-[300px] text-xs font-regular  '
                >
                  <option selected disabled>
                    Select
                  </option>
                  <option value='active'>Active</option>
                  <option value='inactive'>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className='button-wrap flex justify-end m-10 mt-4'>
            <div className='w-[119px] h-[38px] bg-[#00000033] flex items-center mr-4 rounded'>
              <button
                onClick={() => {
                  navigate(-1);
                }}
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
    </>
  );
}

export default AddPurchaseConsignment;
