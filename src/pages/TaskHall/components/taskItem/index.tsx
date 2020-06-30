import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import styles from "./index.modules.less";



type PageOwnProps = {
  item: any;
  onReceive:() => void;
  onDetail:() => void;
};

type PageState = {};

type IProps = PageOwnProps;

interface TaskItem {
  props: IProps;
}


class TaskItem extends Component {


  receive = (event) => {
    const {onReceive} = this.props;
    event.stopPropagation();
    onReceive();
  }

  detail = () => {
    const {onDetail} = this.props;
    onDetail();
  }


  render() {

    const {item} = this.props;

    return (
      <View className={styles.taskItemView} onClick={this.detail}>
        <View className={styles.title}>{item.taskName}</View>
        <View className={styles.sponsorView}>
            <View>
                <View className={styles.sponsorTit}>发起</View>
                {item.publishUserName}
            </View>
            <View>{item.createTime}</View>
        </View>
        <View className={styles.content}>{item.taskContent}</View>
        <View className={styles.costView}>
            <View className={styles.cost}>￥{item.taskCost}</View>
            <View className={styles.receiveBtn} onClick={this.receive}>领取</View>
        </View>
      </View>
    );
  }
}

export default TaskItem as ComponentClass<PageOwnProps, PageState>;
