import * as React from 'react';
import LoadingCom from '@/components/Loading';
import classNames from 'classnames';
import styles from './index.module.less';
interface Props {
  title?: string;
  loading?: boolean;
  children?: React.ReactNode;
  rows?: number;
  className?: any;
}
const PageLayoutComp: React.FC<Props> = ({ title, children, loading, rows, className }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={classNames(styles.content, className)}>
        {loading ? <LoadingCom rows={rows} /> : children}
      </div>
    </div>
  );
};
export default PageLayoutComp;
