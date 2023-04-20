import { createSlice } from '@reduxjs/toolkit';
import {
  getTokens,
  getUser,
  removeTokens,
  saveAccessTokens,
  saveTokens,
  saveUser,
} from '../../utils/helper';

const initialState = {
  accessToken: getTokens().accessToken,
  refreshToken: getTokens().refreshToken,
  user: getUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { accessToken, refreshToken } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      saveTokens(accessToken, refreshToken);
    },
    logoutUser: state => {
      removeTokens();

      // state.accessToken = null;
      // state.refreshToken = null;
      // state.user = null;
      window.location.reload();
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload;
      state.accessToken = accessToken;

      saveAccessTokens(accessToken);
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      saveUser(action.payload);
    },
    setEmailVerified: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          emailVerified: action.payload,
        };
      }
    },
  },
});

// action creators
export const {
  loginUser,
  logoutUser,
  setAccessToken,
  setCurrentUser,
  setEmailVerified,
} = authSlice.actions;

// reducer
export default authSlice.reducer;
