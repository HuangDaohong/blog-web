import * as React from 'react';
import { Form, Input, Button, notification, Divider } from 'antd';
import * as Icon from '@ant-design/icons';
import { UserInfo } from '@/types';
import * as mainApi from '@/api';
import store from '@/redux';
import { updateUserInfo } from '@/redux/features/acountSlice';
import SvgIcon from '@/utils/SvgIcon';
interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}
const LoginTab: React.FC<Props> = props => {
  const [form] = Form.useForm();
  const onQQLogin = () => {
    const appId = '101972085';
    const redirectUri = encodeURIComponent('https://hdhblog.cn/api/users/qqlogin');
    const url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=hdhblog`;
    window.location.href = url;
  };

  //点击登录
  async function onFinish(values: Pick<UserInfo, 'name' | 'password'>) {
    const result = await mainApi.userService.login(values);
    if (result.code === 0) {
      store.dispatch(updateUserInfo(result.data));
      // console.log(result.data);
      notification.success({ message: '欢迎访问👏👏', duration: 1 });
      props.setModalVisible(false);
    } else {
      notification.error({ message: result.message, description: '请联系管理员' });
    }
  }

  return (
    <div>
      <Form
        form={form}
        // initialValues={{ name: 'tourist', password: '123456' }}
        // labelCol={{ span: 6 }}
        // wrapperCol={{ span: 18 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入用户名' }]}
          style={{ marginTop: '20px' }}
        >
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
        <Divider>第三方登录</Divider>
        <Form.Item>
          <div style={{ fontSize: '32px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
            <SvgIcon symbolId="QQ" onClick={onQQLogin} width="35" height="35" />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(LoginTab);
