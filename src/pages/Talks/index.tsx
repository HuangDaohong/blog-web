import * as React from 'react';
import { Title } from '@/enums';
import * as mainApi from '@/api';
import { Timeline } from 'antd';
import { useRequest } from 'ahooks';
import PageLayoutComp from '@/components/PageLayout';
import dayjs from 'dayjs';
import { Image } from 'antd';
import styles from './index.module.less';
const TalksPage: React.FC = () => {
  const { data, loading } = useRequest(mainApi.webLogService.findAllWebLogs, {
    retryCount: 3
  });
  return (
    <PageLayoutComp title={Title.Talks} loading={loading} rows={10} className={styles.compstyle}>
      <Timeline mode="alternate">
        {data?.data?.rows.map(webLog => (
          <Timeline.Item key={webLog.id}>
            <div className={styles.weblogitem}>
              <div className={styles.itemtime}>{dayjs(webLog.time).format('YYYY-MM-DD')}</div>
              <div className={styles.itembox}>
                {/* <span className={styles.title}>{webLog.title}</span> */}
                <span className={styles.content}>{webLog.content}</span>
                {/* <div></div> */}
                <Image src={webLog.backImg} alt="" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </PageLayoutComp>
  );
};
export default TalksPage;
