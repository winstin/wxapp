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
    const {companyName,qty,reqDesc,createdDate,drawings} = data;
    return (
      <View className={styles.list} onClick={()=>{
        Taro.navigateTo({
          url: `/packageA/pages/NeedCheck/index?id=${data.id}`
        })
        
      }}>
        <View>
          <Image src={`http://sz-spd.cn:889/${drawings[0].url}`} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.title} >
          {companyName}
          </View>
          <View className={styles.tips} >
          数量  {qty}台
          </View>
          <View className={styles.tips} >
          要求  {reqDesc}
          </View>
          <View className={styles.tips} >
            {createdDate}
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;