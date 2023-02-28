import * as React from 'react';
import { Form, Input, Button, message } from 'antd';
import * as Icon from '@ant-design/icons';
import * as mainApi from '@/api';
import AwesomeUpload from '@/components/Upload';

interface Props {
  setTabKey: (key: string) => void;
}
const RegisterTab: React.FC<Props> = props => {
  const [formRegister] = Form.useForm();
  const [avatar, setAvatar] = React.useState<string>('');
  const [isSend, setIsSend] = React.useState<boolean>(false);
  // 倒计时60秒
  const [count, setCount] = React.useState<number>(60);
  // 发送验证码
  async function sendCode() {
    const email = formRegister.getFieldValue('email');
    // 用户名
    const name = formRegister.getFieldValue('name');
    if (!email || !name) {
      message.error('请输入邮箱和用户名再获取验证码');
      return;
    }
    setIsSend(true);

    const res = await mainApi.userService.sendCode({ email });
    res.code === 0 ? message.success(res.message) : message.error(res.message);
  }
  async function onRegister(values: any) {
    // console.log({ ...values, avatar });
    const res = await mainApi.userService.register({ ...values, avatar });
    if (res?.code === 0) {
      message.success(res.message);
      setTimeout(() => {
        props.setTabKey('login');
      }, 1000);
    }
  }
  React.useEffect(() => {
    let timer: any = null;
    if (isSend) {
      timer = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
    }
    if (count === 0) {
      clearInterval(timer);
      setIsSend(false);
      setCount(60);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isSend, count]);

  return (
    <div>
      <Form
        form={formRegister}
        // labelCol={{ span: 6 }}
        // wrapperCol={{ span: 18 }}
        onFinish={onRegister}
      >
        <Form.Item
          name="name"
          hasFeedback
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 4, message: '用户名长度至少4位' },
            { pattern: /^\D+$/, message: '用户名不能为纯数字' }
          ]}
          style={{ marginTop: '20px' }}
        >
          <Input prefix={<Icon.UserOutlined />} placeholder="用户名" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' }
          ]}
        >
          <Input prefix={<Icon.MailOutlined />} placeholder="邮箱" autoComplete="off" />
        </Form.Item>
        {/* 验证码 */}
        <Form.Item
          name="code"
          hasFeedback
          rules={[
            { required: true, message: '请输入验证码' },
            { min: 6, max: 6, message: '验证码长度必须为4位' }
          ]}
        >
          <div style={{ display: 'flex' }}>
            <Input prefix={<Icon.QrcodeOutlined />} placeholder="验证码" autoComplete="off" />
            <Button type="link" style={{ marginLeft: '10px' }}>
              {isSend ? <div>请 {count} 秒后重试</div> : <span onClick={sendCode}>获取验证码</span>}
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            { required: true, message: '请输入密码' },
            { min: 4, max: 16, message: '密码长度必须为4-16位' }
          ]}
        >
          <Input.Password prefix={<Icon.LockOutlined />} placeholder="密码" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          hasFeedback
          rules={[
            {
              validator: (_, value) => {
                if (!value || value !== formRegister.getFieldValue('password')) {
                  return Promise.reject('验证密码有误');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input.Password prefix={<Icon.LockOutlined />} placeholder="确认密码" autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <>
            <AwesomeUpload value={avatar} setValue={setAvatar} />
          </>
        </Form.Item>
        <Form.Item>
          <Button size="middle" type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(RegisterTab);
