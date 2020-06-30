import Taro from "@tarojs/taro";
import { fetchTenants, login } from '@/services/fetch';

/**
 * 登录页面
 */
export default {
  namespace: "login",
  state: {
    tenants:[]
  },

  effects: {
    // 小程序登录
    *login({payload}, { call, put }) {
    // 先判断缓存中是否有token
    const token = Taro.getStorageSync("token");
    // console.log("后台返回token", !token);
    
    if( !token ){
        // const code = yield call(Taro.login);
        const params = {
            grant_type: "password", 
            scope:"all", // 登录账号身份
            type:"account",
            ...payload
        }
        // 获取token
        const authRes = yield call(login,params);
        console.log(authRes)
        if (authRes && authRes.tenant_id) {
          // 存储token和userId
          Taro.setStorage({ key: 'token', data: authRes.access_token });
          Taro.setStorage({ key: 'tenant_id', data: authRes.tenant_id });
        //   Taro.setStorage({ key: 'openid', data: authRes.data.openid });
        //   Taro.setStorage({ key: 'vbNo', data: authRes.data.vbNo })
          Taro.reLaunch({ url: "/pages/Home/index" });
        } else {
          Taro.showToast({
            title: authRes.error_description,
          })
          throw new Error('登录失败!');
        }
    }
    },
  
    // 验证短信验证码
    *fetchTenantInfo({payload}, { put,call }) {
      const res = yield call(fetchTenants,payload);
      console.log(res)
      yield put({
        type:'updateState',
        payload:{tenants:res.data}
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
