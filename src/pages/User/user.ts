import Taro from "@tarojs/taro";
import { fetchmakerDetails, makerIdentity, makerBank,getOssFile,getMyInfo,getMypointslist } from '@/services/fetch';

/**
 * 登录页面
 */
export default {
  namespace: "user",
  state: {
    makerInfo:{},
    myInfo:{},
    mypointslist:[]
  },

  effects: {
  
    // 获取用户信息
    *fetchmakerDetails({payload}, { put,call }) {
      const res = yield call(fetchmakerDetails,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{makerInfo:res.data}
      })
    },

    // 获取用户信息
    *makerIdentity({payload}, { put,call }) {
      const res = yield call(makerIdentity,payload);
      console.log(res)
      // yield put({
      //   type:'updateState',
      //   payload:{makerInfo:res.data}
      // })
    },

    // 添加银行卡信息
    *makerBank({payload}, { put,call }) {
      const res = yield call(makerBank,payload);
      console.log(res)
      // yield put({
      //   type:'updateState',
      //   payload:{makerInfo:res.data}
      // })
    },

    // 获取身份证信息
    *getOssFile({payload}, { put,call }) {
      const res = yield call(getOssFile,payload);
      // console.log(res)
      return res.data && res.data.link
      // yield put({
      //   type:'updateState',
      //   payload:{makerInfo:res.data}
      // })
    },

    // 获取用户信息
    *getMyInfo({payload}, { put,call }) {
      const res = yield call(getMyInfo,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{myInfo:res.data}
      })
    },

    // 获取积分信息
    *getMypointslist({payload}, { put,call }) {
      const res = yield call(getMypointslist,payload);
      console.log(res)
      return res.data && res.data.records
      // yield put({
      //   type:'updateState',
      //   payload:{mypointslist:res.data}
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
