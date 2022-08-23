import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Affix, Input } from 'antd';

import * as Icon from '@ant-design/icons';
import SvgIcon from '@/utils/SvgIcon';
import { menuItems } from './menuItems';

import styles from './index.module.less';
import { useRecoilState } from 'recoil';
import { keywordState } from '@/store/index';

const AwesomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [keyword, setKeyword] = useRecoilState(keywordState);
  const onSearch = (value: string) => {
    if (value.length <= 20) {
      setKeyword(null);
      setKeyword(value.trim());
      navigate('/');
    }
    console.log(keyword);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <Affix offsetTop={0.0001}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <SvgIcon symbolId="logo" width="50px" height="50px" />
          <span className={styles.logo_title}>Huang&nbsp;Blog</span>
        </div>
        <div className={styles.search}>
          <Input.Search
            placeholder="全局搜索..."
            enterButton="Search"
            // disabled
            // size="large"
            allowClear
            style={{ width: 304 }}
            onSearch={onSearch}
          />
        </div>
        <div className={styles.menubox}>
          <Menu
            mode="horizontal"
            items={menuItems}
            selectedKeys={[location.pathname]}
            onClick={e => navigate(e.key)}
            className={styles.menu}
          />
        </div>
        <div className={styles.right}>
          {/* <Tooltip title="大屏展示">
            <div
              className={styles.link}
              onClick={() => {
                // navigate('/screen');
                // location.href = '/screen';
                window.open('/screen');
              }}
            >
              <Icon.FundProjectionScreenOutlined />
            </div>
          </Tooltip> */}

          <div className={styles.link}>
            <a href="http://127.0.0.1:4000/dashboard" target="_blank" rel="noreferrer">
              <Icon.HomeOutlined />
            </a>
          </div>
          <div className={styles.github}>
            <a href="https://github.com/HuangDaohong/blog-web-admin" target="_blank" rel="noreferrer">
              <Icon.GithubOutlined />
            </a>
          </div>
          <div onClick={toggleFullScreen} className={styles.fullscreen}>
            <Icon.ExpandOutlined />
          </div>

          <SvgIcon symbolId="cat" width="50px" height="50px" className={styles.user} />
        </div>
      </div>
    </Affix>
  );
};

export default AwesomeHeader;
