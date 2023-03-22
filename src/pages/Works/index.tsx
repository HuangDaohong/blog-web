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
      name: '博客前台',
      desc: '基于 Vite + React + TypeScript + Antd 的个人博客',
      url: 'https://hdhblog.cn/',
      backgroundImg: 'https://hdhblog.cn/api/6488a3ff0e29a495008c44f00.png'
    },
    {
      key: 2,
      name: '博客后台',
      desc: '基于 Vite + React + TypeScript + Antd 的个人博客后台管理系统',
      url: 'https://hdhblog.cn/admin/dashboard',
      backgroundImg: 'https://hdhblog.cn/api/14bc10739ca0f24ec0768e700.png'
    },
    {
      key: 3,
      name: '博客服务端',
      desc: '基于 Koa2+ ORM + MySQL 的个人博客服务端',
      url: 'https://www.koajs.com.cn/',
      backgroundImg: 'https://hdhblog.cn/api/d4c12bf524eed78399ccead00.png'
    },
    {
      key: 4,
      name: '博客大屏（还没做）',
      desc: '目前只做了屏幕适配',
      url: 'https://hdhblog.cn/admin/screen',
      backgroundImg:
        'https://5b0988e595225.cdn.sohucs.com/images/20200324/bf73dbcd9e8c4ef5b98639d3dc5ac421.gif'
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
