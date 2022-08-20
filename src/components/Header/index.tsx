import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Affix, Input } from 'antd';
import SvgIcon from '@/utils/SvgIcon';
import { menuItems } from './menuItems';
import styles from './index.module.less';
import { useRecoilState } from 'recoil';
import { keywordState } from '@/store/index';

const AwesomeHeader: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const onSearch = (value: string) => {
    if (value.length <= 10) {
      setKeyword(null);
      setKeyword(value.trim());
      navigate('/');
    }
    console.log(keyword);
  };
  return (
    <Affix offsetTop={0.0001}>
      <div className={styles.container}>
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
          <Menu mode="horizontal" items={menuItems} onClick={e => navigate(e.key)} className={styles.menu} />
        </div>
        <div className={styles.user}>
          <SvgIcon symbolId="bixing" width="50px" height="50px" />
        </div>
      </div>
    </Affix>
  );
};

export default AwesomeHeader;
