import * as React from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import * as Icon from '@ant-design/icons';
import { UserInfo } from '@/types';
import * as mainApi from '@/api';
import store from '@/redux';
import { updateUserInfo } from '@/redux/features/acountSlice';
interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}
const LoginModal: React.FC<Props> = props => {
  const { modalVisible, setModalVisible } = props;
  const [form] = Form.useForm();
  return (
    <Modal title={'登录'} visible={modalVisible} onCancel={onClickCancel} footer={null} width={400}>
      <div>
        <Form
          form={form}
          initialValues={{ name: 'tourist', password: '123456' }}
          // labelCol={{ span: 6 }}
          // wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item name="name" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<Icon.UserOutlined />} placeholder="用户名或邮箱" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 4, max: 16, message: '密码长度必须为4-16位' }
            ]}
          >
            <Input.Password prefix={<Icon.LockOutlined />} placeholder="密码" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Button size="middle" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <div style={{ fontSize: '20px', display: 'flex', justifyContent: 'space-evenly' }}>
              <Icon.QqOutlined />
              <Icon.GithubOutlined />
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );

  //点击提交
  async function onFinish(values: Pick<UserInfo, 'name' | 'password'>) {
    console.log(values);
    const result = await mainApi.userService.login(values);
    if (result.code === 0) {
      store.dispatch(updateUserInfo(result.data));
      console.log(result.data);
      notification.success({ message: '欢迎回来👏👏', duration: 1 });
      setModalVisible(false);
    } else {
      notification.error({ message: result.message, description: '请联系管理员' });
    }
  }

  //点击取消
  function onClickCancel() {
    form.resetFields();
    setModalVisible(false);
  }
};
export default LoginModal;
