import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { shuffleArray } from '@/utils/randomArray';
import { Title } from '@/enums';
import defaultImg from '@/assets/images/girl.webp';
import * as mainApi from '@/api';
import PageLayoutComp from '@/components/PageLayout';
import styles from './index.module.less';

const TagPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useRequest(mainApi.tagService.findAll, {
    retryCount: 3
  });
  return (
    <PageLayoutComp title={Title.Tags} loading={loading} rows={10}>
      <div className={styles.box}>
        {shuffleArray(data?.data?.rows).map(tag => (
          <div
            key={tag.id}
            className={styles.item}
            onClick={() => navigate(`/article/list?tagid=${tag.id}&&name=${tag.name}`)}
          >
            <div className={styles.itemvalue}>
              <span className={styles.namevalue}>{tag.name}</span>
              <span className={styles.countvalue}>{tag.articleCount}篇</span>
            </div>
            <div
              className={styles.backImg}
              style={{
                backgroundImage: `url(${tag.background || defaultImg})`,
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
export default TagPage;
