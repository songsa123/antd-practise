import React, { Component } from 'react';
import style from './style.less';
import { Card, Table, Pagination, Modal, Form, Button } from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PDF from './toPdf.js';
import { Document, Page } from 'react-pdf';
import html2pdf from 'html2pdf.js';
import styles from './pdf.less';

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
      </Card>
    );
  }
}

export default Security;
