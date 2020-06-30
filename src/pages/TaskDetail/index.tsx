import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config} from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton,AtModal } from "taro-ui";
import { connect } from "@tarojs/redux";
import "taro-ui/dist/style/components/modal.scss";
import styles from "./index.modules.less";

type PageStateProps = {
  detail: any;
  makerInfo: any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface TaskDetail {
  props: IProps;
}

@connect(({ taskhall,user,loading }) => {
  const {detail = {}} = taskhall;
  const {makerInfo} = user;
  return {
    detail,
    makerInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class TaskDetail extends Component {
  state = {
    open: false,
    isX: false,
  }
  config: Config = {
    navigationBarTitleText: "任务详情",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#ffffff",
  };

  componentDidMount() {
    const {id} = this.$router.params;
    console.log('id:',id);
    this.fetchDetail(id);
  }

  componentWillMount() {
    // const {clientInfo} = this.props;
    // const isX = clientInfo.model.search('iPhone X') != -1;
    // this.setState({
    //   isX
    // })
  }

  fetchDetail = (id) => {
    const {dispatch} = this.props;
    if(dispatch){
      dispatch({
        type: "taskhall/taskdetail",
        payload: {
          "taskId": id,
        }
      });
    }
  }

 
  // 领取
  handleRecieve = async () => {
    const {dispatch,detail,makerInfo} = this.props;
    if(makerInfo.verifyStatus === 0){
      this.setState({
          open: true
      })
      return
    }
    if(dispatch){
      await dispatch({
        type: "taskhall/accepttask",
        payload: {
          taskId: detail.id,
        }
      });
      Taro.showToast({
          title:'领取成功'
      })
    }
  }

  handleComplete = async () => {
    const {dispatch,detail} = this.props;
    // if(makerInfo.verifyStatus === 0){
    //   this.setState({
    //       open: true
    //   })
    //   return
    // }
    if(dispatch){
      await dispatch({
        type: "mytask/completetask",
        payload: {
          taskId: detail.id,
        }
      });
      Taro.showToast({
          title:'操作成功'
      })
    }
  }



  handleClose = () => {

  }

  handleCancel = () => {
    this.setState({
        open: false
    })
  }

  handleConfirm = () => {
    this.setState({
        open: false
    });
    Taro.navigateTo({
      url: '/pages/UserAuth/index'
    })
  }

  render() {
    
    const {open,isX}= this.state;
    const {taskName,publishUserName,createTime,taskContent,taskCost,taskAttachments,taskStatus } = this.props.detail;
    return (
      <View className={styles.taskDetail}>
        <View className={styles.name}>{taskName}</View>
        <View className={styles.tit}>发起人</View>
        <View className={styles.cont}>{publishUserName}</View>
        <View className={styles.tit}>发布时间</View>
        <View className={styles.cont}>{createTime}</View>
        <View className={styles.tit}>任务说明</View>
        <View className={styles.cont}>{taskContent}</View>
        <View className={styles.tit}>任务附件</View>
        <View>
          {
            taskAttachments.length>0?
              taskAttachments.map((item)=>(<a>文件2.doc</a>))
              :
              <a>暂无附件</a>
          }
        
        </View>
        {/* 底部 */}
        {(taskStatus === "1"||taskStatus === "0") &&(
          <View className={styles.bottom} style={{bottom: isX ? '68rpx' : '0rpx'}}>
              <View className={styles.bottomView}>
                <View className={styles.cost}>¥{taskCost}</View>
                <AtButton className={styles.recieve} onClick={this.handleRecieve}>领取</AtButton>
              </View>
          </View>
        )}

        {taskStatus === "2" &&(
          <View className={styles.bottom} style={{bottom: isX ? '68rpx' : '0rpx'}}>
              <View className={styles.bottomView}>
                <View className={styles.cost}>¥{taskCost}</View>
                <AtButton className={styles.complete} onClick={this.handleComplete}>完成</AtButton>
              </View>
          </View>
        )}
       

        {/* 弹窗 */}
        <AtModal
            isOpened={open}
            title='提示'
            cancelText='取消'
            confirmText='去认证'
            closeOnClickOverlay={false}
            onClose={ this.handleClose }
            onCancel={ this.handleCancel }
            onConfirm={ this.handleConfirm }
            content='请先进行身份认证，才能完成任务'
        />
      </View>
    );
  }
}

export default TaskDetail as ComponentClass<PageOwnProps, PageState>;
