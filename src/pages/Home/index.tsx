import { ComponentClass } from "react";
import { AnyAction } from "redux";
import { connect } from "@tarojs/redux";
import Taro, { PureComponent, Config } from "@tarojs/taro";
import "taro-ui/dist/style/components/modal.scss";
import { View, Button, Image } from "@tarojs/components";
import styles from "./index.modules.less";
import logo from '../../assets/logo.png';


type PageStateProps = {
  userInfo: any;
  loading: boolean;
  hasReady: boolean;
};

type PageDispatchProps = {
  dispatch?<K = any>(action: AnyAction): K;
  getUserInfo: () => void;
};

type PageOwnProps = {};

type PageState = {
  getUserInfoLoading: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(({ global, loading }) => {
  const { userInfo, hasReady } = global;
  return {
    userInfo,
    hasReady,
    loading: loading.effects["global/getUserInfo"]
  };
})
class Index extends PureComponent {
  state = {
    getUserInfoLoading: false,current: 0
  };

  config: Config = {
    navigationBarTitleText: "登录",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };
  

  componentDidShow(){
    // const { userInfo } = this.props;
    // // const token = Taro.getStorageSync('token');
    // // console.log(userInfo)
    // console.log("userInfo1",userInfo)

    // if (userInfo) {
    //   Taro.reLaunch({ url: "/pages/Login/index" });

    //   // if (token) {
    //   //   // 重定向到需要显示的页面
    //   //   Taro.reLaunch({ url: "/pages/Home/index" });
    //   // } else {
    //   //   Taro.reLaunch({ url: "/pages/Login/index" });
    //   // } 
    // }
  }

  componentDidUpdate() {
    // const { userInfo } = this.props;
    // // const token = Taro.getStorageSync('token');
    // console.log("userInfo2",userInfo)
    // if (userInfo) {
    //   Taro.reLaunch({ url: "/pages/Login/index" });

    //   // if (token) {
    //   //   // 重定向到需要显示的页面
    //   //   Taro.reLaunch({ url: "/pages/Home/index" });
    //   // } else {
    //   //   Taro.reLaunch({ url: "/pages/Login/index" });
    //   // } 
    // }
  }

  getUserInfo = e => {
    const { dispatch } = this.props;
    if (e && dispatch && e.detail && e.detail.rawData) {
      const userInfo = JSON.parse(e.detail.rawData);
      dispatch({
        type: "global/getUserInfo",
        payload: { userInfo }
      }).then(()=>{
        this.wxLogin();
      });
    }
    this.setState({
      getUserInfoLoading: false
    });
  };

  onClick = () => {
    this.setState({
      getUserInfoLoading: true
    });
    // const {userInfo} = this.props;
    // if(userInfo){
    //   this.wxLogin();
    // }
  };

  wxLogin = ()=>{
    const { dispatch } = this.props;
    Taro.login({
      success:(res)=>{
        console.log(res)
        if(dispatch){
          dispatch({
            type: "global/login",
            payload: {
              authType:"wx-app",
              code:res.code,
              username:'',
              password:res.code
            }
          });
        }
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  }

  render() {
    console.log("===page===: /pages/Index/index");
    const { userInfo, loading, hasReady } = this.props;
    const { getUserInfoLoading } = this.state;

    // 1、如果再程序加载中，则不做处理
    if (!hasReady || loading) {
      return null;
    }

    // 2、用户信息没有获取到，则弹出确认框
    // if (!userInfo) {
      return (

        <View className={styles.login}>
          <Image
            className={styles.logo}
            src={logo}
          />
          <View className={styles.title}>机械荟</View>
          <View className={styles.content}>
            <View className={styles.normal}>请授权您的微信账号登录</View>
            <View>
              {/* <View className={styles.content} style={{marginBottom:10}}>机械荟应用</View> */}
              <View className={styles.little}>● 获取用户信息(用户头像，昵称等)</View>
              <View className={styles.little}>● 用户可通过本应用申请企业会员，个人会员，发布需求等</View>
            </View>
            <View>
              <Button
                className={styles.authBtn}
                openType="getUserInfo"
                onGetUserInfo={this.getUserInfo}
                onClick={this.onClick}
                loading={getUserInfoLoading}
              >
                一键授权登录
              </Button>
            </View>
          </View>
 
        </View>
      );
    // }
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
