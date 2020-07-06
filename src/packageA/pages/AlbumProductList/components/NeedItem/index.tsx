import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";
import { AtButton  } from 'taro-ui'




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
      <View>
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
            
          </View>
        </View>

        <View className={styles.listItem}>
          <View  className={styles.bottomBtn}>
            <AtButton type='secondary' onClick={()=>{
              Taro.navigateTo({
                url: '/packageA/pages/MyAlbumProduct/index'
              })
            }}>编辑</AtButton>
          </View>
          <View  className={styles.bottomBtn}>
            <AtButton type='secondary' onClick={()=>{
              Taro.navigateTo({
                url: '/packageA/pages/MyAlbumProduct/index'
              })
            }}>删除</AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
