import { parse } from 'url';

// mock tableListDataSource
// let tableListDataSource=[];
let tableListDataSource = {
  resultList: [
    {
      CLOSE: '../icon/png/close.gif',
      RESTART: '../icon/png/restart.gif',
      START: '../icon/png/start.png',
      address: '石桥机房',
      agencyIp: '10.212.200.40',
      agencyPort: '7',
      bladeIp: '200.188.20.134',
      bladeName: '-',
      bladeSlot: '-',
      chassis_number: '1',
      floor: 'SQ1#-4F',
      hostname: null,
      ip: '200.188.20.134',
      isverify: '3',
      limit: 1,
      location: 'F08',
      mark: 'HP_BLADE',
      oid: '746a3c8a-1358-4814-b6fc-e8889a5941af',
      phone: null,
      prochamber: '政企云共用',
      resInsOid: null,
      resTypeOid: '746a3c8a-1358-4814-b6fc-e8889a5941af',
      responsible: null,
      slot_number: '-',
      software: null,
      start: 0,
      state: '1',
      userId: null,
      userid: null,
      id: 1,
    },
    {
      CLOSE: '../icon/png/close.gif',
      RESTART: '../icon/png/restart.gif',
      START: '../icon/png/start.png',
      address: '石桥机房',
      agencyIp: '10.212.200.40',
      agencyPort: '8',
      bladeIp: '200.188.20.127',
      bladeName: '-',
      bladeSlot: '2',
      chassis_number: '1',
      floor: 'SQ1#-4F',
      hostname: null,
      ip: '200.188.20.134',
      isverify: '3',
      limit: 1,
      location: 'F08',
      mark: 'HP_BLADE',
      oid: '746a3c8a-1358-4814-b6fc-e8889a5941af',
      phone: null,
      prochamber: '政企云共用',
      resInsOid: null,
      resTypeOid: '746a3c8a-1358-4814-b6fc-e8889a5941af',
      responsible: null,
      slot_number: '2',
      software: null,
      start: 0,
      state: '1',
      userId: null,
      userid: null,
      id: 2,
    },
    {
      CLOSE: '../icon/png/close.gif',
      RESTART: '../icon/png/restart.gif',
      START: '../icon/png/start.png',
      address: '三墩机房',
      agencyIp: '-',
      agencyPort: '-',
      bladeIp: '200.200.4.133',
      bladeName: '-',
      bladeSlot: '-',
      chassis_number: 'SD-4#4F-C04',
      floor: '三墩4号楼4楼',
      hostname: null,
      ip: '200.200.4.133',
      isverify: '3',
      limit: 1,
      location: '-',
      mark: 'INSPUR_X86',
      oid: '71818b50-143b-48df-ab19-e65e41c2f107',
      phone: null,
      prochamber: 'IT资源池三期AI子域杭州节点',
      resInsOid: null,
      resTypeOid: '71818b50-143b-48df-ab19-e65e41c2f107',
      responsible: null,
      slot_number: '-',
      software: null,
      start: 0,
      state: '1',
      userId: null,
      userid: null,
      id: 3,
    },
  ],
};
let a = { code: 200, msg: '刀片响应启动成功' };

function getSecurity(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  //   const params = parse(url, true).query;
  let dataSource = tableListDataSource;
  //   if (params.sorter) {
  //     const s = params.sorter.split('_');
  //     dataSource = dataSource.sort((prev, next) => {
  //       if (s[1] === 'descend') {
  //         return next[s[0]] - prev[s[0]];
  //       }
  //       return prev[s[0]] - next[s[0]];
  //     });
  //   }
  //   if (params.ip) {
  //     dataSource = dataSource.filter(data => data.ip.indexOf(params.ip) > -1);

  //   }

  return res.json(dataSource);
}

export default {
  'GET /api/security': getSecurity,
};
