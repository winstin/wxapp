import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";
import img_vip_corp from '../../../../../assets/img_vip_corp@3x.png';
import { connect } from "@tarojs/redux";
import { AnyAction } from 'redux';


type PageOwnProps = {
  data?:any;
  loading:any
  dispatch?<K = any>(action: AnyAction): K;
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}

@connect(({ membercheck,loading }) => {
  return {
    loading: loading.effects['parent/getStudentList'],
  }
})
class IndustryItem extends Component {
  render() {

    const {data} = this.props;

    return (
      <View className={styles.list} onClick={async ()=>{
        const {dispatch} = this.props;
        if(dispatch){
          await dispatch({
            type: "membercheck/updateState",
            payload: {
              memberCheckDetail: data,
            }
          })
          Taro.navigateTo({
            url: '/packageA/pages/MemberCheckDetail/index?id='+data.id
          })
        }
       
      }}>
        <View style={{flex:1}}>
          <View className={styles.title} >
            {data.name}
            <View className={styles.itemtext} style="margin-left:10px">{data.levelNowName || "注册会员"}</View>
            {/* <Image src={img_vip_corp} className={styles.listimg} /> */}
          </View>
          <View className={styles.tips3} >
            申请等级：{data.levelApplyName || "VIP会员"}
          </View>
          <View className={styles.tips3}>
            <View>
            联系人：{data.linkman}/{data.linkmanPhone}
            </View>
          </View>

          <View className={styles.tips3} >
            <View>
            日期：{data.referrerDate}
            </View>
            <View className={styles.share} >
              <View className={styles.item}>
                
              </View>
              <View className={styles.item}> 
                <View>{data.linkman}</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
