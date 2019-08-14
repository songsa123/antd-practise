import React, { Component, Fragment } from 'react';
import { Card, Table, Pagination, Modal, Form, Button, Input } from 'antd';
import styles from './pdf.less';
import Echart from './Echart.js';
// @connect(({ topdf, loading }) => ({
//     topdf,
//     loading: loading.models.topdf
// }))
const FormItem = Form.Item;

@Form.create()
class ToPdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ],
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],
    };
  }

  render() {
    const { columns, dataSource } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="bb">
        <div className={styles.top_title}>
          <p>
            <label>
              编号：<span>#Pim-20190718</span>
            </label>
          </p>
          <p>
            <label>
              报告人:<span>IT运维组</span>
            </label>
          </p>
          <p>
            <label>
              报告日期:<span>11</span>
            </label>
          </p>
        </div>
        <h2 className={styles.report}>IT运维服务报告</h2>
        <h3>一、本月故障情况简介</h3>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;从当月运维数据分析，IT基础服务器硬件报障告警量为xxx，较上月上涨/下降xxx%。每月处理恢复异常故障xxx个，未解决告警xxx个，总体健康度较为良好。其中xxx厂商的服务器硬件质量最好，单月故障告警量仅为xxx；xxx厂商服务器硬件质量最差，单月故障告警量高达xxx。
        </p>
        {/* <Table dataSource={dataSource} columns={columns} />; */}
        <Echart />
      </div>
    );
  }
}

export default ToPdf;
