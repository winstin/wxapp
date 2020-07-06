import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import Index2 from '../../assets/Index2.jpeg';

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
    navigationBarTitleText: "企业介绍",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
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

  back=()=>{
    Taro.navigateBack()
  }

  render() {
    return (
      <View className={styles.needdetail}>
        <View className={styles.title}>
          上海嘉协精密机械有限公司
        </View>
        <View className={styles.list}>
        <View>
          <Image src={Index2} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.title} >
            寻超声波电焊机厂商
          </View>
          <View className={styles.tips} >
          数量  20台
          </View>
          <View className={styles.tips} >
          要求  口罩耳带焊接用
          </View>
        </View>
      </View>
    
        


        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              公司介绍
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
              公司档案
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
              协会评价
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
       
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
