import Taro from "@tarojs/taro";
import { levelUpbaseMember,getPhone,getMycard,updatebaseMember,fetchmakerDetails, makerIdentity, makerBank,getOssFile,getMyInfo,getMypointslist,getSysRegionAllList } from '@/services/fetch';

/**
 * 登录页面
 */
export default {
  namespace: "user",
  state: {
    makerInfo:{},
    myInfo:{},
    cardInfo:{},
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
      let result = {};
      if(res.data){
        result = {
          records:res.data.list.records,
          total:res.data.total
        }
      }
      return result
      // yield put({
      //   type:'updateState',
      //   payload:{mypointslist:res.data}
      // })
    },

    *updatebaseMember({payload}, { put,call }) {
      const res = yield call(updatebaseMember,payload);
      console.log(res)
      if(res.status !== 0){
        Taro.showToast({
          'title': res.message,
        });
      }else{
        Taro.showToast({
          'title': res.message,
        });
        Taro.navigateBack()
      }
    },

    *levelUpbaseMember({payload}, { put,call }) {
      const res = yield call(levelUpbaseMember,payload);
      console.log(res)
      if(res.status !== 0){
        Taro.showToast({
          'title': res.message,
        });
      }else{
        Taro.showToast({
          'title': res.message,
        });
        Taro.navigateBack()
      }
    },

    *getSysRegionAllList({payload}, { put,call }) {
      const res = yield call(getSysRegionAllList,payload);
      // console.log(res)
      return res.data
    },

    // 获取用户信息
    *getMycard({payload}, { put,call }) {
      const res = yield call(getMycard,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{cardInfo:res.data}
      })
    },

    *getPhone({payload}, { put,call }) {
      const res = yield call(getPhone,payload);
      // console.log(res)
      return res
    },
    
    

    
    
    
    
    
  },

  reducers: {
    // 更新基础数据
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
