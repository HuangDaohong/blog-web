import * as React from 'react';
import * as mainApi from '@/api';
import { useRequest } from 'ahooks';
import { Title } from '@/enums';
import { shuffleArray } from '@/utils/randomArray';
import PageLayoutComp from '@/components/PageLayout';
import styles from './index.module.less';

const FriendsPage: React.FC = () => {
  const { data, loading } = useRequest(mainApi.friendService.findAll, {
    retryCount: 3
  });
  return (
    <PageLayoutComp title={Title.Friends} loading={loading} rows={10}>
      <div className={styles.box}>
        {shuffleArray(data?.data?.rows).map(friend => (
          <div key={friend.id} className={styles.item}>
            <a href={friend.url} rel="noreferrer" target="_blank" className={styles.link}>
              <img src={friend.logo} alt="" className={styles.leftlogo} />
              <div className={styles.right}>
                <div className={styles.name}>{friend.name}</div>
                <div className={styles.desc}>{friend.description}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </PageLayoutComp>
  );
};
export default FriendsPage;
