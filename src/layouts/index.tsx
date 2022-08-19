import * as React from 'react';
import { Layout } from 'antd';
import AwesomeHeader from '@/components/Header';
import AwesomeContent from '@/components/Content';

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
    </Layout>
  );
};
export default AwesomeLayout;
