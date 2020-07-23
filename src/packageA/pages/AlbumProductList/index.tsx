import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView,Image } from "@tarojs/components";
import { AtButton  } from 'taro-ui'
import { connect } from "@tarojs/redux";
import NeedItem from './components/NeedItem/index';
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tabs.scss";
import btn_new from '../../../assets/need/btn_new@3x.png';

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

@connect(({ myindex,loading }) => {
  const {userInfo={}} = myindex;
  
  return {
    userInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  state = {
    current: 0,
    show:false,
    sort:false,
    industry:false,
    haveMore:true,
    jxhReqData:[]
  }
  config: Config = {
    navigationBarTitleText: "产品列表",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {
    this.fetchList(1)
  }

  handleClick (value) {
    this.fetchList(1)
    this.setState({
      activeCurrent: value
    })
  }

  // 最新需求
  fetchList = (page=1)=>{
    const {dispatch,userInfo} = this.props;
    const { jxhReqData } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      let supplierId = userInfo.supplierId
      if(this.$router.params.id){
        supplierId = this.$router.params.id
      }
      dispatch({
        type: "factory/getbaseVendorAlbumList",
        payload: {
          "vendorId":supplierId,
          // "vendorId":'1140906925177778177',
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
      // height: '100vh',
      backgroundColor:"#fff",
      // padding:"0pt 12px",
      flex:1,
      width:'auto',
      borderBottom:'1px solid rgba(26,47,66,0.10)'
    }
    const scrollTop = 0
    const Threshold = 20
    const {dispatch} = this.props;
    let isAdd = true
    if(this.$router.params.id){
      isAdd = false
    }
    return (
      <View className={styles.need}>
        
        {isAdd && 
          <View className={styles.loginBtn} onClick={()=>{
            Taro.navigateTo({
              url: '/packageA/pages/MyAlbumProduct/index?add=true'
            })
          }}>
            <Image src={btn_new} className={styles.addicon} onClick={()=>{
              Taro.navigateTo({
                url: '/packageA/pages/MyAlbumProduct/index?add=true'
              })
            }}/> 
          新增产品</View>
        }
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
          { this.state.jxhReqData.map((item,idx) => (<NeedItem src={item} key={`FactoryItem${idx}`} isAdd={isAdd} onRemove={(e)=>{
            console.log(e);
            if(dispatch){
              dispatch({
                type: "factory/delbaseVendorAlbum",
                payload: {
                  id:e.id,
                }
              }).then(()=>{
                this.fetchList();
              })
            }
          }}/>))}
        {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
