import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

// @Lazy import
const Dashboard = lazy(() => import('../pages/dashboard'));
const Error404 = lazy(() => import('../pages/404'));
const PurchaseSoudha = lazy(() => import('../pages/purchase-soudha'));
const AddPurchaseSoudha = lazy(() =>
  import('../pages/purchase-soudha/add-purchase-soudha')
);
const PurchaseConsignment = lazy(() =>
  import('../pages/purchase-soudha/purchase-consignment')
);
const PendingConsignment = lazy(() =>
  import('../pages/purchase-soudha/pending-consignment')
);

const Account = lazy(() => import('../pages/account'));

const DefaultLayout = () => {
  return (
    <>
      <div className='flex '>
        <Sidebar />

        <div className='flex-1'>
          <Header />
          <main className='py-5 px-6'>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/purchase-soudha' element={<PurchaseSoudha />} />
                <Route
                  path='/purchase-soudha/add-purchase-soudha'
                  element={<AddPurchaseSoudha />}
                />
                <Route
                  path='/purchase-consignment'
                  element={<PurchaseConsignment />}
                />
                <Route
                  path='/pending-consignment'
                  element={<PendingConsignment />}
                />
                <Route path='/account' element={<Account />} />
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
