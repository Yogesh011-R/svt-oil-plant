// import { Formik, Form, Field } from 'formik';
// import React from 'react';
// import BreadCrumb from '../../components/common/BreadCrumb';
// import * as Yup from 'yup';
// import 'yup-phone-lite';
// import Input from '../../components/common/Form/Input';
// import { Link } from 'react-router-dom';
// import SubmitBtn from '../../components/common/Form/SubmitBtn';
// import CustomSelect from '../../components/common/Form/CustomSelect';

// const AddPurchaseSoudha = () => {
//   const initialValues = {
//     partnerName: '',
//     location: '',
//     whatsappNo: '',
//     status: '',
//   };
//   const validationSchema = Yup.object({
//     partnerName: Yup.string().required('Partner Name is required'),
//     location: Yup.string().required('Location is required'),
//     whatsappNo: Yup.string()
//       .phone('IN', "'Whatsapp Number must be a valid phone number")
//       .required('Whatsapp Number is required'),
//     status: Yup.string().required('Status is required'),
//   });

//   return (
//     <div>
//       <BreadCrumb
//         paths={[{ id: 1, name: 'Home', to: '/purchase-soudha' }]}
//         currentPage='New Purchase soudha'
//       />
//       <div className='max-w-md w-full rounded-[10px] bg-white  my-8'>
//         <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
//           <h1 className='text-xl font-medium'>Add Soudha Partner</h1>
//         </div>
//         <div className='p-6'>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={(values, { resetForm }) => {
//               console.log(
//                 '🚀 ~ file: add-purchase-soudha.jsx:46 ~ AddPurchaseSoudha ~ values:',
//                 values
//               );
//             }}
//           >
//             <Form className='form px-3'>
//               <Input
//                 label='Partner Name*'
//                 name='partnerName'
//                 id='partnerName'
//                 placeholder='Enter Partner name'
//               />
//               <Input
//                 label='Location*'
//                 name='location'
//                 id='location'
//                 placeholder='Enter Location'
//               />
//               <Input
//                 label='Whatsapp Number*'
//                 name='whatsappNo'
//                 id='whatsappNo'
//                 placeholder='Enter Whatsapp number'
//               />
//               <CustomSelect
//                 name='status'
//                 id='status'
//                 label='Status*'
//                 placeholder='Status'
//                 options={[
//                   { id: 1, value: 'active', label: 'Active' },
//                   { id: 2, value: 'inactive', label: 'Inactive' },
//                 ]}
//               />

//               <div className='flex space-x-3 justify-end mt-8'>
//                 <Link
//                   className='py-[11px] text-sm font-medium  rounded-md px-5 bg-black bg-opacity-20'
//                   to='/purchase-soudha'
//                 >
//                   Close
//                 </Link>
//                 <SubmitBtn text='Submit' />
//               </div>
//             </Form>
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPurchaseSoudha;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb';

function AddPartner() {
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
        paths={[{ id: 1, name: 'Home', to: '/' }]}
        currentPage='New Purchase soudha'
      />

      <div className='auth-form-login w-[421.21px] h-[532.84px] bg-white rounded-lg mt-10 ml-10 '>
        <form onSubmit={handleSubmit} className='rounded-[10px]'>
          <div
            className='logo mb-8 w-[421px] h-[60px] text-[20px]	flex justify-center items-center font-extrabold
     bg-[#A9B9CD] text-[#000000] rounded-t-lg leading-{70px} font-medium'
          >
            ADD SOUDHA PARTNER
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
                type='button'
                className='text-sm ml-10  font-medium text-black'
              >
                Close
              </button>
            </div>
            <div>
              <button
                type='submit'
                className='w-[119px] h-[38px] text-sm rounded font-medium text-white bg-[#16ABE5]'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPartner;
