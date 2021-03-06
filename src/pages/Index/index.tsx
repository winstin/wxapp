import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Swiper, SwiperItem, Button } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtMessage } from 'taro-ui'
import { connect } from "@tarojs/redux";
import IndustryItem from './components/IndustryItem/index';
import NeedItem from './components/NeedItem/index';
import FactoryItem from './components/FactoryItem/index';
import RecruitmentItem from './components/RecruitmentItem/index';
import industry3 from '../../assets/home/ico_qd@3x.png';
import industry4 from '../../assets/home/ico_yqqy@3x.png';
import industry5 from '../../assets/home/ico_zxxq@3x.png';
import industry6 from '../../assets/home/ico_yqhy@3x.png';
import industry7 from '../../assets/home/ico_zgc@3x.png';
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/rate.scss";
import "taro-ui/dist/style/components/icon.scss";

type PageStateProps = {
  userInfo: any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
  imgUrls: any;
  sysMenu: any;
  corporateData: any;
  portalNotice: any;
  jxhReqData: any;
  dataCount: any;
  Signin: any
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Home {
  props: IProps;
}

@connect(({ myindex, loading }) => {
  const { XCX_HOME_IMG = [], sysMenu = [], corporateData = [], portalNotice = [], jxhReqData = [], dataCount, Signin, userInfo } = myindex;
  return {
    imgUrls: XCX_HOME_IMG,
    sysMenu,
    corporateData,
    portalNotice,
    jxhReqData,
    dataCount,
    Signin,
    userInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  industryList = [
    {
      icon: industry7,
      title: '企业展示',
      star: 2,
      switchUrl: '/pages/Factory/index',
    },
    {
      icon: industry5,
      title: '最新需求',
      star: 3,
      switchUrl: '/pages/Need/index',

    },
    {
      icon: industry4,
      title: '邀请企业',
      star: 5,
      // onClick:()=>{
      //   this.state.shareUrl = "MemberShipUpgrade"
      // }
    },
    {
      icon: industry6,
      title: '邀请好友',
      star: 5,
      // onClick:()=>{
      //   console.log('1111')
      //   this.state.shareUrl = "MemberShipPerson"
      // }
    },
    {
      icon: industry3,
      title: '签到',
      star: 5,
      onClick: () => {
        const { dispatch } = this.props;
        if (dispatch) {
          dispatch({
            type: "myindex/baseMemberPoints",
            payload: {
              // codes:'XCX_HOME_IMG' 
            }
          });
        }
      }
    },
  ]

  state = {
    current: 0,
    shareUrl: ''
  }
  config: Config = {
    navigationBarTitleText: "首页",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#F2F3FE",

  };

  componentDidShow() {
    const token = Taro.getStorageSync('token');
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: "myindex/getBatchDictValues",
        payload: {
          codes: 'XCX_HOME_IMG'
        }
      });
      this.fetchList(0);

      if (token) {
        dispatch({
          type: "myindex/getsysMenu",
          payload: {
            platformType: '2'
          }
        });
        dispatch({
          type: "myindex/getTodoList",
          payload: {
            // platformType:'2' 
          }
        });

        dispatch({
          type: "myindex/getUserInfo",
          payload: {
            // name:'100321' 
          }
        });

        dispatch({
          type: "myindex/getcheckSignin",
          payload: {
            // platformType:'2' 
          }
        });

      } else {
        dispatch({
          type: "myindex/updateState",
          payload: {
            dataCount: {},
            Signin: true,
            userInfo: {},
            sysMenu: {}
          }
        });
      }
    }
  }

  handleClick(value) {
    this.fetchList(value);
    this.setState({
      current: value
    })
  }

  fetchList = (type) => {

    let dispatchType = ""
    if (type === 0) {
      dispatchType = "myindex/getCorporate";
    }
    if (type === 1) {
      dispatchType = "myindex/getJxhReq";
    }
    if (type === 2) {
      dispatchType = "myindex/getPortalNotice";
    }

    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: dispatchType,
        payload: {
          // codes:'XCX_HOME_IMG' ,
          current: 1,
          pageSize: 5
        }
      });
    }
  }

  onScrollToUpper() { }

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  onScroll(e) {
    console.log(e.detail)
  }

  //转发
  onShareAppMessage(res) {
    const { userInfo } = this.props;
    console.log(userInfo)
    return {
      title: res.target.id === 'MemberShipUpgrade' ? "注册战略合作企业会员" : "注册专业采购供应链会员",
      path: `/pages/Home/index?userId=${userInfo.id}&type=${res.target.id}`
    }
  }



  render() {
    const tabList = [{ title: '企业展示' }, { title: '需求广场' }, { title: '猎聘信息' }]
    const { imgUrls = [], sysMenu, corporateData, portalNotice, jxhReqData, dataCount, Signin } = this.props;
    console.log("Signin", Signin)
    return (
      <View className={styles.home}>
        <AtMessage />
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          // vertical
          circular
          indicatorDots
          autoplay>
          {imgUrls.map((item) => {
            return (
              <SwiperItem>
                <Image src={`http://sz-spd.cn:889/${item.label}`} className={styles.SwiperItem} />
              </SwiperItem>
            )
          })}

        </Swiper>
        {/* 适合行业 */}
        <View className={styles.industryList}>
          {/* <Image src={industry} className={styles.moduleTitle} /> */}
          <View className={styles.industryView}>
            {
              this.industryList.map((item, idx) => {
                if (idx <= 4) {
                  return <View className={styles.industryItem}>
                    <IndustryItem key={`industryItem${idx}`} item={item} dataCount={dataCount} Signin={Signin} />
                    {/* <Button openType="share" className={styles.share}>分享</Button> */}
                  </View>
                }
              })
            }
          </View>
          {sysMenu.length > 0 && <View className={styles.industryView} style={{ marginTop: '20px' }}>
            {
              sysMenu.map((item, idx) => {
                return <View className={styles.industryItem}><IndustryItem key={`industryItem${idx}`} item={item} dataCount={dataCount} /></View>
              })
            }
          </View>}
        </View>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View style='background-color:#fff' >
              {corporateData && corporateData.map((item, idx) => (<FactoryItem data={item} key={`FactoryItem${idx}`} />))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='background-color:#fff' >
              {jxhReqData.map((item, idx) => (<NeedItem key={`NeedItem${idx}`} data={item} />))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='background-color:#fff' >
              {portalNotice.map((item, idx) => (<RecruitmentItem key={`NeedItem${idx}`} data={item} />))}
            </View>
          </AtTabsPane>
        </AtTabs>

      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
