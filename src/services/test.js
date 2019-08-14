import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryList(params) {
  return request(`/api/list?${stringify(params)}`);
}

export async function removeList(params) {
  return request('/api/list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addList(params) {
  return request('/api/list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateList(params = {}) {
  return request(`/api/list?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}
