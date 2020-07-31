
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


// 首页轮播图
export const getBatchDictValues = (params)=>{
  return Api.getBatchDictValues(params);
}


// 首页签到
export const baseMemberPoints = (params)=>{
  return Api.baseMemberPoints(params,'POST');
}

// 首页菜单
export const getsysMenu = (params)=>{
  return Api.getsysMenu(params);
}

// 待办事项数量
export const getTodoList = (params)=>{
  return Api.getTodoList(params);
}

// 首页工厂
export const getCorporate = (params)=>{
  return Api.getCorporate(params);
}
// 首页需求
export const getJxhReq = (params)=>{
  return Api.getJxhReq(params);
}

// 猎聘信息
export const getPortalNotice = (params)=>{
  return Api.getPortalNotice(params);
}

// 字典信息
export const getBatchDictValueByCode = (params)=>{
  return Api.getBatchDictValueByCode(params);
}

// 工厂展示
export const getCorporateList = (params)=>{
  return Api.getCorporateList(params);
}

// 最新需求
export const getjxhReqList = (params)=>{
  return Api.getjxhReqList(params);
}

// 我的需求
export const getMyjxhReqList = (params)=>{
  return Api.getMyjxhReqList(params);
}

export const getauditList = (params)=>{
  return Api.getauditList(params);
}
export const getauditedList = (params)=>{
  return Api.getauditedList(params);
}

export const getcheckSignin = (params)=>{
  return Api.getcheckSignin(params);
}

export const getcorporateDetail = (params)=>{
  return Api.getcorporateDetail(params);
}

export const getbaseVendorAlbum = (params)=>{
  return Api.getbaseVendorAlbum(params);
}

export const getsrmbaseVendorAlbum = (params)=>{
  return Api.getsrmbaseVendorAlbum(params);
}

export const addbaseVendorAlbum = (params)=>{
  return Api.addbaseVendorAlbum(params,'POST');
}


export const registerCorporate = (params)=>{
  return Api.registerCorporate(params,'POST');
}

export const registerBaseMember = (params)=>{
  return Api.registerBaseMember(params,'POST');
}

export const getjxhReqDetail = (params)=>{
  return Api.getjxhReqDetail(params);
}

export const passAudit = (params)=>{
  return Api.passAudit(params,'POST');
}

export const rejectpassAudit = (params)=>{
  return Api.rejectpassAudit(params,'POST');
}

export const getbaseMemberauditList = (params)=>{
  return Api.getbaseMemberauditList(params);
}

export const getcorporateauditList = (params)=>{
  return Api.getcorporateauditList(params);
}

export const addjxhReq = (params)=>{
  return Api.addjxhReq(params,'POST');
}


export const auditbasemember = (params)=>{
  return Api.auditbasemember(params,'POST');
}
export const rejectbasemember = (params)=>{
  return Api.rejectbasemember(params,'POST');
}
export const auditcorporate = (params)=>{
  return Api.auditcorporate(params,'POST');
}
export const rejectcorporate = (params)=>{
  return Api.rejectcorporate(params,'POST');
}

export const getMyInfo = (params)=>{
  return Api.getMyInfo(params);
}

export const getUserInfo = (params)=>{
  return Api.getUserInfo(params);
}

export const getMypointslist = (params)=>{
  return Api.getMypointslist(params);
}
export const addjxhReqMsg = (params)=>{
  return Api.addjxhReqMsg(params,'POST');
}
export const getportalNoticeDetail = (params)=>{
  return Api.getportalNoticeDetail(params);
}
export const getbaseVendorAlbumList = (params)=>{
  return Api.getbaseVendorAlbumList(params);
}


export const updatebaseVendorAlbum = (params)=>{
  return Api.updatebaseVendorAlbum(params,'POST');
}

export const updatebaseMember = (params)=>{
  return Api.updatebaseMember(params,'POST');
}

export const delbaseVendorAlbum = (params)=>{
  return Api.delbaseVendorAlbum(params,'DELETE');
}

export const getSysRegionAllList = (params)=>{
  return Api.getSysRegionAllList(params);
}

export const getMycard = (params)=>{
  return Api.getMycard(params);
}


export const getPhone = (params)=>{
  return Api.getPhone(params,'POST');
}


export const weappmnlogin = (params)=>{
  return Api.weappmnlogin(params,'POST');
}

export const levelUpbaseMember = (params)=>{
  return Api.levelUpbaseMember(params,'POST');
}

export const getBaseMemberInfo = (params)=>{
  return Api.getBaseMemberInfo(params);
}


export const getQrCode = (params)=>{
  console.log('-----getQrCode---'+params)
  return Api.getQrCode(params);
}

