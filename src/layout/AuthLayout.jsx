import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const accessToken = '',
    refreshToken = '';

  if (accessToken || refreshToken) {
    return <Navigate to='/' replace={true} />;
  }
  return (
    <div className='min-h-screen'>
      <div className='max-w-[1550px] mx-auto '></div>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
