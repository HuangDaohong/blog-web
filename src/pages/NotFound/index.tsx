import * as React from 'react';
import styles from './index.module.less';
const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 960 300">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="80%">
            404
          </text>
        </symbol>

        <g className={styles.g}>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
          <use xlinkHref="#s-text" className={styles.text}></use>
        </g>
      </svg>

      <h1>页面不存在</h1>
      <a href="/">
        <span>返回到首页</span>
      </a>
    </div>
  );
};
export default NotFoundPage;
