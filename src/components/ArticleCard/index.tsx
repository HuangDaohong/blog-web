import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSafeState } from 'ahooks';
import { Article } from '@/types';
import * as Icon from '@ant-design/icons';
import LocaleTime from '@/utils/LocaleTime';
import { Divider, Tag } from 'antd';
import { os } from '@/enums';
import { articleService } from '@/api';
import styles from './index.module.less';
const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const {
    origin,
    createdAt,
    tb_tags,
    categoryInfo,
    title,
    cover,
    subtitle,
    views,
    likes,
    comments
    // article_id
  } = article;
  const navigate = useNavigate();
  const [like, setLike] = useSafeState<boolean>(false);
  const onPost = () => {
    navigate(`/article/view/${article.article_id}`);
  };
  const doLike = async () => {
    if (!like) {
      await articleService.like(article.article_id);
    }
    setLike(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <>
          <Tag color={os(origin).color}>{os(origin).name}</Tag>
          <Divider type="vertical" />
          <LocaleTime date={createdAt!} />
          <Divider type="vertical" />
          <span className={styles.category} onClick={() => navigate('/article/categories')}>
            {categoryInfo.name}
          </span>
          <Divider type="vertical" />
          <Icon.TagOutlined />
          &nbsp;
          {tb_tags.map((tag, index) => {
            return (
              <span
                key={tag.id}
                style={{ color: `${tag.color}` }}
                className={styles.tag}
                onClick={() => navigate(`/article/tags?id=${tag?.id}`)}
              >
                {tag.name}
                {index < tb_tags.length - 1 ? <Divider type="vertical" /> : ''}
              </span>
            );
          })}
        </>
      </div>
      <div className={styles.bottome}>
        <div className={styles.bottome_left}>
          <div className={styles.title} onClick={onPost}>
            {title}
          </div>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.icons}>
            <span className={styles.views}>
              <Icon.EyeOutlined /> {views}
            </span>
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
            <span className={styles.comments}>
              <Icon.CommentOutlined /> {comments}
            </span>
          </div>
        </div>
        {cover ? (
          <div className={styles.article_cover} onClick={onPost}>
            {<img src={cover || categoryInfo.background} alt="cover" width="120" height="80" />}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default React.memo(ArticleCard);
