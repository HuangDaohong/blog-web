type BaseType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

type List<T> = {
  // list?: any[];
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
};

type ResBaseList<T> = {
  code: number;
  message: string;
  data: List<T>;
};

interface TableResult<T> {
  total: number;
  list: T[];
}

type UserInfo = BaseType & {
  name: string;
  password: string;
  email: string;
  role: number;
  avatar: string;
  siteUrl: string;
  position: string;
  address: string;
  ip: string;
  disabledDiscuss: number;
  client: string;
  token: string;
};

type Article = BaseType & {
  article_id: string;
  title: string;
  subtitle: string;
  content: string;
  cover: string;
  status: string;
  user_id: number;
  category_id: number;
  views: number;
  likes: number;
  comments: number;
  origin: number;
  weight: number;
  ////////////////////////////////
  categoryInfo: Category;
  tb_tags: Tag[];
};

type Category = BaseType & {
  name: string;
  description: string;
  background: string;
};

type Tag = BaseType & {
  name: string;
  background: string;
  description: string;
  color: string;
  ////////////////////////////////
  articleCount: number;
};

type IComment = BaseType & {
  user_id: number;
  article_id: number;
  content: string;
  parent_comment_id: number;
  reply_comment_id: number;
  comment_equipment: string;
  tb_user: UserInfo;
};

type Friend = BaseType & {
  name: string;
  url: string;
  description: string;
  logo: string;
};

export type SiteData = {
  articleCount: number;
  categoryCount: number;
  commentCount: number;
  tagCount: number;
  // friendCount: number;
};
type WebLog = BaseType & {
  title: string;
  content: string;
  time: string;
};

type Config = BaseType & {
  title: string;
  subTitle: string;
  summary: string;
  description: string;
  copyright: string;
  icp: string;
  icpUrl: string;
  keywords: string[];
  logo: string;
  favicon: string;
  siteUrl: string;
};

type Wallpaper = BaseType & {
  name: string;
  description: string;
  url: string;
  link: string;
  status: number;
  weight: number;
};
