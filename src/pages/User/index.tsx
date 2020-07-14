import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import arrowIcon from '../../assets/user/ico_arrow@3x.png';
import cardIcon from '../../assets/user/ico_card@2x.png';
import jbxx from '../../assets/user/ico_my_jbxx@3x.png';
import sjhy from '../../assets/user/ico_my_sjhy@3x.png';
import lxxx from '../../assets/user/ico_lxxx@3x.png';
import qyxc from '../../assets/user/ico_my_qyxc@3x.png';
import cpxc from '../../assets/user/ico_my_cpxc@3x.png';
import gzgzh from '../../assets/user/ico_my_gzgzh@3x.png';
import qygm from '../../assets/user/ico_my_qygm@3x.png';
import styles from "./index.modules.less";
import ListItem from './components/ListItem/index';
import img_my_bg_corp from '../../assets/user/img_my_bg_corp.png';
import img_my_corp from '../../assets/img_vip_corp@3x.png';
import img_vip_person from '../../assets/img_vip_person@3x.png';

import { AtButton } from "taro-ui";

type PageStateProps = {
  userInfo:any;
  makerInfo:any;
  myInfo:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface User {
  props: IProps;
}

@connect(({ global,user,loading }) => {
  const {userInfo={}} = global;
  const { makerInfo,myInfo={} } = user;
  return {
    userInfo,
    makerInfo,
    myInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class User extends Component {
  state = {
    current: 1,
  }
  config: Config = {
    navigationBarTitleText: "个人中心",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#ffffff",
    navigationStyle:"custom",
  };


  componentDidShow() {

    const token = Taro.getStorageSync('token');
    if(token){
      // const {dispatch} = this.props;
      // if(dispatch){
      //   dispatch({
      //     type: "user/fetchmakerDetails",
      //     payload: {
      //       user_id:Taro.getStorageSync('user_id')
      //     }
      //   });
      // }

      const {dispatch} = this.props;
      if(dispatch){
        dispatch({
          type: "user/getMyInfo",
          payload: {
            // user_id:Taro.getStorageSync('user_id')
          }
        });
      }
    }
    
  }

  goInfo = () => {
    Taro.navigateTo({
      url: '/pages/UserInfo/index'
    })
  }
 
  manageCard = (url) => {
    Taro.navigateTo({
      url
    })
  }

  cancelLogin = ()=>{
    Taro.clearStorage();
    Taro.reLaunch({
      url: "/pages/Login/index"
    })
  }

  render() {
    const {userInfo,myInfo} = this.props;

    const token = Taro.getStorageSync('token');
    // if(!token){
    //   return (
    //     <View className={styles.unLogin}>
    //       <View>您还未登录，请先登录!</View>
    //       <View className={styles.receiveBtn} onClick={() => {
    //         Taro.navigateTo({
    //           url:'/pages/Home/index'
    //         })
    //       }}>登录</View>
    //     </View>
    //   )
    // }

    const {type ="person"} = myInfo;

    return (
      <View className={styles.user}>
        {/* 个人信息 */}
        <View className={styles.userInfo} onClick={this.manageCard.bind(this,"/packageA/pages/CardManage/index")}>
          <Image className={styles.bg_img} src={img_my_bg_corp} />

          <View className={styles.info}>
          <Image
            className={styles.avatar}
            src={userInfo.avatarUrl}
          />
          <View className={styles.lr}>
            <View className={styles.lrTop}>
              <View className={styles.name}>{userInfo.nickName}</View>
              {type==="enterprise"?<Image
                  className={styles.itemtag}
                  src={img_my_corp}
                />:<Image
                className={styles.itemtag}
                src={img_vip_person}
              />}
              
            </View>
            <View className={styles.phone}>{'1074 2210 2177 51023'}
            <Image
              className={styles.itemIcon}
              src={cardIcon}
            />
          </View>
          </View>
          </View>
          {/* <Image
            className={styles.arrow}
            src={arrowIcon}
            onClick={this.goInfo}
          /> */}
        </View>

        <View className={styles.cardtop} onClick={()=>{this.manageCard("/packageA/pages/MemberCredits/index")}}>
          <View className={styles.cardL}>
            <View className={styles.itemTitle}>会员积分</View>
          </View>
          <View className={styles.cardL}>
            <View className={styles.vipNumber}>{myInfo.total}</View>
            <Image
              className={styles.arrow}
              src={arrowIcon}
            />
          </View>
        </View>
        {type!=="enterprise" &&<ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/MemberShipPerson/index")}}
          cardIcon={sjhy}
          title={'升级个人会员'}
        ></ListItem>}
        {type!=="personal" &&<ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/MemberShipUpgrade/index")}}
          cardIcon={sjhy}
          title={'升级企业会员'}
        ></ListItem>}
        <ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/MyBaseInfo/index")}}
          cardIcon={jbxx}
          title={'基本信息'}
        ></ListItem>
        {type==="enterprise" &&<ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/MyContactInfo/index")}}
          cardIcon={lxxx}
          title={'联系信息'}
        ></ListItem>}
        {type==="enterprise" && <ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/MyEnterpriseScale/index")}}
          cardIcon={qygm}
          title={'企业规模'}
        ></ListItem>}
        
        {type==="enterprise" && <ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/MyCompaniestIntroduce/index")}}
          cardIcon={qygm}
          title={'企业介绍'}
        ></ListItem>}
        {type==="enterprise" && <ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/MyAlbumEnterprise/index")}}
          cardIcon={qyxc}
          title={'企业相册'}
        ></ListItem>}
        {type==="enterprise" && <ListItem 
          onClick={()=>{this.manageCard("/packageA/pages/AlbumProductList/index")}}
          cardIcon={cpxc}
          title={'产品相册'}
        ></ListItem>}
        <ListItem 
          onClick={this.manageCard}
          cardIcon={gzgzh}
          title={'关注公众号'}
        ></ListItem>
        <ListItem 
          onClick={this.manageCard}
          cardIcon={qygm}
          title={'会员章程'}
        ></ListItem>

        <View className={styles.loginBtn}>
        {!token ? <AtButton 
          onClick={()=>{this.manageCard("/pages/Home/index")}}
          type="primary"
        >登录</AtButton> : <View className={styles.loginout} onClick={this.cancelLogin} >退出登录</View>}
        </View>
      </View>
    );
  }
}

export default User as ComponentClass<PageOwnProps, PageState>;
