import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { accountSlice } from '@/redux/features/acountSlice';
// import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import store from '@/redux';

const rootReducer = combineReducers({
  account: accountSlice.reducer
});

const persistConfig = {
  key: 'blog_persist',
  storage,
  // storage: storageSession //会话存储
  whitelist: ['account'] // 只持久化 account 的数据
  // blacklist: ['account'] // 不持久化 account 的数据
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false // https://redux-toolkit-cn.netlify.app/usage/usage-guide/
    })
});

export type RootState = ReturnType<typeof rootReducer>;
// Redux 应用的状态:https://blog.csdn.net/qq_60292609/article/details/121585314
export type GetRootState = ReturnType<typeof store.getState>;

// declare module 'react-redux' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   export interface DefaultRootState extends RootState {}
// }
