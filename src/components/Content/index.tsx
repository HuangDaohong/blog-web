import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less';
const AwesomeContent: React.FC = () => {
  return (
    <div className={styles.content}>
      <Outlet />
    </div>
  );
};

export default AwesomeContent;
