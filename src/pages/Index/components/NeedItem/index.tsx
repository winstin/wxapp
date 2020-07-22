import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";
import ico_comment from '../../../../assets/need/ico_comment@3x.png';
import ico_share from '../../../../assets/need/ico_share@3x.png';
import { isLogined } from '@/utils/utils'



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
    const {itemName,qty,reqDesc,createdDate,drawings,id,jxhReqMsgs} = data;
    return (
      <View className={styles.list} onClick={()=>{
        if(isLogined()) return;
        Taro.navigateTo({
          url: `/pages/NeedDetail/index?id=${id}`
        })
      }}>
        <View>
          <Image src={`http://sz-spd.cn:889/${drawings[0].url}`} className={styles.listimg} />
        </View>
        <View style='flex:1'>
          <View className={styles.title} >
          {itemName}
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
          <View className={styles.tips3} >
            <View/>
            <View className={styles.share} >
              <View className={styles.item}>
                <Image src={ico_share} className={styles.bottom_btn} />
                <View>分享</View>
              </View>
              <View className={styles.item}> 
                <Image src={ico_comment} className={styles.bottom_btn} />
                <View>评论 {jxhReqMsgs.length}</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
