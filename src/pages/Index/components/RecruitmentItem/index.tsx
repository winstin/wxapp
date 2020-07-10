import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";



type PageOwnProps = {
  data?:any
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {


  render() {

    const {data} = this.props;
    const {title,createdDate,id} = data;

    return (
      <View className={styles.list} onClick={()=>{
        Taro.navigateTo({
          url: `/packageA/pages/RecruitmentDetail/index?id=${id}`
        })
        
      }}>
        {/* <View>
          <Image src={src} className={styles.listimg} />
        </View> */}
        <View >
          <View className={styles.title} >
          {title}
          </View>
          {/* <View className={styles.tips} >
          数量  20台
          </View>
          <View className={styles.tips} >
          要求  口罩耳带焊接用
          </View> */}
          <View className={styles.tips} >
          发布日期：{createdDate}
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
