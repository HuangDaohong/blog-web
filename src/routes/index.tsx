import * as React from 'react';
import * as Icon from '@ant-design/icons';
import lazyLoad from './lazyLoad';

export enum RouteKey {
  Home, //首页
  Article, //文章
  ArticleArchives, //归档
  ArticleCategories, //分类
  ArticleTags, //标签
  ArticleView, //文章详情
  ArticleList, //文章列表
  Talks, //动态
  Works, //作品
  Messages, //留言
  Friends, //友链
  About, //关于
  NotFound //404
}

export interface RouteConfig {
  key: RouteKey;
  path: string;
  subPath?: string;
  name?: string;
  icon?: React.ReactElement;
  element?: React.ReactNode;
}

export const routeMap: ReadonlyMap<RouteKey, RouteConfig> = new Map(
  [
    {
      key: RouteKey.Home,
      element: lazyLoad(React.lazy(() => import('@/pages/Home'))),
      name: '首页',
      path: '/home',
      icon: <Icon.HomeOutlined />
    },
    {
      key: RouteKey.Article,
      element: lazyLoad(React.lazy(() => import('@/pages/Article'))),
      name: '文章',
      path: '/article',
      icon: <Icon.ReadOutlined />
    },
    {
      key: RouteKey.ArticleArchives,
      element: lazyLoad(React.lazy(() => import('@/pages/Article/Archive'))),
      name: '归档',
      path: '/article/archives',
      subPath: 'archives',
      icon: <Icon.FileDoneOutlined />
    },
    {
      key: RouteKey.ArticleCategories,
      element: lazyLoad(React.lazy(() => import('@/pages/Article/Category'))),
      name: '分类',
      path: '/article/categories',
      subPath: 'categories'
    },
    {
      key: RouteKey.ArticleTags,
      element: lazyLoad(React.lazy(() => import('@/pages/Article/Tag'))),
      name: '标签',
      path: '/article/tags',
      subPath: 'tags'
    },
    {
      key: RouteKey.ArticleView,
      element: lazyLoad(React.lazy(() => import('@/pages/Article/View'))),
      name: '详情',
      path: '/article/view/:id',
      subPath: 'view/:id'
    },
    {
      key: RouteKey.ArticleList,
      element: lazyLoad(React.lazy(() => import('@/pages/Article/ArticleDetailList'))),
      name: '列表',
      path: '/article/list',
      subPath: 'list'
    },
    {
      key: RouteKey.Talks,
      element: lazyLoad(React.lazy(() => import('@/pages/Talks'))),
      name: '动态',
      path: '/talks',
      icon: <Icon.MessageOutlined />
    },
    {
      key: RouteKey.Works,
      element: lazyLoad(React.lazy(() => import('@/pages/Works'))),
      name: '作品',
      path: '/works',
      icon: <Icon.PictureOutlined />
    },
    {
      key: RouteKey.Messages,
      element: lazyLoad(React.lazy(() => import('@/pages/Messages'))),
      name: '留言',
      path: '/messages',
      icon: <Icon.MessageOutlined />
    },
    {
      key: RouteKey.Friends,
      element: lazyLoad(React.lazy(() => import('@/pages/Friends'))),
      name: '友链',
      path: '/friends',
      icon: <Icon.LinkOutlined />
    },
    {
      key: RouteKey.About,
      element: lazyLoad(React.lazy(() => import('@/pages/About'))),
      name: '关于',
      path: '/about',
      icon: <Icon.UserOutlined />
    },
    {
      key: RouteKey.NotFound,
      element: lazyLoad(React.lazy(() => import('@/pages/NotFound'))),
      path: '/*'
    }
  ].map(route => [route.key, route])
);

// 获取路由配置对象
export const rc = (routeKey: RouteKey): RouteConfig => {
  return routeMap.get(routeKey)!;
};
// 根据路径，获取对象
export const rcByPath = (routePath: string) => {
  return Array.from(routeMap.values()).find(route => route.path === routePath);
};
//判断路由是否存在
export const isRoute = (routePath: string, routeKey: RouteKey) => {
  return routeMap.get(routeKey)?.path === routePath;
};
