import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 使用样式
import 'echarts/theme/macarons';
class BrokenLine extends Component {
  componentDidMount() {
    // 折线图
    var myChart = echarts.init(document.getElementById('brokenLine'));
    var option = {
      // 设置整个图表的背景颜色
      backgroundColor: '#FFF0F5',
      title: {
        text: '折线图',
        subtext: '模拟数据',
        x: 'center',
      },
      // 标题上面提示内容
      legend: {
        // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
        orient: 'horizontal',
        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
        x: 'left',
        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
        y: 'top',
        data: ['预期', '实际', '假设'],
      },

      //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
      grid: {
        top: '16%', // 等价于 y: '16%'
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true,
      },

      // 提示框
      tooltip: {
        trigger: 'axis',
      },

      //工具框，可以选择
      toolbox: {
        feature: {
          saveAsImage: {}, //下载工具
        },
      },

      xAxis: {
        // x轴标题
        name: '',
        type: 'category',
        axisLine: {
          lineStyle: {
            // 设置x轴颜色
            color: '#912CEE',
          },
        },
        // 设置X轴数据旋转倾斜
        axisLabel: {
          rotate: 30, // 旋转角度
          interval: 0, //设置X轴数据间隔几个显示一个，为0表示都显示
        },
        // boundaryGap值为false的时候，折线第一个点在y轴上
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },

      yAxis: {
        name: '数值',
        type: 'value',
        min: 0, // 设置y轴刻度的最小值
        max: 1800, // 设置y轴刻度的最大值
        splitNumber: 9, // 设置y轴刻度间隔个数（除去原点之后剩余y轴数量）
        axisLine: {
          lineStyle: {
            // 设置y轴颜色
            color: '#87CEFA',
          },
        },
      },

      series: [
        {
          name: '预期',
          data: [820, 932, 301, 1434, 1290, 1330, 1320],
          type: 'line',
          // 设置小圆点消失
          // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
          symbol: 'none',
          // 设置折线弧度，取值：0-1之间
          smooth: 0.5,
        },

        {
          name: '实际',
          data: [620, 732, 941, 834, 1690, 1030, 920],
          type: 'line',
          // 设置折线上圆点大小
          symbolSize: 8,
          itemStyle: {
            normal: {
              // 拐点上显示数值
              label: {
                show: true,
              },
              borderColor: 'red', // 拐点边框颜色
              lineStyle: {
                width: 5, // 设置线宽
                type: 'dotted', //'dotted'虚线 'solid'实线
              },
            },
          },
        },

        {
          name: '假设',
          data: [120, 232, 541, 134, 290, 130, 120],
          type: 'line',
          // 设置折线上圆点大小
          symbolSize: 10,
          // 设置拐点为实心圆
          symbol: 'circle',
          itemStyle: {
            normal: {
              // 拐点上显示数值
              label: {
                show: true,
              },
              lineStyle: {
                // 使用rgba设置折线透明度为0，可以视觉上隐藏折线
                color: 'rgba(0,0,0,0)',
              },
            },
          },
        },
      ],

      color: ['#00EE00', '#FF9F7F', '#FFD700'],
    };

    myChart.setOption(option, true);
  }
  render() {
    return (
      <div>
        <div id="brokenLine" style={{ width: 600, height: 400 }} />
      </div>
    );
  }
}

export default BrokenLine;
