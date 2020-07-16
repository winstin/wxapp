/** 
 * 请求的公共参数
 */
export const conmomPrams = {}

/**
 * 请求接口
 */
export const requestConfig = {
  loginUrl: '/api/uaa/wechat/open/applets-openid', // 微信登录接口
  getCodeUrl: '/api/uaa/security/sms/validate-code', // 获取验证码接口
  validateCode: '/api/uaa/security/sms/check-validate-code', // AUTH-308:验证短信验证码
  validateCodeUrl: '/api/uaa/security/sms/check-validate-code', // 验证短信验证码
  getBingStudents: '/api/campus/parent/bind-account', // 获取已绑定好的学生账号
  checkIdentity: '/api/uaa/security/account/check-identity', // AUTH-306：检查手机注册了几个身份
  queryDictionary: '/api/dict/type/data-codes', // 获取相关字典
  addStudent: '/api/campus/parent/relation-add', // 获取相关字典
  getStudentInfo: '/api/campus/students/binding-student-detail', // CAMPUS-109：查询所有已经绑定的学生信息
  handleUnbind: '/api/campus/parent/bind-lift', // CAMPUS-032：微信接口-解除绑定


  fetchTenants: '/api/agileworker-system/tenant/select-tenants', // 获取租户信息
  fetchmakerDetails: '/api/agileworker-biz/maker/details/:user_id', // 获取用户信息
  makerIdentity: '/api/agileworker-biz/maker/identity', // 认证用户信息
  makerBank: '/api/agileworker-biz/maker/bank', // 添加银行卡信息
  dictionary: '/api/agileworker-system/dict/dictionary', // 添加银行卡信息
  taskpage: '/api/agileworker-biz/task/freedom/page', // 任务大厅
  taskdetail: '/api/agileworker-biz/task/:taskId', // 任务详情
  accepttask: '/api/agileworker-biz/task/:taskId/accept', // 领取任务
  progresstask: '/api/agileworker-biz/task/mine/progress', // 未完成任务
  completedtask: '/api/agileworker-biz/task/mine/completed', // 已完成任务
  completetask: '/api/agileworker-biz/task/:taskId/complete', // 完成任务
  getOssFile: '/api/agileworker-resource/oss/get-file', // 获取文件


  weapplogin: '/api/gate/oauth/miniProgramLogin', // 微信登录接口
  getBatchDictValues: '/api/basic/sysDictValue/getBatchDictValues', // 微信登录接口
  baseMemberPoints:'/api/srm/baseMemberPoints/signIn', // 会员签到
  getsysMenu:'/api/basic/sysMenu/xcx-menu', // 获取有权限的小程序菜单
  getCorporate:'/api/srm/corporate/show-list', // 工厂展示--首页
  getJxhReq:'/api/srm/jxhReq/show-list', // 需求展示--首页
  getPortalNotice:'/api/srm/portalNotice/cooperated-list', // 猎聘信息--首页
  getBatchDictValueByCode:'/api/basic/sysDictValue/getBatchDictValueByCode', // # 企业行业列表

  getCorporateList:'/api/srm/corporate/corporate-list', // 工厂展示
  getjxhReqList:'/api/srm/jxhReq/req-list', // 最新需求
  getMyjxhReqList:'/api/srm/jxhReq/my-req-list', // 我的需求
  getTodoList:'/api/srm/to-do/list', // 待办事项数量
  getauditList:'/api/srm/jxhReq/audit-list', // 待办事项数量
  getauditedList:'/api/srm/jxhReq/audited-list', // 待办事项数量
  getcheckSignin:'/api/srm/baseMemberPoints/checkSignin', // 待办事项数量
  getcorporateDetail:'/api/srm/corporate/get', // 企业明细
  getbaseVendorAlbum:'/api/srm/baseVendorAlbum/allList', // 企业相册
  getsrmbaseVendorAlbum:'/api/srm/baseVendorAlbum/get', // 产品说明

  addbaseVendorAlbum:'/api/srm/baseVendorAlbum/add', // 企业相册添加
  updatebaseVendorAlbum:'/api/srm/baseVendorAlbum/update', // 企业相册更新
  registerCorporate:'/api/srm/corporate/register', // 企业注册
  registerBaseMember:'/api/srm/baseMember/register', // 个人注册
  passAudit:'/api/srm/jxhReq/audit-pass-update', // 通过需求
  rejectpassAudit:'/api/srm/jxhReq/audit-reject-update', // 作废需求
  addjxhReq:'/api/srm/jxhReq/add', // 发布需求

  

  getjxhReqDetail:'/api/srm/jxhReq/get', // 需求明细
  getbaseMemberauditList:'/api/srm/baseMember/audit-list', // 个人会员
  getcorporateauditList:'/api/srm/corporate/audit-list', // 企业会员

  auditbasemember:'/api/srm/baseMember/audit-basemember', // 个人会员审核通过
  rejectbasemember:'/api/srm/baseMember/reject-basemember', // 个人会员审核通过
  auditcorporate:'/api/srm/corporate/audit-corporate', // 企业会员审核通过
  rejectcorporate:'/api/srm/corporate/reject-corporate', // 企业会员审核通过

  getMyInfo:'/api/srm/baseMember/my-info', // 我的信息
  getUserInfo:'/api/gate/oauth/user', // 用户信息

  getMypointslist:'/api/srm/baseMemberPoints/my-points-list', // 积分列表
  addjxhReqMsg:'/api//srm/jxhReqMsg/add', // 添加评论
  getportalNoticeDetail:'/api/srm/portalNotice/cooperated-get', // 招聘详情
  getbaseVendorAlbumList:'/api/srm/baseVendorAlbum/list', // 产品相册

  updatebaseMember:'/api/srm/baseMember/update', // 跟新我的信息
  delbaseVendorAlbum:'/api/srm/baseVendorAlbum/del', // 删除产品信息

  getSysRegionAllList:'/api/basic/sysRegion/allList', // # 获取国家列表 省份 城市
  getMycard:'/api/srm/baseMember/my-card', // # 获取国家列表 省份 城市
  getPhone:'/api/srm/wxapp/getPhone', // # 获取国家列表 省份 城市

  
  
}