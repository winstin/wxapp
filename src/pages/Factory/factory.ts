import Taro from "@tarojs/taro";
import { getBatchDictValues,baseMemberPoints,getsysMenu,getCorporateList,getJxhReq,getPortalNotice,getBatchDictValueByCode } from '@/services/fetch';
/**
 * 登录页面
 */
export default {
  namespace: "factory",
  state: {
    XCX_HOME_IMG:[],// 首页轮播图片
    sysMenu:[],// 首页菜单
    corporateData:[],// 工厂首页
    jxhReqData:[],
    portalNotice:[],
    INDUSTRY_TYPE:[]
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
      }else{
        Taro.atMessage({
          'message': message,
          'type': 'warning',
        })
      }
    },

    // 获取首页菜单
    *getsysMenu({payload}, { put,call }) {
      const res = yield call(getsysMenu,payload);
      const newMenu = res.data.map(item=>{
        let path = "";
        if(item.name==="会员审核"){
          path="/packageA/pages/MemberCheckList/index";
        }
        if(item.name==="查询会员"){
          path="/packageA/pages/MemberCheckList/index";
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
    *getCorporateList({payload}, { put,call }) {
      const res = yield call(getCorporateList,payload);

      return res.data.records;
      // yield put({
      //   type:'updateState',
      //   payload:{corporateData:res.data.records}
      // })
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
    },

    // 猎聘信息
    *getBatchDictValueByCode({payload}, { put,call }) {
      const res = yield call(getBatchDictValueByCode,payload);
      yield put({
        type:'updateState',
        payload:{INDUSTRY_TYPE:res.data}
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
