import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";
import noneTaskImage from '../../../../assets/need/task_none@2x.png';



type PageOwnProps = {
    text?:any
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {


  render() {

    const {text="暂无数据"} = this.props;
    return (
        <View className={styles.noneTaskView}>
            <View className={styles.noneBox}>
            <Image src={noneTaskImage} className={styles.noneIcon} />
            <View className={styles.noneTitle}>{text}</View>
            </View>
        </View>);
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
