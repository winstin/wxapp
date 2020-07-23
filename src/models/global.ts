import Taro from "@tarojs/taro";
import { weappmnlogin,login,getCode,validateCode, getBatchDictValues, fetchTenants } from '@/services/fetch';

export interface userInfo{
  avatarUrl?:string; // 头像
  city?:string; // 所在城市
  country?:string; // 所在国家
  nickName?:string; // 姓名
  province?:string; // 省份
  gender?:number; // 性别
  language?:string; // 主要语言
}

export type CodeType = object & {
  id: string;
  code: string;
  typeCode: string;
  value: string;
  parentCode?: string;
  addressDetails?: string;
};


// 需要统一获取的 字典列表
// 额外补充 code， 如下模式即可
const codeList = {
  POINTS_TYPE:[],// 积分类型
  INDUSTRY_TYPE:[],// 企业类型
  ALBUM_TYPE:[],// 相册类别
  VIP_LEVEL:[],// 会员等级
  COMMUNITY:[],// 社群
  EDUCATION_LEVEL:[],// 学历
  SKILLED_FIELD:[],// 擅长领域
  COMPANY_TYPE:[],// 企业类型
  COMPANY_PROPERTY:[],// 企业性质
  INDUSTRY_RANKING:[],// 行业排名
  STAFF_AMOUNT:[],// 公司规模
  PURCHASE_SIZE :[],//采购部门规模
  PROCUREMENT_CATEGORY_PROCESSES :[],//
  ANNUAL_VALUE :[], // 年产值
  SALES_AMOUNT :[], // 销售额
  FACTORY_AREA :[], // 工厂面积
  CONTRIBUTED_CAPITAL  :[],// 实缴资本
  REGISTERED_CAPITAL :[], // 注册资本
  CORPORATE_VIP_LEVEL:[],// 个人会员等级
};

/**
 * 全局相关的modal
 */
