import Taro, { Component, Config, TabBar } from "@tarojs/taro";
import "@tarojs/async-await";
import { Provider } from '@tarojs/redux';
// import "./utils/request";
import Index from "./pages/Index/index";
import Login from "./pages/Login/index";
import dva from './utils/dva';
import models from './models';
import './global';
import './app.less'
// import { globalData } from "./utils/common";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();

class App extends Component {
  // 抛出全局
  g_app=dvaApp.getStore()

  config: Config = {
    pages: [
      // "pages/Login/index",// 企业相册
      'pages/Index/index', // 主页
      'pages/Home/index', // 首页
      'pages/Login/index', // 登录
      'pages/User/index', // 个人中心
      "pages/Factory/index",
      "pages/Need/index",
      "pages/Recruitment/index",
      "pages/FactoryDetail/index",// 企业详情
      "pages/NeedDetail/index",// 商品详情
      "pages/AlbumEnterprise/index",// 企业相册
      "pages/AlbumProduct/index",// 产品相册
      "pages/NeedPublish/index",// 发布需求
      "pages/FactoryIntroduce/index",// 企业介绍
    ],
    subPackages:[
      { 
        "root":"packageA",
        "pages":[
          "pages/MemberCredits/index",// 会员积分
          "pages/MemberShipUpgrade/index",// 升级企业会员
          "pages/MemberShipPerson/index",// 升级个人会员
          "pages/MyAlbumProduct/index",// 企业规模
          "pages/MyAlbumEnterprise/index",// 企业相册
          "pages/RecruitmentDetail/index",// 企业相册
          "pages/AlbumProductList/index",// 企业相册
          "pages/MemberCheckList/index",// 会员审核
          "pages/MyBaseInfo/index",// 基本信息
          "pages/MybasePerson/index",// 个人基本信息
          "pages/MyCompaniestIntroduce/index",// 企业介绍
          "pages/MyContactInfo/index",// 联系信息
          "pages/MyEnterpriseScale/index",// 企业规模
          'pages/CardManage/index', // 银行卡管理
          'pages/NeedCheck/index', // 需求审核
          'pages/NeedCheckList/index', // 需求审核
          'pages/MemberCheckDetail/index', // 需求审核
          'pages/ProductDetail/index', // 需求审核
        ]
      }
    ],
    debug:false,
    window: {
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '机械荟',
      navigationBarTextStyle: 'white',
      backgroundColor: '#ffffff',

    },
    tabBar: {
      list: [
        {
          pagePath: "pages/Index/index",
          text: "首页",
          iconPath: "./assets/tabbar/tabbar_home_b@3x.png",
          selectedIconPath: "./assets/tabbar/tabbar_home_a@3x.png"
        }, 
        {
          pagePath: "pages/Factory/index",
          text: "企业",
          iconPath: "./assets/tabbar/tabbar_factory_b@3x.png",
          selectedIconPath: "./assets/tabbar/tabbar_factory_a@3x.png"
        },
        {
          pagePath: "pages/Need/index",
          text: "需求",
          iconPath: "./assets/tabbar/ico_need_b@3x.png",
          selectedIconPath: "./assets/tabbar/ico_need_a@3x.png"
        },
        {
          pagePath: "pages/Recruitment/index",
          text: "招聘",
          iconPath: "./assets/tabbar/ico_job_b@3x.png",
          selectedIconPath: "./assets/tabbar/ico_job_a@3x.png"
        },
        {
          pagePath: "pages/User/index",
          text: "我的",
          iconPath: "./assets/tabbar/ico_my_b@3x.png",
          selectedIconPath: "./assets/tabbar/ico_my_a@3x.png"
        },
      ],
      color: '#BAC0C6',
      selectedColor: '#386BF3',
      backgroundColor: '#fff',
      borderStyle: 'white'
    } as TabBar
  }

  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   * @memberof App
   */
  // async componentDidMount() {
  //   const {dispatch} = this.props;
  //   if(dispatch){
  //     const sys = await Taro.getSystemInfo();
  //     console.log(sys);
  //   }
  //   // // 获取参数
  //   // const referrerInfo = this.$router.params.referrerInfo;
  //   // const query = this.$router.params.query;
  //   // !globalData.extraData && (globalData.extraData = {});
  //   // if (referrerInfo && referrerInfo.extraData) {
  //   //   globalData.extraData = referrerInfo.extraData;
  //   // }
  //   // if (query) {
  //   //   globalData.extraData = {
  //   //     ...globalData.extraData,
  //   //     ...query
  //   //   };
  //   // }

  //   // // 获取设备信息
  //   // const sys = await Taro.getSystemInfo();
  //   // sys && (globalData.systemInfo = sys);
  // }
  // async componentDidMount(){
  //   // 系统初始化
  //   // 1、第一步微信登录
  //   await this.g_app.dispatch({type:'global/login'})
  //   // 2、获取设备信息
  //   await this.g_app.dispatch({type:'global/getClientInfo'})
  //   // 3、获取微信用户信息
  //   const hasRole = await this.g_app.dispatch({type:'global/getUserInfo'})
  //   // 判断是否允许了微信用户消息
  //   if(!hasRole){
  //     // 弹出框
  //     // Taro.showModal({
  //     //   title: '',
  //     //   content: '请授权您的微信账号登录高耘小程序',
  //     //   showCancel:false,
  //     //   confirmText:'授权登录'
  //     // }).then(async () => {
  //     //   // const tt = await Taro.authorize({scope:"scope.userInfo"});
  //     //   // console.log(tt);
  //     // })
  //   }
  // }

  componentDidShow() { }
  

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    console.log('===page===: app.tsx');

    const token = Taro.getStorageSync('token');

    return (
      <Provider store={store}>
        {
          token ? <Index /> : <Login />
        }
        {/* <Index /> */}
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))