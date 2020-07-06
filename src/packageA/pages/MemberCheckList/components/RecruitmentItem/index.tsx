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
        <View style={{flex:1}}>
          <View className={styles.title} >
            苏州宝时得科技有限公司
          </View>
          
          <View className={styles.tips3} >
            <View>
            联系人：谢若美/15923457890
            </View>
            <View className={styles.share} >
              <View className={styles.item}>
                <View>4月15日</View>
              </View>
              <View className={styles.item}> 
                <View>王芹悦</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
