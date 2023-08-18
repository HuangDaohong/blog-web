import styles from './index.module.less';

const Loading: React.FC = () => {
  return (
    // <div className={styles.loader} />;
    <div className={styles.loader}>
      <div className={styles.loaders}></div>
      <div className={styles.loaders}></div>
      <div className={styles.loaders}></div>
      <div className={styles.loaders}></div>
      <div className={styles.loaders}></div>
      <div className={styles.loaders}></div>
      <div className={styles.loaders}></div>
      <div className={styles.loaders}></div>
    </div>
  );
};

export default Loading;
