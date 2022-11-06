import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import store from '@/redux';
import { accountSlice } from '@/redux/features/acountSlice';
import { configSlice } from '@/redux/features/configSlice';

// create reducer
const rootReducer = combineReducers({
  account: accountSlice.reducer,
  history: configSlice.reducer
});

// redux persist
const persistConfig = {
  key: 'blog_persist',
  storage
  // storage: storageSession //会话存储
  // blacklist: ['account'] // 不持久化 account 的数据
  // whitelist: ['account'] // 只持久化 account 的数据
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export default configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // https://redux-toolkit-cn.netlify.app/usage/usage-guide/
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof rootReducer>;
// Redux 应用的状态:https://blog.csdn.net/qq_60292609/article/details/121585314
export type GetRootState = ReturnType<typeof store.getState>;

// declare module 'react-redux' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   export interface DefaultRootState extends RootState {}
// }
