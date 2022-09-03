import * as React from 'react';
import styles from './index.module.less';

interface Props {
  emojiStr: string[];
  addContent?: (value: any) => void;
}

const EmojiItem: React.FC<Props> = ({ emojiStr, addContent }) => {
  return (
    <div className={styles.emojiContent}>
      {emojiStr.map((item: string, index: number) => (
        <div
          className={styles.emojidata}
          key={index}
          onClick={() => {
            addContent(item);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default EmojiItem;
