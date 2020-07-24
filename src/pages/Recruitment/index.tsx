import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import RecruitmentItem from '../Index/components/RecruitmentItem/index';
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
    industry:false,
    haveMore:true,
    recruitmentData:[]
  }
  config: Config = {
    navigationBarTitleText: "猎聘信息",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {
    this.fetchList();
  }

  fetchList = (page=1)=>{
    const {dispatch} = this.props;
    const { recruitmentData } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      const payload:any = {
        current:page,
      }
      dispatch({
        type: "myindex/getPortalNotice",
        payload 
      }).then((e)=>{
        if(e.length<20){
          this.state.haveMore = false;
        }
        this.state.current = page + 1;
        this.setState({
          recruitmentData:page===1?e:recruitmentData.concat(e)
        })
      });
    }
  }



  onScrollToUpper() {
    console.log("onScrollToUpper");
    this.fetchList(1)
  }

  // or 使用箭头函数
  onScrollToLower = () => {
    console.log("滚动到底部")
    if(!this.state.haveMore) return
    this.fetchList(this.state.current)
  }



  render() {
    const scrollStyle = {
      height: '100vh',
      backgroundColor:"#fff",
      // padding:"0pt 16pt",
    }
    const scrollTop = 0
    const Threshold = 20

    console.log("this.state.recruitmentData",this.state.recruitmentData)
    return (
      <View className={styles.need}>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          style={scrollStyle}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToLower={this.onScrollToLower}
          onScrollToUpper={this.onScrollToUpper.bind(this)}  // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        >
        {/* <View style='background-color:#fff;padding:0pt 16pt' > */}
          { this.state.recruitmentData.map((item,idx) => (<RecruitmentItem data={item} key={`FactoryItem${idx}`}/>))}
        {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
