import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { AtButton,AtInput, AtActionSheetItem } from 'taro-ui';
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import classNames from 'classnames';
import logo from '../../assets/logo.png';
import phoneIcon from '../../assets/mobile@2x.png';
import codeIcon from '../../assets/authcode@2x.png';
import styles from "./index.modules.less";

type PageStateProps = {
  tenants:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading?: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Login {
  props: IProps;
}

@connect(({ login }) => {
  const { tenants=[] } =  login;
  return {
    tenants,
  }
})
class Login extends Component {
  state = {
    phone: '100321',
    code: 'spd2019',
    isOpened: false,
    tenantInfo:{
      tenantId:'',
      tenantName:''
    }
  }
  config: Config = {
    navigationBarBackgroundColor: "#fff",
    navigationBarTextStyle: 'black',

  };

  componentDidMount() {
  }
 
  // 登录
  login = () => {
    const {dispatch} = this.props;
    const {phone,code,tenantInfo} = this.state;
    if(dispatch){
      dispatch({
        type: "global/login",
        payload: {
          username:phone,
          password:code,
          captcha:""
        }
      });
    }
    // Taro.reLaunch({ url: "/pages/Home/index" });
  }

  // 手机号输入框
  phoneChange = (value) => {
      this.setState({
        phone: value
      })
  }

  // 验证码输入框
  codeChange = (value) => {
    this.setState({
      code: value
    })
  }

  //
  tentantChange = () => {
    const { isOpened } = this.state;
    this.setState({
      isOpened:!isOpened
    })
  }

  render() {
    const {phone,code,isOpened,tenantInfo} = this.state;
    const { tenants } = this.props;
    // console.log(tenants)

    const JSX = tenants.map((item)=>(<AtActionSheetItem 
      onClick={()=>{
        this.setState({
          tenantInfo:{
            tenantId:item.tenantId,
            tenantName:item.tenantName
          }
        })
      }}>
      {item.tenantName}
    </AtActionSheetItem>))
    return (
      <View className={styles.login}>
        <Image
          className={styles.logo}
          src={logo}
        />
        <View className={styles.title}>请登录</View>

        <View className={styles.formItem}>
          <Image
            className={styles.itemIcon}
            src={phoneIcon}
          />
          <AtInput className={styles.input} name="phone" placeholder="手机号码"  value={phone} onChange={this.phoneChange} />
        </View>
        <View className={classNames(styles.formItem,styles.codeItem)}>
        <View className={styles.left}>
        <Image
          className={styles.itemIcon}
          src={codeIcon}
        />
        <AtInput className={styles.input} name="password" type='password' placeholder="密码"  value={code} onChange={this.codeChange} />
        </View>
        {/* <AtButton type='primary' className={styles.codeBtn} onClick={this.sendCode}>发送验证码</AtButton> */}
        </View>

        {/* <View className={styles.formItem} onClick={this.tentantChange}>
          <Image
            className={styles.itemIcon}
            src={codeIcon}
          />
          <AtInput className={styles.input} name="phone" placeholder="租户身份"  value={tenantInfo.tenantName} disabled onChange={()=>{}} />
          <AtActionSheet isOpened={isOpened}>
            {JSX}
          </AtActionSheet>
        </View> */}
        <AtButton type='primary' className={styles.loginBtn} onClick={this.login}>登录</AtButton>

        {/* 底部公司信息 */}
        <View className={styles.bottom}>
        {/* <Image
          className={styles.enterpriseLogo}
          src={enterpriseLogo}
        /> */}
        <View className={styles.enterpriseName}>苏州钛耘数据科技有限公司</View>
        </View>
      </View>
    );
  }
}

export default Login as ComponentClass<PageOwnProps, PageState>;
