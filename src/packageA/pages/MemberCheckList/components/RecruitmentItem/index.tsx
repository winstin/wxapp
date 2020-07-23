import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";
import img_vip_person from '../../../../../assets/img_vip_person@3x.png';
import { AtTag  } from 'taro-ui'
import { connect } from "@tarojs/redux";
import { AnyAction } from 'redux';



type PageOwnProps = {
  data?:any;
  loading:any;
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
    const selfIntroList = data.selfIntro && data.selfIntro.split(" ")||[];
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
            url: '/packageA/pages/MemberCheckDetail/index?type=person&id='+data.id
          })
        }
        
      }}>
        <View style={{flex:1}}>
          <View className={styles.tips3} >
              <View className={styles.title} style="margin-left:0px">
                {data.name}
                <View className={styles.itemtext} style="margin-left:10px">{data.levelNowName}</View>
                {/* <Image src={img_vip_person} className={styles.listimg} /> */}
              </View>
              <View className={styles.share} >
              <View className={styles.item}>
                <View>{data.birthday}</View>
              </View>
              <View className={styles.item}> 
                <View>{data.nickname}</View>
              </View>
            </View>
          </View>
          <View className={styles.tips3} >
            <View className={styles.title} style="margin-left:0px">
              申请等级: {data.levelApplyName}
            </View>
          </View>
          <View className={styles.tips3} >
            <View className={styles.title} style="margin-left:0px">
              {data.company}
            </View>
          </View>
          <View className={styles.tips2}>
              {selfIntroList.map((item)=>(<View className={styles.tag}><AtTag 
                name='tag-1' 
                type='primary' 
                
              >
                {item}
              </AtTag></View>))}
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
