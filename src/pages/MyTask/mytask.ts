import Taro from "@tarojs/taro";
import { progresstask, completedtask, completetask } from '@/services/fetch';

/**
 * 登录页面
 */
export default {
  namespace: "mytask",
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
    *progresstask({payload}, { put,call }) {
      const res = yield call(progresstask,payload);
    //   console.log(res)
      yield put({
        type:'updateState',
        payload:{taskList:res.data}
      })
    },

    // 获取用户信息
    *completedtask({payload}, { put,call }) {
      const res = yield call(completedtask,payload);
    //   console.log(res)
      yield put({
        type:'updateState',
        payload:{taskList:res.data}
      })
    },

    // 获取任务详情
    *completetask({payload}, { put,call }) {
      const res = yield call(completetask,payload);
    //   console.log(res)
    //   yield put({
    //     type:'updateState',
    //     payload:{detail:res.data}
    //   })
    },
    
  },

  reducers: {
    // 更新基础数据
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
