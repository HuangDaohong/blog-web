import * as React from 'react';
import styles from './index.module.less';
import PageLayoutComp from '@/components/PageLayout';
import { Title } from '@/enums';
import { Space, Divider, Avatar } from 'antd';
import { useTime } from '@/utils/useTime';
import { Config } from '@/config/constant';
import { TextTypingEffect } from '@/components/TextTypingEffect';
const AboutPage: React.FC = () => {
  const { timeText } = useTime();
  const tip = timeText + ',欢迎访问!';
  console.log(tip);
  return (
    <PageLayoutComp title={Title.About} rows={10}>
      <div>
        <div className={styles.header}>
          <div className={styles.left}>
            <Avatar src={Config.wechatAvatar} alt="" size={80} />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>
              <Space split={<Divider type="vertical" />}>
                <span style={{ color: 'orange' }}>正在前端秋招ing</span>
                <span>江苏 · 南京</span>
              </Space>
            </div>
            <div className={styles.info}>
              <TextTypingEffect text={tip} interval={100} />
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <Divider orientation="left" className={styles.divider}>
            🙆‍♂ 关于我
          </Divider>
          <ul>
            <li>
              <TextTypingEffect text="😅 2024届研究生" interval={50} />
            </li>
            <li>
              <TextTypingEffect text="🍉 喜欢前端和机器学习" interval={50} />
            </li>
            <li>
              <TextTypingEffect text="✉️ 2224397297@qq.com" interval={50} />
            </li>
          </ul>
          <Divider orientation="left" className={styles.divider}>
            ⚙️ 关于本站
          </Divider>
          {/* <Divider orientation="left"> 📒 前台</Divider> */}
          {/* <ul>
            <li>技术栈包含：React + TS</li>
            <li>状态管理采用 Redux</li>
          </ul>
          <Divider orientation="left">💼 后台</Divider>
          <ul>
            <li>技术栈包含：React + TS</li>
          </ul>
          <Divider orientation="left"> 📡 服务端</Divider> */}

          <ul>
            <li>
              <TextTypingEffect text="🖥️前后台 : React Hooks+TS+Vite+Antd+Redux/Toolkit" interval={30} />
            </li>
            <li>
              <TextTypingEffect text="🔧服务端 : Node + ORM +Mysql" interval={30} />
            </li>
            <li>
              <TextTypingEffect
                text="🎉规范化 : Prettier+Eslint+Stylelint+husky+lint-staged+commitlint+commitizen+cz-git"
                interval={10}
              />
            </li>
            <li>
              <TextTypingEffect text="🕝计划中 : 有时间再Next+Nest重构 ..." interval={30} />
            </li>
          </ul>
        </div>
      </div>
    </PageLayoutComp>
  );
};
export default AboutPage;
