import * as React from 'react';
import { Menu, Affix, Input, Drawer, Modal, notification, Dropdown, Avatar } from 'antd';
import * as Icon from '@ant-design/icons';
import SvgIcon from '@/utils/SvgIcon';
import { menuItems } from './menuItems';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.less';
import { useRecoilState } from 'recoil';
import { keywordState } from '@/store/index';
import LoginModal from './LoginModal';
import * as mainApi from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { GetRootState } from '@/redux';
import { logout } from '@/redux/features/acountSlice';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useScroll } from '@/utils/useScroll';
import store from '@/redux';
import { updateUserInfo } from '@/redux/features/acountSlice';
/* import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
// import { InstantSearch, useHits } from 'react-instantsearch-hooks-web';
const searchClient = algoliasearch('4DXCL8LEPG', '7d685c4d73358013b105b648c7d96082');
 */
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
  // 自定义hooks
  const isAffix = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: GetRootState) => state.account);

  const [visible, setVisible] = React.useState(false);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  // const [ishidden, setIsHidden] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  //用户信息
  const [open, setOpen] = React.useState(false);

  const [params] = useSearchParams();
  // const navigate = useNavigate();
  const getdata = async id => {
    const result = await mainApi.userService.getQQ({ id });
    if (result.code === 0) {
      result.data.token = params.get('token');
      store.dispatch(updateUserInfo(result.data));
      notification.success({ message: '欢迎登录', duration: 1 });
    } else {
      notification.error({ message: result.message, description: '请联系管理员' });
    }
    // navigate('/');
    const currentUrl = localStorage.getItem('currentUrl');
    navigate(`${currentUrl || '/'}`);
    localStorage.removeItem('currentUrl');
  };

  React.useEffect(() => {
    const id = params.get('qqid');
    if (id) {
      getdata(id);
    }
  }, [params]);

  const hideModal = () => {
    setOpen(false);
  };
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
      setOpen(true);
      // message.warning('用户信息');
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

  const qqLogin = () => {
    console.log('pathname', location.pathname);
    //将pathname存入localStorge
    localStorage.setItem('currentUrl', location.pathname);
    setModalVisible(true);
  };

  // // 添加鼠标滚动事件,滚动时隐藏导航栏，已经改为自定义hooks
  // const handleScroll = e => {
  //   if (e.wheelDelta < 0 && document.documentElement.scrollTop > 600) {
  //     setIsHidden(true);
  //   } else {
  //     setIsHidden(false);
  //   }
  // };
  // const handleScrollisTop = () => {
  //   if (window.scrollY === 0) {
  //     setIsHidden(false);
  //   }
  // };

  // React.useEffect(() => {
  //   window.addEventListener('mousewheel', handleScroll);
  //   window.addEventListener('scroll', handleScrollisTop);
  //   return () => {
  //     window.removeEventListener('mousewheel', handleScroll);
  //     window.removeEventListener('scroll', handleScrollisTop);
  //   };
  // }, []);

  return (
    <>
      <Affix offsetTop={0.000000001}>
        {/* <div className={styles.container} style={{ transform: ishidden ? 'translate3d(0,-100%,0)' : '' }}> */}
        <div className={styles.container} style={{ transform: !isAffix ? 'translate3d(0,-100%,0)' : '' }}>
          <div className={styles.logo} onClick={() => navigate('/')}>
            <SvgIcon symbolId="logo" width="50px" height="50px" />
            <span className={styles.logo_title}>Huang Blog</span>
          </div>
          <div className={styles.search}>
            <Input.Search
              placeholder="请输入关键字..."
              enterButton="搜索"
              // disabled
              // size="large"
              allowClear
              // style={{ width: 304 }}
              onSearch={onSearch}
            />

            {/*             <InstantSearch indexName="blog_store" searchClient={searchClient}>
              <SearchBox />
              <Hits />
            </InstantSearch> */}
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
                  src={user?.avatar || 'https://hdhblog.cn/api/6ddb1547d629213e63f307700.gif'}
                  className={styles.user}
                />
              </Dropdown>
            ) : (
              <div className={styles.user} onClick={qqLogin}>
                {/* <SvgIcon symbolId="bixing" width="40px" height="40px" /> */}登 录
              </div>
            )}
          </div>
        </div>
      </Affix>

      <LoginModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Modal
        title="用户信息"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
        width={300}
      >
        <h4>名字: {user?.name}</h4>
        <h4>邮箱: {user?.email || '暂无'}</h4>
        <h2> ...</h2>
      </Modal>

      <div
        className={styles.mobileNavBtn}
        onClick={() => setVisible(true)}
        style={{ transform: !isAffix ? 'translateY(-60px)' : '' }}
      >
        <Icon.MenuOutlined />
      </div>
      <Drawer placement="left" onClose={() => setVisible(false)} open={visible} width={170} closable={false}>
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
            defaultOpenKeys={['/article']}
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

export default React.memo(AwesomeHeader);
