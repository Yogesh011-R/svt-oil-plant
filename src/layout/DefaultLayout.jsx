import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useQuery } from 'react-query';
import { logoutUser, setCurrentUser } from '../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_URL } from '../utils/config';
import Modal from '../components/Modal/Modal';

// @Lazy import
// Home
const Dashboard = lazy(() => import('../pages/dashboard'));
// AllConsignments
const AllPurchasePartner = lazy(() => import('../pages/all-purchase-partner'));
const AddPurchaseSoudha = lazy(() =>
  import('../pages/all-purchase-partner/add-purchase-partner')
);
const EditPurchasePartner = lazy(() =>
  import('../pages/all-purchase-partner/edit-purchase-partner')
);
const PurchaseConsignment = lazy(() =>
  import('../pages/all-purchase-partner/purchase-consignment')
);
const AddPurchaseConsignment = lazy(() =>
  import(
    '../pages/all-purchase-partner/purchase-consignment/add-purchase-consignment'
  )
);
const EditPurchaseConsignment = lazy(() =>
  import(
    '../pages/all-purchase-partner/purchase-consignment/edit-purchase-consignment'
  )
);
const ReceivedConsignment = lazy(() =>
  import(
    '../pages/all-purchase-partner/purchase-consignment/received-consignment'
  )
);
const AddReceivedSoudha = lazy(() =>
  import(
    '../pages/all-purchase-partner/purchase-consignment/received-consignment/add-received-soudha'
  )
);
// PendingConsignment
const PendingConsignment = lazy(() => import('../pages/pending-consignment'));
// Accounts
const Account = lazy(() => import('../pages/account'));
const AddUser = lazy(() => import('../pages/account/add-user'));
// 404
const Error404 = lazy(() => import('../pages/404'));

// const getUser = async ({ queryKey }) => {
//   const res = await axios.get(`${SERVER_URL}/users/getDetails`);
//   return res.data;
// };

const DefaultLayout = () => {
  const dispatch = useDispatch();

  // const { data, isLoading, isError, error } = useQuery(
  //   [`currentUser`, user],
  //   getUser,
  //   {
  //     onSuccess: user => {
  //       if (!user.isActive) {
  //         return dispatch(logoutUser());
  //       }

  //       dispatch(setCurrentUser(user));
  //     },
  //     refetchInterval: 150000, // 2.5 min
  //   }
  // );
  const modal = useSelector(state => state.modal);
  return (
    <>
      <div className='flex '>
        <Sidebar />

        <div className='flex-1'>
          <Header />
          <main className='py-5 px-6 max-w-[1680px] mx-auto'>
            <Suspense fallback={<div className='text-center'>Loading...</div>}>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route
                  path='/all-purchase-partner'
                  element={<AllPurchasePartner />}
                />
                <Route
                  path='/all-purchase-partner/add-purchase-partner'
                  element={<AddPurchaseSoudha />}
                />
                <Route
                  path='/all-purchase-partner/edit-purchase-partner'
                  element={<EditPurchasePartner />}
                />
                <Route
                  path='/all-purchase-partner/:partnerId'
                  element={<PurchaseConsignment />}
                />
                <Route
                  path='/all-purchase-partner/:partnerId/add-consignment'
                  element={<AddPurchaseConsignment />}
                />
                <Route
                  path='/all-purchase-partner/:partnerId/edit-consignment'
                  element={<EditPurchaseConsignment />}
                />
                <Route
                  path='/all-purchase-partner/:partnerId/:consignmentId'
                  element={<ReceivedConsignment />}
                />
                <Route
                  path='/all-purchase-partner/:partnerId/:consignmentId/add-received-soudha'
                  element={<AddReceivedSoudha />}
                />
                <Route
                  path='/pending-consignment'
                  element={<PendingConsignment />}
                />
                <Route path='/account' element={<Account />} />
                <Route path='/account/add-user' element={<AddUser />} />
                <Route path='/404' element={<Error404 />} />
                <Route
                  path='*'
                  element={<Navigate to='/404' replace={true} />}
                />
              </Routes>
            </Suspense>
          </main>
        </div>
        {modal.modalType !== null && <Modal {...modal} />}
      </div>
    </>
  );
};

export default DefaultLayout;
