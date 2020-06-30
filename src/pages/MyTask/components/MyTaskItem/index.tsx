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

interface MyTaskItem {
  props: IProps;
}


class MyTaskItem extends Component {


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
            {item.taskStatus === "3" ? 
              <View className={styles.receive}>{item.taskStatusValue}</View>
              :
              <View className={styles.receiveBtn} onClick={this.receive}>完成</View>
            }
            
        </View>
      </View>
    );
  }
}

export default MyTaskItem as ComponentClass<PageOwnProps, PageState>;
