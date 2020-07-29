import Taro from "@tarojs/taro";
import { getjxhReqList,getMyjxhReqList,addjxhReq,addjxhReqMsg } from '@/services/fetch';
/**
 * 登录页面
 */
export default {
  namespace: "need",
  state: {
    XCX_HOME_IMG:[],// 首页轮播图片
    sysMenu:[],// 首页菜单
    corporateData:[],// 工厂首页
    jxhReqData:[],
    portalNotice:[],
    INDUSTRY_TYPE:[]
  },

  effects: {
  

    // 最新需求
    *getjxhReqList({payload}, { put,call }) {
      const res = yield call(getjxhReqList,payload);
      return res.data.records;
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqData:res.data.records}
      // })
    },

    // 最新需求
    *getMyjxhReqList({payload}, { put,call }) {
      const res = yield call(getMyjxhReqList,payload);
      return res.data.records;
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqData:res.data.records}
      // })
    },

    // 发布需求
    *addjxhReq({payload}, { put,call }) {
      const res = yield call(addjxhReq,payload);
      console.log(res)
      if(res.message){
        Taro.showToast({
          'title': res.message,
        });
      }
      setTimeout(()=>{
        Taro.navigateBack()
      },3000)

      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqData:res.data.records}
      // })
    },

    // 发布需求
    *addjxhReqMsg({payload}, { put,call }) {
      const res = yield call(addjxhReqMsg,payload);
      console.log(res)
      Taro.showToast({
        'title': res.message,
      });
      // Taro.navigateBack()

      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqData:res.data.records}
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
