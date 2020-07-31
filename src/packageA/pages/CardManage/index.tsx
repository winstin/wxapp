import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import logo from '../../../assets/logo.png';
import styles from "./index.modules.less";
import img_my_bg_corp from '../../../assets/user/img_my_bg_corp.png';

type PageStateProps = {
  cardInfo:any;
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

@connect(({ user,loading }) => {
  const {cardInfo={}} = user;
  return {
    cardInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  state = {
    current: 0,
    show:false,
    sort:false,
    industry:false
  }
  config: Config = {
    navigationBarTitleText: "会员信息",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {
    // this.fetchCardInfo();
  }

   // 最新需求
   fetchCardInfo = ()=>{
    const {dispatch} = this.props;
    if(dispatch){
      dispatch({
        type: "user/getMycard",
        payload: {
          // isAsc:false,
          // current:page,
          // industryType:industryObject.value
        }
      })
    }
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
    const{ cardInfo } = this.props;
    // const logo = cardInfo.logo || "";
    return (
      <View>
          <View className={styles.userInfo} >
              <Image className={styles.bg_img} src={img_my_bg_corp} />
              <View className={styles.rightico} >
                <Image
                  className={styles.logo}
                  src={logo}
                />
              </View>

              <View className={styles.bankname} >
                  {cardInfo.name}
              </View>

              <View className={styles.banktip} >
                  联系电话: {cardInfo.linkManPhone}
              </View>

              <View className={styles.bankacount} >
                {cardInfo.code}
              </View>

              
          </View>
          <View className={styles.card}>
            <Image
                className={styles.barCode}
                src={`http://sz-spd.cn:889/${cardInfo.barCode}`}
              />
          </View> 
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
