import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Select, Radio, AutoComplete } from 'antd';
import { withPropsAPI } from 'gg-editor';
import _ from 'lodash';

const { Option } = Select;
const { TextArea, Group: InputGroup } = Input;
const { Button: RadioButton, Group: RadioGroup } = Radio;
const { OptGroup } = AutoComplete;
import styles from './index.less';
let id = 0;
// 布局
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const symbolOptions = [
  { value: '=', label: '等于' },
  { value: '>', label: '大于' },
  { value: '<', label: '小于' },
  { value: '!=', label: '不等于' },
  { value: 'in', label: '包含' },
  { value: 'out', label: '不包含' },
];
class Workhour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkData: [],
      // data:[
      //   {task,status,compare,compareValue}
      //  ]
    };
  }
  componentDidMount() {
    const { propsAPI } = this.props;
    console.log(propsAPI, 888);
  }
  componentDidUpdate(prevProps) {
    const { visible: oldVisible } = prevProps;
    console.log(this.props, 666);
    const {
      visible: newVisible,
      form: { setFieldsValue },
      propsAPI: { getSelected, save },
    } = this.props;
    if (newVisible && oldVisible !== newVisible) {
      const item = getSelected()[0].getModel();
      // console.log(item)
      const { data } = item;

      const linkData = this.findLink(save, [item.source])
        .filter(
          v =>
            v.id !== item.id &&
            v.label !== '' &&
            v.id.toString().indexOf('control') === -1 &&
            v.id.toString().indexOf('begin') === -1 &&
            v.id.toString().indexOf('end') === -1
        )
        .map((v, i) => {
          return {
            id: v.id,
            task: v.label,
            taskCode: v.data.taskCode,
            key: i,
          };
        });

      this.setState({
        linkData,
      });
      setFieldsValue({
        taskName: item.label,
      });
    }
  }
  // 添加
  handleAdd = props => {
    console.log(props, this.props, 555);
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    console.log(nextKeys, 666);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  // 删除
  handleRemove = k => {
    // console.log(11,k)
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  // // 提交
  handleSubmit = e => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     const { keys, names } = values;
    //     console.log('Received values of form: ', values);
    //     console.log('Merged values:', keys.map(key => names[key]));
    //   }
    // });
    // for (const item of forms) {
    let linkData = this.state.linkData;
    console.log(linkData, 444);
    linkData &&
      linkData.map((item, index) => {
        _.assign(intentionData, {
          [index]: {
            keywords: getFieldValue(`keywords${item.keys}`),
            status: getFieldValue(`status${item.keys}`),
            index: item.keys,
          },
        });
      });
  };
  // handleOk = () => {
  //   const {
  //     form,
  //     propsAPI: { getSelected, executeCommand, update }
  //   } = this.props

  //   form.validateFieldsAndScroll((err, values) => {
  //     if (err) {
  //       return
  //     }

  //     const item = getSelected()[0]
  //     if (!item) {
  //       return
  //     }

  //     const model = item.getModel()
  //     // 更新节点
  //     executeCommand(() => {
  //       update(item, {
  //         ...model,
  //         label: values.taskName
  //         // data
  //       })
  //     })
  //     this.handleClear()
  //   })
  // }

  handleClear = () => {
    const {
      form: { resetFields },
      handleShowModal,
    } = this.props;
    handleShowModal('linkVisible');
    resetFields();
  };
  findLink = (save, rs) => {
    const { edges, nodes } = save();
    if (!edges) return [];
    const beforeLength = rs.length;
    for (const el1 of edges) {
      for (const el2 of rs) {
        if (el1.target.toString() === el2.toString() && !rs.includes(el1.source)) {
          rs.push(el1.source);
        }
      }
    }
    const afterLength = rs.length;
    if (beforeLength === afterLength) {
      return nodes.filter(v => rs.includes(v.id));
    } else {
      return this.findLink(save, rs);
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { visible, handleShowModal } = this.props;
    const { linkData } = this.state;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <div className={styles.condition} key={k || Math.random() * 1000}>
        <Form.Item>
          {getFieldDecorator(`task_${index}`, {
            initialValue: '',
          })(
            <Select
              // defaultValue="1"
              style={{ width: 125, marginRight: '5px' }}
            >
              {linkData.map(v => (
                <Option value={v.id} key={v.id}>{`${v.task}(${v.taskCode})`}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator(`status_${index}`, {
            initialValue: '',
          })(
            <Select
              // defaultValue="1"
              style={{ width: 145, marginRight: '5px' }}
            >
              <Option value="1">步骤任务状态</Option>
              <Option value="2">设备任务状态</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator(`compare_${index}`, {
            initialValue: '',
          })(
            <Select
              // defaultValue="="
              style={{ width: 95, marginRight: '5px' }}
            >
              {symbolOptions.map(v => (
                <Option value={v.value} key={v.value}>
                  {v.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator(`compareValue_${index}`, {
            initialValue: '',
            rules: [{ required: true, message: '比较值不能为空' }],
          })(<Input placeholder="请输入比较值" style={{ width: 110, marginRight: '5px' }} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon="delete" onClick={() => this.handleRemove(k)} />
        </Form.Item>
      </div>
    ));
    return (
      // <Modal
      //   width={720}
      //   title="条件定义"
      //   visible={visible}
      //   onOk={this.handleOk}
      //   onCancel={() => handleShowModal('linkVisible')}
      // >
      <Form {...formItemLayout}>
        <Form.Item label="节点名称">
          {getFieldDecorator('taskName', {
            initialValue: '',
            rules: [{ required: true, message: '节点名称不能为空' }],
          })(<Input key="taskName" placeholder="请输入节点名称" max={50} />)}
        </Form.Item>
        <Form.Item label="满足条件">
          <p className={styles.uyDesc}>任务输出状态码返回0或-1，0代表成功，-1代表异常</p>
        </Form.Item>
        <div className={styles.condition}>
          <Form.Item>
            {getFieldDecorator('task', {
              initialValue: '',
            })(
              <Select
                // defaultValue="1"
                style={{ width: 125, marginRight: '5px' }}
              >
                {linkData.map(v => (
                  <Option value={v.id} key={v.id}>{`${v.task}(${v.taskCode})`}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('status', {
              initialValue: '',
            })(
              <Select
                // defaultValue="1"
                style={{ width: 145, marginRight: '5px' }}
              >
                <Option value="1">步骤任务状态</Option>
                <Option value="2">设备任务状态</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('compare', {
              initialValue: '',
            })(
              <Select
                // defaultValue="="
                style={{ width: 95, marginRight: '5px' }}
              >
                {symbolOptions.map(v => (
                  <Option value={v.value} key={v.value}>
                    {v.label}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('compareValue', {
              initialValue: '',
              rules: [{ required: true, message: '比较值不能为空' }],
            })(<Input placeholder="请输入比较值" style={{ width: 110, marginRight: '5px' }} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon="delete" disabled={true} />
          </Form.Item>
        </div>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
            添加
          </Button>
          <Button icon="plus" type="submit" onClick={() => this.handleSubmit()}>
            提交
          </Button>
        </Form.Item>
      </Form>
      // </Modal>
    );
  }
}
const LinkModalForm = Form.create()(Workhour);
// export default Workhour;
export default withPropsAPI(LinkModalForm);
