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


  weapplogin: '/api/agileworker-auth/oauth/token', // 微信登录接口
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
}