import { configureStore } from '@reduxjs/toolkit';
import toastsReducer from '../features/toastSlice';
import authReducer from '../features/authSlice';
import modalReducer from '../features/modalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    toasts: toastsReducer,
    modal: modalReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
