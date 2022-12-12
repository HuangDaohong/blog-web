import * as React from 'react';
import styles from './index.module.less';
import PageLayoutComp from '@/components/PageLayout';
import { Title } from '@/enums';
import { Space, Divider, Avatar } from 'antd';
import { useTime } from '@/utils/useTime';
import { Config } from '@/config/constant';
const AboutPage: React.FC = () => {
  const { timeText } = useTime();
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
                <span style={{ color: 'orange' }}>正在忙碌ing</span>
                <span>江苏 · 南京</span>
              </Space>
            </div>
            <div className={styles.info}>{timeText}，欢迎访问！</div>
          </div>
        </div>
        <div className={styles.main}>
          <Divider orientation="left" className={styles.divider}>
            🙆‍♂ 关于我
          </Divider>
          <ul>
            <li>😅 研二学生</li>
            <li>💩 喜欢前端和算法</li>
            <li>✉️ 2224397297@qq.com</li>
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
            <li>🖥️前后台 : React18+Hooks+TS+Vite3+Antd+Redux/Toolkit</li>
            <li>🔧服务端 : Node + ORM +Mysql</li>
            <li>🎉规范化 : Prettier+Eslint+Stylelint+husky+lint-staged+commitlint+commitizen+cz-git</li>
            <li>🕝计划中 : 有时间再Next+Nest重构 ...</li>
          </ul>
        </div>
      </div>
    </PageLayoutComp>
  );
};
export default AboutPage;
