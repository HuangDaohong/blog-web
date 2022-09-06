import * as React from 'react';
import { useInfiniteScroll } from 'ahooks';
import { Skeleton, Divider, Tabs } from 'antd';
import * as mainApi from '@/api';
import { Article } from '@/types';
import { useRecoilValue } from 'recoil';
import { getkeywordState } from '@/store/index';
// import { getTargetElement } from 'ahooks/lib/utils/domTarget';
import ArticleCard from '@/components/ArticleCard';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Result {
  list: Article[];
  total: number;
  pageNum: number;
  pageSize: number;
}
const ContentCom: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  let keyword = useRecoilValue(getkeywordState);
  // const [orderKey, setOrderKey] = useSafeState<string>('createdAt');
  const orderKeyRef = React.useRef('createdAt');

  keyword = keyword || null;
  const getLoadMoreList = async (pageNum: number, pageSize: number): Promise<Result> => {
    const data = await mainApi.articleService.findAll({
      pageNum,
      pageSize,
      orderKey: orderKeyRef.current,
      keyword: keyword
    });
    // const nId = data.data.list.length < data.data.total ? 1 : undefined;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          list: data.data.list,
          total: data.data.total,
          pageNum,
          pageSize
        });
      }, 200);
    });
  };

  const PAGE_SIZE = 7;

  const { data, loading, loadMore, reload } = useInfiniteScroll(
    data => {
      const pageNum = data ? Math.ceil(data.list.length / PAGE_SIZE) + 1 : 1;
      return getLoadMoreList(pageNum, PAGE_SIZE);
    },
    {
      // threshold: 0,
      // target: ref,
      // manual: true, // 手动触发
      // 要加上下面这句，不然重复加载，我也不知道为啥。但依然有一次请求加载两次的现象
      isNoMore: data => data?.total <= data?.pageNum * PAGE_SIZE
    }
  );
  const hasMore = data && data.list.length < data.total;

  // const scrollChange = () => {
  //   // console.log('scrollTop:', document.documentElement.scrollTop);
  //   // console.log('clientHeight:', document.documentElement.clientHeight);
  //   // console.log('scrollHeight:', document.documentElement.scrollHeight);
  //   const el = getTargetElement(ref);
  //   if (!el) {
  //     return;
  //   }
  //   if (
  //     Math.floor(document.documentElement.scrollTop + 0.5) +
  //       Math.floor(document.documentElement.clientHeight) ==
  //     Math.floor(document.documentElement.scrollHeight)
  //   ) {
  //     loadMore();
  //   }
  // };

  const onChange = (key: string) => {
    console.log(key);
    orderKeyRef.current = key;
    reload();
  };
  const load = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Skeleton active />
    </div>
  );
  // React.useEffect(() => {
  //   window.addEventListener('scroll', scrollChange, true);
  //   scrollChange();
  //   return () => {
  //     window.removeEventListener('scroll', scrollChange, false);
  //   };
  // }, []);
  return (
    <div ref={ref} style={{ height: '100%', overflow: 'auto', padding: 12 }}>
      <Tabs defaultActiveKey="createdAt" onChange={onChange}>
        <Tabs.TabPane tab="最新" key="createdAt"></Tabs.TabPane>
        <Tabs.TabPane tab="最热" key="views"></Tabs.TabPane>
        <Tabs.TabPane tab="最赞" key="likes"></Tabs.TabPane>
        <Tabs.TabPane tab="推荐" key="recommend"></Tabs.TabPane>x
      </Tabs>
      {loading ? (
        <Skeleton active />
      ) : (
        <div>
          <InfiniteScroll
            dataLength={data.list.length}
            next={loadMore}
            key={1}
            hasMore={hasMore}
            loader={load()}
            endMessage={<Divider>🙈END🙈</Divider>}
          >
            {data?.list?.map(item => (
              // <div key={item.id} style={{ padding: 12, border: '1px solid #f5f5f5', height: '200px' }}>
              //   {item.title}
              //   {item.subtitle}
              // </div>
              <ArticleCard key={item.article_id} article={item} />
            ))}
          </InfiniteScroll>
        </div>
      )}

      <div style={{ marginTop: 10 }}>
        {/* {hasMore && (<Button onClick={loadMore} disabled={loadingMore}>{loadingMore ? 'Loading more...' : 'Click to load more'}</Button>)} */}
        {/* {hasMore && <div onClick={loadMore}>{loadingMore ? <Spin size="large" /> : '加载更多...'}</div>} */}
        {/* {hasMore && (
          <span
            onClick={loadMore}
            style={{ cursor: 'pointer', textAlign: 'center', backgroundColor: 'white', fontSize: '15px' }}
          >
            加载更多...
          </span>
        )} */}
        {/* {hasMore && (
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <div
              onClick={loadMore}
              style={{
                cursor: 'pointer',
                display: 'flex',
                margin: '5px auto',
                width: '200px',
                justifyContent: 'center',
                fontSize: '14px',
                lineHeight: '30px',
                backgroundColor: '#57d2e2',
                borderRadius: '5px',
                opacity: 0.6
              }}
            >
              more..
            </div>
            <Spin />
          </div>
        )} */}
        {/* {hasMore && loadingMore && <Skeleton active />} */}
        {data?.list?.length === 0 && (
          <div style={{ fontSize: '30px', textAlign: 'center' }}>😅😅😅😅 无 🍉🍉</div>
        )}
        {/* {hasMore !== undefined && !hasMore && !loading && <Divider>🙈END🙈</Divider>} */}
      </div>
    </div>
  );
};
export default React.memo(ContentCom);
// import * as React from 'react';
// import { useInfiniteScroll } from 'ahooks';
// import { Skeleton, Divider, Spin, Tabs } from 'antd';
// import * as mainApi from '@/api';
// import { Article } from '@/types';
// import { useRecoilValue } from 'recoil';
// import { getkeywordState } from '@/store/index';
// import { getTargetElement } from 'ahooks/lib/utils/domTarget';
// import ArticleCard from '@/components/ArticleCard';
// interface Result {
//   list: Article[];
//   total: number;
//   pageNum: number;
//   pageSize: number;
// }
// const ContentCom: React.FC = () => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   let keyword = useRecoilValue(getkeywordState);
//   // const [orderKey, setOrderKey] = useSafeState<string>('createdAt');
//   const orderKeyRef = React.useRef('createdAt');

