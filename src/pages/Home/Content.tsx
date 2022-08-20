import * as React from 'react';
import { useInfiniteScroll } from 'ahooks';
import { Skeleton, message, Divider, Button } from 'antd';
import * as mainApi from '@/api';
import { Article } from '@/types';
import { useRecoilValue } from 'recoil';
import { getkeywordState } from '@/store/index';
interface Result {
  list: Article[];
  total: number;
}
const ContentCom: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  let keyword = useRecoilValue(getkeywordState);
  keyword = keyword || null;
  const getLoadMoreList = async (pageNum: number, pageSize: number): Promise<Result> => {
    const data = await mainApi.articleService.findAll({ pageNum, pageSize, keyword: keyword });
    // const nId = data.data.list.length < data.data.total ? 1 : undefined;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          list: data.data.list,
          total: data.data.total
        });
      }, 200);
    });
  };

  const PAGE_SIZE = 8;

  const { data, loading, loadMore, loadingMore } = useInfiniteScroll(
    data => {
      const pageNum = data ? Math.ceil(data.list.length / PAGE_SIZE) + 1 : 1;
      return getLoadMoreList(pageNum, PAGE_SIZE);
    },
    {
      threshold: 300,
      // manual: true,
      // target: ref,
      // isNoMore: data => data?.total <= data?.pageNum * PAGE_SIZE
      onError: () => {
        console.log('onError');
        message.error('网络错误，加载失败哦');
      }
    }
  );
  const hasMore = data && data.list.length < data.total;
  // const scrollChange = () => {
  //   // console.log('clientHeight:', document.documentElement.scrollTop);
  //   // console.log('clientHeight:', document.documentElement.clientHeight);
  //   // console.log('scrollHeight:', document.documentElement.scrollHeight);
  //   if (
  //     Math.floor(document.documentElement.scrollTop) + Math.floor(document.documentElement.clientHeight) ===
  //     Math.floor(document.documentElement.scrollHeight)
  //   ) {
  //     loadMore();
  //   }
  // };
  // React.useEffect(() => {
  //   window.addEventListener('scroll', scrollChange, true);
  //   scrollChange();
  //   return () => {
  //     window.removeEventListener('scroll', scrollChange, false);
  //   };
  // }, []);
  return (
    <div ref={ref} style={{ height: '100%', overflow: 'auto', padding: 12 }}>
      {loading ? (
        <Skeleton active />
      ) : (
        <div>
          {data?.list?.map(item => (
            <div
              key={item.id + Math.random()}
              style={{ padding: 12, border: '1px solid #f5f5f5', height: '200px' }}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        {hasMore && (
          <Button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading more...' : 'Click to load more'}
          </Button>
        )}
        {/* {hasMore && (
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Skeleton active />
          </div>
        )} */}
        {/* {data?.list?.length === 0 && <div>不好意思😏,看看别的文章吧</div>} */}
        {hasMore !== undefined && !hasMore && <Divider>🙈~🙈</Divider>}
      </div>
    </div>
  );
};
export default ContentCom;
