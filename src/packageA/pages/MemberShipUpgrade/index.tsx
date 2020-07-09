import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { AtInput,AtButton,AtIcon,AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import phoneIcon from '../../../assets/ico_name@3x.png';
import ico_mobilephone from '../../../assets/ico_mobilephone@3x.png';
import ico_message from '../../../assets/ico_message@3x.png';
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_corp.png';
import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";

type PageStateProps = {
  userInfo:any;
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

@connect(({ global,loading }) => {
  const {userInfo={}} = global;
  return {
    userInfo,
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
    name:'',
    businessLicenseNo:'',
    introduction:'',
    account:'',
    referrerName:'',
    drawingVo:{}
  }
  config: Config = {
    navigationBarTitleText: "会员积分",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle:"custom",
  };

  componentDidShow() {
    console.log("Taro.getMenuButtonBoundingClientRect()",Taro.getMenuButtonBoundingClientRect())
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

  Change = (type,value) => {
    this.setState({
      [`${type}`]: value
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
        Taro.uploadFile({
          url: process.env.PREFIX_URL + '/api/upload/sysUpload/add', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Authorization': `Bearer ${Taro.getStorageSync('token')}` || '',
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            const data = res.data;
            const dataJson = JSON.parse(data);
            console.log('-------success--dataJson:',dataJson);

            this.setState({
              drawingVo:dataJson.data,
              frontFilePath: tempFilePaths[0]
            })
            
          },
          fail: (res: any) => {
            Taro.showToast({
              title: '上传失败'
            })
          },
          complete: (res: any) => {
            console.log('-----complete:',res);
          }
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

  submit = () =>{
    const {dispatch} = this.props;
    const {name,businessLicenseNo,introduction,account,referrerName,drawingVo}:any = this.state;

    if(dispatch){
      dispatch({
        type: "factory/registerCorporate",
        payload:  {
          name,businessLicenseNo,introduction,
          linkman:account,
          linkmanPhone:account,
          referrerName,drawingVo,
          isTop:'1'
        }
      }).then((e)=>{
        Taro.showToast({
          'title': '注册成功',
        });
        Taro.navigateBack()
      });
    }
  }


  render() {
    const {name,businessLicenseNo,introduction,account,referrerName,code,frontFilePath} = this.state;

    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    // const titletop = `margin-top:${MenuButtonBounding.top}px;`

    return (
      <View className={styles.needdetail}>

        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={img_my_bg_corp} />

        <View className={styles.userInfo} >
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>
        <View className={styles.label}>
          公司名称
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="name" placeholder="请输入公司名称…"  value={name} onChange={(e)=>{this.Change('name',e)}} />
        </View>
        <View className={styles.label}>
          税务登记号
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="businessLicenseNo" placeholder="请输入统一税务登记号…"  value={businessLicenseNo} onChange={(e)=>{this.Change('businessLicenseNo',e)}} />
        </View>

        <View className={styles.label}>
          公司logo
        </View>
        <View className={styles.formImageItem}>
          {
            frontFilePath && <View className={styles.imageView}>
              <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteFont}></AtIcon>
              <Image mode="scaleToFill" src={frontFilePath} className={styles.image} />
            </View>
          }
          {
            !frontFilePath && <View className={styles.uploadBtn} onClick={this.chooseImageReverse}>
            <View className={styles.addIcon}>+</View>
            {/* <View className={styles.btnTitle}>点击上传</View> */}
          </View>
          }
          
        </View>
        <View className={styles.label}>
          企业介绍
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="introduction" placeholder="请输入企业介绍…"  value={introduction} onChange={(e)=>{this.Change('introduction',e)}} />
        </View>
        <View className={styles.label}>
          登记人姓名
        </View>
        <View className={classNames(styles.formItem,styles.codeItem)}>
          <View className={styles.left}>
            <Image
              className={styles.itemIcon}
              src={phoneIcon}
            />
            <AtInput className={styles.input} name="referrerName" placeholder="请输入登记人姓名…"  value={referrerName} onChange={(e)=>{this.Change('referrerName',e)}} />
          </View>
          <View className={styles.codeBtn} >
              {/* <AtTag name='tag-1'  circle  type='primary' active={true} onClick={this.onClick.bind(this)}>先生</AtTag>
              <AtTag  circle>女士</AtTag> */}
          </View>

        </View>

        <View className={styles.label}>
          手机号码/登录账号
        </View>
        <View className={styles.formItem}>
          <Image
            className={styles.itemIcon}
            src={ico_mobilephone}
          />
          <AtInput className={styles.input} name="account" placeholder="请输入手机号码…"  value={account} onChange={(e)=>{this.Change('account',e)}} />
        </View>

        <View className={styles.label}>
          短信验证码
        </View>
        <View className={classNames(styles.formItem,styles.codeItem)}>
          <View className={styles.left}>
          <Image
            className={styles.itemIcon}
            src={ico_message}
          />
          <AtInput className={styles.input} name="password" type='password' placeholder="请输入短信验证码…"  value={code} onChange={(e)=>{this.Change('password',e)}} />
          </View>
          <View className={styles.codeBtn} >发送验证码</View>
        </View>

        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>注册</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
