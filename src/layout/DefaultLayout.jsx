import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

// @Lazy import
// Home
const Dashboard = lazy(() => import('../pages/dashboard'));
// AllConsignments
const AllPurchasePartner = lazy(() => import('../pages/all-purchase-partner'));
const AddPurchaseSoudha = lazy(() =>
  import('../pages/all-purchase-partner/add-purchase-partner')
);
const EditPurchaseConsignment = lazy(() =>
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

const DefaultLayout = () => {
  return (
    <>
      <div className='flex '>
        <Sidebar />

        <div className='flex-1'>
          <Header />
          <main className='py-5 px-6 max-w-[1680px]'>
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
                  element={<EditPurchaseConsignment />}
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
      </div>
    </>
  );
};

export default DefaultLayout;
