import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { rc, RouteKey } from '@/routes';
// import ArticleView from './View';

const ArticlePage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={rc(RouteKey.ArticleArchives).subPath!} replace />} />
      <Route path={rc(RouteKey.ArticleArchives).subPath} element={rc(RouteKey.ArticleArchives).element} />
      <Route path={rc(RouteKey.ArticleCategories).subPath} element={rc(RouteKey.ArticleCategories).element} />
      <Route path={rc(RouteKey.ArticleTags).subPath} element={rc(RouteKey.ArticleTags).element} />
      <Route path={rc(RouteKey.ArticleList).subPath} element={rc(RouteKey.ArticleList).element} />
      <Route path={rc(RouteKey.ArticleView).subPath} element={rc(RouteKey.ArticleView).element} />
      <Route path={rc(RouteKey.NotFound).path} element={rc(RouteKey.NotFound).element} />
    </Routes>
  );
};

export default ArticlePage;
