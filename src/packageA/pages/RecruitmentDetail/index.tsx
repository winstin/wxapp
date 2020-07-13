import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,RichText } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";

type PageStateProps = {
  portalNoticeDetail:any;
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
  const {portalNoticeDetail={}} = myindex;
  return {
    portalNoticeDetail,
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
    navigationBarTitleText: "猎聘详情",
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

      dispatch({
        type: "myindex/getportalNoticeDetail",
        payload:  this.$router.params,

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
    const {title,createdDate,content} = this.props.portalNoticeDetail;
    return (
      <View className={styles.needdetail}>
        <View className={styles.title}>
          {title}
        </View>
        <View className={styles.content} >
          <View className={styles.tips2} >
              <View className={styles.label} >
              发布日期：{createdDate}
              </View>
          </View>
        </View>
        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.conenttext} >
              <RichText nodes={content} />
            </View>
          </View>
        </View>
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
