import * as React from 'react';
import styles from './index.module.less';
import PageLayoutComp from '@/components/PageLayout';
import { Title } from '@/enums';
const WorksPage: React.FC = () => {
  return (
    <PageLayoutComp title={Title.Works} rows={10}>
      <div className={styles.box}>暂时没有</div>
    </PageLayoutComp>
  );
};
export default WorksPage;
