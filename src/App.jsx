import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DefaultLayout from './layout/DefaultLayout';
import PrivateRoute from './PrivateRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import store from './redux/app/store';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './components/Toast/Toast';
import { SERVER_URL } from './utils/config';

// @Lazy import
const Login = lazy(() => import('./pages/auth/login'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const VerifyOtp = lazy(() => import('./pages/auth/verify-otp'));

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] =
      'Bearer ' + store.getState().auth.accessToken;

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// interceptors
let isFirst = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    // try to refresh the token for one time and it is not login route
    // isFirst -> for invalid refreshToken response handling
    // originalRequest._retry -> for invalid accessToken response handling

    if (
      isFirst &&
      error?.response?.status === 401 &&
      !originalRequest.url.includes('login') &&
      !originalRequest.url.includes('verify-otp') &&
      !originalRequest.url.includes('reset-password') &&
      !originalRequest._retry
    ) {
      isFirst = false;

      // try to get a new access_token
      return axios
        .post(`${SERVER_URL}/auth/refresh-tokens`, {
          refreshToken: store.getState().auth.refreshToken,
        })
        .then(response => {
          // get the accessToken
          const accessToken = response.data.access.token;
          const refreshToken = response.data.refresh.token;

          store.dispatch(loginUser({ accessToken, refreshToken }));

          // originalRequest.headers["authorization"] = "Bearer " + accessToken;

          // user can again request for refreshToken
          isFirst = true;
          originalRequest._retry = true;

          // retry the original request
          return axios(originalRequest);
        })
        .catch(error => {
          console.log('🚀 ~ file: App.jsx ~ line 109 ~ error', error);

          if (error?.response?.status === 401) {
            store.dispatch(logoutUser());
          }
          return Promise.reject({ error });
        });
    }

    // if error === 401, then do the following, or reject Promise
    if (
      isFirst &&
      error?.response?.status === 401 &&
      !originalRequest.url.includes('login') &&
      !originalRequest.url.includes('reset-password')
    ) {
      store.dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
      },
    },
  });
  return (
    <>
      <Toast />
      <ToastContainer position='top-right' autoClose={3000} transition={Flip} />
      <BrowserRouter>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
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
                <PrivateRoute>
                  <DefaultLayout />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
