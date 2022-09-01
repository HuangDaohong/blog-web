import * as React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import 'echarts-wordcloud';
type Props = {
  dataList: Array<{
    name: string;
    value: number;
    id: number;
  }>;
};
const Word3: React.FC<Props> = ({ dataList }) => {
  const navigate = useNavigate();
  let option = {
    // 提示框
    tooltip: {
      show: true,
      position: 'bottom',
      borderColor: '#44c5d6',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: 'rgba(223, 236, 235, 0.8)',
      textStyle: {
        fontSize: 13,
        color: 'black'
      }
    },
    series: [
      {
        name: '文章数量',
        type: 'wordCloud',
        sizeRange: [16, 35],
        // 文字旋转角度范围
        rotationRange: [-90, 90],
        shape: 'circle',
        textPadding: 10,
        // 画布宽
        width: '100%',
        // 画布高
        height: '100%',
        autoSize: {
          enable: true,
          minSize: 14
        },
        textStyle: {
          color: function () {
            return (
              'rgb(' +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') +
              ')'
            );
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: dataList
      }
    ]
  };
  const onEvents = {
    click: (params: any) => {
      // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
      navigate(`/article/list?tagid=${params.data.id}&&name=${params.data.name}`);
    }
  };
  return (
    <div>
      <ReactECharts option={option || {}} style={{ width: '100%', height: '255px' }} onEvents={onEvents} />
    </div>
  );
};
export default React.memo(Word3);
