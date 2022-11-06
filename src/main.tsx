import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.less';
// 全局注册svg图标
import 'virtual:svg-icons-register';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from '@/redux';
import App from './App';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </PersistGate>
    </Provider>
  </ConfigProvider>
);
