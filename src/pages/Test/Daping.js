import React, { Component } from 'react';
import { Card, Table, Pagination, Modal, Form, Button } from 'antd';
import style from './Daping.less';
import logo from './picture/logo.png';
import weather from './picture/weather.png';
import loading from './picture/loading.gif';
import lbx from './picture/lbx.png';
import jt from './picture/jt.png';
import map from './picture/map.png';
import head from './picture/head.jpg';

import $ from 'jquery';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入环形图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// 使用样式
import 'echarts/theme/macarons';
import { connect } from 'dva';
class Daping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdate: null,
      date: 'week',
    };
  }
  componentDidMount() {
    this.getNowFormatDate();
    this.cityWeather();
    this.initPie();
    this.initCirtle();
    if (this.state.date === 'week') {
      this.initMembers();
    }
    // this.tt();
    this.addUser();
    this.consumeRecord();
  }
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = '-';
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    // return currentdate;
    this.setState({
      currentdate: currentdate,
    });
  }
  //获取本地的天气和日期需要做到两点：1.需要根据浏览器的IP查询所在的城市的名称，2.根据城市名称查询近七天的天气和星期，日期
  //方法一：通过js直接获取
  cityWeather() {
    var city;
    $.ajax({
      url: 'http://pv.sohu.com/cityjson?ie=utf-8',
      dataType: 'script',
      async: false,
      success: function() {
        //console.log(returnCitySN);
        city = returnCitySN.cname;
        city = '杭州市';
        var a = city.indexOf('省', 0);
        if (a >= 0) {
          city = city.substring(a + 1);
        }
        //  console.log(city);
        var url = encodeURI('http://wthrcdn.etouch.cn/weather_mini?city=' + city);
        $.get({
          url: url,
          dataType: 'json',
          async: false,
          success: function(data) {
            var todayWeather = data.data.forecast[0];
            $('#cl').html(
              '城市:' +
                city +
                '&nbsp;&nbsp;' +
                '日期:' +
                todayWeather.date +
                '&nbsp;&nbsp;' +
                '温度:' +
                todayWeather.high
            );
            console.log(todayWeather);
          },
        });
      },
    });
  }
  // 消费占比
  initPie() {
    var myChart1 = echarts.init(document.getElementById('echarts1'));
    var v1 = 298; //男消费
    var v2 = 523; //女消费
    var v3 = v1 + v2; //总消费
    var option1 = {
      //animation: false,
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#0088cc',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v1,
              name: '平均单客价',
              label: {
                normal: {
                  formatter: v3 + '\n' + '平均单客价',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
          ],
        },
      ],
    };
    var myChart3 = echarts.init(document.getElementById('echarts3'));
    var v1 = 298; //男消费
    var v2 = 523; //女消费
    var v3 = v1 + v2; //总消费
    var option2 = {
      //animation: false,
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#fccb00',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v1,
              name: '男消费',
              label: {
                normal: {
                  formatter: function(params) {
                    return v1 + '\n' + '占比' + Math.round((v1 / v3) * 100) + '%' + '\n' + '男消费';
                  },
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v2,
              name: '女消费',
              label: {
                normal: {
                  formatter: function(params) {
                    return '占比' + Math.round((v1 / v3) * 100) + '%';
                  },
                  // textStyle: {
                  //     color: '#f00',
                  //     fontSize: 12
                  // }
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    var myChart2 = echarts.init(document.getElementById('echarts2'));
    var option3 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#62b62f',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v2,
              name: '女消费',
              label: {
                normal: {
                  formatter: function(params) {
                    return v2 + '\n' + '占比' + Math.round((v2 / v3) * 100) + '%' + '\n' + '女消费';
                  },
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v1,
              name: '男消费',
              label: {
                normal: {
                  formatter: function(params) {
                    return '占比' + Math.round((v2 / v3) * 100) + '%';
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    setTimeout(function() {
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
    }, 500);
  }
  // 行业区分
  initCirtle() {
    var myChart = echarts.init(document.getElementById('echarts4'));
    var plantCap = [
      {
        name: '工业',
        value: '222',
      },
      {
        name: '农业',
        value: '115',
      },
      {
        name: '互联网',
        value: '113',
      },
      {
        name: '医疗',
        value: '95',
      },
      {
        name: '文学',
        value: '92',
      },
      {
        name: '服装',
        value: '87',
      },
    ];
    var datalist = [
      {
        offset: [56, 48],
        symbolSize: 110,
        // opacity: .95,
        color: 'rgba(73,188,247,.14)',
      },
      {
        offset: [30, 70],
        symbolSize: 70,
        color: 'rgba(73,188,247,.14)',
      },
      {
        offset: [0, 43],
        symbolSize: 60,
        color: 'rgba(73,188,247,.14)',
      },
      {
        offset: [93, 30],
        symbolSize: 70,
        color: 'rgba(73,188,247,.14)',
      },
      {
        offset: [26, 19],
        symbolSize: 65,
        color: 'rgba(73,188,247,.14)',
      },
      {
        offset: [75, 75],
        symbolSize: 60,
        color: 'rgba(73,188,247,.14)',
      },
    ];

    var datas = [];
    for (var i = 0; i < plantCap.length; i++) {
      var item = plantCap[i];
      var itemToStyle = datalist[i];
      datas.push({
        name: item.value + '\n' + item.name,
        value: itemToStyle.offset,
        symbolSize: itemToStyle.symbolSize,
        label: {
          normal: {
            textStyle: {
              fontSize: 14,
            },
          },
        },

        itemStyle: {
          normal: {
            color: itemToStyle.color,
            opacity: itemToStyle.opacity,
          },
        },
      });
    }
    var option = {
      grid: {
        show: false,
        top: 10,
        bottom: 10,
      },

      xAxis: [
        {
          gridIndex: 0,
          type: 'value',
          show: false,
          min: 0,
          max: 100,
          nameLocation: 'middle',
          nameGap: 5,
        },
      ],

      yAxis: [
        {
          gridIndex: 0,
          min: 0,
          show: false,
          max: 100,
          nameLocation: 'middle',
          nameGap: 30,
        },
      ],
      series: [
        {
          type: 'scatter',
          symbol: 'circle',
          symbolSize: 120,
          label: {
            normal: {
              show: true,
              formatter: '{b}',
              color: '#FFF',
              textStyle: {
                fontSize: '30',
              },
            },
          },
          itemStyle: {
            normal: {
              color: '#F30',
            },
          },
          data: datas,
        },
      ],
    };
    myChart.setOption(option);
    $(document).ready(function() {
      myChart.resize();
    });
    window.addEventListener('resize', function() {
      myChart.resize();
    });
  }
  // 改变会员数据统计
  handeleWeek = e => {
    console.log(e.target);
    this.setState(
      {
        date: 'week',
      },
      () => {
        this.initMembers();
      }
    );
  };
  handeleHalf = () => {
    this.setState(
      {
        date: 'half',
      },
      () => {
        this.initMembers1();
      }
    );
  };
  handeleMonth = () => {
    this.setState(
      {
        date: 'month',
      },
      () => {
        this.initMembers2();
      }
    );
  };
  // 新增会员（7天）
  initMembers() {
    var v0 = 1000; //总
    var v1 = 353; //
    var v2 = 178; //
    var v3 = 68; //新增

    var myChart6 = echarts.init(document.getElementById('echarts6'));
    var option6 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#0088cc',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v1,
              name: '新增会员',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '老会员',
              label: {
                normal: {
                  formatter: function(params) {
                    return (
                      v1 + '\n' + '占比' + Math.round((v1 / v0) * 100) + '%' + '\n' + '新增会员'
                    );
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    var myChart7 = echarts.init(document.getElementById('echarts7'));
    var option7 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#fccb00',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v2,
              name: '新增领卡会员',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '总领卡会员',
              label: {
                normal: {
                  formatter: function(params) {
                    return (
                      v2 + '\n' + '占比' + Math.round((v2 / v0) * 100) + '%' + '\n' + '新增领卡会员'
                    );
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 10,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    var myChart8 = echarts.init(document.getElementById('echarts8'));
    var option8 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#62b62f',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v3,
              name: '女消费',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '男消费',
              label: {
                normal: {
                  formatter: function(params) {
                    return v3 + '\n' + '占比' + Math.round((v2 / v0) * 100) + '%' + '\n' + '女消费';
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };
    setTimeout(function() {
      myChart6.setOption(option6);
      myChart7.setOption(option7);
      myChart8.setOption(option8);
    }, 500);
  }
  initMembers1() {
    var v0 = 2000; //总
    var v1 = 400; //
    var v2 = 1500; //
    var v3 = 100; //新增

    var myChart6 = echarts.init(document.getElementById('echarts6'));
    var option6 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#0088cc',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v1,
              name: '新增会员',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '老会员',
              label: {
                normal: {
                  formatter: function(params) {
                    return (
                      v1 + '\n' + '占比' + Math.round((v1 / v0) * 100) + '%' + '\n' + '新增会员'
                    );
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    var myChart7 = echarts.init(document.getElementById('echarts7'));
    var option7 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#fccb00',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v2,
              name: '新增领卡会员',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '总领卡会员',
              label: {
                normal: {
                  formatter: function(params) {
                    return (
                      v2 + '\n' + '占比' + Math.round((v2 / v0) * 100) + '%' + '\n' + '新增领卡会员'
                    );
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 10,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    var myChart8 = echarts.init(document.getElementById('echarts8'));
    var option8 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#62b62f',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v3,
              name: '女消费',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '男消费',
              label: {
                normal: {
                  formatter: function(params) {
                    return v3 + '\n' + '占比' + Math.round((v2 / v0) * 100) + '%' + '\n' + '女消费';
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };
    setTimeout(function() {
      myChart6.setOption(option6);
      myChart7.setOption(option7);
      myChart8.setOption(option8);
    }, 500);
  }
  initMembers2() {
    var v0 = 3000; //总
    var v1 = 2000; //
    var v2 = 500; //
    var v3 = 500; //新增

    var myChart6 = echarts.init(document.getElementById('echarts6'));
    var option6 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#0088cc',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v1,
              name: '新增会员',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '老会员',
              label: {
                normal: {
                  formatter: function(params) {
                    return (
                      v1 + '\n' + '占比' + Math.round((v1 / v0) * 100) + '%' + '\n' + '新增会员'
                    );
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    var myChart7 = echarts.init(document.getElementById('echarts7'));
    var option7 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#fccb00',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v2,
              name: '新增领卡会员',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '总领卡会员',
              label: {
                normal: {
                  formatter: function(params) {
                    return (
                      v2 + '\n' + '占比' + Math.round((v2 / v0) * 100) + '%' + '\n' + '新增领卡会员'
                    );
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 10,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };

    var myChart8 = echarts.init(document.getElementById('echarts8'));
    var option8 = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          color: '#62b62f',
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [
            {
              value: v3,
              name: '女消费',
              label: {
                normal: {
                  formatter: '',
                  textStyle: {
                    fontSize: 12,
                    color: '#fff',
                  },
                },
              },
            },
            {
              value: v0,
              name: '男消费',
              label: {
                normal: {
                  formatter: function(params) {
                    return v3 + '\n' + '占比' + Math.round((v2 / v0) * 100) + '%' + '\n' + '女消费';
                  },
                  textStyle: {
                    color: '#aaa',
                    fontSize: 12,
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,.2)',
                },
                emphasis: {
                  color: '#fff',
                },
              },
            },
          ],
        },
      ],
    };
    setTimeout(function() {
      myChart6.setOption(option6);
      myChart7.setOption(option7);
      myChart8.setOption(option8);
    }, 500);
  }
  // tt
  tt() {
    // $('.counter').countUp();
    // $('#btnTitle a').
  }
  // 新增会员列表滚动播放
  addUser1() {
    // var html2=$(".adduser ul").html();
    var adduser = document.getElementById('members');
    var html2 = $('#members').html();
    $('#members').append(html2);
    var ls2 = $('#members li').length / 2 + 1;
    var a = 0;
    var ref = setInterval(function() {
      a++;
      if (a == ls2) {
        a = 1;
        $('#members ').css({ marginTop: 0 });
        $('#members ').animate({ marginTop: -'50' + 'px' }, 800);
      }
      $('#members').animate({ marginTop: -'50' * a + 'px' }, 800);
    }, 4300);
  }
  addUser() {
    //获得当前<ul>
    var $uList = $('#members');
    var timer = null;
    //触摸清空定时器
    $uList
      .hover(
        function() {
          clearInterval(timer);
        },
        function() {
          //离开启动定时器
          timer = setInterval(function() {
            scrollList($uList);
          }, 1000);
        }
      )
      .trigger('mouseleave'); //自动触发触摸事件
    //滚动动画
    function scrollList(obj) {
      //获得当前<li>的高度
      var scrollHeight = $('#members li:first').height();
      //滚动出一个<li>的高度
      $uList.stop().animate(
        {
          marginTop: -scrollHeight,
        },
        1000,
        function() {
          //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
          $uList
            .css({
              marginTop: 0,
            })
            .find('li:first')
            .appendTo($uList);
        }
      );
    }
  }
  // 消费记录滚动播放
  consumeRecord1() {
    //
    var html = $('#record').html();
    $('#record').append(html);
    var ls = $('#record li').length / 2 + 1;
    var i = 0;
    var ref = setInterval(function() {
      i++;
      if (i == ls) {
        i = 1;
        $('#record').css({ marginTop: 0 });
        $('#record').animate({ marginTop: -'40' + 'px' }, 1000);
      }
      $('#record').animate({ marginTop: -'40' * i + 'px' }, 1000);
    }, 4300);
  }
  consumeRecord() {
    //获得当前<ul>
    var $uList = $('#record');
    var timer = null;
    //触摸清空定时器
    $uList
      .hover(
        function() {
          clearInterval(timer);
        },
        function() {
          //离开启动定时器
          timer = setInterval(function() {
            scrollList($uList);
          }, 2000);
        }
      )
      .trigger('mouseleave'); //自动触发触摸事件
    //滚动动画
    function scrollList(obj) {
      //获得当前<li>的高度
      var scrollHeight = $('#record li:first').height();
      //滚动出一个<li>的高度
      $uList.stop().animate(
        {
          marginTop: -scrollHeight,
        },
        600,
        function() {
          //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
          $uList
            .css({
              marginTop: 0,
            })
            .find('li:first')
            .appendTo($uList);
        }
      );
    }
  }
  render() {
    const { currentdate, date } = this.state;
    return (
      <div className={style.bg}>
        {/* <div className={style.loading}>
                    <div className={style.loadbox}> <img src={loading} />
                        页面加载中...
                    </div>
                </div> */}
        <div className={style.head}>
          <h1>
            <img src={logo} />
            大数据可视化平台
          </h1>
          <div className={style.weather}>
            <img src={weather} />
            <span id="cl" />
            {/* <span>{currentdate}</span> */}
          </div>
        </div>
        <div className={style.mainbox}>
          <ul className={style.clearfix}>
            <li>
              <div className={`${style.boxall} ${style.boxall1}`}>
                <div className={style.alltitle}>生意参谋</div>
                <div className={style.sycm}>
                  <ul className={style.clearfix}>
                    <li>
                      <h2>1824</h2>
                      <span>今日销售额</span>
                    </li>
                    <li>
                      <h2>1920</h2>
                      <span>昨日销售额</span>
                    </li>
                    <li>
                      <h2>19%</h2>
                      <span>环比增长</span>
                    </li>
                  </ul>
                  <div className={style.aa} />
                  <ul className={style.clearfix}>
                    <li>
                      <h2>1824</h2>
                      <span>今日销售额</span>
                    </li>
                    <li>
                      <h2>1920</h2>
                      <span>昨日销售额</span>
                    </li>
                    <li>
                      <h2>19%</h2>
                      <span>环比增长</span>
                    </li>
                  </ul>
                </div>

                <div className={style.boxfoot} />
              </div>
              <div className={style.boxall} style={{ height: 160 }}>
                <div className={style.alltitle}>消费占比</div>
                <div className={style.sy} id="echarts1" />
                <div className={style.sy} id="echarts2" />
                <div className={style.sy} id="echarts3" />
                <div className={style.boxfoot} />
              </div>
              <div className={style.boxall} style={{ height: 220 }}>
                <div className={style.alltitle}>行业区分比例</div>
                <div id="echarts4" style={{ height: 150 }} />
                <div classNames={style.boxfoot} />
              </div>
            </li>
            <li>
              <div className={style.bar}>
                <div className={style.barbox}>
                  <ul className={style.clearfix}>
                    <li className={`${style.pulll_left} ${style.counter}`}>12581189</li>
                    <li className={`${style.pulll_left} ${style.counter}`}>3912410</li>
                  </ul>
                </div>
                <div className={style.barbox2}>
                  <ul className={style.clearfix}>
                    <li className={style.pulll_left}>消费总金额</li>
                    <li className={style.pulll_left}>消费总笔数</li>
                  </ul>
                </div>
              </div>
              <div className={style.map}>
                <div className={style.map1}>
                  <img src={lbx} />
                </div>
                <div className={style.map2}>
                  <img src={jt} />
                </div>
                <div className={style.map3}>
                  <img src={map} />
                </div>
                <div className={style.map4} id="map_1" />
              </div>
            </li>
            <li>
              <div className={style.boxall} style={{ height: 355 }}>
                <div className={style.alltitle}>新增会员信息</div>
                <div className={style.tabs}>
                  <ul className={style.clearfix}>
                    <li>
                      <a
                        className={`${date == 'week' ? style.active : ''} ${style.btn}`}
                        href="#"
                        onClick={this.handeleWeek}
                      >
                        7天
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className={`${date == 'half' ? style.active : ''} ${style.btn}`}
                        onClick={this.handeleHalf}
                      >
                        15天
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className={`${date == 'month' ? style.active : ''} ${style.btn}`}
                        onClick={this.handeleMonth}
                      >
                        30天
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={style.clearfix}>
                  <div className={style.sy} id="echarts6" />
                  <div className={style.sy} id="echarts7" />
                  <div className={style.sy} id="echarts8" />
                </div>
                <div className={style.addnew}>
                  <div className={style.tit02}>
                    <span>今日新增会员列表</span>
                  </div>
                  <div className={style.adduser}>
                    <ul className={`${style.clearfix} ${style.members}`} id="members">
                      <li className={style.clearfix}>
                        {' '}
                        <span className={style.pulll_left}>
                          <img src={head} />
                          1、今日新增会员列表
                        </span>
                        <span className={style.pulll_right}>24岁 - 女 -广州 </span>
                      </li>
                      <li className={style.clearfix}>
                        {' '}
                        <span className={style.pulll_left}>
                          <img src={head} />
                          2、今日新增会员列表
                        </span>
                        <span className={style.pulll_right}>24岁 - 女 - 广州 </span>
                      </li>
                      <li className={style.clearfix}>
                        {' '}
                        <span className={style.pulll_left}>
                          <img src={head} />
                          3、今日新增会员列表
                        </span>
                        <span className={style.pulll_right}>24岁 - 女 - 广州 </span>
                      </li>
                      <li className={style.clearfix}>
                        {' '}
                        <span className={style.pulll_left}>
                          <img src={head} />
                          4、今日新增会员列表
                        </span>
                        <span className={style.pulll_right}>24岁 - 女 - 广州 </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={style.boxfoot} />
              </div>
              <div className={style.boxall} style={{ height: 220 }}>
                <div className={style.alltitle}>实时消费记录</div>
                <div className={style.wrap}>
                  <ul id="record">
                    <li>
                      <p>1李东梁-支付宝支付-120元-XXX门店</p>
                    </li>
                    <li>
                      <p>2李东梁-支付宝支付-120元-XXX门店</p>
                    </li>
                    <li>
                      <p>3李东梁-支付宝支付-120元-XXX门店</p>
                    </li>
                    <li>
                      <p>4李东梁-支付宝支付-120元-XXX门店</p>
                    </li>
                    <li>
                      <p>5云码资源优选-支付宝支付-120元-XXX门店</p>
                    </li>
                    <li>
                      <p>6云码资源优选-支付宝支付-120元-XXX门店</p>
                    </li>
                  </ul>
                </div>
                <div className={style.boxfoot} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Daping;
