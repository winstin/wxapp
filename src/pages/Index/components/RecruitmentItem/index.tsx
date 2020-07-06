import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";



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
      <View className={styles.list} onClick={()=>{
        Taro.navigateTo({
          url: '/packageA/pages/RecruitmentDetail/index'
        })
      }}>
        {/* <View>
          <Image src={src} className={styles.listimg} />
        </View> */}
        <View >
          <View className={styles.title} >
          上海嘉协精密机械有限公司招聘
          </View>
          {/* <View className={styles.tips} >
          数量  20台
          </View>
          <View className={styles.tips} >
          要求  口罩耳带焊接用
          </View> */}
          <View className={styles.tips} >
          发布日期：2020/04/15
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
