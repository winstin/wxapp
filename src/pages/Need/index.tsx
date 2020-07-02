import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView,Image } from "@tarojs/components";
import { AtTabs, AtTabsPane  } from 'taro-ui'
import { connect } from "@tarojs/redux";
import NeedItem from '../Index/components/NeedItem/index';
import styles from "./index.modules.less";
import Index2 from '../../assets/Index2.jpeg';
import btn_new from '../../assets/need/btn_new@3x.png';
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
    navigationBarTitleText: "最新需求",
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
    const tabList = [{ title: '最新需求' }, { title: '我的需求' }];
    const scrollStyle = {
      height: '100vh',
      backgroundColor:"#fff",
      padding:"0pt 16pt",
    }
    const scrollTop = 0
    const Threshold = 20
    return (
      <View className={styles.need}>
        <Image src={btn_new} className={styles.addicon} onClick={()=>{
          Taro.navigateTo({
            url: '/pages/NeedPublish/index'
          })
        }}/>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <ScrollView
              className='scrollview'
              scrollY
              scrollWithAnimation
              scrollTop={scrollTop}
              style={scrollStyle}
              lowerThreshold={Threshold}
              upperThreshold={Threshold}
              onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
              onScroll={this.onScroll}
            >
            {/* <View style='background-color:#fff;padding:0pt 16pt' > */}
              { this.industryList.map((item,idx) => (<NeedItem src={Index2} key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>

          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <ScrollView
              className='scrollview'
              scrollY
              scrollWithAnimation
              scrollTop={scrollTop}
              style={scrollStyle}
              lowerThreshold={Threshold}
              upperThreshold={Threshold}
              onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
              onScroll={this.onScroll}
            >
            {/* <View style='background-color:#fff;padding:0pt 16pt' > */}
              { this.industryList.map((item,idx) => (<NeedItem src={Index2} key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>
          </AtTabsPane>
        </AtTabs>


        
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
