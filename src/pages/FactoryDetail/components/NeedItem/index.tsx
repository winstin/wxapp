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

    return (
      <View className={styles.list} onClick={()=>{
        // Taro.navigateTo({
        //   url: '/pages/NeedDetail/index'
        // })
        Taro.navigateTo({
          url: `/packageA/pages/ProductDetail/index?id=${data.id}`
        })
      }}>
        <View>
          <Image src={`http://sz-spd.cn:889/${data.photoCover}`} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.title} >
          {data.name}
          </View>
          <View className={styles.tips} >
          {data.intro}
          </View>
          <View className={styles.tips} >
          {data.desc}
          </View>
          
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
