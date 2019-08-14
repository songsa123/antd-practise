import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
  },
];
const expandedRowRender = () => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      key: 'state',
    },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
const columns1 = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a href="javascript:;">Delete</a>,
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
class List extends Component {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} expandedRowRender={expandedRowRender} />
      </div>
    );
  }
}

export default List;
