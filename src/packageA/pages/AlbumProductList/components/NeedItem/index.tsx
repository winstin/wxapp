import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import styles from "../../index.modules.less";
import { AtButton  } from 'taro-ui'
import ico_more from '../../../../../assets/user/ico_more@3x.png';

import Event from '@/utils/event';
let myEvent = new Event(); // 实例化一个事件管理器
 



type PageOwnProps = {
  src?:any;
  isAdd:any;
  onRemove?:any
};

type PageState = {};

type IProps = PageOwnProps;

interface IndustryItem {
  props: IProps;
}


class IndustryItem extends Component {
  state={
    isShow:false
  }

  componentWillMount(){
    myEvent.on("changeCata",(id) => {
      if(id === this.props.src.id){
        this.setState({isShow:true})
      }else{
        this.setState({isShow:false})
      }
    })

  }

  render() {

    const {src,onRemove,isAdd} = this.props;
    const {isShow} = this.state;
    return (
      <View style="position:relative">
        <View className={styles.list}>
          <View className={styles.left}>
            <View>
              <Image src={`http://sz-spd.cn:889/${src.photoCover}`} className={styles.listimg} />
            </View>
            <View >
              <View className={styles.title} >
              {src.name}
              </View>
              <View className={styles.tips} >
              简介  {src.intro}
              </View>
              <View className={styles.tips} >
              描述  {src.desc}
              </View>
            </View>
          </View>
          <Image src={ico_more} className={styles.ico} onClick={()=>{
            myEvent.emit("changeCata",{id:src.id});
            this.setState({isShow:!isShow})
          }}/>

        </View>
        {this.state.isShow && <View className={styles.listItem}>
          <View  className={styles.bottomBtn} onClick={()=>{
              this.setState({isShow:false})
              Taro.navigateTo({
                url: `/packageA/pages/MyAlbumProduct/index?id=${src.id}&add=${isAdd}`
              })
            }}>
            {isAdd ? "编辑" : "详情"}
          </View>
          {isAdd && <View  className={styles.bottomBtn} onClick={()=>{this.setState({isShow:false});onRemove(src)}}>
            删除
          </View>}
        </View>}
      </View>
    );
  }
}

export default IndustryItem as ComponentClass<PageOwnProps, PageState>;
