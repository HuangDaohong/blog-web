import * as React from 'react';
import styles from './index.module.less';
import PageLayoutComp from '@/components/PageLayout';
import { Title } from '@/enums';
const MessagsPage: React.FC = () => {
  return (
    <PageLayoutComp title={Title.Msg} rows={10}>
      <div className={styles.box}>
        <span className={styles.message}> 暂未开放</span>
      </div>
    </PageLayoutComp>
  );
};
export default MessagsPage;
