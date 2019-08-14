import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryTopdf(params) {
  return request(`/api/topdf?${stringify(params)}`);
}

export async function removeTopdf(params) {
  return request('/api/topdf', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTopdf(params) {
  return request('/api/topdf', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTopdf(params = {}) {
  return request(`/api/topdf?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}
