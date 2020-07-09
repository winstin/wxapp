import Taro from "@tarojs/taro";
import { getBatchDictValues,baseMemberPoints,getsysMenu,getCorporate,getJxhReq,getPortalNotice,getBatchDictValueByCode,getTodoList,getcheckSignin,getUserInfo } from '@/services/fetch';
/**
 * 登录页面
 */
export default {
  namespace: "myindex",
  state: {
    XCX_HOME_IMG:[],// 首页轮播图片
    sysMenu:[],// 首页菜单
    corporateData:[],// 工厂首页
    jxhReqData:[],
    portalNotice:[],
    INDUSTRY_TYPE:[],
    dataCount:{},
    Signin:true,
    userInfo:{}
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
        yield put({
          type:'updateState',
          payload:{Signin:false}
        })
      }else{
        Taro.atMessage({
          'message': message,
          'type': 'warning',
        })
      }
    },

    *getTodoList({payload}, { put,call }) {
      const res = yield call(getTodoList,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{dataCount:res.data}
      })
    },
    

    // 获取首页菜单
    *getsysMenu({payload}, { put,call }) {
      const res = yield call(getsysMenu,payload);
      const newMenu = res.data.map(item=>{
        let path = "";
        if(item.name==="会员审核"){
          path="/packageA/pages/MemberCheckList/index";
        }
        if(item.name==="需求审核"){
          path="/packageA/pages/NeedCheckList/index";
        }
        return {
          icon: `http://sz-spd.cn:889/${item.remarks}`,
          title:item.name,
          path
        }
      });
      for(let i = newMenu.length; i<5;i++){
        newMenu.push({
          icon:'',
          title:''
        })
      }
      yield put({
        type:'updateState',
        payload:{sysMenu:newMenu}
      })
    },


    // 工厂首页
    *getCorporate({payload}, { put,call }) {
      const res = yield call(getCorporate,payload);
      yield put({
        type:'updateState',
        payload:{corporateData:res.data.records}
      })
    },

    // 首页需求
    *getJxhReq({payload}, { put,call }) {
      const res = yield call(getJxhReq,payload);
      yield put({
        type:'updateState',
        payload:{jxhReqData:res.data.records}
      })
    },

    // 猎聘信息
    *getPortalNotice({payload}, { put,call }) {
      const res = yield call(getPortalNotice,payload);
      yield put({
        type:'updateState',
        payload:{portalNotice:res.data.records}
      })

      return res.data.records;
    },

    // 猎聘信息
    *getBatchDictValueByCode({payload}, { put,call }) {
      const res = yield call(getBatchDictValueByCode,payload);
      yield put({
        type:'updateState',
        payload:{INDUSTRY_TYPE:res.data}
      })
    },

    // 猎聘信息
    *getcheckSignin({payload}, { put,call }) {
      const res = yield call(getcheckSignin,payload);
      yield put({
        type:'updateState',
        payload:{Signin:res.data}
      })
    },

    // 猎聘信息
    *getUserInfo({payload}, { put,call }) {
      const res = yield call(getUserInfo,payload);
      yield put({
        type:'updateState',
        payload:{userInfo:res.data}
      })
    },

    


    
    

   
    
  },

  reducers: {
    // 更新基础数据
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
