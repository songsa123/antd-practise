import React, { Component, Fragment } from 'react';
import Bar from './component/bar';
import BrokenLine from './component/brokenLine';
import style from './echarts.less';
class Echart extends Component {
  render() {
    return (
      <Fragment>
        <div className={style.content}>
          <Bar />
          <BrokenLine />
        </div>
      </Fragment>
    );
  }
}

export default Echart;
