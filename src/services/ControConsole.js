import { stringify } from 'qs';
import request from '@/utils/request';
export async function queryControlConsoleJsonNew(params) {
  return request(`/api/controConsole`, {
    method: 'POST',
    data: {
      body: params,
      method: 'post',
      evalJsonResponse: true,
    },
  });
}
export async function controlConsoleOpen(params) {
  var param = {
    ip: params.ip,
    bladeSlot: params.bladeSlot,
    mark: params.mark,
    address: params.address + '_' + params.floor + '_' + params.location,
  };

  // console.log(param)
  return request('/api/controConsoleSave/start1.action', {
    method: 'POST',
    data: {
      body: param,
      method: 'post',
      evalJsonResponse: true,
    },
  });
}
export async function controlConsoleClose(params) {
  var param = {
    ip: params.ip,
    bladeSlot: params.bladeSlot,
    mark: params.mark,
    address: params.address + '_' + params.floor + '_' + params.location,
  };
  return request('${basePath}/api/controConsoleSave/close1.action', {
    method: 'POST',
    data: {
      body: param,
      method: 'post',
      evalJsonResponse: true,
    },
  });
}
// 重启
export async function controlConsoleReOpen(params) {
  var param = {
    ip: params.ip,
    bladeSlot: params.bladeSlot,
    mark: params.mark,
    address: params.address + '_' + params.floor + '_' + params.location,
  };
  return request('${basePath}/api/controConsoleSave/restart1.action', {
    method: 'POST',
    data: {
      body: param,
      method: 'post',
      evalJsonResponse: true,
    },
  });
}
// 添加
export async function addControConsole(params) {
  return request(`/api/add/add`, {
    method: 'POST',
    data: {
      body: params,
      method: 'post',
      evalJsonResponse: true,
    },
  });
}
export async function createOrUpdateControConsole(params, id) {
  return request(`/api/update/controConsole`, {
    method: 'POST',
    data: {
      body: params,
      method: 'post',
      evalJsonResponse: true,
    },
  });
}
