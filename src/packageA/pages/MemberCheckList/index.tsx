import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView,Image } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtTag  } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import RecruitmentItem from './components/RecruitmentItem/index';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/tag.scss";

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
    const tabList = [{ title: '个人会员' }, { title: '企业会员' }];
    const scrollStyle = {
      height: '100vh',
      background: '#fff',
      margin:'8px 0px 0px 0px'
    }
    const scrollTop = 0
    const Threshold = 20
    return (
      <View className={styles.need}>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View className={styles.toptag}>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
                active
              >
                待审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
              >
                已审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
              >
                已拒绝
              </AtTag>
            </View>
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
              { this.industryList.map((item,idx) => (<RecruitmentItem  key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>

          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className={styles.toptag}>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
                active
              >
                待审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
              >
                已审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
              >
                已拒绝
              </AtTag>
            </View>
            
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
              { this.industryList.map((item,idx) => (<RecruitmentItem  key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>
          </AtTabsPane>
        </AtTabs>


        
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
