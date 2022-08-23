import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// import * as Icon from '@ant-design/icons';
import { Avatar } from 'antd';
import * as mainApi from '@/api';
import { useReactive, useSafeState, useRequest } from 'ahooks';
import type { SiteData } from '@/types';
import acatarImg from '@/assets/images/avatar.jpg';
import styles from './index.module.less';
import SvgIcon from '@/utils/SvgIcon';
import WordCloud from './WordCloud';
import dayjs from 'dayjs';
const SiderCom: React.FC = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useSafeState<any[]>([]);
  const [sentence, setSentence] = useSafeState<string>('欢迎访问👋👋👋');

  const { run } = useRequest(mainApi.tagService.findAll, {
    manual: true,
    onSuccess: data => {
      setDataList(
        data?.data?.rows.map((item: any) => {
          return {
            name: item.name,
            value: item.articleCount,
            id: item.id
          };
        })
      );
    }
  });

  const siteData = useReactive<SiteData>({
    categoryCount: 0,
    commentCount: 0,
    articleCount: 0,
    tagCount: 0,
    articleClickCount: 0
  });
  const getData = async () => {
    const { data } = await mainApi.configService.fetchSiteData();
    siteData.categoryCount = data.categoryCount;
    siteData.commentCount = data.commentCount;
    siteData.articleCount = data.articleCount;
    siteData.tagCount = data.tagCount;
    siteData.articleClickCount = data.articleClickCount;
  };
  React.useEffect(() => {
    getData();
    run();
    getSentence();
  }, []);
  const getSentence = async () => {
    const res = await fetch(
      'https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=hcFMxQSGVb5y%2F5VdlmGb9LHaEkO8y2Yj'
    );
    const data = await res.json();
    setSentence(data?.data.content);
  };
  return (
    <div className={styles.home_sider}>
      <div className={styles.card_web}>
        <Avatar src={acatarImg} size={70} alt="avatar" className={styles.avatar} />
        <span className={styles.web_title}>HUANG BLOG</span>
        <span className={styles.web_sentence}>{sentence || '欢迎访问👋👋👋'}</span>
        <div className={styles.webcountinfo}>
          <div className={styles.webcountinfoname}>
            <div className={styles.webcountinfoname_value} onClick={() => navigate('/article')}>
              <span className={styles.webcountinfoname_value_title}>文章</span>
              <span>{siteData.articleCount}</span>
            </div>
            <div className={styles.webcountinfoname_value} onClick={() => navigate('/article/categories')}>
              <span className={styles.webcountinfoname_value_title}>分类</span>
              <span>{siteData.categoryCount}</span>
            </div>
            <div className={styles.webcountinfoname_value} onClick={() => navigate('/article/tags')}>
              <span className={styles.webcountinfoname_value_title}>标签</span>
              <span>{siteData.tagCount}</span>
            </div>
            <div className={styles.webcountinfoname_value} onClick={() => navigate('/messages')}>
              <span className={styles.webcountinfoname_value_title}>评论</span>
              <span>{siteData.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.card_notice}>
        {/* <Icon.SoundTwoTone twoToneColor="rgb(49 191 210)" style={{ fontSize: '23px' }} /> */}
        <SvgIcon symbolId="铃铛" width="24px" height="24px" />
        <span>分享技术,分享生活,感谢支持!</span>
      </div>
      <div className={styles.card_tags}>
        <WordCloud dataList={dataList} />
      </div>
      <div className={styles.card_others}>
        <div>
          <span>访问量：{siteData.articleClickCount}</span>
          {/* 显示网站运行总时间*/}
        </div>
        <div>
          <span>运行时间：{dayjs().diff(dayjs(new Date('2021-4-12')), 'day')}天</span>
        </div>
        <div>
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=2021041227"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/police.d0289dc.png"
              alt=""
            ></img>
            <span>苏ICP备2021041227号</span>
          </a>
        </div>
        <div>
          <span>©2021-2022 Huang Blog</span>
        </div>
      </div>
    </div>
  );
};
export default React.memo(SiderCom);
