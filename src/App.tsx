import * as React from 'react';
import styles from '@/App.module.less';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { rc, RouteKey } from '@/routes';
import AwesomeLayout from '@/layouts';
import ArticlePage from '@/pages/Article';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AwesomeLayout />}>
            <Route index element={<Navigate to={rc(RouteKey.Home).path} replace />} />
            <Route path={rc(RouteKey.Home).path} element={rc(RouteKey.Home).element} />
            <Route path={rc(RouteKey.Talks).path} element={rc(RouteKey.Talks).element} />
            <Route path={rc(RouteKey.About).path} element={rc(RouteKey.About).element} />
            <Route path={rc(RouteKey.Friends).path} element={rc(RouteKey.Friends).element} />
            <Route path={rc(RouteKey.Messages).path} element={rc(RouteKey.Messages).element} />
            <Route path={rc(RouteKey.Works).path} element={rc(RouteKey.Works).element} />
            {/* <Route path={`${rc(RouteKey.Article).path}/*`} element={rc(RouteKey.Article).element} /> */}
            <Route path={`${rc(RouteKey.Article).path}/*`} element={<ArticlePage />} />
            <Route path={rc(RouteKey.NotFound).path} element={rc(RouteKey.NotFound).element} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
