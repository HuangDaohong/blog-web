import * as React from 'react';
import styles from './index.module.less';
import { Title } from '@/enums';
import CommentCom from '@/components/Comment';
import * as mainApi from '@/api';
import { useSafeState } from 'ahooks';
import { useTime } from '@/utils/useTime';
const MessagsPage: React.FC = () => {
  const { timeText } = useTime();
  const [ipInfo, setIpInfo] = useSafeState<any>(null);
  const [address, setAddress] = useSafeState<any>();
  const getIP = async () => {
    const res = await fetch(
      'https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=hcFMxQSGVb5y%2F5VdlmGb9LHaEkO8y2Yj'
    );
    const data = await res.json();
    setIpInfo(data);
    const addressInfo = await fetch(`https://ip.useragentinfo.com/json?ip=${data.ipAddress}`);
    const addressData = await addressInfo.json();
    setAddress(addressData);
    await mainApi.configService.createVisitor({
      ip: data.ipAddress,
      city: addressData.province + ' ' + addressData.city + ' ' + addressData.isp
    });
  };
  React.useEffect(() => {
    getIP();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{Title.Msg}</div>
      <div className={styles.box}>
        <p className={styles.time}>{timeText},欢迎提交评论</p>
        <CommentCom articleID={38} ip={ipInfo?.ipAddress} city={` ${address?.city},${address?.isp} `} />
      </div>
    </div>
  );
};
export default MessagsPage;
