import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import logo from '../../../assets/logo.png';
import styles from "./index.modules.less";
import img_my_bg_corp from '../../../assets/user/img_my_bg_corp.png';

type PageStateProps = {
  userInfo:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Home {
  props: IProps;
}

@connect(({ global,loading }) => {
  const {userInfo={}} = global;
  return {
    userInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  industryList = [
    {
      title:'找工厂',
      star:2
    },
    {
      title:'最新需求',
      star:3
    },
    {
      title:'会员审核',
      star:4
    },
    {
      title:'需求审核',
      star:5
    },
    {
      title:'邀请企业',
      star:5
    },
    {
      title:'邀请好友',
      star:5
    },
    {
      title:'签到',
      star:5
    },
    {
      icon: "",
      title:''
    },
  ]

  state = {
    current: 0,
    show:false,
    sort:false,
    industry:false
  }
  config: Config = {
    navigationBarTitleText: "银行卡信息",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {

  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onScrollToUpper() {}

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  onScroll(e){
    console.log(e.detail)
  }


  render() {
    return (
      <View className={styles.userInfo} >
          <Image className={styles.bg_img} src={img_my_bg_corp} />
          <View className={styles.rightico} >
            <Image
              className={styles.logo}
              src={logo}
            />
          </View>

          <View className={styles.bankname} >
              苏州瑞得恩自动化设备有限公司
          </View>

          <View className={styles.banktip} >
              联系人: 蔡德霖
          </View>

          <View className={styles.bankacount} >
              1074 2210 2177 51023
          </View>
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
