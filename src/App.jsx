import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DefaultLayout from './layout/DefaultLayout';
import PrivateRoute from './PrivateRoute';

// @Lazy import
const Login = lazy(() => import('./pages/auth/login'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const VerifyOtp = lazy(() => import('./pages/auth/verify-otp'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* /auth */}
            <Route path='auth' element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='verify-otp' element={<VerifyOtp />} />
              <Route
                path='*'
                element={<Navigate to='/auth/login' replace={true} />}
              />
            </Route>

            {/* MAIN (/) */}
            <Route
              path='/*'
              element={
                // <PrivateRoute>
                <DefaultLayout />
                // </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
