import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest, useSafeState } from 'ahooks';
import dayjs from 'dayjs';
import * as mainApi from '@/api';
import * as Icon from '@ant-design/icons';
import { Pagination, Timeline } from 'antd';
import { Title } from '@/enums';
import PageLayoutComp from '@/components/PageLayout';
import styles from './index.module.less';
import defaultImg from '@/assets/images/girl.webp';

const ArchivePage: React.FC = () => {
  const navigate = useNavigate();

  const pagesize = 10;
  const [page, setPage] = useSafeState(1);

  const { run, data, loading } = useRequest(
    () => mainApi.articleService.findAll({ pageNum: page, pageSize: pagesize }),
    {
      manual: true,
      retryCount: 3
    }
  );
  React.useEffect(() => {
    run();
  }, [page, pagesize]);
  return (
    <PageLayoutComp title={Title.Archives} loading={loading} rows={10}>
      <div className={styles.container}>
        <Timeline>
          {data?.data?.list.map(article => (
            <Timeline.Item key={article.article_id} color="gray">
              <div className={styles.item} onClick={() => navigate(`/article/view/${article.article_id}`)}>
                <div
                  className={styles.backImg}
                  style={{
                    backgroundImage: `url(${article?.cover || defaultImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* <img src={article?.cover || defaultImg} alt="cover" width="80" height="80" /> */}
                </div>
                <div className={styles.right}>
                  <span className={styles.itemvalue_time}>
                    <Icon.FieldTimeOutlined />
                    &nbsp;
                    {dayjs(article.createdAt).format('YYYY-MM-DD')}
                  </span>
                  <span className={styles.itemvalue_title}>{article.title}</span>
                </div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      <>
        <div className={styles.pageBox}>
          <Pagination
            current={page}
            hideOnSinglePage
            total={data?.data?.total}
            defaultPageSize={pagesize}
            // showSizeChanger={true}
            showTitle={false}
            onChange={(page: number) => {
              setPage(page);
              // setPagesize(size);
              // window.scrollTo(0, 440);
            }}
            // pageSizeOptions={[5, 8, 10, 20, 30, 50]}
            // showTotal={() => `共 ${data?.data?.total} 篇文章`}
          />
        </div>
      </>
    </PageLayoutComp>
  );
};
export default ArchivePage;
