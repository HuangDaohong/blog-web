import React from 'react';
import styles from './index.module.less';
interface Props {
  name?: string;
  desc?: string;
  url?: string;
  backgroundImg?: string;
}
const ImgCard: React.FC<Props> = props => {
  const { name, desc, backgroundImg } = props;
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}
      className={styles.imgItem}
      onClick={() => {
        window.open(props?.url);
      }}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.mask} />
    </div>
  );
};
export default ImgCard;
