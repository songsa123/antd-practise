import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import { Row, Col, Card, Form, Button, message, Table, Input, Modal, Popconfirm } from 'antd';
import StandardTable from '@/components/StandardTable';

import styles from './style.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
// 添加
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理地址">
        {form.getFieldDecorator('ip', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="位置">
        {form.getFieldDecorator('address', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属系统名称">
        {form.getFieldDecorator('prochamber', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="刀片地址">
        {form.getFieldDecorator('bladeIp', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="刀片名称">
        {form.getFieldDecorator('bladeName', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="机箱槽号">
        {form.getFieldDecorator('chassis_number', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="刀片槽号">
        {form.getFieldDecorator('bladeSlot', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
        {form.getFieldDecorator('mark', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});
@connect(({ controConsole, loading }) => ({
  controConsole,
  loading: loading.models.controConsole,
}))
@Form.create()
export default class controConsole extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      modalVisible: false,
      editVisible: false,
      editingRecord: null,
    };
    this.columns = [
      { title: '管理地址', dataIndex: 'ip', align: 'center', width: 100 },
      // { title: '服务器类型', dataIndex: 'server_Category', align: 'center', width: 150 },
      { title: '位置', dataIndex: 'address', align: 'center', width: 100 },
      { title: '所属系统名称', dataIndex: 'prochamber', align: 'center', width: 200 },
      // { title: '业务平台', dataIndex: 'service_Platform', align: 'center', width: 150 },
      { title: '刀片地址', dataIndex: 'bladeIp', align: 'center', width: 80 },
      { title: '刀片名称', dataIndex: 'bladeName', align: 'center', width: 120 },
      { title: '机箱槽号', dataIndex: 'chassis_number', align: 'center', width: 100 },
      { title: '刀片槽号', dataIndex: 'bladeSlot', align: 'center', width: 150 },
      { title: '类型 ', dataIndex: 'mark', align: 'center', width: 100 },
      {
        title: '启动 ',
        dataIndex: 'open',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <span onClick={this.handleOpen.bind(this, record)}>
            <img src="/png/start.png" alt="启动" />
            {/* <i type="up" /> */}
          </span>
        ),
      },
      {
        title: '关闭 ',
        dataIndex: 'close',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <span onClick={this.handleClose.bind(this, record)}>
            <img src="/png/close.gif" alt="关闭" />
            {/* <Icon type="up" /> */}
          </span>
        ),
      },
      {
        title: '重启 ',
        dataIndex: 'reOpen',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <span onClick={this.handleReOpen.bind(this, record)}>
            <img src="/png/restart.gif" alt="重启" />
            {/* <Icon type="up" /> */}
          </span>
        ),
      },
    ];
  }

  // 获取到所有数据
  componentDidMount() {
    this.initTable();
  }
  // 初始化
  initTable = params => {
    // console.log(params,12345)
    this.props.dispatch({
      // type: 'controConsole/fetchMainTableData',
      type: 'controConsole/fetch',
      payload: params || {
        type: 'all',
      },
    });
  };
  handleOpen(params) {
    Modal.confirm({
      content: `确定开启？`,
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'controConsole/fetchOpen',
          payload: params,
          callback: res => {
            if (res) {
              this.initTable();
              const success = () => {
                message.success(res.msg);
              };
              const error = () => {
                message.error(res.msg);
              };
              if (res.code === 200) {
                success();
              } else if (res.code === 501) {
                error();
              }
            }
          },
        });
      },
    });
  }
  // 关闭
  handleClose(params) {
    Modal.confirm({
      content: `确定关闭？`,
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'controConsole/fetchClose',
          payload: params,
          callback: res => {
            if (res) {
              this.initTable();
              const success = () => {
                message.success(res.msg);
              };
              const error = () => {
                message.error(res.msg);
              };
              if (res.code === 200) {
                success();
              } else if (res.code === 501) {
                error();
              }
            }
          },
        });
      },
    });
  }
  handleReOpen(params) {
    Modal.confirm({
      content: `确定重启？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'controConsole/fetchReOpen',
          payload: params,
          callback: res => {
            if (res) {
              this.initTable();
              const success = () => {
                message.success(res.msg);
              };
              const error = () => {
                message.error(res.msg);
              };
              if (res.code === 200) {
                success();
              } else if (res.code === 501) {
                error();
              }
            }
          },
        });
      },
    });
    // this.props.dispatch({
    //   // type: 'controConsole/fetchMainTableData',
    //   type: 'controConsole/fetchReOpen',
    //   payload: params,
    //   callback: (res) => {
    //     if (res) {
    //       this.initTable();
    //       const success = () => {
    //         message.success(res.msg);
    //       };
    //       if (res.code === 200) {
    //         success()
    //       }
    //     }
    //   }

    // });
  }
  handleModalVisible = flag => {
    if (flag) {
      this.setState({
        modalVisible: !!flag,
      });
    } else {
      this.setState({
        modalVisible: !!flag,
      });
    }
  };
  // 添加
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'controConsole/add',
      payload: fields,
    });
    message.success('添加成功');
    this.setState({
      formValues: {},
      modalVisible: false,
    });
    this.handleModalVisible();
  };

  // 监控变化
  handleStandardTableChange = filtersArg => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      ...formValues,
      ...filters,
    };
    dispatch({
      type: 'controConsole/fetch',
      payload: params,
    });
  };
  // 查询
  handleSearch = e => {
    e.preventDefault();
    console.log(this.props.form.getFieldsValue());
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      this.setState(
        {
          formValues: values,
        },
        () => {
          // console.log(this.state.formValues)
        }
      );

      dispatch({
        type: 'controConsole/fetch',
        payload: values,
      });
    });
  };
  // 取消
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'controConsole/fetch',
      payload: {},
    });
  };
  // 查询
  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="服务器管理地址">
              {getFieldDecorator('ip')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                取消
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const data = this.props.controConsole.data.resultList;
    const { loading: loading } = this.props;
    const { modalVisible, editVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <Card bodyStyle={{ padding: 10 }}>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <div className={styles.tableListOperator}>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
        </div>
        <div className={styles.tableList}>
          <Table
            columns={this.columns}
            loading={loading}
            pagination={false}
            dataSource={data}
            rowKey={record => record.id}
            onChange={this.handleStandardTableChange}
          />
        </div>
        <CreateForm props={this.state} {...parentMethods} modalVisible={modalVisible} />
      </Card>
    );
  }
}
