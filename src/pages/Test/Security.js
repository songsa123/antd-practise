import React, { Component } from 'react';
import style from './style.less';
import { Card, Table, Pagination, Modal, Form, Button } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PDF from './toPdf.js';
import { Document, Page } from 'react-pdf';
import html2pdf from 'html2pdf.js';
import styles from './pdf.less';
import a from './picture/a.png';
import b from './picture/b.png';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入气泡图
import 'echarts/lib/chart/scatter';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 使用样式
import 'echarts/theme/macarons';

@connect(({ sercurity, loading }) => ({
  sercurity,
  loading: loading.models.sercurity,
}))
class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfBase64: null,
      numPages: 0,
      pageNumber: 1,
      visible: false,
    };
  }
  componentDidMount(params) {
    this.props.dispatch({
      type: 'security/fetch',
      payload: params || {
        type: 'all',
      },
    });
    // window.addEventListener('message', (event) => {
    //     this.setState({ pdfBase64: event.data })
    // }, false)
    this.initChart();
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      loading: false,
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    this.exportPdf();
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  exportPdf = () => {
    // 要导出的dom节点，注意如果使用class控制样式，一定css规则
    const element = document.getElementById('bb');
    console.log(element);
    // 导出配置
    const opt = {
      margin: 1,
      filename: '导出的pdf名称',
      image: { type: 'jpeg', quality: 0.98 }, // 导出的图片质量和格式
      html2canvas: { scale: 2, useCORS: true }, // useCORS很重要，解决文档中图片跨域问题
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    if (element) {
      html2pdf()
        .set(opt)
        .from(element)
        .save(); // 导出
    }
  };
  // 极坐标
  initChart=()=>{
    var myChart1 = echarts.init(document.getElementById('echartsP'));
    var hours = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
    var days = ['', '', '',
        '', '', '', ''];
    var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0]]
    var data2 = [[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
    var data3 = [[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];


    var option = {
      legend: {
          data:['高','中','低'],
          left: 'left'
      },
      polar: {},
      angleAxis: {
          type: 'category',
          data: hours,
          z:10,
          boundaryGap: false,
          splitLine: {
              show: false,
              lineStyle: {
                  color: '#999',
                  type: 'dashed'
              }
          },
          axisLine: {
              show: true
          }
      },
      radiusAxis: {
          type: 'category',
          data: days,
          axisLine: {
              show: false
          },
          axisLabel: {
              rotate: 45
          },
          splitLine: {
              show: true,
              lineStyle: {
                  color: '#999',
                  type: 'solid'
              }
          },
      },
      series: [{
          name: '高',
          type: 'scatter',
          coordinateSystem: 'polar',
          symbolSize: function (val) {
              return val[2] * 2;
          },
          data: data,
          animationDelay: function (idx) {
              return idx * 5;
          }
      },
      {
          name: '中',
          type: 'scatter',
     
          coordinateSystem: 'polar',
          symbolSize: function (val) {
              return val[2] * 2;
          },
          data: data2,
          animationDelay: function (idx) {
              return idx * 5;
          }
      },
       {
          name: '低',
          type: 'scatter',
         
          coordinateSystem: 'polar',
          symbolSize: function (val) {
              return val[2] * 2;
          },
          data: data3,
          animationDelay: function (idx) {
              return idx * 5;
          }
      }
      ]
  };
      myChart1.setOption(option);
  }
  render() {
    const { pdfBase64, numPages, pageNumber, visible, loading } = this.state;
    return (
      <Card>
        <Button icon="download" type="primary" onClick={this.showModal}>
          导出报表
        </Button>
        <Modal
          id="aa"
          title="浙江咪咕数字传媒有限公司
                    服务器硬件健康度报告"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          className={styles.modalReport}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              导出PDF
            </Button>,
          ]}
        >
          <PDF />
        </Modal>
        <div style={{marginTop:20}}>
          <h2 style={{marginBottom:30}}>极坐标</h2>
          <div id='echartsP' style={{width:400,height:400}}>2</div>
        </div>
        {/* 流线 */}
        <div className={styles.line}>
          <span className={styles.left}>
            1
          </span>
          <span className={styles.aa}></span>
          <span className={styles.right}>
            2
          </span>
            <img src={a} />
          </div>
      </Card>
    );
  }
}

export default Security;
