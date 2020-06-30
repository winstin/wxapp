import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtButton } from "taro-ui"
import { connect } from "@tarojs/redux";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/button.scss";
import styles from "./index.modules.less";

type PageStateProps = {
  makerInfo:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface UserInfo {
  props: IProps;
}

@connect(({ user }) => {
  const {makerInfo={}} = user;
  return {
    makerInfo,
  }
})
class UserInfo extends Component {
 
  config: Config = {
    navigationBarTitleText: "个人信息",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#ffffff",
  };

  componentDidMount() {
  }

  handleClick = () => {
      Taro.navigateTo({
          url:'/pages/UserAuth/index'
      })
  }

  cancelLogin = ()=>{
    Taro.clearStorage();
    Taro.redirectTo({
      url: "/pages/Index/index"
    })
  }
 
  render() {
    const {makerInfo} = this.props;
    return (
      <View className={styles.userInformation}>
        <AtList hasBorder={false}>
        <AtListItem title='昵称' extraText={makerInfo.makerName} />
        <AtListItem title='手机号' extraText={makerInfo.makerMobile} />
        <AtListItem title='实名认证' extraText={makerInfo.verifyStatus === 0 ? '去认证':'已认证'} arrow='right' onClick={this.handleClick} />
        </AtList>
        <AtButton className={styles.logotBnt} onClick={this.cancelLogin}>退出登录</AtButton>
      </View>
    );
  }
}

export default UserInfo as ComponentClass<PageOwnProps, PageState>;
