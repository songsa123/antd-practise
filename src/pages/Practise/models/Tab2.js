import {queryList } from '@/services/parctisetTab.js';

export default {
  namespace: 'pratciseTab',

  state: {
    data: {
      // 这个要跟mock里面定义数据的一样
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
        console.log(payload,89898)
      const response = yield call(queryList, payload);
      console.log(response,7878)
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
