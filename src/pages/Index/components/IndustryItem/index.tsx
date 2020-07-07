import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image,Button } from "@tarojs/components";
import styles from "./index.modules.less";
import { isLogined } from '@/utils/utils'
import { AtBadge } from 'taro-ui'



type PageOwnProps = {
  item: any;
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {


  render() {

    const {item} = this.props;

    return (
      <View className={styles.industryItem} onClick={()=>{
        if(isLogined()) return
        if(item.path){
          Taro.navigateTo({
            url: item.path
          })
        }else if(item.switchUrl){
          Taro.switchTab({
            url: item.switchUrl
          })
        }
        if(item.onClick){
          item.onClick()
        }

      }}>
        <View className={styles.iconView}>
          {item && item.icon && <AtBadge value={10} maxValue={99}>
            <Image src={item.icon} className={styles.icon} />
          </AtBadge>}
        </View>
        <View className={styles.itemTitle}>{item.title}</View>
        { item.title === "邀请企业"  &&<Button openType="share" className={styles.share}>分享</Button>}
        { item.title === "邀请好友"  &&<Button openType="share" className={styles.share}>分享</Button>}

      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
