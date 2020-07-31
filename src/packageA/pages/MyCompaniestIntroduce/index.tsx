import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Picker, Checkbox, Image } from "@tarojs/components";
import { AtInput, AtButton, AtTextarea } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
import "taro-ui/dist/style/components/textarea.scss";
// @import "~taro-ui/dist/style/components/textarea.scss";
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_person.png';

type PageStateProps = {
  myInfo: any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Home {
  props: IProps;
}

@connect(({ user, loading }) => {
  const { myInfo = {} } = user;
  return {
    myInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  industryList = [
    {
      title: '找工厂',
      star: 2
    },
    {
      title: '最新需求',
      star: 3
    },
    {
      title: '会员审核',
      star: 4
    },
    {
      title: '需求审核',
      star: 5
    },
    {
      title: '邀请企业',
      star: 5
    },
    {
      title: '邀请好友',
      star: 5
    },
    {
      title: '签到',
      star: 5
    },
    {
      icon: "",
      title: ''
    },
  ]

  state = {
    current: 0,
    show: false,
    sort: false,
    industry: false,
    value: '',
    phone: "",
    code: '',
    frontFilePath: '', // 正面照
    dateSel: ''

  }
  config: Config = {
    navigationBarTitleText: "基本信息",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle: "custom",
  };

  componentWillMount() {
    this.initData();
  }

  initData = () => {
    const { myInfo } = this.props;
    console.log(myInfo)
    const {
      photoCover
    } = myInfo.basic;
    this.setState({
      frontFilePath: photoCover ? photoCover : '/xcxhome/img_my_bg_corp.png'
    })

  }
  componentDidShow() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: "user/getMyInfo",
        payload: {
          // user_id:Taro.getStorageSync('user_id')
        }
      });
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  onScrollToUpper() { }

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  onScroll(e) {
    console.log(e.detail)
  }

  back = () => {
    Taro.navigateBack()
  }

  // 手机号输入框
  phoneChange = (value, type) => {
    const { dispatch, myInfo } = this.props;
    myInfo.introduce[`${type}`] = value;
    if (dispatch) {
      dispatch({
        type: "user/updateState",
        payload: myInfo
      });
    }
  }

  chooseImageReverse = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('----res:', res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        this.setState({
          reverseFilePath: tempFilePaths[0]
        })
      }
    })
  }

  deleteFont = () => {
    this.setState({
      frontFilePath: ''
    })
  }

  onClick = (value) => {
    console.log(value)
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  submit = () => {
    const { dispatch, myInfo } = this.props;
    const { introduce, basic, contact, scale } = myInfo;

    if (dispatch) {
      Taro.showLoading({
        title: '提交中',
        mask: true,
      })
      dispatch({
        type: "user/updatebaseMember",
        payload: {
          ...introduce, ...basic, ...contact, ...scale
        }
      }).then(() => {
        Taro.hideLoading();
      });
    }
  }

  render() {
    const { phone, dateSel } = this.state;

    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    // const titletop = `margin-top:${MenuButtonBounding.top}px;`
    const { myInfo = { introduce: {} } } = this.props;
    const { introduction, keyCustomer, businessScope } = myInfo.introduce;

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={`http://sz-spd.cn:889/${frontFilePath}`} />

        <View className={styles.userInfo} >
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>

        <View className={styles.label}>
          关键客户
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <View className={styles.formItemwidth}>
            <AtTextarea
              className={styles.textarea}
              value={keyCustomer}
              onChange={(e) => { this.phoneChange(e, 'keyCustomer') }}
              maxLength={200}
              placeholder='请输入关键客户…'
            />
          </View>
          {/* <AtInput className={styles.input} name="phone" placeholder="请输入关键客户…"  value={phone} onChange={()=>{}} /> */}
        </View>

        <View className={styles.label}>
          公司营业范围
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemwidth}>
            <AtTextarea
              className={styles.textarea}
              value={businessScope}
              onChange={(e) => { this.phoneChange(e, 'businessScope') }}
              maxLength={200}
              placeholder='请输入公司营业范围…'
            />
          </View>
        </View>

        <View className={styles.label}>
          企业简介
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemwidth}>
            <AtTextarea
              className={styles.textarea}
              value={introduction}
              onChange={(e) => { this.phoneChange(e, 'introduction') }}
              maxLength={200}
              placeholder='请输入企业简介…'
            />
          </View>
        </View>


        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>保存</AtButton>

      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
