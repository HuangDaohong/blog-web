import * as React from 'react';
import { Popover } from 'antd';
import EmojiItem from './EmojiItem';
import styles from './index.module.less';
import { useEmoji } from './useEmoji';

interface EmojiType {
  emojiStr: string[];
  show: string;
}
interface Props {
  addContent?: (value: any) => void;
}

const Emoji: React.FC<Props> = props => {
  const { emojiPeople, emojiNature, emojiSymbol } = useEmoji();
  const emojiData: EmojiType[] = [
    {
      emojiStr: emojiPeople,
      show: '😀'
    },
    {
      emojiStr: emojiSymbol,
      show: '🙉'
    },
    // {
    //   emojiStr: emojiFood,
    //   show: '🍎'
    // },
    {
      emojiStr: emojiNature,
      show: '📢'
    }
  ];

  return (
    <div className={styles.emoji}>
      {emojiData.map((item, index) => (
        <Popover
          key={index}
          overlayClassName={styles.emojiContent}
          placement="bottom"
          content={<EmojiItem emojiStr={item.emojiStr} addContent={props.addContent} />}
          trigger="hover"
        >
          <span className={styles.emojiButton}>{item.show}</span>
        </Popover>
      ))}
    </div>
  );
};

export default Emoji;
