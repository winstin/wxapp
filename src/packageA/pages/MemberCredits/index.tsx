import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";

type PageStateProps = {
  mypointslist:any;
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
  const {mypointslist={}} = user;
  return {
    mypointslist,
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
    mypointslist:[],
    total:0
  }
  config: Config = {
    navigationBarTitleText: "会员积分",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle:"custom",
  };

  componentDidShow() {
    console.log(this.$router.params);
    this.fetchList()
  }

  fetchList = (page=1)=>{
    const {dispatch} = this.props;
    const { mypointslist } = this.state;
    if(dispatch){
      dispatch({
        type: "user/getMypointslist",
        payload: {
          current:page
        }
      }).then((e)=>{
        if(e.records.length<20){
          this.state.haveMore = false;
        }
        this.state.current = page + 1;
        this.setState({
          total:e.total,
          mypointslist:page===1?e.records:mypointslist.concat(e.records)
        })
      });;
    }
  }


  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onScrollToUpper() {
    console.log("onScrollToUpper");
    // this.fetchList(1)
  }

  // or 使用箭头函数
  onScrollToLower = () => {
    console.log("滚动到底部")
    if(!this.state.haveMore) return
    this.fetchList(this.state.current)
  }

  back=()=>{
    Taro.navigateBack()
  }

  render() {
    const scrollStyle = {
      height: '100vh',
      backgroundColor:"#fff",
    }
    const scrollTop = 0
    const Threshold = 20
    return (
      <View className={styles.member}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back}></View>
        <View className={styles.userInfo} >
          <View className={styles.tips}>总积分</View>
          <View className={styles.number}>{this.state.total}</View>
        </View>
        <View className={styles.toptip} >
          积分明细
        </View>
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
          { this.state.mypointslist.map((item:any,idx) => ( 
          <View className={styles.listItem}>
            <View className={styles.item}>
              {item.createdDate}
            </View>
            <View className={styles.item}>
              {item.type}
            </View>
            <View className={styles.warn}>
              +{item.points}
            </View>
          </View>))}
        </ScrollView>
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
