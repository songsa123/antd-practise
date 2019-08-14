import React, { PureComponent } from 'react';
import {
  Table,
  Card,
  Form,
  Row,
  Col,
  Input,
  Button,
  Modal,
  Select,
  Checkbox,
  Menu,
  Dropdown,
  Icon,
  TreeSelect,
  Upload,
  message,
  InputNumber,
  Popconfirm,
} from 'antd';
import style from './BaseData.less';
import { number } from 'prop-types';
const ExportJsonExcel = require('js-export-excel');

const FormItem = Form.Item;
const { SHOW_PARENT } = TreeSelect;
// 自定义字段
const customData = [
  { title: 'ID', value: 'ID', dataIndex: 'id', key: 'id', editable: true },
  { title: '测站SID', value: '测站SID', dataIndex: 'sid', key: 'sid', editable: true },
  { title: '当前状态', value: '当前状态', dataIndex: 'status', key: 'status', editable: true },
  { title: '行政区划', value: '行政区划', dataIndex: 'cities', key: 'cities', editable: true },
  { title: '经度', value: '经度', dataIndex: 'longitude', key: 'longitude', editable: true },
  { title: '纬度', value: '纬度', dataIndex: 'latitude', key: 'latitude', editable: true },
  { title: '遥测项目', value: '遥测项目', dataIndex: 'projects', key: 'projects', editable: true },
  { title: '监测要素', value: '监测要素', dataIndex: 'monitor', key: 'monitor', editable: true },
  {
    title: '责任单位',
    value: '责任单位',
    dataIndex: 'responsibleUnit',
    key: 'responsibleUnit',
    editable: true,
  },
  {
    title: '责任人',
    value: '责任人',
    dataIndex: 'personLiable',
    key: 'personLiable',
    editable: true,
  },
  { title: '安装时间', value: '安装时间', dataIndex: 'time', key: 'time', editable: true },
  {
    title: '水位传感器型号',
    value: '水位传感器型号',
    dataIndex: 'model',
    key: 'model',
    editable: true,
  },
  { title: '站点类型', value: '站点类型', dataIndex: 'SiteType', key: 'SiteType', editable: true },
  {
    title: '是否斜井',
    value: '是否斜井',
    dataIndex: 'inclinedShaft',
    key: 'inclinedShaft',
    editable: true,
  },
  {
    title: '最高水位',
    value: '最高水位',
    dataIndex: 'mostHeight',
    key: 'mostHeight',
    editable: true,
  },
  {
    title: '最低水位',
    value: '最低水位',
    dataIndex: 'lowHeight',
    key: 'lowHeight',
    editable: true,
  },
  {
    title: '警戒水位',
    value: '警戒水位',
    dataIndex: 'warningLevel',
    key: 'warningLevel',
    editable: true,
  },
  {
    title: '测站基面',
    value: '测站基面',
    dataIndex: 'baseStation',
    key: 'baseStation',
    editable: true,
  },
  {
    title: '水系名称',
    value: '水系名称',
    dataIndex: 'waterSystem',
    key: 'waterSystem',
    editable: true,
  },
  {
    title: '流域名称',
    value: '流域名称',
    dataIndex: 'watershedName',
    key: 'watershedName',
    editable: true,
  },
  {
    title: '河流名称',
    value: '河流名称',
    dataIndex: 'riverName',
    key: 'riverName',
    editable: true,
  },
  {
    title: '站点类型 通信方式 终端机型号',
    value: '站点类型 通信方式 终端机型号',
    dataIndex: 'communication',
    key: 'communication',
    editable: true,
  },
  {
    title: '传感器(名称/型号)',
    value: '传感器(名称/型号)',
    dataIndex: 'sensor',
    key: 'sensor',
    editable: true,
  },
  { title: '交流供电', value: '交流供电', dataIndex: 'AC', key: 'AC', editable: true },
  {
    title: '太阳能功率',
    value: '太阳能功率',
    dataIndex: 'solarPower',
    key: 'solarPower',
    editable: true,
  },
  {
    title: '蓄电池电压',
    value: '蓄电池电压',
    dataIndex: 'batteryVoltage',
    key: 'batteryVoltage',
    editable: true,
  },
  {
    title: '蓄电池容量',
    value: '蓄电池容量',
    dataIndex: 'batteryCapacity',
    key: 'batteryCapacity',
    editable: true,
  },
];

// 导入
const propsFiles = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// 编辑部分逻辑
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

