import extend from 'extend';
import {
  queryControlConsoleJsonNew,
  loadRoomTree,
  controlConsoleOpen,
  controlConsoleClose,
  controlConsoleReOpen,
  addControConsole,
  createOrUpdateControConsole,
} from '@/services/ControConsole.js';

export default {
  namespace: 'controConsole',

  state: {
    data: {
      // resultList: {
      // list: [],
      // },
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryControlConsoleJsonNew, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchOpen({ payload, callback }, { call, put }) {
      const response = yield call(controlConsoleOpen, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (response) {
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
    *fetchClose({ payload, callback }, { call, put }) {
      const response = yield call(controlConsoleClose, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (response) {
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      } else {
        notification.error({
          message: response.msg,
        });
      }
      // if (callback) callback();
    },
    *fetchReOpen({ payload, callback }, { call, put }) {
      const response = yield call(controlConsoleReOpen, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (response) {
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      } else {
        notification.error({
          message: response.msg,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      yield call(addControConsole, payload);
      yield put({
        type: 'save',
        payload: yield call(queryControlConsoleJsonNew, payload.formValues),
      });
      if (callback) callback();
    },
    *createOrUpdate({ payload, callback }, { call, put }) {
      yield call(createOrUpdateControConsole, payload.newValues, payload.id);
      yield put({
        type: 'save',
        payload: yield call(queryControlConsoleJsonNew, payload.formValues),
      });
      if (callback) callback();
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
