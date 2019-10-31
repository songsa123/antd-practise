import React, { Component, Fragment } from 'react';
import Bar from './component/bar';
import BrokenLine from './component/brokenLine';
import style from './echarts.less';
import $ from 'jquery';

import { Modal, Button, Form, Input, Select } from 'antd';
import ReactEcharts from 'echarts-for-react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts-gl'
// 引入柱状图
// import 'echarts/lib/chart/map';
import 'echarts/map/js/province/fujian';
import 'echarts/map/js/province/jiangxi';
import 'echarts/map/js/china'
import 'echarts/lib/chart/scatter';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/visualMap';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
// 详情
const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleModalVisible, onBlur, onCancel, onChange, onSearch, onFocus } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
        });
    };
    return (
        <Modal
            destroyOnClose
            title="机柜示意图"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            width='800px'
            bodyStyle={{ background: '#eee', height: 400, overflow: 'auto' }}
            footer={null}
        >
            <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="机房">
                {form.getFieldDecorator('room', {
                    // rules: [{ required: true, message: '', min: 5 }],
                })(
                    <div className={style.top}>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">南平延安机房一楼</Option>
                            <Option value="lucy">南平延安机房二楼</Option>
                            <Option value="tom">南平延安机房三楼</Option>
                        </Select>
                        <span style={{ marginLeft: 30, marginRight: 15 }}>
                            <i style={{ display: 'inline-block', width: 10, height: 10, background: '#fff' }}></i><span style={{ color: '#666', marginLeft: 5 }}>空闲</span>
                        </span>
                        <span style={{ marginRight: 15 }}>
                            <i style={{ display: 'inline-block', width: 10, height: 10, background: '#fcecb9' }}></i><span style={{ color: '#666', marginLeft: 5 }}>空闲</span>
                        </span>
                        <span style={{ marginRight: 15 }}>
                            <i style={{ display: 'inline-block', width: 10, height: 10, background: '#b8f67e' }}></i><span style={{ color: '#666', marginLeft: 5 }}>自建</span>
                        </span>
                        <span style={{ marginRight: 15 }}>
                            <i style={{ display: 'inline-block', width: 10, height: 10, background: '#8cb9f2' }}></i><span style={{ color: '#666', marginLeft: 5 }}>合同机柜</span>
                        </span>
                        <span >
                            <i style={{ display: 'inline-block', width: 10, height: 10, background: '#5e708b' }}></i><span style={{ color: '#666', marginLeft: 5 }}>散户</span>
                        </span>

                    </div>
                )}
            </FormItem>
            <FormItem label="">
                {/* {form.getFieldDecorator('desk', {
                    // rules: [{ required: true, message: '', min: 5 }],
                })( */}
                <div className={style.box}>
                <div className={style.boxLabel} id='labelBox'></div>
                    <div id='desk' className={style.desk}></div>
                </div>
                
                {/* )} */}
            </FormItem>
        </Modal>
    );
});

