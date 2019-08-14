import React, { Component } from 'react';
import { Steps, Rate, Radio } from 'antd';

import style from './echarts.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Vip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      isChecked: false,
    };
  }
  handleChange = value => {
    this.setState({ value });
  };
  handleChecked(e) {
    console.log(e);
    this.setState({
      isChecked: true,
    });
  }
  onChange1(e) {
    console.log('radio checked:' + e.target.value);
  }
  render() {
    const { Step } = Steps;
    const { value, isChecked } = this.state;
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    return (
      <PageHeaderWrapper title="VIP">
        <div className={style.step}>
          <Steps size="small" current={2}>
            <Step title="Finished" />
            <Step title="In Progress" />
            <Step title="Waiting" />
          </Steps>
          <span>
            <Rate tooltips={desc} onChange={this.handleChange} value={value} />
            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
          </span>
        </div>
        {/* <div> */}
        <div>
          <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.onChange1}>
            <Radio.Button
              value="a"
              onClick={this.handleChecked.bind(this)}
              className={isChecked ? 'a' : ''}
            >
              Hangzhou
            </Radio.Button>
            <Radio.Button value="b" checked>
              Shanghai
            </Radio.Button>
            <Radio.Button value="c" checked>
              Beijing
            </Radio.Button>
            <Radio.Button value="d">Chengdu</Radio.Button>
          </Radio.Group>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Vip;
