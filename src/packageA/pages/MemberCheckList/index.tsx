import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView,Image } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtTag  } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import RecruitmentItem from './components/RecruitmentItem/index';
import CardItem from './components/CardItem/index';
import NoneData from '../../../pages/Index/components/NoneData';

import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/tag.scss";

type PageStateProps = {
  auditList:any;
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

@connect(({ membercheck,loading }) => {
  const {auditList={}} = membercheck;
  return {
    auditList,
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
    page:1,
    show:false,
    sort:false,
    industry:false,
    haveMore:true,
    auditList:[],
    funcType:'audit',
    corphaveMore:true,
    corpList:[],
    corpfuncType:'audit',
    corppage:1,
  }
  config: Config = {
    navigationBarTitleText: "会员审核",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {
    const pages = Taro.getCurrentPages()
    const currPage = pages[pages.length - 1]  // 当前页
    // console.log(currPage.$component)  // data中会含有testdata
    if(currPage.$component.state.reload){
      if(currPage.$component.state.type === "person"){
        this.fetchList();
      }else{
        this.fetchcorpList();
      }
    }else{
      this.fetchList();
    }
  }

  // 最新需求
  fetchList = (page=1)=>{
    const {dispatch} = this.props;
    const { auditList,funcType } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      dispatch({
        type: "membercheck/getbaseMemberauditList",
        payload: {
          // isAsc:false,
          current:page,
          funcType
        }
      }).then((e)=>{
        if(e.length<20){
          this.state.haveMore = false;
        }else{
          this.state.haveMore = true;
        }
        this.state.page = page + 1;
        this.setState({
          auditList:page===1?e:auditList.concat(e)
        })
      });
    }
  }

  // 最新需求
  fetchcorpList = (page=1)=>{
    const {dispatch} = this.props;
    const { corpList,corpfuncType } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      dispatch({
        type: "membercheck/getcorporateauditList",
        payload: {
          // isAsc:false,
          current:page,
          funcType:corpfuncType
        }
      }).then((e)=>{
        if(e.length<20){
          this.state.corphaveMore = false;
        }else{
          this.state.corphaveMore = true;
        }
        this.state.corppage = page + 1;
        this.setState({
          corpList:page===1?e:corpList.concat(e)
        })
      });
    }
  }

  handleClick (value) {
    console.log(value)
    if(value===0){
      this.fetchList()
    }else{
      this.fetchcorpList()
    }
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

  changeType = (type)=>{
    this.setState(type,()=>{
      this.fetchList()
    })
  }

  changecorpType = (type)=>{
    this.setState(type,()=>{
      this.fetchcorpList()
    })
  }


  render() {
    const {auditList,funcType,corpList,corpfuncType,current} = this.state;
    const tabList = [{ title: '个人会员' }, { title: '企业会员' }];
    let scrollStyle:any = {
      height: '100vh',
      margin:'8px 0px 0px 0px'
    }

    if(current === 0 && auditList.length>0){
      scrollStyle.background = '#fff'
    }
    if(current === 1 && corpList.length>0){
      scrollStyle.background = '#fff'
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
                active={funcType==="audit"}
                onClick={()=>{this.changeType({funcType:'audit'})}}
              >
                待审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
                active={funcType==="audited"}
                onClick={()=>{this.changeType({funcType:'audited'})}}

              >
                已审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
                active={funcType==="rejected"}
                onClick={()=>{this.changeType({funcType:'rejected'})}}

              >
                已拒绝
              </AtTag>
            </View>
            {auditList.length===0 && <NoneData/>}
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
              { auditList.map((item,idx) => (<RecruitmentItem data={item}  key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>

          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className={styles.toptag}>
            <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
                active={corpfuncType==="audit"}
                onClick={()=>{this.changecorpType({corpfuncType:'audit'})}}
              >
                待审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
                active={corpfuncType==="audited"}
                onClick={()=>{this.changecorpType({corpfuncType:'audited'})}}

              >
                已审核
              </AtTag>
              <AtTag 
                name='tag-1' 
                type='primary' 
                circle 
                active={corpfuncType==="rejected"}
                onClick={()=>{this.changecorpType({corpfuncType:'rejected'})}}

              >
                已拒绝
              </AtTag>
            </View>
            {corpList.length===0 && <NoneData/>}
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
              { corpList.map((item,idx) => (<CardItem data={item} key={`FactoryItem${idx}`}/>))}
            {/* </View> */}
            </ScrollView>
          </AtTabsPane>
        </AtTabs>


        
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