@Form.create()
class Echart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.formLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 13 },
        };
    }
    componentDidMount() {
    }
    // 生成座位号
    initDesk = () => {
        var oBox = document.getElementById("desk");
        var oLabel = document.getElementById("labelBox");

        var arr_color = ["#fff", "#fcecb9", "#b8f67e", "#8cb9f2", "#5e708b"];
        var str = "";
        var strLabel="";
        //left计算：i%10*40
        //top计算通过向下取整：Math.floor(i/10)*40
        var tipArr = [];
        for (var i = 0; i < 26; i++) {
            tipArr.push(String.fromCharCode((65 + i)));
        }
        var newArr = tipArr.slice(0, 10)
        console.log(tipArr, newArr)
        newArr.map((item, index) => {
            for (let i = 0; i < 10; i++) {
                // str += "<div style='left:" + i % 10 * 40 + "px;top:" + Math.floor(i / 10) * 40 + "px;background:" + arr_color[i % 5] + ";'>" + "</div>";
                str += "<div style='background:" + arr_color[i % 5] + ";'>" +item+ i + "</div>";
            }
        })
        for(let j=0;j<newArr.length;j++){
            strLabel +="<div>" +newArr[j]+':'+ "</div>";
        }
        oLabel.innerHTML=strLabel;
        oBox.innerHTML = str;
    }
    geoCoordMap = {
        '福州市': [119.3, 26.08],
        '莆田市': [119, 25.44],
        '泉州市': [118.58, 24.93],
        '厦门市': [118.1, 24.46],
        '漳州市': [117.35, 24.52],
        '龙岩市': [117.01, 25.12],
        '三明市': [117.61, 26.23],
        '南平市': [118.16, 26.65],
        '宁德市': [119.52, 26.65],

    };
    data = [
        { name: '福州市', value: 9 },
        { name: '莆田市', value: 3 },
        { name: '泉州市', value: 2 },
        { name: '厦门市', value: 2 },
        { name: '漳州市', value: 1 },
        { name: '三明市', value: 2 },
        { name: '南平市', value: 2 },
        { name: '宁德市', value: 3 },
        { name: '龙岩市', value: 3 },
    ];
    onChange = (value) => {
        console.log(`selected ${value}`);
    }

    onBlur = () => {
        console.log('blur');
    }

    onFocus = () => {
        console.log('focus');
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    convertData = (data) => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = this.geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    initMap2 = () => ({
        title: {
            text: '机房视图',
            x: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                    return params.name + ' : ' + params.value;
                } else {
                    return params.name + ' : ' + params.value[2];
                }
            }


        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['机房'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },

        viewControl:{
            minDistance:180,
            maxDistance:180,
            distance:150,
            rotateSensitivity: 0,
            projection: 'orthographic',
            orthographicSize: 200, //控制地图大小
            maxOrthographicSize: 200,
            minOrthographicSize: 200,
            autoRotate:false,
            animation:true,
            alpha:60,
            beta:10,
            animationDurationUpdate:10

            // autoRotateSpeed:5
          },
          rotateSensitivity:0,

        visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
                color: ['#00467F', '#A5CC82'] // 蓝绿

            }
        },
        geo: {
            show: true,
            roam: false,
            map: '福建',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [
            {
                name: '机房',
                type: 'scatter',
                coordinateSystem: 'geo',
                selectedMode: 'single',
                data: this.convertData(this.data),
                symbolSize: 10,
                // },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#05C3F9'
                    }
                }
            },
            {
                type: 'map',
                map: '福建',

                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: this.data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: 20,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F62157', //标志颜色
                    }
                },
                zlevel: 6,
                data: this.convertData(this.data),
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: this.convertData(this.data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: 10,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#05C3F9',
                        shadowBlur: 10,
                        shadowColor: '#05C3F9'
                    }
                },
                zlevel: 1
            },

        ]
        // }

    })

    onclick = {
        'click': this.clickEchartsPie.bind(this)
    }
    clickEchartsPie(e) {
        this.handleModalVisible(true);
        this.initDesk()
    }
    handleModalVisible = flag => {
        this.setState(
            {
                modalVisible: !!flag,
            }
        );
    };
    render() {
        const { modalVisible } = this.state;
        const parentMethods = {
            handleModalVisible: this.handleModalVisible,
            onBlur: this.onBlur,
            onCancel: this.onCancel,
            onChange: this.onChange,
            onSearch: this.onSearch,
            onFocus: this.onFocus
        };
        return (
            <Fragment>
                <div className={style.content}>
                    <Bar />
                    <BrokenLine />
                </div>

                {/* <div id='aa' style={{ height: 500, width: 500 }} >

                </div> */}
                <div>
                    <ReactEcharts
                        option={this.initMap2()}
                        style={{ width: '500px', height: "600px", borderWidth: "1px", borderColor: "red" }}
                        className={'react_for_echarts'}
                        ref={node => { this.echartspie = node }}
                        onEvents={this.onclick}
                    />
                </div>
                <CreateForm {...parentMethods} modalVisible={modalVisible} />

            </Fragment>
        );
    }
}

export default Echart;
