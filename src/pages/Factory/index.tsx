import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,ScrollView} from "@tarojs/components";
import { AtDrawer,AtSearchBar } from 'taro-ui'
import { connect } from "@tarojs/redux";
import FactoryItem from '../Index/components/FactoryItem/index';
import styles from "./index.modules.less";
import NoneData from '../Index/components/NoneData';
import "taro-ui/dist/style/components/rate.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/drawer.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/search-bar.scss";

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

@connect(({ factory,global,loading }) => {
  const {userInfo={},corporateData} = factory;
  const {INDUSTRY_TYPE=[]} = global;

  let newtype = JSON.parse(JSON.stringify(INDUSTRY_TYPE))
  newtype.unshift({
    label:'行业不限',
    value:''
  })
  return {
    userInfo,
    INDUSTRY_TYPE:newtype,
    corporateData,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  sortArr = [
    {
      key:'',
      value:'不限'
    },
    {
      key:'star',
      value:'按照星级降序'
    },
    {
      key:'pv',
      value:'按照访问量降序'
    }
  ]

  state = {
    current: 1,
    show:false,
    sort:false,
    industry:false,
    corporateData:[],
    haveMore:true,
    industryObject:{
      label:'行业不限',
      value:''
    },
    sortObject:{
      key:'',
      value:'综合排序'
    },
    value:''
  }
  config: Config = {
    navigationBarTitleText: "企业展示",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {

    const token = Taro.getStorageSync('token');
    this.fetchList(1);

  }


  fetchList = (page=1)=>{
    const {dispatch} = this.props;
    const { corporateData,industryObject,sortObject } = this.state;
    if(dispatch){
      Taro.showToast({
        icon:'loading',
        title: "加载中",
        duration:500
      })
      const payload:any = {
        isAsc:false,
        current:page,
      }
      if(this.state.value){
        payload.name=this.state.value
      }
      if(industryObject.value){
        payload.industryType=industryObject.value
      }
      if(sortObject.key){
        payload.orderByField=sortObject.key
      }
      dispatch({
        type: "factory/getCorporateList",
        payload 
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

  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    console.log('开始搜索');

    this.fetchList(1);

    this.onClose();
  }


  render() {
    const {sort,industry,corporateData,industryObject,sortObject} = this.state;
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
              {sortObject.value}
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
        
        {
          this.sortArr.map((item)=>(
            <View className={styles.listItem} onClick={()=>{
              this.setState({
                sortObject:{
                  key:item.key,
                  value:item.value
                }
              },()=>{
                this.fetchList(1)
              })
            }}>
              <View>{item.value}</View>
            </View>
          ))
        }
        </View>}

        {industry && <View onClick={this.onClose.bind(this)} className={styles.modal}>
          {JSX}
        </View>}

        <View className={styles.list}>
          <View className={styles.margintop} />
          {corporateData.length===0 && <NoneData/>}
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
          width={"260px"}
          onClose={this.onClose.bind(this)} 
          // items={['菜单1', '菜单2']}
        >
          <View className='drawer-item'>
            <AtSearchBar
              // showActionButton
              value={this.state.value}
              onChange={this.onChange.bind(this)}
              onActionClick={this.onActionClick.bind(this)}
            />
          </View>

        </AtDrawer>

        
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
