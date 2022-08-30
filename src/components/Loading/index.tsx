import * as React from 'react';
import { Skeleton } from 'antd';
interface Props {
  rows?: number;
}
const LoadingCom: React.FC<Props> = ({ rows = 3 }) => <Skeleton active paragraph={{ rows }} />;

export default LoadingCom;
