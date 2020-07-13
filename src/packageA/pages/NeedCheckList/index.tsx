import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView,Image } from "@tarojs/components";
import { AtTabs, AtTabsPane  } from 'taro-ui'
import { connect } from "@tarojs/redux";
import NeedItem from './components/NeedItem/index';
import NoneData from '../../../pages/Index/components/NoneData';
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tabs.scss";

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

@connect(({ needcheck,loading }) => {
  const {userInfo={}} = needcheck;
  return {
    userInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  state = {
    activeCurrent:0,
    current: 1,
    myCurrent:1,
    show:false,
    sort:false,
    industry:false,
    haveMore:true,
    myhaveMore:true,
    jxhReqData:[],
    myjxhReqData:[],

  }
  config: Config = {
    navigationBarTitleText: "最新需求",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
  };

  componentDidShow() {
    this.fetchList(1)
  }

  handleClick (value) {
    if(value === 0){
      this.fetchList(1)
    }else{
      this.fetchMyList(1)
    }
    this.setState({
      activeCurrent: value
    })
  }

  // 最新需求
  fetchList = (page=1)=>{
    const {dispatch} = this.props;
    const { jxhReqData } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      dispatch({
        type: "needcheck/getauditList",
        payload: {
          isAsc:false,
          current:page,
          // industryType:industryObject.value
        }
      }).then((e)=>{
        if(e.length<20){
          this.state.haveMore = false;
        }
        this.state.current = page + 1;
        this.setState({
          jxhReqData:page===1?e:jxhReqData.concat(e)
        })
      });
    }
  }

  // 我的需求
  fetchMyList = (page=1)=>{
    const {dispatch} = this.props;
    const { myjxhReqData } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      dispatch({
        type: "needcheck/getauditedList",
        payload: {
          isAsc:false,
          current:page,
          // industryType:industryObject.value
        }
      }).then((e)=>{
        if(e.length<20){
          this.state.myhaveMore = false;
        }
        this.state.myCurrent = page + 1;
        this.setState({
          myjxhReqData:page===1?e:myjxhReqData.concat(e)
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

  myonScrollToUpper() {
    console.log("myonScrollToUpper");
    this.fetchMyList(1)
  }

  // or 使用箭头函数
  myonScrollToLower = () => {
    console.log("滚动到底部")
    if(!this.state.haveMore) return
    this.fetchMyList(this.state.current)
  }



  render() {
    const tabList = [{ title: '待审核' }, { title: '已审核' }];
    const scrollStyle = {
      height: '100vh',
      backgroundColor:"#fff",
    }
    const scrollTop = 0
    const Threshold = 20
    return (
      <View className={styles.need}>
        <AtTabs current={this.state.activeCurrent} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.activeCurrent} index={0} >
            {this.state.jxhReqData.length===0 && <NoneData/>}
            <ScrollView
              className='scrollview'
              scrollY
              scrollWithAnimation
              scrollTop={scrollTop}
              style={scrollStyle}
              lowerThreshold={Threshold}
              upperThreshold={Threshold}
              onScrollToLower={this.onScrollToLower}
              onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
              // onScroll={this.onScroll}
            >
            {/* <View style='background-color:#fff;padding:0pt 16pt' > */}
              { this.state.jxhReqData.map((item,idx) => (<NeedItem data={item} key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>

          </AtTabsPane>
          <AtTabsPane current={this.state.activeCurrent} index={1}>
            {this.state.myjxhReqData.length===0 && <NoneData/>}
            <ScrollView
              className='scrollview'
              scrollY
              scrollWithAnimation
              scrollTop={scrollTop}
              style={scrollStyle}
              lowerThreshold={Threshold}
              upperThreshold={Threshold}
              onScrollToLower={this.myonScrollToLower}
              onScrollToUpper={this.myonScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
              // onScroll={this.onScroll}
            >
            {/* <View style='background-color:#fff;padding:0pt 16pt' > */}
              { this.state.myjxhReqData.map((item,idx) => (<NeedItem data={item} key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>
          </AtTabsPane>
        </AtTabs>


        
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
