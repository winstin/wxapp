import Taro from "@tarojs/taro";

/**
 * 手机号正则
 */
export const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;

/**
 * 验证有效手机
 */
export function isPhoneAvailable(phone) {
  
  return phoneReg.test(phone);
}



export default {
    phoneReg,
    isPhoneAvailable,
};


export function isLogined() {
  const token = Taro.getStorageSync('token');
  if(!token){
    Taro.reLaunch({
      url: "/pages/Home/index"
    })
    return true
  }

  return false

}

