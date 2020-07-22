import Taro from "@tarojs/taro";
import { delbaseVendorAlbum,updatebaseVendorAlbum,getbaseVendorAlbumList,registerBaseMember,registerCorporate,addbaseVendorAlbum,getsrmbaseVendorAlbum,getbaseVendorAlbum,getBatchDictValues,baseMemberPoints,getsysMenu,getCorporateList,getJxhReq,getPortalNotice,getBatchDictValueByCode,getcorporateDetail } from '@/services/fetch';
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
    INDUSTRY_TYPE:[],
    corporateDetail:{},
    albums:[],
    srmalbums:{}
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

    // 猎聘信息
    *getcorporateDetail({payload}, { put,call }) {
      const res = yield call(getcorporateDetail,payload);
      yield put({
        type:'updateState',
        payload:{corporateDetail:res.data}
      })
    },

    // 企业相册
    *getbaseVendorAlbum({payload}, { put,call }) {
      const res = yield call(getbaseVendorAlbum,payload);
      yield put({
        type:'updateState',
        payload:{albums:res.data}
      })
    },

    
    // 产品说明
    *getsrmbaseVendorAlbum({payload}, { put,call }) {
      const res = yield call(getsrmbaseVendorAlbum,payload);
      yield put({
        type:'updateState',
        payload:{srmalbums:res.data}
      })
    },


    // 产品说明
    *addbaseVendorAlbum({payload}, { put,call }) {
      const res = yield call(addbaseVendorAlbum,payload);
      Taro.showToast({
        'title': '新增成功',
      });
      Taro.navigateBack()
      // yield put({
      //   type:'updateState',
      //   payload:{srmalbums:res.data}
      // })
    },
    // 产品说明
    *updatebaseVendorAlbum({payload}, { put,call }) {
      const res = yield call(updatebaseVendorAlbum,payload);
      Taro.showToast({
        'title': '更新成功',
      });
      Taro.navigateBack()
      // yield put({
      //   type:'updateState',
      //   payload:{srmalbums:res.data}
      // })
    },

    *delbaseVendorAlbum({payload}, { put,call }) {
      const res = yield call(delbaseVendorAlbum,payload);
      Taro.showToast({
        'title': '删除成功',
      });
    },

    

    

    // 产品说明
    *registerCorporate({payload}, { put,call }) {
      const res = yield call(registerCorporate,payload);
      console.log(res)
      if(res.status == 500 || res.status == 400){
        Taro.showToast({
          'title': res.message,
        });
      }else{
        if(res.message === "电话已经被注册"){
          Taro.showToast({
            'title': res.message,
          });
        }else{
          Taro.navigateBack()
        }
      }
    },

    *registerBaseMember({payload}, { put,call }) {
      const res = yield call(registerBaseMember,payload);
      console.log(res)
      if(res.status == 500 || res.status == 400){
        Taro.showToast({
          'title': res.message,
        });
      }else{
        if(res.message === "电话已经被注册"){
          Taro.showToast({
            'title': res.message,
          });
        }else{
          Taro.navigateBack()
        }
      }
    },

    *getbaseVendorAlbumList({payload}, { put,call }) {
      const res = yield call(getbaseVendorAlbumList,payload);
      return res.data.records;
      // yield put({
      //   type:'updateState',
      //   payload:{srmalbums:res.data}
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
