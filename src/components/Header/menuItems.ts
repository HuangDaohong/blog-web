import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { rc, RouteKey } from '@/routes';

export const menuItems: ItemType[] = [
  // 首页
  {
    key: rc(RouteKey.Home).path,
    icon: rc(RouteKey.Home).icon,
    label: rc(RouteKey.Home).name
  },

  // 文章
  {
    key: rc(RouteKey.Article).path,
    icon: rc(RouteKey.Article).icon,
    label: rc(RouteKey.Article).name,
    children: [
      {
        key: rc(RouteKey.ArticleArchives).path,
        label: rc(RouteKey.ArticleArchives).name
      },
      {
        key: rc(RouteKey.ArticleCategories).path,
        label: rc(RouteKey.ArticleCategories).name
      },
      {
        key: rc(RouteKey.ArticleTags).path,
        label: rc(RouteKey.ArticleTags).name
      }
    ]
  },

  // 动态
  {
    key: rc(RouteKey.Talks).path,
    icon: rc(RouteKey.Talks).icon,
    label: rc(RouteKey.Talks).name
  },

  // 留言
  {
    key: rc(RouteKey.Messages).path,
    icon: rc(RouteKey.Messages).icon,
    label: rc(RouteKey.Messages).name
  },

  // 友链
  {
    key: rc(RouteKey.Friends).path,
    icon: rc(RouteKey.Friends).icon,
    label: rc(RouteKey.Friends).name
  },

  // 关于
  {
    key: rc(RouteKey.About).path,
    icon: rc(RouteKey.About).icon,
    label: rc(RouteKey.About).name
  }
];
