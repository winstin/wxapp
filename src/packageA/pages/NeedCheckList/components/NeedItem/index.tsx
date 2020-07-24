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
    const {itemName,qty,reqDesc,createdDate,drawings,statusName,status} = data;
    let style = "conenttag";
    if(status === "1"){
      style = "conentprocess"
    }else if(status === "3"){
      style = "conentred"
    }
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
          {itemName}
          </View>
          <View className={styles.tips} >
          数量：{qty}台
          </View>
          <View className={styles.tips} >
          要求：{reqDesc}
          </View>
          <View className={styles.tips} >
          状态：<View className={styles[style]} >  {statusName}</View>
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
