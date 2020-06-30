import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,ScrollView } from "@tarojs/components";
import { AtTabs, AtTabsPane,AtButton } from 'taro-ui';
import { connect } from "@tarojs/redux";
import TaskItem from './components/taskItem/index';
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/button.scss";
import styles from "./index.modules.less";

type PageStateProps = {
  tradeLists:any;
  taskList:any;
  makerInfo:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface TaskHall {
  props: IProps;
}

@connect(({ taskhall,user,loading }) => {
  const {tradeList={},taskList} = taskhall;
  const {makerInfo} = user;
  const tradeLists = tradeList.map((item)=>({title:item.dictValue,key:item.dictKey}))
  return {
    tradeLists,
    taskList,
    makerInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class TaskHall extends Component {
  state = {
    current: 0,
  }
  config: Config = {
    navigationBarTitleText: "任务大厅",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#ffffff",
  };

  async componentDidShow() {


    const token = Taro.getStorageSync('token');
    if(token){
      const {dispatch} = this.props;
      if(dispatch){
        await dispatch({
          type: "taskhall/queryDictionary",
          payload: {
            "code": "task_trade",
          }
        });

        await dispatch({
          type: "user/fetchmakerDetails",
          payload: {
            user_id:Taro.getStorageSync('user_id')
          }
        });

        this.fetchList();
      }
    }

  }

  fetchList = () => {
    const { tradeLists } =this.props
    const { current } = this.state
    const {dispatch} = this.props;
    if(dispatch){
      dispatch({
        type: "taskhall/taskpage",
        payload: {
          "task_trade": tradeLists[current].key,
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

  // 拉到顶部触发事件
  onScrollToUpper = () => {
    console.log('onScrollToUpper');
  }

  // 拉到底部触发事件
  onScrollToLower = () => {
    console.log('onScrollToLower');
  }

  onScroll = (e) => {
    // console.log('---onScroll:',e);
  }

  // 领取
  handleReceive = async (id) => {

    const {dispatch,makerInfo} = this.props;
    if(makerInfo.verifyStatus === 0){
      Taro.navigateTo({
        url: `/pages/TaskDetail/index?id=${id}`,
      })
      // this.setState({
      //     open: true
      // })
      return
    }
    if(dispatch){
      await dispatch({
        type: "taskhall/accepttask",
        payload: {
          taskId: id,
        }
      });
      this.fetchList();
      Taro.showToast({
          title:'领取成功'
      })
    }
    
  }

  // 详情
  handleDetail = (id) => {
    console.log('详情',id);
    Taro.navigateTo({
      url: `/pages/TaskDetail/index?id=${id}`,
    })
  }

  render() {
    const scrollStyle = {
      height: '90vh'
    }
    const scrollTop = 0
    const Threshold = 20


    const {tradeLists,taskList} =this.props

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
      <View className={styles.taskHall} style={{textAlign:'center'}}>
        {/* 无任务 */}
        {/* <View className={styles.noneTaskView}>
          <View className={styles.noneBox}>
            <Image src={noneTaskImage} className={styles.noneIcon} />
            <View className={styles.noneTitle}>暂无任务</View>
          </View>
        </View> */}
        <AtTabs
          current={this.state.current}
          scroll
          swipeable={true}
          tabDirection="horizontal"
          tabList={tradeLists}
          onClick={this.handleClick}>
            {
              tradeLists.map((item,idx) => (
                <AtTabsPane key={`tabpan${idx}`} current={this.state.current} index={idx}>
                  <ScrollView
                    className={styles.tabContent}
                    scrollY
                    scrollWithAnimation
                    scrollTop={scrollTop}
                    style={scrollStyle}
                    lowerThreshold={Threshold} // 距底部多远时，触发 scrolltolower 事件
                    upperThreshold={Threshold} // 距顶部多远时，触发 scrolltoupper 事件
                    onScrollToUpper={this.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
                    onScrollToLower={this.onScrollToLower}
                    onScroll={this.onScroll}
                    // refresherEnabled
                    onRefresherPulling={() => {
                      console.log('自定义下拉刷新控件被下拉');
                    }}
                    onRefresherRefresh={() => {
                      console.log('自定义下拉刷新被触发');
                     
                    }}
                    onRefresherRestore={() => {
                      console.log('自定义下拉刷新被复位');
                    }}
                    onRefresherAbort={() => {
                      console.log('自定义下拉刷新被中止');

                    }}
                  >
                   {
                      taskList.records.map((task) => (
                        <TaskItem key={task.id} item={task} onReceive={() => this.handleReceive(task.id)} onDetail={() => this.handleDetail(task.id)} />
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

export default TaskHall as ComponentClass<PageOwnProps, PageState>;
