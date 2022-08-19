import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Menu } from 'antd';
import SvgIcon from '@/utils/SvgIcon';
import { menuItems } from './menuItems';

import styles from './index.module.less';

const AwesomeHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <SvgIcon symbolId="logo" width="50px" height="50px" />
        <span className={styles.logo_title}>Huang Blog</span>
      </div>
      <div className={styles.menubox}>
        <Menu mode="horizontal" items={menuItems} onClick={e => navigate(e.key)} className={styles.menu} />
      </div>
      <div>
        <SvgIcon symbolId="bixing" width="50px" height="50px" />
      </div>
    </div>
  );
};

export default AwesomeHeader;
