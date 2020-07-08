import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView} from "@tarojs/components";
import { AtDrawer } from 'taro-ui'
import { connect } from "@tarojs/redux";
import FactoryItem from '../Index/components/FactoryItem/index';
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/rate.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/drawer.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/modal.scss";

type PageStateProps = {
  userInfo:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
  INDUSTRY_TYPE: any;
  corporateData:any
};


type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Home {
  props: IProps;
}

@connect(({ factory,loading }) => {
  const {userInfo={},INDUSTRY_TYPE=[],corporateData} = factory;
  return {
    userInfo,
    INDUSTRY_TYPE,
    corporateData,
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
    current: 1,
    show:false,
    sort:false,
    industry:false,
    corporateData:[],
    haveMore:true,
    industryObject:{
      label:'行业',
      value:''
    }
  }
  config: Config = {
    navigationBarTitleText: "企业展示",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {

    const token = Taro.getStorageSync('token');
    const {dispatch} = this.props;
    if(dispatch){
      if(token){
        dispatch({
          type: "factory/getBatchDictValueByCode",
          payload: {
            code:'INDUSTRY_TYPE' 
          }
        });

        this.fetchList(1)
      }
    }
  }


  fetchList = (page=1)=>{
    const {dispatch} = this.props;
    const { corporateData,industryObject } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      dispatch({
        type: "factory/getCorporateList",
        payload: {
          isAsc:false,
          current:page,
          // industryType:industryObject.value
        }
      }).then((e)=>{
        if(e.length<20){
          this.state.haveMore = false;
        }
        this.state.current = page + 1;
        this.setState({
          corporateData:page===1?e:corporateData.concat(e)
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


  onClose=()=>{
    this.setState({show:false,sort:false,industry:false})
  }


  render() {
    const {sort,industry,corporateData,industryObject} = this.state;
    const {INDUSTRY_TYPE} = this.props;
    const JSX = INDUSTRY_TYPE.map((item)=>(
      <View className={styles.listItem} onClick={()=>{
        this.setState({
          industryObject:{
            label:item.label,
            value:item.value
          }
        },()=>{
          this.fetchList(1)
        })
      }}>
        <View>{item.label}</View>
      </View>
    ))

    const scrollStyle = {
      height:'100vh'
    }
    const scrollTop = 50
    return (
      <View className={styles.factory}>
        <View className={styles.factorytop}>
          <View className={styles.topItem} onClick={()=>{
              this.setState({sort:true,show:false,industry:false})
            }}>
              综合排序
              <View className='at-icon at-icon-chevron-down'></View>
          </View>
          <View className={styles.topItem} onClick={()=>{this.setState({industry:true,show:false,sort:false})}}>
              {industryObject.label}
              <View className='at-icon at-icon-chevron-down'></View>
          </View>
          <View className={styles.topItem} onClick={()=>{this.setState({show:true,sort:false,industry:false})}}>
              筛选
              <View className='at-icon at-icon-chevron-down'></View>
          </View>
        </View>

        {sort && <View onClick={this.onClose.bind(this)} className={styles.modal}>
            <View className={styles.listItem}>
              <View>按照星级降序</View>
            </View>
            <View className={styles.listItem}>
              <View>按照访问量降序</View>
            </View>
        </View>}

        {industry && <View onClick={this.onClose.bind(this)} className={styles.modal}>
          {JSX}
        </View>}

        <View className={styles.list}>
          <View className={styles.margintop} />
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={scrollTop}
            style={scrollStyle}
            onScrollToLower={this.onScrollToLower}
            onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
          >
            { corporateData.map((item,idx) => (<FactoryItem key={`FactoryItem${idx}`} data={item}/>))}
          </ScrollView>
        </View>

        <AtDrawer 
          show={this.state.show} 
          right 
          mask 
          onClose={this.onClose.bind(this)} 
          items={['菜单1', '菜单2']}
        ></AtDrawer>

        
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
