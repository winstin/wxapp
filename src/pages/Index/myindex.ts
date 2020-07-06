import Taro from "@tarojs/taro";
import { getBatchDictValues,baseMemberPoints } from '@/services/fetch';

/**
 * 登录页面
 */
export default {
  namespace: "myindex",
  state: {
    XCX_HOME_IMG:[]
  },

  effects: {
  
    // 获取首页轮播图
    *getBatchDictValues({payload}, { put,call }) {
      const res = yield call(getBatchDictValues,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{XCX_HOME_IMG:res.data.XCX_HOME_IMG}
      })
    },

    // 会员签到
    *baseMemberPoints({payload}, { put,call }) {
      const {status,message} = yield call(baseMemberPoints,payload);
      if(status === 0){
        Taro.atMessage({
          'message': '签到成功',
          'type': 'success',
        })
        // Taro.showToast({
        //   title: '签到成功',
        // })
      }else{
        // Taro.showToast({
        //   title: message,
        // })
        Taro.atMessage({
          'message': message,
          'type': 'warning',
        })
      }
      
      // yield put({
      //   type:'updateState',
      //   payload:{makerInfo:res.data}
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
