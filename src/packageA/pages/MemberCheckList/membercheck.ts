import Taro from "@tarojs/taro";
import { passAudit,rejectpassAudit,getjxhReqDetail,getbaseMemberauditList,getcorporateauditList,auditbasemember,rejectbasemember,auditcorporate,rejectcorporate } from '@/services/fetch';
/**
 * 登录页面
 */
export default {
  namespace: "membercheck",
  state: {
    XCX_HOME_IMG:[],// 首页轮播图片
    sysMenu:[],// 首页菜单
    corporateData:[],// 工厂首页
    auditList:[],
    portalNotice:[],
    INDUSTRY_TYPE:[],
    memberCheckDetail:{}
  },

  effects: {
  

    // 最新需求
    *getbaseMemberauditList({payload}, { put,call }) {
      const res = yield call(getbaseMemberauditList,payload);
      return res.data.records;
    },

    // 最新需求
    *getcorporateauditList({payload}, { put,call }) {
      const res = yield call(getcorporateauditList,payload);
      return res.data.records;

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
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqDetail:res.data}
      // })
    },

    *rejectpassAudit({payload}, { put,call }) {
      const res = yield call(rejectpassAudit,payload);
      // yield put({
      //   type:'updateState',
      //   payload:{jxhReqDetail:res.data}
      // })
    },

    // 发布需求
    *auditbasemember({payload}, { put,call }) {
      const res = yield call(auditbasemember,payload);
      console.log(res)
      Taro.showToast({
        'title': '通过',
      });
      Taro.navigateBack()


    },

    // 发布需求
    *rejectbasemember({payload}, { put,call }) {
      const res = yield call(rejectbasemember,payload);
      console.log(res)
      Taro.showToast({
        'title': '拒绝成功',
      });
      Taro.navigateBack()


    },

    // 发布需求
    *auditcorporate({payload}, { put,call }) {
      const res = yield call(auditcorporate,payload);
      console.log(res)
      Taro.showToast({
        'title': '通过',
      });
      Taro.navigateBack()


    },

    // 发布需求
    *rejectcorporate({payload}, { put,call }) {
      const res = yield call(rejectcorporate,payload);
      console.log(res)
      Taro.showToast({
        'title': '拒绝成功',
      });
      Taro.navigateBack()


    },

    



    
    

   
    
  },

  reducers: {
    // 更新基础数据
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
