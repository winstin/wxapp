import Taro from "@tarojs/taro";
import { dictionary, taskpage, taskdetail, accepttask } from '@/services/fetch';

/**
 * 登录页面
 */
export default {
  namespace: "taskhall",
  state: {
    tradeList:[],
    taskList:{
      current: 1,
      size: 10,
      total: 1,
      records: [],
      search: '', // 搜索关键词
      formValues: undefined, // 过滤条件（此处没有预留）
    },
    detail:{}
  },

  effects: {
  
    // 获取字典信息
    *queryDictionary({payload}, { put,call }) {
      const res = yield call(dictionary,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{tradeList:res.data}
      })
    },

    // 获取用户信息
    *taskpage({payload}, { put,call }) {
      const res = yield call(taskpage,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{taskList:res.data}
      })
    },

    // 获取任务详情
    *taskdetail({payload}, { put,call }) {
      const res = yield call(taskdetail,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{detail:res.data}
      })
    },

    // 领取任务
    *accepttask({payload}, { put,call }) {
      const res = yield call(accepttask,payload);
      console.log(res)
      // yield put({
      //   type:'updateState',
      //   payload:{detail:res.data}
      // })
    },

    
  },

  reducers: {
    // 更新基础数据
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
