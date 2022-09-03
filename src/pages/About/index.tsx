import * as React from 'react';
import styles from './index.module.less';
import PageLayoutComp from '@/components/PageLayout';
import { Title } from '@/enums';
const AboutPage: React.FC = () => {
  return (
    <PageLayoutComp title={Title.About} rows={10}>
      <div className={styles.box}>人生如戏</div>
    </PageLayoutComp>
  );
};
export default AboutPage;
