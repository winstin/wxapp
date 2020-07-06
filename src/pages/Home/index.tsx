import { ComponentClass } from "react";
import { AnyAction } from "redux";
import { AtModal, AtModalContent, AtModalAction, AtModalHeader } from "taro-ui";
import { connect } from "@tarojs/redux";
import Taro, { PureComponent } from "@tarojs/taro";
import "taro-ui/dist/style/components/modal.scss";
import { View, Button } from "@tarojs/components";
import styles from "./index.modules.less";


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

  // config: Config = {
  //   navigationBarTitleText: "主页面",
  //   navigationBarBackgroundColor: "#03C46B",
  // };
  

  componentDidShow(){
    const { userInfo } = this.props;
    // const token = Taro.getStorageSync('token');
    // console.log(userInfo)
    if (userInfo) {
      Taro.reLaunch({ url: "/pages/Login/index" });

      // if (token) {
      //   // 重定向到需要显示的页面
      //   Taro.reLaunch({ url: "/pages/Home/index" });
      // } else {
      //   Taro.reLaunch({ url: "/pages/Login/index" });
      // } 
    }
  }

  componentDidUpdate() {
    const { userInfo } = this.props;
    // const token = Taro.getStorageSync('token');

    if (userInfo) {
      Taro.reLaunch({ url: "/pages/Login/index" });

      // if (token) {
      //   // 重定向到需要显示的页面
      //   Taro.reLaunch({ url: "/pages/Home/index" });
      // } else {
      //   Taro.reLaunch({ url: "/pages/Login/index" });
      // } 
    }
  }

  getUserInfo = e => {
    const { dispatch } = this.props;
    if (e && dispatch && e.detail && e.detail.rawData) {
      const userInfo = JSON.parse(e.detail.rawData);
      dispatch({
        type: "global/getUserInfo",
        payload: { userInfo }
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
  };

  render() {
    console.log("===page===: /pages/Index/index");
    const { userInfo, loading, hasReady } = this.props;

    const { getUserInfoLoading } = this.state;

    // console.log("hasReady",hasReady)
    // console.log("loading",loading)
    // console.log("loading",userInfo)

    // 1、如果再程序加载中，则不做处理
    if (!hasReady || loading) {
      return null;
    }

    // 2、用户信息没有获取到，则弹出确认框
    if (!userInfo) {
      return (
        <View className={styles.index}>
          <AtModal
            isOpened={!userInfo}
            className={styles.modal}
            closeOnClickOverlay={false}
          >
            <AtModalHeader>请授权您的微信账号登录</AtModalHeader>
            <AtModalContent>
              <View className={styles.content} style={{marginBottom:10}}>机械荟应用</View>
              <View className={styles.content}>用户可通过本应用申请企业会员，个人会员，发布需求等</View>
            </AtModalContent>
            <AtModalAction>
              <Button
                className={styles.authBtn}
                openType="getUserInfo"
                onGetUserInfo={this.getUserInfo}
                onClick={this.onClick}
                loading={getUserInfoLoading}
              >
                授权登录
              </Button>
            </AtModalAction>
          </AtModal>
        </View>
      );
    }

    

    return null;

  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
