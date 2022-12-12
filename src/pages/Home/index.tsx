import * as React from 'react';
import styles from './index.module.less';
import { updatekeyword } from '@/redux/features/keywordSlice';
import { useDispatch } from 'react-redux';
import Content from './Content';
import Sider from './Sider';
const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updatekeyword(null));
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
