import * as React from 'react';
import * as mainApi from '@/api';
import type { Friend } from '@/types';
import { shuffleArray } from '@/utils/randomArray';
import styles from './index.module.less';
const FriendsPage: React.FC = () => {
  const [friends, setFriends] = React.useState<Friend[]>([]);
  const fetchdata = async () => {
    const { data } = await mainApi.friendService.findAll();
    setFriends(data?.rows);
  };
  React.useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <div className={styles.title}>
        <span>友情链接</span>
      </div>
      <div className={styles.box}>
        {shuffleArray(friends).map(friend => (
          <div key={friend.id} className={styles.item}>
            <a href={friend.url} rel="noreferrer" target="_blank" className={styles.link}>
              <img src={friend.logo} alt="" className={styles.left} />
              <div className={styles.right}>
                <div className={styles.name}>{friend.name}</div>
                {/* <div className={styles.desc}>{friend.description}</div> */}
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
export default FriendsPage;
