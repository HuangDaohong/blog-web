import * as React from 'react';
import { Layout } from 'antd';
import AwesomeHeader from '@/components/Header';
import AwesomeContent from '@/components/Content';
import BackToTop from '@/components/BackToTop';

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
