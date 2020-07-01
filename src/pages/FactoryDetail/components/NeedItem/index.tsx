import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";
import ico_comment from '../../../../assets/need/ico_comment@3x.png';
import ico_share from '../../../../assets/need/ico_share@3x.png';



type PageOwnProps = {
  src?:any
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {


  render() {

    const {src} = this.props;

    return (
      <View className={styles.list}>
        <View>
          <Image src={src} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.title} >
          机加工-车削工艺
          </View>
          <View className={styles.tips} >
          材料  不锈钢
          </View>
          <View className={styles.tips} >
          产能  每月2000件
          </View>
          
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
