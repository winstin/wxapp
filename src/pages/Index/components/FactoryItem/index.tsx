import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { AtRate } from 'taro-ui'
import styles from "../../index.modules.less";
import area from '../../../../assets/factory/ico_area@3x.png';
import industry from '../../../../assets/factory/ico_industry@3x.png';
import skill from '../../../../assets/factory/ico_skill@3x.png';
import staff from '../../../../assets/factory/ico_staff@3x.png';
import location from '../../../../assets/factory/ico_location@3x.png';

type PageOwnProps = {
  src?:any;
  rate?:any
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {
  render() {
    const {src,rate} = this.props;
    return (
      <View className={styles.list}>
        <View>
          <Image src={src} className={styles.listimg} />
          <View className={styles.rateback}>
            <AtRate value={rate} size={10}/>
          </View>
        </View>
        <View >
          <View className={styles.title}>
          上海嘉协精密机械有限公司
          </View>
          <View className={styles.tips}>
            <Image src={location} className={styles.icon} />
            <View>中国，上海</View>
          </View>
          <View className={styles.tips}>
            <Image src={skill} className={styles.icon} />
            <View>机加工，塑胶成型</View>
          </View>
          <View className={styles.tips}>
            <Image src={industry} className={styles.icon} />
            <View>航天航空</View>
          </View>
          <View className={styles.tips}>
            <Image src={area} className={styles.icon} />
            <View>3,000-5,000㎡</View>
            <View className={styles.tips2}>
              <Image src={staff} className={styles.icon} />
              <View>101-200</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
