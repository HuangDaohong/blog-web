import * as React from 'react';
import { Layout } from 'antd';
import AwesomeHeader from '@/components/Header';
import AwesomeContent from '@/components/Content';
import BackToTop from '@/components/BackToTop';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import * as mainApi from '@/api';
// import { notification } from 'antd';
// import store from '@/redux';
// import { updateUserInfo } from '@/redux/features/acountSlice';

const AwesomeLayout: React.FC = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <header>
        <AwesomeHeader />
      </header>
      <Content>
        <AwesomeContent />
      </Content>
      <BackToTop />
    </Layout>
  );
};
export default AwesomeLayout;
