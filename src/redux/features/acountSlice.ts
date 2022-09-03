import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import store from '@/redux';
import { UserInfo } from '@/types';
export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: {} as UserInfo
  },
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      // https://blog.csdn.net/weixin_43290151/article/details/124715850
      state.user = Object.assign(state.user, action.payload);
    },
    logout: state => {
      state.user = {} as UserInfo;
    }
  }
});

const { updateUserInfo, logout } = accountSlice.actions;

const getToken = (): string => {
  return store.getState()?.account?.user?.token ?? '';
};

export { getToken, logout, updateUserInfo };
