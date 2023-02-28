import * as React from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Affix, Input, Drawer, Modal, notification, Dropdown, Avatar, AutoComplete } from 'antd';
import * as Icon from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { menuItems } from './menuItems';
import styles from './index.module.less';
import LoginModal from './LoginModal';
import * as mainApi from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { GetRootState } from '@/redux';
import { logout } from '@/redux/features/acountSlice';
import { useScroll } from '@/utils/useScroll';
import store from '@/redux';
import { updateUserInfo } from '@/redux/features/acountSlice';
import { updateHistoryWords } from '@/redux/features/configSlice';
import { updatekeyword } from '@/redux/features/keywordSlice';
import SvgIcon from '@/utils/SvgIcon';
import { checkIsLocalPage } from '@/utils/checkIsLocalPage';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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
  const isAffix = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: GetRootState) => state.account);
  const { historyWords } = useSelector((state: GetRootState) => state.history);
  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [params] = useSearchParams();
  const inputRef = React.useRef(null); //搜素框的ref
  const [options, setOptions] = React.useState([]); //搜索框的options
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
    }
  }, []);

  const headerMenu = React.useMemo(
    () => <Menu items={dorpdown_menuItems} onClick={handleHeaderMenuClick} />,
    []
  );

  const hideModal = () => {
    setOpen(false);
  };

  const onSearch = (value: string) => {
    if (value.length <= 20) {
      dispatch(updatekeyword(value.trim()));
      navigate('/');
      dispatch(updateHistoryWords(value));
      // 宏任务失去焦点
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    }
  };

  // 全屏
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
    localStorage.setItem('currentUrl', location.pathname);
    setModalVisible(true);
  };

  const getdata = async id => {
    const result = await mainApi.userService.getQQ({ id });
    if (result.code === 0) {
      result.data.token = params.get('token');
      store.dispatch(updateUserInfo(result.data));
      notification.success({ message: '欢迎登录', duration: 1 });
    } else {
      notification.error({ message: result.message, description: '请联系管理员' });
    }
    const currentUrl = localStorage.getItem('currentUrl');
    navigate(`${currentUrl || '/'}`);
    localStorage.removeItem('currentUrl');
  };

  const getOptions = () => {
    let res = historyWords.map(item => {
      return {
        value: item.value,
        // label: item.value
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>
              <Icon.HistoryOutlined />
              &emsp;
              {item.value}
            </span>
            {item.date.length < 10 ? <span>{item.date}</span> : <span>{dayjs(item.date).fromNow()}</span>}
          </div>
        )
      };
    });
    setOptions(res ?? []);
  };
  React.useEffect(() => {
    getOptions();
  }, [historyWords]);
  React.useEffect(() => {
    const id = params.get('qqid');
    if (id) {
      getdata(id);
    }
  }, [params]);

  React.useEffect(() => {
    checkIsLocalPage();
  }, []);

  /*   // 添加鼠标滚动事件,滚动时隐藏导航栏，已经改为自定义hooks
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
  }, []); */
  // const options = [{ value: 'Burns Bay Road' }, { value: 'Downing Street' }, { value: 'Wall Street' }];
  return (
    <>
      <Affix offsetTop={0.000000001}>
        <div className={styles.container} style={{ transform: !isAffix ? 'translate3d(0,-100%,0)' : '' }}>
          <div className={styles.logo} onClick={() => navigate('/')}>
            <SvgIcon symbolId="logo" width="50px" height="50px" />
            <span className={styles.logo_title}>Huang Blog</span>
          </div>
          <div className={styles.search}>
            <AutoComplete
              style={{ width: 250 }}
              options={options}
              onSelect={onSearch}
              dropdownMatchSelectWidth={250}
            >
              <Input.Search
                placeholder="全局搜索..."
                enterButton="搜索"
                allowClear
                onSearch={onSearch}
                ref={inputRef}
                // disabled
                // style={{ width: 304 }}
              />
            </AutoComplete>
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
            {user.token ? (
              <Dropdown overlay={headerMenu} arrow>
                <Avatar
                  src={user?.avatar || 'https://hdhblog.cn/api/6ddb1547d629213e63f307700.gif'}
                  className={styles.user}
                />
              </Dropdown>
            ) : (
              <div className={styles.user} onClick={qqLogin}>
                登 录
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
