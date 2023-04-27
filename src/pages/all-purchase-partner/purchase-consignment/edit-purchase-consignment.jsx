import BreadCrumb from '../../../components/common/BreadCrumb';
import axios from 'axios';
import { SERVER_URL } from '../../../utils/config';
import BookingConsignmentForm from '../../../components/common/FormComponents/BookingConsignmentForm';
import { useLocation } from 'react-router-dom';

const editBookings = async data => {
  const res = await axios.patch(
    `${SERVER_URL}/soudha/consignment/${data.id}`,
    data
  );
  return res.data;
};

const EditPurchaseConsignment = () => {
  const { state } = useLocation();

  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/purchase-soudha' }]}
        currentPage='New Purchase soudha'
      />
      <div className='max-w-[480px] w-full rounded-[10px] bg-white  my-8'>
        <div className='bg-primaryLight py-[18px] px-7 rounded-t-[10px]'>
          <h1 className='text-xl font-medium'>Edit Purchase Consignment</h1>
        </div>
        <BookingConsignmentForm
          editValue={{ ...state, bookingDate: new Date(state.bookingDate) }}
          apiFunction={editBookings}
        />
      </div>
    </div>
  );
};

export default EditPurchaseConsignment;
