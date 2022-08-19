import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.less';
import 'virtual:svg-icons-register'; // 全局注册svg图标
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
