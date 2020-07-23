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
  code:any;
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
  const { userInfo, hasReady, code } = global;
  return {
    userInfo,
    hasReady,
    code,
    loading: loading.effects["global/getUserInfo"]
  };
})
class Index extends PureComponent {
  state = {
    getUserInfoLoading: false,
    current: 0,
    telephoe:""
  };

  config: Config = {
    navigationBarTitleText: "登录",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };
  

  componentWillMount(){
    // console.log(this.$router.params);
    // Taro.showToast({
    //   'title': this.$router.params.userId+","+this.$router.params.type,
    // });
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

  getPhoneNumber = async e => {
    // console.log("获取手机号",e);
    const { dispatch,code } = this.props;
    if(e.detail.encryptedData){
      if(dispatch){
        dispatch({
          type: "user/getPhone",
          payload: {
            ...e.detail,
            code,
          }
        }).then((res)=>{
          console.log(res);
          if(res.data){
            this.setState({
              // getUserInfoLoading: false,
              telephoe:res.data.phoneNumber
            },()=>{
              this.wxLogin();
            });
          }else{
           
            // if(res.status === 999){
            //   setTimeout(()=>{
            //     this.getPhoneNumber(e)
            //   },500)
            // }else{
              this.setState({
                getUserInfoLoading: false,
              });
              Taro.showToast({
                'title': '手机号获取失败，请重试。',
              });
            // }
          }
        });
      }
    }else{
      this.setState({
        getUserInfoLoading: false,
      });
      Taro.showToast({
        'title': '授权失败',
      });
    }
    
  };

  onClick = async () => {
    const { dispatch } = this.props;
    if(dispatch){
      await dispatch({
        type: "global/getCode",
        payload: {}
      })
      // console.log("获取code",this.props.code);
      this.setState({
        getUserInfoLoading: true
      });
    }
    
    // const {userInfo} = this.props;
    // if(userInfo){
    //   this.wxLogin();
    // }
  };

  wxLogin = async ()=>{
    const { dispatch } = this.props;
    await Taro.login({
      success:(res)=>{
        console.log(res)   
        if(dispatch){
          dispatch({
            type: "global/login",
            payload: {
              authType:"wx-app",
              code:res.code,
              username:'',
              password:res.code,
              phone:this.state.telephoe,
              userId:this.$router.params.userId,
              type:this.$router.params.type,
            }
          }).then(()=>{
            this.setState({
              getUserInfoLoading: false
            });
          });
        }
      },
      fail:(err)=>{
        this.setState({
          getUserInfoLoading: false
        });
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
                openType="getPhoneNumber"
                // onGetUserInfo={this.getUserInfo}
                onGetPhoneNumber={this.getPhoneNumber}
                onClick={this.onClick}
                loading={getUserInfoLoading}
              >
                一键手机授权登录
              </Button>
            </View>
          </View>
 
        </View>
      );
    // }
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
