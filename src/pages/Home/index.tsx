import * as React from 'react';
import styles from './index.module.less';
import { useResetRecoilState } from 'recoil';
import { keywordState } from '@/store';
import Content from './Content';
import Sider from './Sider';
const HomePage: React.FC = () => {
  const resetList = useResetRecoilState(keywordState);
  React.useEffect(() => {
    resetList();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Content />
      </div>
      <div className={styles.right}>
        <Sider />
      </div>
    </div>
  );
};
export default HomePage;
