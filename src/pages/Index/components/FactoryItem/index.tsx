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
import Index2 from '../../../../assets/Index2.jpeg';
import { isLogined } from '@/utils/utils'

type PageOwnProps = {
  src?:any;
  data?:any
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}

class IndustryItem extends Component {
  render() {
    const {data}:any = this.props;
    const {star,name,countryName,provinceName,industryTypeName,factoryAreaName,staffAmountName,productTechName} = data;
    return (
      <View className={styles.list} onClick={()=>{
        if(isLogined()) return;
        Taro.navigateTo({
          url: `/pages/FactoryDetail/index?id=${data.id}`
        })
      }}>
        <View>
          <Image src={data.logo?`http://sz-spd.cn:889/${data.logo}`:Index2} className={styles.listimg} />
          <View className={styles.rateback}>
            <AtRate value={star} size={10}/>
          </View>
        </View>
        <View >
          <View className={styles.title}>
          {name}
          </View>
          <View className={styles.tips}>
            <Image src={location} className={styles.icon} />
            <View>{countryName} {provinceName}</View>
          </View>
          <View className={styles.tips}>
            <Image src={skill} className={styles.icon} />
            <View>{productTechName}</View>
          </View>
          <View className={styles.tips}>
            <Image src={industry} className={styles.icon} />
            <View>{industryTypeName}</View>
          </View>
          <View className={styles.tips}>
            <Image src={area} className={styles.icon} />
            <View>{factoryAreaName||"不详"}</View>
            <View className={styles.tips2}>
              <Image src={staff} className={styles.icon} />
              <View>{staffAmountName||"不详"}</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
