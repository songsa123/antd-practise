import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Form, Table, Card, Row, Col, Input, Select, Icon, Button, Menu, InputNumber,
    DatePicker, Modal, messageDivider, Steps, Radio,
} from 'antd';
import styles from './style.less';
import StandardTable from '@/components/StandardTable';
const FormItem = Form.Item;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
// 这里的list是models里面的文件。从models文件引入接口的数据
@connect(({ pratciseTab, loading }) => ({
    pratciseTab,
    loading: loading.models.pratciseTab,
}))
@Form.create()
class Tab2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {}
        }
    }

    columns = [
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
    ];

    componentDidMount() {
        this.initTable();
    }
    initTable() {
        const { dispatch } = this.props;
        dispatch({
            type: 'pratciseTab/fetch',
        });
    }
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        console.log(formValues)
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        console.log(params, 4444)
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'pratciseTab/fetch',
            payload: params,
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
                    <Col md={6} sm={24}>
                        <FormItem label="姓名">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="年龄">
                            {getFieldDecorator('age')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="住址">
                            {getFieldDecorator('address')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">
                                查询
                  </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                  </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }
    //   重置
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'pratciseTab/fetch',
            payload: {},
        });
    };
    //   搜索
    handleSearch = e => {
        e.preventDefault();
        // console.log(e)
        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
                formValues: values,
            }, () => {
                console.log(this.state.formValues, 7777)
                //   this.handleStandardTableChange()
                form.resetFields();
            });
            dispatch({
                type: 'pratciseTab/fetch',
                payload: values,
            });

        });
    };

    render() {
        const {
            pratciseTab: { data },
            loading,
        } = this.props;
        return (
            <Card>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <Table dataSource={data.list} columns={this.columns}
                    onChange={this.handleStandardTableChange} />
            </Card>
        );
    }
}

export default Tab2;