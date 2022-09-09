import * as React from 'react';
import { useSafeState } from 'ahooks';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Input, notification, Upload, Avatar, message } from 'antd';
import * as Icon from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
type Props = {
  value: string;
  setValue: (value: string) => void;
  className?: string;
};

const AwesomeUpload: React.FC<Props> = props => {
  const { user } = useSelector((state: any) => state.account);
  const [loading, setLoading] = useSafeState<boolean>(false);

  const uploadButton = (
    <div>
      {loading ? <Icon.LoadingOutlined /> : <Icon.PlusOutlined />}
      <div style={{ marginTop: '5px' }}>
        上传头像
        <br />
        <span style={{ color: '#31bfd2' }}>（可选）</span>
      </div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'error') {
      setLoading(false);
      console.log(info.file);
      notification.error({ message: '上传失败' });
      return;
    }
    if (info.file.status === 'done') {
      props.setValue(import.meta.env.VITE_API_URL + '/' + info.file.response.data.avatar_Img);
      setLoading(false);
      notification.success({ message: '上传成功' });
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/gif' ||
      file.type === 'image/webp';
    if (!isJpgOrPng) {
      message.error('文件格式错误');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片得小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <ImgCrop rotate shape="round" modalOk="确定" modalCancel="取消" modalTitle="请编辑你的头像">
        <Upload
          name="avatar_Img"
          listType="picture-card"
          className={classNames('upload', props.className)}
          showUploadList={false}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
          headers={{
            token: user.token
          }}
          action={`${import.meta.env.VITE_API_URL}/users/uploadavatar`}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {props.value ? (
            <Avatar src={props.value} style={{ width: '100%', height: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>

      <Input
        placeholder="或直接输入头像地址"
        autoComplete="off"
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
      />
    </>
  );
};

export default AwesomeUpload;
