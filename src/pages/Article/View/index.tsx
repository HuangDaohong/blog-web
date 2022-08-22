import * as React from 'react';
import * as mainApi from '@/api';
import { useNavigate } from 'react-router-dom';
import { useSafeState } from 'ahooks';
import { Affix, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom'; //图片预览
import mermaid from '@bytemd/plugin-mermaid';
import { Wrapper } from './markdown';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css';
import styles from './index.module.less';
import * as Icon from '@ant-design/icons';
import { Category, Tag } from '@/types';
import dayjs from 'dayjs';

const plugins = [gfm(), gemoji(), highlight({}), mediumZoom(), mermaid()];

const ArticleView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useSafeState<string>('');
  const [cover, setCover] = useSafeState<string>(''); // cover图片
  const [content, setContent] = useSafeState<string>('');
  const [tags, setTags] = useSafeState<Partial<Tag>[]>([]);
  const [category, setCategory] = useSafeState<Partial<Category>>({});
  const [createTime, setCreateTime] = useSafeState<Date>();
  const [views, setViews] = useSafeState<number>(0);
  const [likes, setLikes] = useSafeState<number>(0);
  const [comments, setComments] = useSafeState<number>(0);
  React.useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await mainApi.articleService.findOneByArticleId(id);
        setTitle(data.title);
        setCover(data.cover);
        setContent(data.content);
        setTags(data.tb_tags);
        setCategory(data.categoryInfo);
        setCreateTime(data.createdAt);
        setViews(data.views);
        setLikes(data.likes);
        setComments(data.comments);
        // TODO useRequest
        await mainApi.articleService.recommend({ counts: 4 });
      })();
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Wrapper>
          <div className={styles.head}>
            <div className={styles.head_title}>{title}</div>
            <div className={styles.heda_ainfo}>
              <span>发表于：{dayjs(createTime).format('YYYY-MM-DD')}&emsp;</span>
              <span
                className={styles.tagAndCategory}
                onClick={() => navigate(`/article/categories/${category.id}`)}
              >
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
                    onClick={() => navigate(`/article/tags/${tag?.id}`)}
                  >
                    {tag.name}
                    {index < tags.length - 1 ? <Divider type="vertical" /> : ''}
                  </span>
                );
              })}
            </div>
            <div className={styles.people}>
              <span className={styles.likes}>
                <Icon.LikeOutlined />
                {likes}
              </span>
              <span className={styles.comments}>
                <Icon.CommentOutlined /> {comments}
              </span>
              <span className={styles.views}>
                <Icon.EyeOutlined /> {views}
              </span>
            </div>
          </div>
          <Divider dashed style={{ padding: '0 30px' }} />
          {cover ? (
            <div className={styles.backcover}>
              <img src={cover} className={styles.backcoverimg}></img>
            </div>
          ) : null}
          <Viewer value={content} plugins={plugins} />
          <div className={styles.endplace}>版权声明+点赞+评论</div>
        </Wrapper>
      </div>

      <div className={styles.right}>
        <div className={styles.postinfo}>
          <span className={styles.catalog_title}>
            <Icon.BarChartOutlined />
            &nbsp;信息
          </span>
        </div>

        <Affix offsetTop={80}>
          <div>
            <div className={styles.catalog}>
              <div style={{ maxHeight: '50vh', overflow: 'auto', backgroundColor: 'white' }}>
                <span className={styles.catalog_title}>
                  <Icon.UnorderedListOutlined />
                  &nbsp;目录
                </span>
                <Divider style={{ height: '3px', margin: '5px 0 0 0' }} />
                <MarkNav source={content} />
              </div>
            </div>
            <div className={styles.postrecommend}>
              <span className={styles.catalog_title}>
                <Icon.ClockCircleOutlined />
                &nbsp;推荐
              </span>
            </div>
          </div>
        </Affix>
      </div>
    </div>
  );
};
export default ArticleView;
