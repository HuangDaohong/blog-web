import * as React from 'react';
import { Modal, Tabs } from 'antd';
import * as Icon from '@ant-design/icons';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}
const LoginModal: React.FC<Props> = props => {
  const { modalVisible, setModalVisible } = props;
  const [tabKey, setTabKey] = React.useState('login');

  function onClickCancel() {
    setModalVisible(false);
  }
  return (
    <Modal open={modalVisible} onCancel={onClickCancel} footer={null} width={400} destroyOnClose>
      <Tabs
        // type="card"
        tabPosition="top"
        centered
        activeKey={tabKey}
        onChange={setTabKey}
        items={[
          {
            key: 'login',
            label: (
              <span>
                <Icon.RocketOutlined />
                登录
              </span>
            ),
            children: <LoginTab modalVisible={modalVisible} setModalVisible={setModalVisible} />
          },
          {
            key: 'register',
            label: (
              <span>
                <Icon.UserAddOutlined />
                注册
              </span>
            ),
            children: <RegisterTab setTabKey={setTabKey} />
          }
        ]}
      />
    </Modal>
  );
};
export default React.memo(LoginModal);
