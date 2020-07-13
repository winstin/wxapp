import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import NeedItem from './components/NeedItem/index';
import Index2 from '../../assets/Index2.jpeg';
import styles from "./index.modules.less";
import location from '../../assets/factory/ico_location@3x.png';
import arrowIcon from '../../assets/user/ico_arrow@3x.png';
import "taro-ui/dist/style/components/icon.scss";

type PageStateProps = {
  corporateDetail:any;
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
  const {corporateDetail={}} = factory;
  return {
    corporateDetail,
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
        type: "factory/getcorporateDetail",
        payload: this.$router.params
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
    const {name,countryName,provinceName,referrerOpinion,products,id,photoCover} = this.props.corporateDetail;
    return (
      <View className={styles.factorydetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={`http://sz-spd.cn:889/${photoCover.trim()}`} />
        <View className={styles.userInfo}  onClick={()=>{
            Taro.navigateTo({
              url: `/pages/AlbumEnterprise/index?vendorId=${id}`
            })
          }}>

          <View className={styles.tips} style={titletop} >企业展示</View>
        </View>
        <View className={styles.content} >
          <View className={styles.padding} >

            <View className={styles.title}>
              {name}
            </View>
            <View className={styles.locationtips}>
              <View className={styles.locationItem}>
                <Image src={location} className={styles.icon} />
                <View>  {countryName}，{provinceName}  成立于 2009 年 10 月</View>
              </View>

              <View className={styles.locationItem} onClick={()=>{
                // Taro.navigateTo({
                //   url: '/pages/FactoryIntroduce/index'
                // })
                Taro.navigateTo({
                  url: `/pages/FactoryIntroduce/index?id=${id}`
                })
              }}>
                <View>详情</View>
                <Image
                  className={styles.arrow}
                  src={arrowIcon}
                />
              </View>
            </View>


            <View className={styles.introduce}>
              {referrerOpinion} 
            </View>

            <View className={styles.texttitle}>
              主要产品
            </View>

            <View style='background-color:#fff' >
            { products.map((item,idx) => (<NeedItem data={item} key={`FactoryItem${idx}`}/>))}
            </View>
          </View> 
        </View>
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
