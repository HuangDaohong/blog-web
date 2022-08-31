// import * as React from 'react';
// // import { useSearchParams } from 'react-router-dom';
// import CategoryList from './CategoryList';
// // import ArticleDetailListPage from '@/pages/Article/ArticleDetailList';
// const CategoryPage: React.FC = () => {
//   // const [params] = useSearchParams();
//   // const id = Number(params.get('id'));
//   // return <>{id ? <ArticleDetailListPage categoryid={id} /> : <CategoryList />}</>;
//   return <CategoryList />;
// };
// export default CategoryPage;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as mainApi from '@/api';
import { useRequest } from 'ahooks';
import { Title } from '@/enums';
import PageLayoutComp from '@/components/PageLayout';
import styles from './index.module.less';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useRequest(mainApi.categoryService.findAllCategorys, {
    retryCount: 3
  });
  return (
    <PageLayoutComp title={Title.Categorys} loading={loading} rows={10}>
      <div className={styles.box}>
        {data?.data?.rows.map(category => (
          <div
            key={category.id}
            className={styles.item}
            onClick={() => navigate(`/article/list?categoryid=${category.id}&&name=${category.name}`)}
          >
            <div className={styles.itemvalue}>
              <span className={styles.namevalue}>{category.name}</span>
              <span className={styles.countvalue}>{category.articleCount}篇</span>
            </div>
            <div
              className={styles.backImg}
              style={{
                backgroundImage: `url(${category.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
          </div>
        ))}
      </div>
    </PageLayoutComp>
  );
};
export default CategoryPage;
