import { Formik, Form, Field } from 'formik';
import BreadCrumb from '../../../components/common/BreadCrumb';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';
import BookingConsignmentForm from '../../../components/common/FormComponents/BookingConsignmentForm';

const addBookings = async data => {
  const res = await axios.post(`${SERVER_URL}/soudha/consignment`, data);
  return res.data;
};

const AddPurchaseConsignment = () => {
  return (
    <div>
      <BreadCrumb
        paths={[
          { id: 1, name: 'Home', to: '/' },
          { id: 1, name: 'Purchase Partner', to: '/all-purchase-partner' },
        ]}
        currentPage='New Consignment'
      />
      <div className='max-w-[480px] w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Book New Purchase Consignment</h1>
        </div>
        <BookingConsignmentForm apiFunction={addBookings} />
      </div>
    </div>
  );
};

export default AddPurchaseConsignment;
