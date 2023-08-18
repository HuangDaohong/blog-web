import * as React from 'react';
import styles from './index.module.less';
import PageLayoutComp from '@/components/PageLayout';
import { Title } from '@/enums';
import ImgCard from './imageCard';
import { shuffleArray } from '@/utils/randomArray';
const WorksPage: React.FC = () => {
  // 作品集合
  const works = [
    {
      key: 1,
      name: '博客后台',
      desc: '基于 Vite + React + TypeScript + Antd 的个人博客后台管理系统',
      url: 'https://hdhblog.cn/admin/dashboard',
      backgroundImg: 'https://hdhblog.cn/api/97e2a2b34822c48f1d3cb7100.png'
    },
    {
      key: 2,
      name: '视觉合集',
      desc: '视觉效果整理',
      url: 'https://hdhblog.cn/visuals/',
      backgroundImg: 'https://hdhblog.cn/api/82f2a02a9a5c058fb303e7f00.webp'
    },
    {
      key: 3,
      name: 'V3-Admin脚手架',
      desc: '基于 Vite + Vue3 + TypeScript + Pinia的Admin脚手架',
      url: 'https://hdhblog.cn/v3-admin/',
      backgroundImg: 'https://hdhblog.cn/api/c7505010708912bb583e6ea00.png'
    }
  ];
  return (
    <PageLayoutComp title={Title.Works} rows={10}>
      <div className={styles.box}>
        {shuffleArray(works).map(item => (
          <ImgCard
            key={item.key}
            name={item.name}
            desc={item.desc}
            url={item.url}
            backgroundImg={item.backgroundImg}
          />
        ))}
      </div>
    </PageLayoutComp>
  );
};
export default WorksPage;
