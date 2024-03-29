import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSafeState, useRequest } from 'ahooks';
import { Affix, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { GetRootState } from '@/redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MarkNav from 'markdown-navbar';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
// import highlight from '@bytemd/plugin-highlight';
import highlight2 from '@bytemd/plugin-highlight-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom'; //图片预览
import mermaid from '@bytemd/plugin-mermaid';
import * as Icon from '@ant-design/icons';
import * as mainApi from '@/api';
import { Category, Tag } from '@/types';
import CommentCom from '@/components/Comment';
import { useScroll } from '@/utils/useScroll';
import { customCodeBlock } from './plugins/codeBlock';
import { customContainer } from './plugins/customContainer';

import { Wrapper } from './styles/markdown';
import styles from './index.module.less';
// import 'juejin-markdown-themes/dist/vuepress.min.css'; // 掘金同款样式
import 'markdown-navbar/dist/navbar.css';
import 'highlight.js/styles/github-dark.css'; // 代码高亮的主题样式(可自选)
import 'bytemd/dist/index.min.css';
import './styles/custom-container.css';

// 下面这几个表示多少多少天之前，已经封装过另外一个，就暂时不用这个
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');
// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

import { useTime } from '@/utils/useTime';

const ArticleView: React.FC = () => {
  const plugins = React.useMemo(() => {
    return [gfm(), gemoji(), highlight2(), mediumZoom(), mermaid(), customCodeBlock(), customContainer()];
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const isAffix = useScroll();

  const { timeText } = useTime();
  const [title, setTitle] = useSafeState<string>('');
  const [cover, setCover] = useSafeState<string>(''); // cover图片
  const [content, setContent] = useSafeState<string>('');
  const [tags, setTags] = useSafeState<Partial<Tag>[]>([]);
  const [category, setCategory] = useSafeState<Partial<Category>>({});
  const [createTime, setCreateTime] = useSafeState<Date>();
  const [views, setViews] = useSafeState<number>(0);
  const [likes, setLikes] = useSafeState<number>(0);
  const [comments, setComments] = useSafeState<number>(0);

  const [ipInfo, setIpInfo] = useSafeState<any>(null);
  const [address, setAddress] = useSafeState<any>();

  const [like, setLike] = useSafeState<boolean>(false);
  const [articleId, setArticleId] = useSafeState<number>();

  const commentRef = React.useRef<any>(null);
  const { user } = useSelector((state: GetRootState) => state.account);
  console.log(user);
  // 节流模式
  const { data: recommendArticles } = useRequest(() => mainApi.articleService.recommend({ counts: 4 }));
  const { run, loading } = useRequest(mainApi.articleService.findOneByArticleId, {
    manual: true,
    onSuccess: ({ data }) => {
      setTitle(data.title);
      setCover(data.cover);
      setContent(data.content);
      setTags(data.tb_tags);
      setCategory(data.categoryInfo);
      setCreateTime(data.createdAt);
      setViews(data.views);
      setLikes(data.likes);
      setComments(data.comments);
      setArticleId(data.id);
    }
  });

  const doLike = async () => {
    if (!like) {
      await mainApi.articleService.like(id);
    }
    setLike(true);
  };

  const goToComment = () => {
    commentRef.current.focus();
  };

  React.useEffect(() => {
    run(id);
  }, [id]);

  const getIP = async () => {
    const res = await fetch(
      'https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=hcFMxQSGVb5y%2F5VdlmGb9LHaEkO8y2Yj'
    );
    const data = await res.json();
    setIpInfo(data);
    const addressInfo = await fetch('https://ip.useragentinfo.com/json');
    const addressData = await addressInfo.json();
    setAddress(addressData);
    if (user?.name != 'admin') {
      await mainApi.configService.createVisitor({
        ip: data?.ipAddress,
        city:
          addressData?.country +
          ' ' +
          addressData?.province +
          ' ' +
          addressData?.city +
          ' ' +
          addressData?.isp
      });
    }
  };
  React.useEffect(() => {
    getIP();
  }, []);

  /**
   * @description: 下面的也可以。不用加这么多state
   */
  // React.useEffect(() => {
  //   if (id) {
  //     (async () => {
  //       const { data } = await mainApi.articleService.findOneByArticleId(id);
  //       setTitle(data.title);
  //       setCover(data.cover);
  //       setContent(data.content);
  //       setTags(data.tb_tags);
  //       setCategory(data.categoryInfo);
  //       setCreateTime(data.createdAt);
  //       setViews(data.views);
  //       setLikes(data.likes);
  //       setComments(data.comments);
  //     })();
  //   }
  // }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Wrapper>
          <div className={styles.head}>
            <div className={styles.head_title}>{title}</div>
            <div className={styles.heda_ainfo}>
              <span className={styles.tagAndCategory} onClick={() => navigate(`/article/categories`)}>
                <Icon.FolderOpenOutlined />
                &nbsp;{category.name}
              </span>
              &emsp;
              <Icon.TagOutlined />
              &nbsp;
              {tags.map((tag, index) => {
                return (
                  <span
                    key={tag.id}
                    style={{ color: `${tag.color}` }}
                    className={styles.tagAndCategory}
                    onClick={() => navigate(`/article/list?tagid=${tag.id}&&name=${tag.name}`)}
                  >
                    {tag.name}
                    {index < tags.length - 1 ? <Divider type="vertical" /> : ''}
                  </span>
                );
              })}
            </div>
            <span>
              发表于：{dayjs(createTime).format('YYYY-MM-DD')}&emsp;
              {/* {dayjs(createTime).fromNow()} */} {/* 5天前 */}
            </span>

            <div className={styles.people}>
              <span className={styles.likes} onClick={doLike}>
                {like ? (
                  <>
                    <Icon.LikeTwoTone twoToneColor="#44c5d6" />
                    {likes + 1}
                  </>
                ) : (
                  <>
                    <Icon.LikeOutlined />
                    {likes}
                  </>
                )}
              </span>
              <span className={styles.comments} onClick={goToComment}>
                <Icon.CommentOutlined /> {comments}
              </span>
              <span className={styles.views}>
                <Icon.EyeOutlined /> {views}
              </span>
            </div>
          </div>
          <Divider dashed style={{ padding: '0 30px' }} />
          {/* 图片缩放失真 */}
          {/* {cover ? (
            <div className={styles.backcover}>
              <img src={cover} className={styles.backcoverimg}></img>
            </div>
          ) : null} */}
          {cover ? <div className={styles.backcover} style={{ backgroundImage: `url(${cover})` }} /> : null}
          {/* {loading ? <Spin /> : <Viewer value={content} plugins={plugins} />} */}
          <Viewer value={content} plugins={plugins} />
          <Divider dashed style={{ padding: '0 30px' }} />
          {/* <div className={styles.endplace}>点赞+评论</div> */}
          {articleId ? (
            <CommentCom
              commentRef={commentRef}
              loading={loading}
              articleID={articleId}
              ip={ipInfo?.ipAddress}
              city={` ${address?.city},${address?.isp} `}
            />
          ) : null}
        </Wrapper>
      </div>

      <div className={styles.right}>
        <div className={styles.postinfo}>
          <span className={styles.postinfo_title}>{timeText},欢迎阅读!👋</span>
          {ipInfo?.status == 'success' && address ? (
            <div>
              <br />
              From {address?.province},{address?.city},{address?.isp}
              {/* ,{ipInfo?.ipAddress} */}
              <br />
              <br />
              {ipInfo?.data?.content}
              --{ipInfo?.data?.origin?.author}
            </div>
          ) : null}
        </div>

        <Affix offsetTop={isAffix ? 60 : 20}>
          <div>
            <div className={styles.catalog}>
              <div style={{ maxHeight: '50vh', overflow: 'auto', backgroundColor: 'white' }}>
                <span className={styles.catalog_title}>
                  <Icon.UnorderedListOutlined />
                  &nbsp;目录
                </span>
                <Divider style={{ height: '3px', margin: '5px 0 0 0' }} />
                <MarkNav source={content} ordered={false} updateHashAuto={false} headingTopOffset={60} />
              </div>
            </div>
            <div className={styles.postrecommend}>
              <span className={styles.catalog_title}>
                <Icon.ClockCircleOutlined />
                &nbsp;推荐
                <Divider style={{ height: '3px', margin: '5px 0 0 0' }} />
              </span>
              <div>
                {recommendArticles?.data.list.map(article => {
                  return (
                    <div key={article.article_id} className={styles.postrecommend_item}>
                      <div>
                        <Link
                          to={`/article/view/${article.article_id}`}
                          className={styles.postrecommend_item_title}
                        >
                          {article.title}
                        </Link>
                      </div>
                      <div className={styles.postrecommend_item_info}>
                        <span>{article.likes}点赞</span>
                        <Divider type="vertical" />
                        <span>{article.comments}评论</span>
                        <Divider type="vertical" />
                        <span>{article.views}阅读</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Affix>
      </div>
    </div>
  );
};
export default ArticleView;
