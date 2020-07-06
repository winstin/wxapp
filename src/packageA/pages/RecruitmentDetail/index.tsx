import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";

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
    navigationBarTitleText: "猎聘详情",
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
          上海嘉协精密机械有限公司招聘
        </View>
        <View className={styles.content} >
          <View className={styles.tips2} >
              <View className={styles.label} >
              发布日期：2020/04/15
              </View>
          </View>
        </View>
        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.conenttext} >
              上海嘉协精密机械有限公司和上海乐荣机械模具有限公司成立于2001年，位于闵行区，是一家专业从事航天和外资企业的零部件及模具精密加工的制造型企业。公司现有厂区面积近3100平方米，有110多位员工，各类生产设备78台（详见附表），年销售额3000多万。 公司主要从事有色金属、黑色金属及镁合金、铝合金等材质的加工，尤其擅长做非标零件。
            </View>
          </View>
        </View>


      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