export default {
  namespace: "global",
  state: {
    hasReady: false, // 是否已经初始化完成
    userInfo: undefined, // 用户信息
    authSetting: {}, // 用户授权列表
    clientInfo: {}, // 设备信息
    verificationCodeInfo: undefined, // 验证码信息
    hasLoad: false, // 字典库是否已经加载过了
    code:'',
    ...codeList,
  },

  effects: {
    // 初始化
    *init(_, { all, put }) {
      // 1、小程序登录，后台登录
      // yield put.resolve({ type: "login" });

      yield all([
        // put.resolve({ type: "getCode" }),
        // 2、获取授权信息，和用户信息
        put.resolve({ type: "getUserInfo" }),
        // 3、获取字典信息
        put.resolve({ type: "getDictionary" }),
        // 4、获取设备信息
        put.resolve({ type: "getClientInfo" })
      ]);
      yield put({
        type:'updateState',
        payload:{hasReady:true}
      })
    },

    // 小程序登录
    *login({payload}, { call, put }) {
      // 先判断缓存中是否有token
      const token = Taro.getStorageSync("token");
      console.log("后台返回token", !token);
      if( !token ||  payload.type){
          // const code = yield call(Taro.login);
          const params = {
              // grant_type: "password", 
              // scope:"all", // 登录账号身份
              // type:"account",
              ...payload
          }
          // 获取token
          let res:any = {};
          if(params.code){
            res = yield call(login,params);
          }else{
            res = yield call(weappmnlogin,params);
            
          }
          if(!res.data){
            Taro.showToast({
              title: res.message,
            })
          }else{
            const authRes = JSON.parse(res.data)
            console.log("authRes2", authRes);
            if (authRes && authRes.access_token) {
              // 存储token和userId
              Taro.setStorage({ key: 'token', data: authRes.access_token });
       
              if(payload.type){
                Taro.navigateTo({ url: `/packageA/pages/${payload.type}/index?userId=${payload.userId}` });
              }else{
                Taro.reLaunch({ url: "/pages/Index/index" });
              }
            } else {
              Taro.showToast({
                title: authRes.error_description,
              })
              throw new Error('登录失败!');
            }
          }
      }
      },


      // 小程序模拟登录
      *mnlogin({payload}, { call, put }) {
        // 先判断缓存中是否有token
        Taro.clearStorage();
        // if( !token ){
            // const code = yield call(Taro.login);
            const params = {
                // grant_type: "password", 
                // scope:"all", // 登录账号身份
                // type:"account",
                ...payload
            }
            // 获取token
            let res:any = {};
            if(params.code){
              res = yield call(login,params);
            }else{
              res = yield call(weappmnlogin,params);
            }
            if(!res.data){
              Taro.showToast({
                title: res.message,
              })
            }else{
              const authRes = JSON.parse(res.data)
              console.log("authRes2", authRes);
              if (authRes && authRes.access_token) {
                // 存储token和userId
                Taro.setStorage({ key: 'token', data: authRes.access_token });
                Taro.reLaunch({ url: "/pages/Index/index" });
              } else {
                Taro.showToast({
                  title: authRes.error_description,
                })
                throw new Error('登录失败!');
              }
            }
        // }
        },

    // 获取字典信息
    *getDictionary(_, { call, put, select }) {
      const { hasLoad } = yield select((state) => state.global);
      if (hasLoad) return;

      let responseData: CodeType[];
      try {
        // 此接口不需要单独的报错处理
        const res = yield call(getBatchDictValues, {codes:Object.keys(codeList).join(',')});
        responseData = res.data;
        
      } catch (err) {
        return;
      }

      console.log('responseData:',responseData);
      // 遍历数据生成key-value形式
      // const result = {};
      // responseData.forEach(item => {
      //   const { id, code, typeCode, value, parentCode, addressDetails } = item;
      //   const obj = { id, code, typeCode, value, parentCode, addressDetails };
      //   if (item.typeCode in result) {
      //     result[item.typeCode].push(obj);
      //   } else {
      //     result[item.typeCode] = [obj];
      //   }
      // });
      // console.log('result:',result);

      yield put({
        type: 'updateState',
        payload: {
          ...responseData,
          hasLoad: true,
        },
      });
    },

    // 获取微信用户信息
    *getUserInfo(_, { call, put }) {
      const { authSetting } = yield call(Taro.getSetting);
      console.log("授权信息", authSetting);
      yield put({
        type: "updateState",
        payload: { authSetting }
      });

      // 判断用户是否已经授权了小程序
      if (authSetting["scope.userInfo"]) {
        // 如果已经授权，获取用户信息
        const { userInfo } = yield call(Taro.getUserInfo);
        console.log("用户信息", userInfo);
        yield put({
          type: "updateState",
          payload: { userInfo }
        });
        return true;
      }
      return false;
    },

    
    // 获取凭证信息
    *getCode(_, { call, put }) {
      const { code } = yield call(Taro.login);
      console.log('=======',code)
      yield put({
        type: "updateState",
        payload: {
          code,
        }
      });
    },

    // 检查登录态是否过期。
    *checkSession(_, { call, put }) {
      const data = yield call(Taro.checkSession);
      console.log(data);
      return data;
    },


    // 获取设备信息
    *getClientInfo(_, { call, put }) {
      const clientInfo = yield call(Taro.getSystemInfo);
      console.log("设备信息", clientInfo);
      yield put({
        type: "updateState",
        payload: {
          clientInfo
        }
      });
    },

    // 获取手机验证码
    *getVerificationCode({payload}, { call, put }) {
      const verificationCodeInfo = yield call(getCode,payload);
      yield put({
        type: "updateState",
        payload: {
          verificationCodeInfo
        }
      });
    },

    // 验证短信验证码
    *validateCode({payload,callback}, { call }) {
      const res = yield call(validateCode,payload);
      if (callback) {
        callback(res);
      }
    },

    // 验证短信验证码
    *fetchTenantInfo({payload,callback}, { call }) {
      debugger
    const res = yield call(fetchTenants,payload);
    if (callback) {
      callback(res);
    }
  },
  },

  reducers: {
    // 更新基础数据
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions:{
    // 初始化
    init({dispatch}){
      dispatch({  type:'init' })
    }
  }
};
