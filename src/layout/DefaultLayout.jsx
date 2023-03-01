import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

// @Lazy import
const Dashboard = lazy(() => import('../pages/dashboard'));
const Error404 = lazy(() => import('../pages/404'));

const DefaultLayout = () => {
  return (
    <>
      <main className='flex '>
        <Sidebar />

        <div>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/404' element={<Error404 />} />
              <Route path='*' element={<Navigate to='/404' replace={true} />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default DefaultLayout;
