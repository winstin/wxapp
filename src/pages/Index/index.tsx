import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Swiper, SwiperItem} from "@tarojs/components";
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from "@tarojs/redux";
import IndustryItem from './components/IndustryItem/index';
import NeedItem from './components/NeedItem/index';
import FactoryItem from './components/FactoryItem/index';
import RecruitmentItem from './components/RecruitmentItem/index';
import industry1 from '../../assets/home/ico_jzbf.png';
import industry2 from '../../assets/home/ico_hysh@3x.png';
import industry3 from '../../assets/home/ico_qd@3x.png';
import industry4 from '../../assets/home/ico_yqqy@3x.png';
import industry5 from '../../assets/home/ico_zxxq@3x.png';
import industry6 from '../../assets/home/ico_yqhy@3x.png';
import industry7 from '../../assets/home/ico_zgc@3x.png';
import styles from "./index.modules.less";
import Index1 from '../../assets/Index1.jpeg';
import Index2 from '../../assets/Index2.jpeg';
import Index3 from '../../assets/Index3.jpeg';
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/rate.scss";
import "taro-ui/dist/style/components/icon.scss";
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
      icon: industry7,
      title:'找工厂',
      star:2
    },
    {
      icon: industry5,
      title:'最新需求',
      star:3
    },
    {
      icon: industry2,
      title:'会员审核',
      star:4
    },
    {
      icon: industry1,
      title:'需求审核',
      star:5
    },
    {
      icon: industry4,
      title:'邀请企业',
      star:5
    },
    {
      icon: industry6,
      title:'邀请好友',
      star:5
    },
    {
      icon: industry3,
      title:'签到',
      star:5
    },
    {
      icon: "",
      title:''
    },
    {
      icon: "",
      title:''
    },
    {
      icon: "",
      title:''
    },

  ]

  state = {
    current: 0,
  }
  config: Config = {
    navigationBarTitleText: "首页",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {

    const token = Taro.getStorageSync('token');
    if(token){
      const {dispatch} = this.props;
      if(dispatch){
        dispatch({
          type: "user/fetchmakerDetails",
          payload: {
            user_id:Taro.getStorageSync('user_id')
          }
        });
      }
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


  render() {
    const tabList = [{ title: '企业展示' }, { title: '需求广场' }, { title: '猎聘信息' }]

    return (
      <View className={styles.home}>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          // vertical
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
          <Image src={Index2} className={styles.SwiperItem} />
          </SwiperItem>
          <SwiperItem>
          <Image
            className={styles.SwiperItem}
            src={Index1}
          />
          </SwiperItem>
          <SwiperItem>
          <Image src={Index3} className={styles.SwiperItem} />
          </SwiperItem>
        </Swiper>
        {/* 适合行业 */}
        <View className={styles.industryList}>
          {/* <Image src={industry} className={styles.moduleTitle} /> */}
          <View className={styles.industryView} style={{marginBottom:'20px'}}>
            {
              this.industryList.map((item,idx) => {
                if (idx <= 4) {
                  return <View className={styles.industryItem}><IndustryItem key={`industryItem${idx}`} item={item}/></View>
                }
              })
            }
          </View>
          <View className={styles.industryView}>
            {
              this.industryList.map((item,idx) => {
                if (idx > 4) {
                  return <View className={styles.industryItem}><IndustryItem key={`industryItem${idx}`} item={item}/></View>
                }
              })
            }
          </View>
        </View>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View style='background-color:#fff;padding:0pt 16pt' >
              { this.industryList.map((item,idx) => (<FactoryItem src={Index2} key={`FactoryItem${idx}`} rate={item.star}/>))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='background-color:#fff;padding:0pt 16pt' >
              { this.industryList.map((item,idx) => (<NeedItem key={`NeedItem${idx}`}  src={Index1}/>))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='background-color:#fff;padding:0pt 16pt' >
              { this.industryList.map((item,idx) => (<RecruitmentItem key={`NeedItem${idx}`}/>))}
            </View>
          </AtTabsPane>
        </AtTabs>


      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
