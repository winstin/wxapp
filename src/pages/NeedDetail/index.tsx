import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Index2 from '../../assets/Index2.jpeg';
import styles from "./index.modules.less";
import location from '../../assets/factory/ico_location@3x.png';
import arrowIcon from '../../assets/user/ico_arrow@3x.png';
import "taro-ui/dist/style/components/icon.scss";

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
    navigationBarTitleText: "会员积分",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle:"custom",
  };

  componentDidShow() {
    console.log("Taro.getMenuButtonBoundingClientRect()",Taro.getMenuButtonBoundingClientRect())
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

  back=()=>{
    Taro.navigateBack()
  }

  render() {

    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    const titletop = `margin-top:${MenuButtonBounding.top}px;`

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <View className={styles.userInfo} onClick={()=>{
            Taro.navigateTo({
              url: '/pages/AlbumProduct/index'
            })
          }}>
          <View className={styles.tips} style={titletop}>产品展示</View>
        </View>
        
        <View className={styles.title}>
          燕窝窝马来西亚正品燕窝
        </View>

        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              商品参数
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            品类
            </View>
            <View className={styles.conenttext} >
            燕窝
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            简介
            </View>
            <View className={styles.conenttext} >
            适合孕妇、老人长期使用
            </View>
          </View>
        </View>
        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              商品详情
            </View>
          </View>
          
        </View>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
