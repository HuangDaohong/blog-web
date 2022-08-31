import * as React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRequest, useSafeState } from 'ahooks';
import * as mainApi from '@/api';
import PageLayoutComp from '@/components/PageLayout';
import { Pagination } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.less';

const ArticleDetailListPage: React.FC = () => {
  const pagesize = 8;
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const categoryID = params.get('categoryid');
  const [page, setPage] = useSafeState(1);
  // const [pagesize, setPagesize] = useSafeState(8);
  const [total, setTotal] = useSafeState<number>();
  const [titleName, setTitleName] = useSafeState('文章列表');
  const { data, loading, run } = useRequest(
    () =>
      mainApi.articleService.findAllByCategoryId({
        id: Number(categoryID),
        pageNum: page,
        pageSize: pagesize
      }),
    {
      manual: true,
      retryCount: 3,
      onSuccess: ({ data }) => {
        setTotal(data?.total);
      }
    }
  );

  React.useEffect(() => {
    setTitleName(params.get('name') || '文章列表');
  }, []);
  React.useEffect(() => {
    run();
  }, [page, pagesize]);
  return (
    <PageLayoutComp title={`${titleName} ${total}篇`} loading={loading} rows={10}>
      <div className={styles.box}>
        {data?.data?.list.map(article => (
          <div
            key={article.id}
            className={styles.item}
            onClick={() => {
              navigate(`/article/view/${article.article_id}`);
            }}
          >
            <span className={styles.itemvalue_title}>{article.title}</span>
            <span className={styles.itemvalue_time}>{dayjs(article.createdAt).format('YYYY-MM-DD')}</span>
          </div>
        ))}
        <>
          <div className={styles.pageBox}>
            <Pagination
              current={page}
              hideOnSinglePage
              total={total}
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
      </div>
    </PageLayoutComp>
  );
};
export default ArticleDetailListPage;
