import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, OpenData } from "@tarojs/components";
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
import { isLogined } from '@/utils/utils'

type PageStateProps = {
  userInfo: any;
  makerInfo: any;
  myInfo: any;
  cardInfo: any;
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

@connect(({ global, user, loading }) => {
  const { userInfo = {} } = global;
  const { makerInfo, myInfo = {}, cardInfo } = user;
  return {
    userInfo,
    makerInfo,
    myInfo,
    cardInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class User extends Component {
  state = {
    current: 1,
    isOpened: false
  }
  config: Config = {
    navigationBarTitleText: "个人中心",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#ffffff",
    navigationStyle: "custom",
  };


  componentDidShow() {
    const token = Taro.getStorageSync('token');
    if (token) {
      // const {dispatch} = this.props;
      // if(dispatch){
      //   dispatch({
      //     type: "user/fetchmakerDetails",
      //     payload: {
      //       user_id:Taro.getStorageSync('user_id')
      //     }
      //   });
      // }

      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: "user/getMyInfo",
          payload: {
            // user_id:Taro.getStorageSync('user_id')
          }
        });
        this.fetchCardInfo();
      }
    } else {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: "user/updateState",
          payload: {
            makerInfo: {},
            myInfo: {},
            cardInfo: {},
            mypointslist: []
          }
        });
      }
    }

  }

  // 最新需求
  fetchCardInfo = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: "user/getMycard",
        payload: {
          // isAsc:false,
          // current:page,
          // industryType:industryObject.value
        }
      })
    }
  }

  goInfo = () => {
    Taro.navigateTo({
      url: '/pages/UserInfo/index'
    })
  }

  manageCard = (url) => {
    if (isLogined()) return;
    Taro.navigateTo({
      url
    })
  }

  /**
   * 获取二维码
   */
  qrCode = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: "user/getQrCode",
        payload: {}
      }).then((res) => {
        let photosurl = [res.data];
        Taro.previewImage({
          current: res.data, // 当前显示图片的http链接
          urls: photosurl, // 需要预览的图片http链接列表
          success: (e) => {
            console.log(e)
          },
          fail: (e) => {
            console.log("fail", e)
          }
        })
      })
    }
  }
  cancelLogin = () => {
    Taro.clearStorage();
    Taro.reLaunch({
      url: "/pages/Home/index"
    })
  }

  render() {
    const { userInfo, myInfo, cardInfo } = this.props;

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

    const { type = "person", status = '1', basic } = myInfo;
    const { isOpened } = this.state;
    return (
      <View className={styles.user}>
        {/* 个人信息 */}
        <View className={styles.userInfo} onClick={this.manageCard.bind(this, "/packageA/pages/CardManage/index")}>
          <Image className={styles.bg_img} src={img_my_bg_corp} />

          <View className={styles.info}>
            <View className={styles.avatar}>
              <OpenData className={styles.avatar} type="userAvatarUrl"></OpenData>
            </View>
            {/* <Image
            className={styles.avatar}
            src={userInfo.avatarUrl}
          /> */}
            <View className={styles.lr}>
              <View className={styles.lrTop}>
                <View className={styles.name}>
                  <OpenData className={styles.name} type="userNickName"></OpenData>
                </View>
                {/* {type==="enterprise"?<Image
                  className={styles.itemtag}
                  src={img_my_corp}
                />:<Image
                className={styles.itemtag}
                src={img_vip_person}
              />} */}

              </View>
              <View className={styles.phone}>
                {myInfo.basic && myInfo.basic.levelNowName}
              </View>
              <View className={styles.phone}>
                {cardInfo.code}
                {/* <Image
                className={styles.itemIcon}
                src={cardIcon}
              /> */}
              </View>
            </View>
          </View>
          {/* <Image
            className={styles.arrow}
            src={arrowIcon}
            onClick={this.goInfo}
          /> */}
        </View>

        <View className={styles.cardtop} onClick={() => { this.manageCard("/packageA/pages/MemberCredits/index") }}>
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
        {type !== "enterprise" && <ListItem
          onClick={() => {
            if (myInfo.type && (status === "2" || status === "1" || status === "5")) {
              Taro.showToast({
                'title': '您已经提交会员申请，目前正在审核中！',
              });
              return;
            } else {
              this.manageCard("/packageA/pages/MemberShipPerson/index")
            }
          }}
          cardIcon={sjhy}
          title={'升级个人会员'}
        ></ListItem>}
        <ListItem
          onClick={() => {

            if (myInfo.type && (status === "2" || status === "1" || status === "5")) {
              Taro.showToast({
                'title': '您已经提交会员申请，目前正在审核中！',
              });
              return;
            } else {
              this.manageCard("/packageA/pages/MemberShipUpgrade/index");
            }
          }}
          cardIcon={sjhy}
          title={'升级企业会员'}
        ></ListItem>
        {token && <ListItem
          onClick={() => {
            this.manageCard("/packageA/pages/MybasePerson/index")
          }}
          cardIcon={jbxx}
          title={'个人基本信息'}
        ></ListItem>}
        {token && type === "enterprise" && <ListItem
          onClick={() => {
            this.manageCard("/packageA/pages/MyBaseInfo/index")
          }}
          cardIcon={jbxx}
          title={'企业基本信息'}
        ></ListItem>}
        {token && type === "enterprise" && <ListItem
          onClick={() => {
            this.manageCard("/packageA/pages/MyContactInfo/index")
          }
          }
          cardIcon={lxxx}
          title={'联系信息'}
        ></ListItem>}
        {token && type === "enterprise" && <ListItem
          onClick={() => { this.manageCard("/packageA/pages/MyEnterpriseScale/index") }}
          cardIcon={qygm}
          title={'企业规模'}
        ></ListItem>}

        {token && type === "enterprise" && <ListItem
          onClick={() => { this.manageCard("/packageA/pages/MyCompaniestIntroduce/index") }}
          cardIcon={qygm}
          title={'企业介绍'}
        ></ListItem>}
        {token && type === "enterprise" && <ListItem
          onClick={() => { this.manageCard("/packageA/pages/MyAlbumEnterprise/index") }}
          cardIcon={qyxc}
          title={'企业相册'}
        ></ListItem>}
        {token && type === "enterprise" && <ListItem
          onClick={() => { this.manageCard("/packageA/pages/AlbumProductList/index") }}
          cardIcon={cpxc}
          title={'产品相册'}
        ></ListItem>}
        <ListItem
          onClick={this.qrCode}
          cardIcon={gzgzh}
          title={'关注公众号'}
        ></ListItem>
        <ListItem
          onClick={this.manageCard}
          cardIcon={qygm}
          title={'会员章程'}
        ></ListItem>
        <ListItem
          onClick={() => { this.manageCard("/pages/Login/index") }}
          cardIcon={cpxc}
          title={'模拟登录'}
        ></ListItem>
        <View className={styles.loginBtn}>
          {!token ? <AtButton
            onClick={() => { this.manageCard("/pages/Home/index") }}
            type="primary"
          >登录</AtButton> : <View className={styles.loginout} onClick={this.cancelLogin} >退出登录</View>}
        </View>
      </View>

    );
  }
}

export default User as ComponentClass<PageOwnProps, PageState>;
