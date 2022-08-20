import * as React from 'react';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import styles from './index.module.less';
const BackToTop: React.FC = () => {
  return (
    <BackTop duration={500} visibilityHeight={600}>
      <VerticalAlignTopOutlined className={styles.backtop} />
    </BackTop>
  );
};
export default BackToTop;
