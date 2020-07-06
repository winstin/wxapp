import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View} from "@tarojs/components";
import { AtDrawer } from 'taro-ui'
import { connect } from "@tarojs/redux";
import FactoryItem from '../Index/components/FactoryItem/index';
import styles from "./index.modules.less";
import Index2 from '../../assets/Index2.jpeg';
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
    navigationBarTitleText: "企业展示",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    
  };

  componentDidShow() {

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

  onClose=()=>{
    this.setState({show:false,sort:false,industry:false})
  }


  render() {
    const {sort,industry} = this.state;
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
              行业
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
            <View className={styles.listItem}>
              <View>行业1</View>
            </View>
            <View className={styles.listItem}>
              <View>行业2</View>
            </View>
        </View>}

        <View className={styles.list}>
          <View className={styles.margintop} />
         
          { this.industryList.map((item,idx) => (<FactoryItem src={Index2} key={`FactoryItem${idx}`} rate={item.star}/>))}
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
