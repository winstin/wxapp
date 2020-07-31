import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Button,Picker } from "@tarojs/components";
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
  myInfo:any;
  code:any;
  userInfo:any;
  CORPORATE_VIP_LEVEL:any;
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

@connect(({ user,global,loading }) => {
  const {myInfo={}} = user;
  const {code,userInfo={},CORPORATE_VIP_LEVEL=[]} = global;
  return {
    myInfo,
    code,
    userInfo,
    CORPORATE_VIP_LEVEL,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

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
    drawingVo:{},
    linkman:'',
    logo:'',
    levelNow:'',
    levelApply:'',
    levelNowName:'VIP会员',
    getUserInfoLoading:false,
    submitLoading:false
  }
  config: Config = {
    navigationBarTitleText: "会员积分",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle:"custom",
  };

  componentWillMount() {
    if(this.$router.params.userId){
      const {dispatch} = this.props;
      if(dispatch){
        dispatch({
          type: "user/getMyInfo",
          payload: {
            // user_id:Taro.getStorageSync('user_id')
          }
        }).then(()=>{
          this.initData();
        });
      }
    }else{
      this.initData();
    }
  }

  initData = ()=>{
    const {myInfo={basic:{},contact:{},introduce:{}}} = this.props;
    const { businessLicenseNo,name,logo,referrerName,levelNow,levelApply,levelNowName } = myInfo.basic;
    const { introduction } = myInfo.introduce || {};

    const { linkman,linkmanPhone } = myInfo.contact || {};
    this.setState({
      businessLicenseNo,name,logo,introduction,referrerName,linkman,linkmanPhone,levelApply:levelNow,levelNowName,
      frontFilePath:logo?`http://sz-spd.cn:889/${logo}`:'',account:linkmanPhone
    })
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
            'Authorization': Taro.getStorageSync('token')?`Bearer ${Taro.getStorageSync('token')}` : '',
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            const data = res.data;
            const dataJson = JSON.parse(data);
            console.log('-------success--dataJson:',dataJson);

            this.setState({
              logo:dataJson.data.url,
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

  onClick = async (value)=>{
    this.setState({
      getUserInfoLoading: true
    });
    const {dispatch} = this.props;
    if(dispatch){
      await dispatch({
        type: "global/getCode",
        payload: {}
      })
    }
  }

  getPhoneNumber= async e => {
    const {dispatch} = this.props;
    console.log(e);
    if(e.detail.encryptedData){
      if(dispatch){
        const {code} = this.props;
        dispatch({
          type: "user/getPhone",
          payload: {
            ...e.detail,
            code,
          }
        }).then((e)=>{
          console.log(e);
          if(e.data){
            this.setState({
              getUserInfoLoading: false,
              account:e.data.phoneNumber
            });
          }else{
            this.setState({
              getUserInfoLoading: false,
            });
            Taro.showToast({
              'title': '手机号获取频繁，稍后再试。',
            });
          }
        });
      }
    }else{
      this.setState({
        getUserInfoLoading: false,
      });
      Taro.showToast({
        'title': '授权失败',
      });
    }
   
  };

  submit = async () =>{
    const {dispatch,myInfo,userInfo} = this.props;
    const {linkman,name,businessLicenseNo,introduction,account,referrerName,logo,submitLoading,levelApply}:any = this.state;
    const { type } = myInfo;
    
    if(submitLoading){
      return
    }
    if(dispatch){
      this.setState({
        submitLoading:true
      })

      if(type){
        Taro.showLoading({
          title: '提交中',
          mask: true,
        })
        const {introduce,basic,contact,scale,type} = myInfo;
        console.log("升级会员");
        dispatch({
          type: "user/levelUpbaseMember",
          payload:  {
            ...introduce,...basic,...contact,...scale,type:'enterprise',
            name,
            businessLicenseNo,
            introduction,
            linkman,
            linkmanPhone:account,
            referrerName,
            logo,
            isTop:'1',
            levelApply,
            wxUser:{...userInfo}
          }
        }).then((e)=>{
          this.setState({
            submitLoading:false
          })
          Taro.hideLoading();
          // Taro.showToast({
          //   'title': '升级成功',
          // });
          // Taro.navigateBack()
        });
      }else{
        if(account===''){
          Taro.showToast({
            'title': '请输入手机号',
          });
          return;
        }
        console.log("注册会员");
        await dispatch({
          type: "global/getCode",
          payload: {}
        })
        const {code} = this.props;
        Taro.showLoading({
          title: '提交中',
          mask: true,
        })
        dispatch({
          type: "factory/registerCorporate",
          payload:  {
            name,
            businessLicenseNo,
            introduction,
            linkman,
            linkmanPhone:account,
            referrerName,
            logo,
            isTop:'1',
            wxCode:code,
            wxUser:{...userInfo}
          }
        }).then((e)=>{
          this.setState({
            submitLoading:false
          })
          Taro.hideLoading();
          // Taro.showToast({
          //   'title': '注册成功',
          // });
          // Taro.navigateBack()
        });
      }
    }
  }

  getUserInfo = e => {
    const { dispatch } = this.props;
    if (e && dispatch && e.detail && e.detail.rawData) {
      const userInfo = JSON.parse(e.detail.rawData);
      dispatch({
        type: "global/getUserInfo",
        payload: { userInfo }
      }).then(()=>{
        this.submit();
      })
    }else{
      Taro.showToast({
        'title': '授权失败',
      });
    }
  };

  onChange = (type,e,data:any=undefined)=>{
    let value = e.detail.value;
    if(value  instanceof Array){
      value = value.join(',')
    }
    if(data){
      this.setState({
        [`${type}`]:data[e.detail.value].value,
      })
    }else{
      this.setState({
        [`${type}`]:value,
        // [`${type}Name`]:e.detail.value,
      })
    }
  }
  dicValue = (data,type) =>{

    const key = data.filter(item=>item.value == type);
    console.log(data,type,key)

    return key[0] && key[0].label
  }

  render() {
    const {linkman,name,businessLicenseNo,introduction,account,referrerName,frontFilePath,submitLoading,levelApply} = this.state;

    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    // const titletop = `margin-top:${MenuButtonBounding.top}px;`
    const {myInfo} = this.props;

    return (
      <View className={styles.needdetail}>

        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={img_my_bg_corp} />

        <View className={styles.userInfo} >
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>
        <View className={styles.label} style='display:none'>
          会员等级
        </View>

        <Picker value={''} mode='selector' style='display:none' range={this.props.CORPORATE_VIP_LEVEL}  range-key='label' onChange={(e)=>{this.onChange("levelApply",e,this.props.CORPORATE_VIP_LEVEL)}}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder="请选择会员等级"  value={this.dicValue(this.props.CORPORATE_VIP_LEVEL,levelApply)} onChange={()=>{}}/>
            </View>
          </View>
        </Picker>
        <View className={styles.label}>
          公司名称
        </View>
        {myInfo.type==="personal" && 
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <View style={'flex:1'}>
            <AtInput className={styles.input} name="name" placeholder="请输入公司名称…"  value="" onChange={(e)=>{this.Change('name',e)}} />
          </View>
        </View>
        }
        {myInfo.type==="enterprise" && 
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <View style={'flex:1'}>
            <AtInput className={styles.input} name="name" placeholder="请输入公司名称…"  value={name} onChange={(e)=>{this.Change('name',e)}} />
          </View>
        </View>
        }
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
          <View style={'flex:1'}>
            <AtInput className={styles.input} name="introduction" placeholder="请输入企业介绍…"  value={introduction} onChange={(e)=>{this.Change('introduction',e)}} />
          </View> 
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
            <AtInput className={styles.input} name="linkman" placeholder="请输入登记人姓名…"  value={linkman} onChange={(e)=>{this.Change('linkman',e)}} />
          </View>
          <View className={styles.codeBtn} >
              {/* <AtTag name='tag-1'  circle  type='primary' active={true} onClick={this.onClick.bind(this)}>先生</AtTag>
              <AtTag  circle>女士</AtTag> */}
          </View>

        </View>

        <View className={styles.label} style="display:none">
          手机号码/登录账号
        </View>
            {myInfo.type?<View className={classNames(styles.input,styles.formItem)} style="display:none">{account}</View>:<View className={styles.formItem} style="display:none">
          <Image
            className={styles.itemIcon}
            src={ico_mobilephone} 
          />
          <AtInput className={styles.input} name="account" placeholder="请输入手机号码…"  value={account} onChange={(e)=>{this.Change('account',e)}} />
          {/* <Button
            className={styles.authBtn}
            openType="getPhoneNumber"
            onGetPhoneNumber={this.getPhoneNumber}
            onClick={this.onClick}
            // loading={this.state.getUserInfoLoading}
          >
            获取手机号码
          </Button> */}
        </View>}

        <View className={styles.label}>
          推荐人姓名
        </View>
        <View className={classNames(styles.formItem,styles.codeItem)}>
          <View className={styles.left}>
            <Image
              className={styles.itemIcon}
              src={phoneIcon}
            />
            <AtInput className={styles.input} name="referrerName" placeholder="请输入推荐人姓名…"  value={referrerName} onChange={(e)=>{this.Change('referrerName',e)}} />
          </View>
          <View className={styles.codeBtn} >
              {/* <AtTag name='tag-1'  circle  type='primary' active={true} onClick={this.onClick.bind(this)}>先生</AtTag>
              <AtTag  circle>女士</AtTag> */}
          </View>

        </View>

        {/* <View className={styles.label}>
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
        </View> */}

        <AtButton 
        type='primary' 
        loading={submitLoading} 
        className={styles.loginBtn} 
        openType="getUserInfo"
        onGetUserInfo={this.getUserInfo}
        onClick={this.onClick}
        >{this.props.myInfo.type?"升级":"注册"}</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
