import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import Index2 from '../../assets/Index2.jpeg';

type PageStateProps = {
  corporateDetail:any;
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

@connect(({ factory,loading }) => {
  const {corporateDetail={}} = factory;
  return {
    corporateDetail,
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
    console.log(this.$router.params);
    this.fetchList()
  }

  fetchList = ()=>{
    const {dispatch} = this.props;
    if(dispatch){
      // Taro.showToast({
      //   icon:'loading',
      //   title: "加载中",
      //   duration:500
      // })
      dispatch({
        type: "factory/getcorporateDetail",
        payload: this.$router.params
      });
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

  back=()=>{
    Taro.navigateBack()
  }

  render() {

    const {name,productTech,countryName,provinceName,factoryArea,staffAmount,referrerOpinion,products,id} = this.props.corporateDetail;

    return (
      <View className={styles.needdetail}>
        <View className={styles.title}>
          {name}
        </View>
        <View className={styles.list}>
        <View>
          <Image src={Index2} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.tips} >
            主要工艺
          </View>
          <View className={styles.title} >
            {productTech}
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
            <View className={styles.conenttext} >
            {referrerOpinion}
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
            国家地区
            </View>
            <View className={styles.conenttext} >
            {countryName}，{provinceName}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            工厂面积
            </View>
            <View className={styles.conenttext} >
            {factoryArea}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            雇员数量
            </View>
            <View className={styles.conenttext} >
            {staffAmount}
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
           
            <View className={styles.conenttext} >
            {referrerOpinion}
            </View>
          </View>
          
        </View>
       
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
