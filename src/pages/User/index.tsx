import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Text } from "@tarojs/components";
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

import "taro-ui/dist/style/components/button.scss";
import styles from "./index.modules.less";
import ListItem from './components/ListItem/index';

type PageStateProps = {
  userInfo:any;
  makerInfo:any;
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
  const { makerInfo } = user;
  return {
    userInfo,
    makerInfo,
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
      const {dispatch} = this.props;
      if(dispatch){
        dispatch({
          type: "user/fetchmakerDetails",
          payload: {
            user_id:Taro.getStorageSync('user_id')
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

  render() {
    const {userInfo} = this.props;

    // const token = Taro.getStorageSync('token');
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

    return (
      <View className={styles.user}>
        {/* 个人信息 */}
        <View className={styles.userInfo} onClick={this.manageCard.bind(this,"/pages/CardManage/index")}>
          <View className={styles.info}>
          <Image
            className={styles.avatar}
            src={userInfo.avatarUrl}
          />
          <View className={styles.lr}>
            <View className={styles.lrTop}>
              <View className={styles.name}>{userInfo.nickName}</View>
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

        <View className={styles.cardtop} onClick={()=>{this.manageCard("/pages/MemberCredits/index")}}>
          <View className={styles.cardL}>
            <View className={styles.itemTitle}>会员积分</View>
          </View>
          <View className={styles.cardL}>
            <View className={styles.vipNumber}>2000</View>
            <Image
              className={styles.arrow}
              src={arrowIcon}
            />
          </View>
        </View>
        <ListItem 
          onClick={()=>{this.manageCard("/pages/PersonMemberShip/index")}}
          cardIcon={sjhy}
          title={'升级个人会员'}
        ></ListItem>
        <ListItem 
          onClick={()=>{this.manageCard("/pages/UpgradeMemberShip/index")}}
          cardIcon={sjhy}
          title={'升级企业会员'}
        ></ListItem>
        <ListItem 
          onClick={this.manageCard}
          cardIcon={jbxx}
          title={'基本信息'}
        ></ListItem>
        <ListItem 
          onClick={this.manageCard}
          cardIcon={lxxx}
          title={'联系信息'}
        ></ListItem>
        <ListItem 
          onClick={this.manageCard}
          cardIcon={qygm}
          title={'企业规模'}
        ></ListItem>
        <ListItem 
          onClick={this.manageCard}
          cardIcon={qygm}
          title={'企业介绍'}
        ></ListItem>
        <ListItem 
          onClick={this.manageCard}
          cardIcon={qyxc}
          title={'企业相册'}
        ></ListItem>
        <ListItem 
          onClick={this.manageCard}
          cardIcon={cpxc}
          title={'产品相册'}
        ></ListItem>
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
      </View>
    );
  }
}

export default User as ComponentClass<PageOwnProps, PageState>;
