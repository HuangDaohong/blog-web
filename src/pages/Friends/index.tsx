import * as React from 'react';
import * as mainApi from '@/api';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import ProgressiveImage from 'react-progressive-graceful-image';
import { Title } from '@/enums';
import { shuffleArray } from '@/utils/randomArray';
import PageLayoutComp from '@/components/PageLayout';
import styles from './index.module.less';
import placeholderSrc from '@/assets/images/loading.gif'; // 图片加载中的占位图https://developer.aliyun.com/article/921546
const FriendsPage: React.FC = () => {
  const { data, loading } = useRequest(mainApi.friendService.findAll, {
    retryCount: 3
  });
  return (
    <PageLayoutComp title={Title.Friends} loading={loading} rows={10}>
      <>
        <div className={styles.friendBox}>
          <span style={{ fontWeight: 'bold' }}>友链说明：</span>
          <span>✔️原创优先 ✔️技术优先 ✔️https优先 ❌经常宕机 ❌不合法规 ❌红标报毒 </span>
          <br />
          <br />
          <span style={{ display: 'flex' }}>
            名称 : <Typography.Paragraph copyable>Huang Blog</Typography.Paragraph>
          </span>
          <span style={{ display: 'flex' }}>
            链接 : <Typography.Paragraph copyable>https://hdhblog.cn</Typography.Paragraph>
          </span>
          <span style={{ display: 'flex' }}>
            头像 :
            <Typography.Paragraph copyable>
              https://hdhblog.cn/assets/avatar.d568d935.jpg
            </Typography.Paragraph>
          </span>
          <span style={{ display: 'flex' }}>
            描述 : <Typography.Paragraph copyable> 人生如戏</Typography.Paragraph>
          </span>
        </div>
        <div className={styles.box}>
          {shuffleArray(data?.data?.rows).map(friend => (
            <div key={friend.id} className={styles.item}>
              <a href={friend.url} rel="noreferrer" target="_blank" className={styles.link}>
                {/* <img src={friend.logo} alt="" className={styles.leftlogo} /> */}
                <ProgressiveImage src={friend.logo} placeholder={placeholderSrc}>
                  {(src: string) => <img src={src} alt="" className={styles.leftlogo} />}
                </ProgressiveImage>

                <div className={styles.right}>
                  <div className={styles.name}>{friend.name}</div>
                  <div className={styles.desc}>{friend.description}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </>
    </PageLayoutComp>
  );
};
export default FriendsPage;