@Form.create()
class Tab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      tabVal: [],
      editVisible: false,
      editingRecord: null,
      visible: false,
      formValues: {},
      value: [
        'ID',
        '测站SID',
        '当前状态',
        '行政区划',
        '经度',
        '纬度',
        '遥测项目',
        '监测要素',
        '责任单位',
        '责任人',
        '安装时间',
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          editable: true,
        },
        {
          title: '测站SID',
          dataIndex: 'sid',
          key: 'sid',
          editable: true,
        },
        {
          title: '当前状态',
          dataIndex: 'status',
          key: 'status',
          editable: true,
        },
        {
          title: '行政区划',
          key: 'cities',
          dataIndex: 'cities',
          editable: true,
        },
        {
          title: '经度',
          key: 'longitude',
          dataIndex: 'longitude',
          editable: true,
        },
        {
          title: '纬度',
          key: 'latitude',
          dataIndex: 'latitude',
          editable: true,
        },
        {
          title: '遥测项目',
          key: 'projects',
          dataIndex: 'projects',
          editable: true,
        },
        {
          title: '监测要素',
          key: 'monitor',
          dataIndex: 'monitor',
          editable: true,
        },
        {
          title: '责任单位',
          key: 'responsibleUnit',
          dataIndex: 'responsibleUnit',
          editable: true,
        },
        {
          title: '责任人',
          key: 'personLiable',
          dataIndex: 'personLiable',
          editable: true,
        },
        {
          title: '安装时间',
          key: 'time',
          dataIndex: 'time',
          editable: true,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            const { editingKey } = this.state;
            const editable = this.isEditing(record);
            return editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                编辑
              </a>
            );
          },
        },
      ],
    };
  }

  componentDidMount() {
    this.initTbale();
  }

  initTbale() {
    const data = [
      {
        key: '1',
        id: '1',
        sid: 20001,
        status: '停用',
        cities: '绍兴市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '张三',
        time: '2019-06-23',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '2',
        id: '2',
        sid: 20002,
        status: '启用',
        cities: '杭州市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '王五',
        time: '2019-06-23',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '3',
        id: '3',
        sid: 20003,
        status: '停用',
        cities: '金华市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李四',
        time: '2019-06-21',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '4',
        id: '4',
        sid: 20004,
        status: '停用',
        cities: '义乌市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李四',
        time: '2019-06-22',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '5',
        id: '5',
        sid: 20005,
        status: '停用',
        cities: '衢州市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '王二',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '6',
        id: '6',
        sid: 20006,
        status: '启用',
        cities: '丽水市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李一',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '7',
        id: '7',
        sid: 20006,
        status: '启用',
        cities: '丽水市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李一',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '8',
        id: '8',
        sid: 20006,
        status: '启用',
        cities: '丽水市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李一',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '9',
        id: '9',
        sid: 20006,
        status: '启用',
        cities: '温州市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李一',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '10',
        id: '10',
        sid: 20006,
        status: '启用',
        cities: '丽水市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李一',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '11',
        id: '11',
        sid: 20006,
        status: '启用',
        cities: '丽水市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李一',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
      {
        key: '12',
        id: '12',
        sid: 20006,
        status: '启用',
        cities: '丽水市',
        longitude: 'XX.XXXXXX',
        latitude: 'XX.XXXXXX',
        projects: '水位5分钟，时雨量，环境温度，电压',
        monitor: '水系名称、流域名称、站点类型',
        responsibleUnit: 'xxx水文站',
        personLiable: '李一',
        time: '2019-06-25',
        model: '101',
        SiteType: '1',
        inclinedShaft: '是',
        mostHeight: '200',
        lowHeight: '100',
        warningLevel: '140',
        baseStation: '',
        waterSystem: '钱塘江',
        watershedName: '京杭运河',
        communication: '',
        AC: '',
        sensor: '',
        solarPower: '2000w',
        batteryVoltage: '220v',
        batteryCapacity: '20000',
      },
    ];
    this.setState({
      tabVal: data,
    });
  }
  // 复选框联动事件
  onCheckChange = value => {
    let b = [];
    value.map((item, index) => {
      var a = customData.findIndex(v => v.title === item);
      if (a > -1) {
        item = customData[a];
        b.push(item);
        // console.log(item,222,customData[a]);
      }
    });
    b.push({
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  href="javascript:;"
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    });
    // this.state.columns.map((item,index)=>{
    // var a = value.findIndex(v => v === item.title);
    // if(a>-1){
    //   item.title = value[a];
    // }else if(a<0){
    //   if(item.title !== "操作"){
    //     this.state.columns.splice(index,1);
    //   }
    // }
    // })
    this.setState({
      value,
      columns: b,
    });
  };
  // 导出表格调用方法
  downloadExcel = () => {
    const data = this.state.tabVal ? this.state.tabVal : ''; //表格数据
    // 表头数据
    const columns = this.state.columns ? this.state.columns : '';
    let headerTitle = [];
    if (columns) {
      columns.map((item, i) => {
        // console.log(item.title,555)
        headerTitle.push(item.title);
      });
      // console.log(headerTitle.splice(0,headerTitle.length-2),6767)
    }
    var option = {};
    let dataTable = [];
    if (data) {
      for (let i in data) {
        if (data) {
          let obj = {
            ID: data[i].id,
            测站SID: data[i].sid,
            当前状态: data[i].status,
            行政区划: data[i].cities,
            经度: data[i].longitude,
            纬度: data[i].latitude,
            遥测项目: data[i].projects,
            监测要素: data[i].monitor,
            责任单位: data[i].responsibleUnit,
            责任人: data[i].personLiable,
            安装时间: data[i].time,
            水位传感器型号: data[i].model,
            站点类型: data[i].SiteType,
            是否斜井: data[i].inclinedShaft,
            最高水位: data[i].mostHeight,
            最低水位: data[i].lowHeight,
            警戒水位: data[i].warningLevel,
            测站基面: data[i].baseStation,
            水系名称: data[i].waterSystem,
            流域名称: data[i].watershedName,
            河流名称: data[i].riverName,
            '站点类型 通信方式 终端机型号': data[i].communication,
            '传感器(名称/型号)': data[i].sensor,
            交流供电: data[i].AC,
            太阳能功率: data[i].solarPower,
            蓄电池电压: data[i].batteryVoltage,
            蓄电池容量: data[i].batteryCapacity,
          };
          dataTable.push(obj);
        }
      }
    }
    option.fileName = '基础数据管理数据';

    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: headerTitle,
        sheetHeader: headerTitle,
      },
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };
  // 搜索功能
  // 查询
  handleSearch = e => {
    // 禁止默认行为
    e.preventDefault();
    // 获取 form 表单的值
    console.log(this.props.form.getFieldsValue());
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      //   console.log(values,555)
      //   this.setState({
      //     formValues: values,
      //   });

      //   dispatch({
      //     type: 'blackwhite/fetch',
      //     payload: values,
      //   });
    });
    this.props.form.resetFields();
  };
  // 重置
  handleFormReset() {
    this.props.form.resetFields();
  }
  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { columns, value } = this.state;

    return (
      <Form layout="inline" className="tipForm" onSubmit={this.handleSearch}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem label="测站SID">
              {getFieldDecorator('sid')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={8}>
            <FormItem label="数据字段输入">
              {getFieldDecorator('ss')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Button type="primary" icon="search" htmlType="submit">
                查询
              </Button>
              <Button
                type="primary"
                icon="sync"
                style={{ marginLeft: 2 }}
                onClick={this.handleFormReset.bind(this)}
              >
                重置
              </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">
              <Upload {...propsFiles} showUploadList={false}>
                <Button type="primary">
                  <Icon type="upload" />
                  导入
                </Button>
              </Upload>
            </div>
          </Col>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">
              <Button type="primary" onClick={this.downloadExcel} className={style.outBtn}>
                {' '}
                导出excel表格{' '}
              </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={18}>
            <FormItem label="自定义字段">
              <TreeSelect
                treeData={customData}
                value={value}
                onChange={this.onCheckChange}
                treeCheckable={true}
                showCheckedStrategy={SHOW_PARENT}
                searchPlaceholder="请选择字段"
                maxTagPlaceholder="请选择字段"
                maxTagCount={0}
                style={{
                  width: 120,
                }}
                className={style.dropDown}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
  // 编辑部分逻辑--start
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.tabVal];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ tabVal: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ tabVal: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  // 编辑部分逻辑--end
  render() {
    const { tabVal, editVisible } = this.state;
    const parentMethods = {
      handleSave: this.handleSave,
      handleEditVisible: this.handleEditVisible,
    };
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns1 = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          // inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <Card className="baseNum">
        <div className="searchInput">{this.renderForm()}</div>
        <div className="numTab">
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={tabVal}
              columns={columns1}
              rowClassName="editable-row"
              pagination={{
                onChange: this.cancel,
              }}
              ref="table"
            />
          </EditableContext.Provider>
        </div>
      </Card>
    );
  }
}

export default Tab;