//   keyword = keyword || null;
//   const getLoadMoreList = async (pageNum: number, pageSize: number): Promise<Result> => {
//     const data = await mainApi.articleService.findAll({
//       pageNum,
//       pageSize,
//       orderKey: orderKeyRef.current,
//       keyword: keyword
//     });
//     // const nId = data.data.list.length < data.data.total ? 1 : undefined;
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({
//           list: data.data.list,
//           total: data.data.total,
//           pageNum,
//           pageSize
//         });
//       }, 100);
//     });
//   };

//   const PAGE_SIZE = 7;

//   const { data, loading, loadMore, reload, loadingMore } = useInfiniteScroll(
//     data => {
//       const pageNum = data ? Math.ceil(data.list.length / PAGE_SIZE) + 1 : 1;
//       return getLoadMoreList(pageNum, PAGE_SIZE);
//     },
//     {
//       // threshold: 0,
//       // target: ref,
//       // manual: true, // 手动触发
//       // 要加上下面这句，不然重复加载，我也不知道为啥。但依然有一次请求加载两次的现象
//       isNoMore: data => data?.total <= data?.pageNum * PAGE_SIZE
//     }
//   );
//   const hasMore = data && data.list.length < data.total;

//   const scrollChange = () => {
//     // console.log('scrollTop:', document.documentElement.scrollTop);
//     // console.log('clientHeight:', document.documentElement.clientHeight);
//     // console.log('scrollHeight:', document.documentElement.scrollHeight);
//     const el = getTargetElement(ref);
//     if (!el) {
//       return;
//     }
//     if (
//       Math.floor(document.documentElement.scrollTop + 0.5) +
//         Math.floor(document.documentElement.clientHeight) ==
//       Math.floor(document.documentElement.scrollHeight)
//     ) {
//       loadMore();
//     }
//   };

//   const onChange = (key: string) => {
//     console.log(key);
//     orderKeyRef.current = key;
//     reload();
//   };

//   React.useEffect(() => {
//     window.addEventListener('scroll', scrollChange, true);
//     scrollChange();
//     return () => {
//       window.removeEventListener('scroll', scrollChange, false);
//     };
//   }, []);
//   return (
//     <div ref={ref} style={{ height: '100%', overflow: 'auto', padding: 12 }}>
//       <Tabs defaultActiveKey="createdAt" onChange={onChange}>
//         <Tabs.TabPane tab="最新" key="createdAt"></Tabs.TabPane>
//         <Tabs.TabPane tab="最热" key="views"></Tabs.TabPane>
//         <Tabs.TabPane tab="最赞" key="likes"></Tabs.TabPane>
//         <Tabs.TabPane tab="推荐" key="recommend"></Tabs.TabPane>x
//       </Tabs>
//       {loading ? (
//         <Skeleton active />
//       ) : (
//         <div>
//           {data?.list?.map(item => (
//             // <div key={item.id} style={{ padding: 12, border: '1px solid #f5f5f5', height: '200px' }}>
//             //   {item.title}
//             //   {item.subtitle}
//             // </div>
//             <ArticleCard key={item.article_id} article={item} />
//           ))}
//         </div>
//       )}

//       <div style={{ marginTop: 10 }}>
//         {/* {hasMore && (<Button onClick={loadMore} disabled={loadingMore}>{loadingMore ? 'Loading more...' : 'Click to load more'}</Button>)} */}
//         {/* {hasMore && <div onClick={loadMore}>{loadingMore ? <Spin size="large" /> : '加载更多...'}</div>} */}
//         {/* {hasMore && (
//           <span
//             onClick={loadMore}
//             style={{ cursor: 'pointer', textAlign: 'center', backgroundColor: 'white', fontSize: '15px' }}
//           >
//             加载更多...
//           </span>
//         )} */}
//         {hasMore && (
//           <div style={{ textAlign: 'center', margin: '10px 0' }}>
//             <div
//               onClick={loadMore}
//               style={{
//                 cursor: 'pointer',
//                 display: 'flex',
//                 margin: '5px auto',
//                 width: '200px',
//                 justifyContent: 'center',
//                 fontSize: '14px',
//                 lineHeight: '30px',
//                 backgroundColor: '#57d2e2',
//                 borderRadius: '5px',
//                 opacity: 0.6
//               }}
//             >
//               more..
//             </div>
//             <Spin />
//           </div>
//         )}
//         {hasMore && loadingMore && <Skeleton active />}
//         {data?.list?.length === 0 && (
//           <div style={{ fontSize: '30px', textAlign: 'center' }}>😅😅😅😅 没找到，换个词呢🍉🍉</div>
//         )}
//         {hasMore !== undefined && !hasMore && !loading && <Divider>🙈END🙈</Divider>}
//       </div>
//     </div>
//   );
// };
// export default React.memo(ContentCom);
