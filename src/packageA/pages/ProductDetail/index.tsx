import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_person.png';

type PageStateProps = {
  srmalbums:any;
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
  const {srmalbums={}} = factory;
  return {
    srmalbums,
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
    navigationBarTitleText: "会员积分",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle:"custom",
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
        type: "factory/getsrmbaseVendorAlbum",
        payload:  this.$router.params
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

    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    const titletop = `margin-top:${MenuButtonBounding.top}px;`

    const {name,desc,intro,category,photoCover} = this.props.srmalbums;

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={`http://sz-spd.cn:889/${photoCover}`} />

        <View className={styles.userInfo} onClick={()=>{
            Taro.navigateTo({
              url: '/pages/AlbumProduct/index'
            })
          }}>
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>
        
        <View className={styles.title}>
          {name}
        </View>

        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              商品参数
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            品类
            </View>
            <View className={styles.conenttext} >
            {category}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            简介
            </View>
            <View className={styles.conenttext} >
            {intro}
            </View>
          </View>
        </View>
        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              商品详情
            </View>
          </View>
          <View className={styles.tips2} >
           
            <View className={styles.conenttext} >
            {desc}
            </View>
          </View>
         
          
        </View>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
