import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "./index.modules.less";



type PageOwnProps = {
  item: any;
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {


  render() {

    const {item} = this.props;

    return (
      <View className={styles.industryItem}>
        <View className={styles.iconView}>
          <Image src={item.icon} className={styles.icon} />
        </View>
        <View className={styles.itemTitle}>{item.title}</View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
