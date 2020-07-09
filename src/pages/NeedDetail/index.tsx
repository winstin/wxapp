import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";
import ico_comment from '../../assets/need/ico_comment@3x.png';
import ico_share from '../../assets/need/ico_share@3x.png';
type PageStateProps = {
  jxhReqDetail:any;
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
  const {jxhReqDetail={}} = needcheck;
  return {
    jxhReqDetail,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  state = {
    current: 0,
    show:false,
    sort:false,
    industry:false
  }
  config: Config = {
    navigationBarTitleText: "需求详情",
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
        type: "needcheck/getjxhReqDetail",
        // payload:  this.$router.params,
        payload:{
          id:'1278941345442643969'
        }
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

    const {name,desc,intro,category,reqName,createdDate,companyName,qty,reqDesc,drawings,id,jxhReqMsgs} = this.props.jxhReqDetail;

    return (
      <View className={styles.needdetail}>
         <View className={styles.toplabel}>
          <View className={styles.leftlabel}>
            发布人
          </View>
          <View className={styles.text}>
            {reqName}
          </View>
        </View>
        <View className={styles.toplabel}>
          <View className={styles.leftlabel}>
            发布日期
          </View>
          <View className={styles.text}>
            {createdDate}
          </View>
        </View>
        <View className={styles.list}>
          <View>
            <Image src={`http://sz-spd.cn:889/${drawings[0].url}`} className={styles.listimg} />
          </View>
          <View style='flex:1'>
            <View className={styles.title} >
            {companyName}
            </View>
            <View className={styles.tips} >
            数量  {qty}台
            </View>
            <View className={styles.tips} >
            要求  {reqDesc}
            </View>
            <View className={styles.tips} >
              {createdDate}
            </View>
            <View className={styles.tips3} >
              <View/>
              <View className={styles.share} >
                <View className={styles.item}>
                  <Image src={ico_share} className={styles.bottom_btn} />
                  <View>分享</View>
                </View>
                <View className={styles.item}> 
                  <Image src={ico_comment} className={styles.bottom_btn} />
                  <View>评论 {jxhReqMsgs.length}</View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className={styles.comment}>
          {
            jxhReqMsgs.map((item)=>(
              <View className={styles.commentbg}>
                <View className={styles.commentatorTitle}>{item.commentatorTitle}</View>
                <View className={styles.msg}>{item.msg}</View>
              </View>
            ))
          }
        </View>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
