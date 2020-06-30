import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,ScrollView } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import { connect } from "@tarojs/redux";
import MyTaskItem from './components/MyTaskItem/index';
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/button.scss";
import styles from "./index.modules.less";

type PageStateProps = {
  taskList:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface MyTask {
  props: IProps;
}

@connect(({ mytask,loading }) => {
  const {taskList} = mytask;
  return {
    taskList,
    loading: loading.effects['parent/getStudentList'],
  }
})
class MyTask extends Component {
  state = {
    current: 0,
  }
  config: Config = {
    navigationBarTitleText: "我的任务",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#ffffff",
  };

  tabList = [
    {
      title:'未完成'
    },
    {
      title:'已完成'
    },
   
  ]

  componentDidShow() {

    const token = Taro.getStorageSync('token');
    if(token){
      this.fetchList();
    }
  }
  

  fetchList = () => {
    const {dispatch} = this.props;
    const { current } = this.state;
    let type =  "mytask/progresstask";
    if(current !== 0) { type = "mytask/completedtask" }
    if(dispatch){
      dispatch({
        type,
        payload: {
          // "task_trade": tradeLists[current].key,
        }
      });
    }
  }

  handleClick = (value) => {
    this.setState({
      current: value
    },()=>{
      this.fetchList()
    })
  }

  onScrollToUpper = () => {
    console.log('onScrollToUpper');
  }

  onScroll = (e) => {
    // console.log('---onScroll:',e);
  }
 
  // 详情
  handleDetail = (id) => {
    console.log('详情',id);
    Taro.navigateTo({
      url: `/pages/TaskDetail/index?id=${id}`,
    })
  }

  // 完成
  handleReceive = async (id) => {
    const {dispatch} = this.props;
    if(dispatch){
      await dispatch({
        type: "mytask/completetask",
        payload: {
          taskId: id,
        }
      });
      this.fetchList();
      Taro.showToast({
          title:'操作成功'
      })
    }
  }

  render() {
    const scrollStyle = {
      height: '90vh'
    }
    const scrollTop = 0
    const Threshold = 20

    const {taskList} = this.props;
    const token = Taro.getStorageSync('token');
    if(!token){
     return (
       <View className={styles.unLogin}>
         <View>您还未登录，请先登录!</View>
         <View className={styles.receiveBtn} onClick={() => {
            Taro.navigateTo({
              url:'/pages/Home/index'
            })
          }}>登录</View>
       </View>
     )
   }
    return (
      <View className={styles.myTask}>
        <AtTabs
          current={this.state.current}
          scroll
          swipeable={true}
          tabDirection="horizontal"
          tabList={this.tabList}
          onClick={this.handleClick}>
            {
              this.tabList.map((item,idx) => (
                <AtTabsPane key={`tabpan${idx}`} current={this.state.current} index={idx}>
                  <ScrollView
                    className={styles.tabContent}
                    scrollY
                    scrollWithAnimation
                    scrollTop={scrollTop}
                    style={scrollStyle}
                    lowerThreshold={Threshold}
                    upperThreshold={Threshold}
                    onScrollToUpper={this.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
                    onScroll={this.onScroll}
                  >
                   {
                      taskList.records.map((task) => (
                        <MyTaskItem key={task.id} item={task} onReceive={() => this.handleReceive(task.id)} onDetail={() => this.handleDetail(task.id)} />
                      ))
                    }
                  </ScrollView>
                </AtTabsPane>
              ))
            }
        </AtTabs>
      </View>
    );
  }
}

export default MyTask as ComponentClass<PageOwnProps, PageState>;
