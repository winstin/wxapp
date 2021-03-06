import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image,Button } from "@tarojs/components";
import styles from "./index.modules.less";
import { isLogined } from '@/utils/utils'
import { AtBadge } from 'taro-ui'



type PageOwnProps = {
  item: any;
  dataCount:any;
  Signin?:any
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {


  render() {

    const {item,dataCount={},Signin} = this.props;
    let count = "";
    if(item.title === "最新需求"){
      count = dataCount.newreq;
    }
    if(item.title === "会员审核"){
      count = dataCount.members;
    }
    if(item.title === "需求审核"){
      count = dataCount.jxhreq;
    }
    return (
      <View className={styles.industryItem} onClick={()=>{
        if(item.title === "签到" && !Signin){
          Taro.atMessage({
            'message': '今日已签到',
            'type': 'warning',
          })
          return
        }
        if(item.path){
          if(isLogined()) return;
          Taro.navigateTo({
            url: item.path
          })
        }else if(item.switchUrl){
          Taro.switchTab({
            url: item.switchUrl
          })
        }
        if(item.onClick){
          if(isLogined()) return;
          item.onClick()
        }

      }}>
        <View className={styles.iconView}>
          {item && item.icon && <AtBadge value={count===0?"":count} maxValue={99}>
            <Image src={item.icon} className={styles.icon} />
          </AtBadge>}
        </View>
        <View className={styles.itemTitle}>{item.title === "签到" && !Signin?"已签到":item.title}</View>
        { item.title === "邀请企业"  &&<Button openType="share" className={styles.share} id="MemberShipUpgrade">分享</Button>}
        { item.title === "邀请好友"  &&<Button openType="share" className={styles.share} id="MemberShipPerson">分享</Button>}

      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
