import global from './global';
import login from '../pages/Login/login';
import user from '../pages/User/user';
import myindex from '../pages/Index/myindex';
import factory from '../pages/Factory/factory';
import need from '../pages/Need/need';
import needcheck from '../packageA/pages/NeedCheckList/needcheck';
import membercheck from '../packageA/pages/MemberCheckList/membercheck';


export default [
  global, // 基础modal
  login,
  user,
  myindex,
  factory,
  need,
  needcheck,
  membercheck
]