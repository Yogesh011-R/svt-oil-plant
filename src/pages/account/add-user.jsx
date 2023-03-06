import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [number, setnumber] = useState('');
  const [status, setstatus] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      Name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      status.length === 0 ||
      number.length === 0 ||
      cpassword.length === 0
    ) {
      setError(true);
    }
    if (Name && email && password && number && status && cpassword) {
      console.log(
        'Name:',
        Name,
        'email:',
        email,
        'password:',
        password,
        'number:',
        number,
        'status:',
        status,
        'cpassword:',
        cpassword
      );
    }
  };
  return (
    <div className='auth-form-login w-[847.57px] h-[581.58px] bg-white rounded-lg mt-10 ml-10 '>
      <form onSubmit={handleSubmit} className='rounded-[10px]'>
        <div
          className='logo text-xl	leading-[23px]	 mb-8 w-[847.57px] h-[60px] 	flex justify-start pl-10 items-center 
     bg-[#A9B9CD] text-[#000000CC] rounded-t-lg font-medium'
        >
          ADD NEW USER
        </div>

        <div className='main-wrapper flex  justify-around'>
          <div className='sub-wrapper'>
            {error && Name.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Full name*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter full name'
                  className=' text-xs font-regular text-[#00000080] '
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            {error && email.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Email id*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper '>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter email id'
                  className=' text-xs font-regular text-[#00000080] '
                  onChange={e => setemail(e.target.value)}
                />
              </div>
            </div>

            {error && password.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-1'>
                Password*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter password'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setpassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='sub-wrapper'>
            {error && number.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Phone number*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper  ml-2 '>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Enter phone number'
                  className=' text-xs font-regular text-[#00000080] '
                  onChange={e => setnumber(e.target.value)}
                />
              </div>
            </div>

            {error && status.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Status*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper  ml-2'>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-3 mb-6'>
                <div className='select-wrap '>
                  <select
                    onChange={e => setstatus(e.target.value)}
                    className=' w-[320px] text-xs font-regular  '
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

            {error && cpassword.length <= 0 ? (
              <label className='text-sm text-[#000000CC] leading-[16.41px] font-normal	text-left  mt-8 pl-3'>
                Confirm password*
              </label>
            ) : (
              ''
            )}
            <div className='form-wrapper  ml-2 '>
              <div className='input-wrap w-[348.33px] h-[44px] border-[#0000004D] bg-[#F0F0EF] rounded flex items-center pl-4 mb-6'>
                <input
                  type='text'
                  placeholder='Confirm password'
                  className=' text-xs font-normal	leading-[14px] text-[#00000080] '
                  onChange={e => setcpassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='image-wrap ml-10'>
          <div className='mb-2 text-sm leading-5 font-normal text-[#000000CC]'>
            User Photo
          </div>
          <div className='mb-3 bg-[#16ABE5] w-[109px] h-[30px] rounded pt-1'>
            <label className='text-sm leading-5 font-normal text-white pl-2 '>
              Upload Image
              <input type='file' id='image' />
            </label>
          </div>
          <div className='mb-6 text-xs leading-[14px] font-normal text-[#999999]'>
            Recommended image size is ---x---
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

export default AddUser;
