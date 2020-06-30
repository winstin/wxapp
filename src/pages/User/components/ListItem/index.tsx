import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "./index.modules.less";
import arrowIcon from '../../../../assets/user/ico_arrow@3x.png';


type PageOwnProps = {
  onClick?:any;
  cardIcon?:any;
  arrowIcon?:any;
  title?:any;
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {


  render() {

    const {onClick,cardIcon,title} = this.props;

    return (
      <View className={styles.cardManage} onClick={onClick}>
        <View className={styles.cardL}>
        <Image
          className={styles.itemIcon}
          src={cardIcon}
        />
        <View className={styles.itemTitle}>{title}</View>
        </View>
        <Image
          className={styles.arrow}
          src={arrowIcon}
        />
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
