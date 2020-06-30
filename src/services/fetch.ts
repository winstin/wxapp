
import Api  from '@/utils/request';



export const getCode = (params)=>{
  return Api.getCodeUrl(params,'POST');
}

export const validateCode = (params)=>{
  return Api.validateCode(params,'POST');
}

export const queryDictionary = (params)=>{
  return Api.queryDictionary({codeTypeList:params});
}


// 登录
export const login = (params)=>{
  return Api.weapplogin(params,'POST');
}

// 获取租户信息
export const fetchTenants = ()=>{
  return Api.fetchTenants();
}

// 获取租户信息
export const fetchmakerDetails = (params)=>{
  return Api.fetchmakerDetails(params);
}

// 认证用户信息
export const makerIdentity = (params)=>{
  return Api.makerIdentity(params,'PUT');
}


export const makerBank = (params)=>{
  return Api.makerBank(params,'PUT');
}

export const dictionary = (params)=>{
  return Api.dictionary(params);
}

export const taskpage = (params)=>{
  return Api.taskpage(params);
}

export const taskdetail = (params)=>{
  return Api.taskdetail(params);
}

export const accepttask = (params)=>{
  return Api.accepttask(params);
}

export const getOssFile = (params)=>{
  return Api.getOssFile(params);
}


export const progresstask = (params)=>{
  return Api.progresstask(params);
}

export const completedtask = (params)=>{
  return Api.completedtask(params);
}

export const completetask = (params)=>{
  return Api.completetask(params);
}






