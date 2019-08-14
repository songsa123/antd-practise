import { stringify } from 'qs';
import request from '@/utils/request';

export async function querySecurity(params) {
  return request(`/api/security?${stringify(params)}`);
}

export async function removeSecurity(params) {
  return request('/api/security', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSecurity(params) {
  return request('/api/security', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSecurity(params = {}) {
  return request(`/api/security?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}
