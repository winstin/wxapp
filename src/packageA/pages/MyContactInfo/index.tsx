import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Picker,Checkbox,Image } from "@tarojs/components";
import { AtInput,AtButton,AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
// import "taro-ui/dist/style/components/input.scss";
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_person.png';

type PageStateProps = {
  myInfo:any;
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

@connect(({ user,loading }) => {
  const {myInfo={}} = user;
  return {
    myInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  industryList = [
    {
      title:'找工厂',
      star:2
    },
    {
      title:'最新需求',
      star:3
    },
    {
      title:'会员审核',
      star:4
    },
    {
      title:'需求审核',
      star:5
    },
    {
      title:'邀请企业',
      star:5
    },
    {
      title:'邀请好友',
      star:5
    },
    {
      title:'签到',
      star:5
    },
    {
      icon: "",
      title:''
    },
  ]

  state = {
    current: 0,
    show:false,
    sort:false,
    industry:false,
    value: '',
    phone:"",
    code:'',
    frontFilePath:'', // 正面照
    dateSel: '',
    selector: ['美国', '中国', '巴西', '日本'],
    selectorChecked: '美国',


  }
  config: Config = {
    navigationBarTitleText: "联系信息",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle:"custom",
  };

  componentDidShow() {
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

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onScrollToUpper() {}

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  onScroll(e){
    console.log(e.detail)
  }

  back=()=>{
    Taro.navigateBack()
  }

  // 手机号输入框
  phoneChange = (value) => {
    this.setState({
      phone: value
    })
  }

  chooseImageReverse = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('----res:',res);
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

  onClick = (value)=>{
    console.log(value)
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  onPickerChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  infoChange = (value,type) => {
    const {dispatch,myInfo} = this.props;
    myInfo.contact[`${type}`] = value;
    if(dispatch){
      dispatch({
        type: "user/updateState",
        payload: myInfo
      });
    }
  }

  submit = ()=>{
    const {dispatch,myInfo} = this.props;
    const {introduce,basic,contact,scale} = myInfo;
    if(dispatch){
      dispatch({
        type: "user/updatebaseMember",
        payload: {
          ...introduce,...basic,...contact,...scale
        }
      });
    }
  }

  render() {
    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    // const titletop = `margin-top:${MenuButtonBounding.top}px;`
    const {myInfo={contact:{}}} = this.props;
    const {companyTel,legalPerson,countryName,provinceName,cityName,address,zipCode,linkman,linkmanPhone,email} = myInfo.contact;

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={`http://sz-spd.cn:889/${myInfo.basic.photoCover}`} />

        <View className={styles.userInfo} >
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>

        <View className={styles.label}>
          企业电话
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="companyTel" placeholder="请输入企业电话…"  value={companyTel} onChange={(e)=>{this.infoChange(e,'companyTel')}} />
        </View>

        <View className={styles.label}>
          法人
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="legalPerson" placeholder="请输入法人…" value={legalPerson} onChange={(e)=>{this.infoChange(e,'legalPerson')}}/>
        </View>

        <View className={styles.label}>
          供应商所属国家
        </View>
        <View className={styles.formItem}>
          <View>
              <AtInput className={styles.input} name="countryName" placeholder=""  value={countryName} onChange={(e)=>{this.infoChange(e,'countryName')}}/>
          </View>
        </View>
        <View className={styles.label}>
          省份
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="provinceName" placeholder="请输入省份…"  value={provinceName} onChange={(e)=>{this.infoChange(e,'provinceName')}} />
        </View>


        <View className={styles.label}>
          城市
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="cityName" placeholder="请输入城市…"  value={cityName} onChange={(e)=>{this.infoChange(e,'cityName')}} />
        </View>


        <View className={styles.label}>
          详细地址
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="address" placeholder="请输入详细地址…"  value={address} onChange={(e)=>{this.infoChange(e,'address')}} />
        </View>

        <View className={styles.label}>
          邮编
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="zipCode" placeholder="请输入邮编…"  value={zipCode} onChange={(e)=>{this.infoChange(e,'zipCode')}} />
        </View>

        <View className={styles.label}>
          联系人
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="linkman" placeholder="请输入联系人…"  value={linkman} onChange={(e)=>{this.infoChange(e,'linkman')}} />
        </View>
        <View className={styles.label}>
          联系电话
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="linkmanPhone" placeholder="请输入联系电话…"  value={linkmanPhone} onChange={(e)=>{this.infoChange(e,'linkmanPhone')}} />
        </View>

        <View className={styles.label}>
          电子邮箱
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="email" placeholder="请输入电子邮箱…"  value={email} onChange={(e)=>{this.infoChange(e,'email')}} />
        </View>

        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>保存</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;