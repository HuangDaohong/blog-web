import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Affix, Input, Drawer, Modal, notification, Dropdown, Avatar, message } from 'antd';

import * as Icon from '@ant-design/icons';
import SvgIcon from '@/utils/SvgIcon';
import { menuItems } from './menuItems';

import styles from './index.module.less';
import { useRecoilState } from 'recoil';
import { keywordState } from '@/store/index';
import LoginModal from './LoginModal';

import { useDispatch, useSelector } from 'react-redux';
import { GetRootState } from '@/redux';
import { logout } from '@/redux/features/acountSlice';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const dorpdown_menuItems: ItemType[] = [
  {
    key: 'profile',
    icon: <Icon.UserOutlined />,
    label: '用户信息'
  },
  {
    key: 'logout',
    icon: <Icon.LogoutOutlined />,
    label: '退出登录'
  }
];
const AwesomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: GetRootState) => state.account);

  const [visible, setVisible] = React.useState(false);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [ishidden, setIsHidden] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleHeaderMenuClick = React.useCallback(({ key }) => {
    if (key === 'logout') {
      Modal.confirm({
        title: '提示',
        icon: <Icon.ExclamationCircleOutlined />,
        content: '确认退出登录吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          notification.success({ message: '退出登录成功', duration: 1 });
          dispatch(logout());
        }
      });
    } else {
      console.log('user:', user);
      message.warning('用户信息');
    }
  }, []);
  const headerMenu = React.useMemo(
    () => <Menu items={dorpdown_menuItems} onClick={handleHeaderMenuClick} />,
    []
  );

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
              placeholder="输入关键字..."
              enterButton="搜索"
              // disabled
              // size="large"
              allowClear
              // style={{ width: 304 }}
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

            {/*  className={styles.user} /> */}
            {/* <span className={styles.user} onClick={() => setModalVisible(true)}>
              <SvgIcon symbolId="cat" width="40px" height="40px" />
            </span> */}
            {user.token ? (
              <Dropdown overlay={headerMenu} arrow>
                <Avatar
                  src={
                    user?.avatar ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSXC7e3slDWP4SWI1-XaGu_LK8_o7QO6qFDA&usqp=CAU'
                  }
                  className={styles.user}
                />
              </Dropdown>
            ) : (
              <div className={styles.user} onClick={() => setModalVisible(true)}>
                {/* <SvgIcon symbolId="bixing" width="40px" height="40px" /> */}
                登录
              </div>
            )}
          </div>
        </div>
      </Affix>

      <LoginModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

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
          {/* <div>
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
          </div> */}
          <div onClick={() => navigate('/')} className={styles.mylogo}>
            <SvgIcon symbolId="logo" width="40px" height="40px" />
            Huang Blog
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
