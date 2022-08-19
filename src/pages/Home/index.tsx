import * as React from 'react';
import styles from './index.module.less';
const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>main</div>
      <div className={styles.right}>侧边</div>
    </div>
  );
};
export default HomePage;
