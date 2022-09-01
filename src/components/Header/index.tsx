import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Affix, Input, Drawer } from 'antd';

import * as Icon from '@ant-design/icons';
import SvgIcon from '@/utils/SvgIcon';
import { menuItems } from './menuItems';

import styles from './index.module.less';
import { useRecoilState } from 'recoil';
import { keywordState } from '@/store/index';

const AwesomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = React.useState(false);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [ishidden, setIsHidden] = React.useState(false);
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

  // 添加鼠标滚动事件,滚动时隐藏导航栏
  const handleScroll = e => {
    if (e.wheelDelta < 0 && document.documentElement.scrollTop > 600) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };
  const handleScrollisTop = () => {
    if (window.scrollY === 0) {
      setIsHidden(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('mousewheel', handleScroll);
    window.addEventListener('scroll', handleScrollisTop);
    return () => {
      window.removeEventListener('mousewheel', handleScroll);
      window.removeEventListener('scroll', handleScrollisTop);
    };
  }, []);

  return (
    <>
      <Affix offsetTop={0.0001}>
        <div className={styles.container} style={{ transform: ishidden ? 'translate3d(0,-100%,0)' : '' }}>
          <div className={styles.logo} onClick={() => navigate('/')}>
            <SvgIcon symbolId="logo" width="50px" height="50px" />
            <span className={styles.logo_title}>Huang Blog</span>
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
              <a href="https://hdhblog.cn/admin" target="_blank" rel="noreferrer">
                <Icon.FundProjectionScreenOutlined />
              </a>
            </div>
            <div className={styles.github}>
              <a href="https://github.com" target="_blank" rel="noreferrer">
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

      <div
        className={styles.mobileNavBtn}
        onClick={() => setVisible(true)}
        style={{ transform: ishidden ? 'translateY(-60px)' : '' }}
      >
        <Icon.MenuOutlined />
      </div>
      <Drawer
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
        width={200}
        closable={false}
      >
        <div className={styles.mobileNavBox}>
          <div>
            <Input.Search
              placeholder="搜索..."
              enterButton="Go"
              // disabled
              // size="large"
              size="small"
              allowClear
              onSearch={onSearch}
              style={{ marginBottom: '10px' }}
            />
          </div>
          <Menu
            mode="inline"
            items={menuItems}
            selectedKeys={[location.pathname]}
            onClick={e => navigate(e.key)}
            className={styles.menu}
          />
          <div className={styles.links}>
            <a href="https://hdhblog.cn/admin" target="_blank" rel="noreferrer">
              <Icon.SettingOutlined />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Icon.GithubOutlined />
            </a>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AwesomeHeader;
