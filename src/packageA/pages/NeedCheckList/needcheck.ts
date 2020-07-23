import Taro from "@tarojs/taro";
import { passAudit,rejectpassAudit,getjxhReqDetail,getauditList,getauditedList } from '@/services/fetch';
/**
 * 登录页面
 */
export default {
  namespace: "needcheck",
  state: {
    XCX_HOME_IMG:[],// 首页轮播图片
    sysMenu:[],// 首页菜单
    corporateData:[],// 工厂首页
    jxhReqData:[],
    portalNotice:[],
    INDUSTRY_TYPE:[],
    jxhReqDetail:{}
  },

  effects: {
  

    // 最新需求
    *getauditList({payload}, { put,call }) {
      const res = yield call(getauditList,payload);
      return res.data.records;
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqData:res.data.records}
      // })
    },

    // 最新需求
    *getauditedList({payload}, { put,call }) {
      const res = yield call(getauditedList,payload);
      return res.data.records;
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqData:res.data.records}
      // })
    },

    // 详情
    *getjxhReqDetail({payload}, { put,call }) {
      const res = yield call(getjxhReqDetail,payload);
      yield put({
        type:'updateState',
        payload:{jxhReqDetail:res.data}
      })
    },

    // 详情
    *passAudit({payload}, { put,call }) {
      const res = yield call(passAudit,payload);
      Taro.showToast({
        'title': res.message,
      });
      if(res.status === 0){
        Taro.navigateBack()
      }
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqDetail:res.data}
      // })
    },

    *rejectpassAudit({payload}, { put,call }) {
      const res = yield call(rejectpassAudit,payload);
      Taro.showToast({
        'title': res.message,
      });
      if(res.status === 0){
        Taro.navigateBack()
      }
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqDetail:res.data}
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
