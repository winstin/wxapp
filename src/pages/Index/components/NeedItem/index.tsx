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
      <View className={styles.list} onClick={()=>{
        Taro.navigateTo({
          url: '/pages/NeedDetail/index'
        })
      }}>
        <View>
          <Image src={src} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.title} >
          寻超声波电焊机厂商
          </View>
          <View className={styles.tips} >
          数量  20台
          </View>
          <View className={styles.tips} >
          要求  口罩耳带焊接用
          </View>
          <View className={styles.tips3} >
            <View>
              2020/04/15
            </View>
            <View className={styles.share} >
              <View className={styles.item}>
                <Image src={ico_share} className={styles.bottom_btn} />
                <View>分享</View>
              </View>
              <View className={styles.item}> 
                <Image src={ico_comment} className={styles.bottom_btn} />
                <View>评论 999</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
