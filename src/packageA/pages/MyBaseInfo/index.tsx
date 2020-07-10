import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Picker,Checkbox,Image } from "@tarojs/components";
import { AtInput,AtButton,AtIcon } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_person.png';

import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
// import "taro-ui/dist/style/components/input.scss";

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
    photoCover:'',
    frontPagePath:''
  }
  config: Config = {
    navigationBarTitleText: "基本信息",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentWillMount(){
    const {myInfo} = this.props;
    this.setState({frontPagePath:`http://sz-spd.cn:889/${myInfo.basic.photoCover}`})
  }
  componentDidShow() {
      
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

  chooseImageFontpage = () => {
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
              photoCover:dataJson.data.url,
              frontPagePath: tempFilePaths[0]
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


  deleteFontpage = () => {
    this.setState({
      frontPagePath: ""
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

  infoChange = (value,type) => {
    const {dispatch,myInfo} = this.props;
    myInfo.basic[`${type}`] = value;
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
          ...introduce,...basic,...contact,...scale,photoCover:this.state.photoCover,
        }
      });
    }
  }

  render() {
    const {phone,frontPagePath} = this.state;
    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;

    const {myInfo={basic:{}}} = this.props;
    const {code,name,companyTypeName,companyPropertyname,industryTypeName,industryRankingName,productTechName,businessLicenseNo,licenseDate,licensePic} = myInfo.basic;

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        {/* <Image className={styles.bg_img} src={img_my_bg_corp} />

        <View className={styles.userInfo} >
        </View> */}

        <View className={styles.backImageItem}>
          {
            frontPagePath&&(
              <View className={styles.imageView}>
                <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteFontpage.bind(this)}></AtIcon>
                <Image mode="scaleToFill" src={frontPagePath} className={styles.image} />
              </View>
            )
          }
          {
          !frontPagePath && <View className={styles.uploadBtn} onClick={this.chooseImageFontpage}>
            <View className={styles.addIcon}>+</View>
            <View className={styles.btnTitle}>点击上传封面图片</View>
          </View>
          }
          
        </View>
        
        <View className={styles.label}>
          公司名称
        </View>
        <View className={styles.formItem}>
          <View className={styles.flex}>
          <AtInput className={styles.input} name="name" placeholder="请输入公司名称…"  value={name} onChange={(e)=>{this.infoChange(e,'name')}} />
          </View>
        </View>

        <View className={styles.label}>
          公司平台代码
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="code" placeholder="请输入公司平台代码…" disabled={true} value={code} onChange={(e)=>{this.infoChange(e,'code')}}/>
        </View>

        <View className={styles.label}>
          公司简称
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入公司简称…"  value={phone} onChange={(e)=>{this.infoChange(e,'phone')}} />
        </View>

        <View className={styles.label}>
          统一税务登记号
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="businessLicenseNo" placeholder="请输入统一税务登记号…"  value={businessLicenseNo} onChange={(e)=>{this.infoChange(e,'businessLicenseNo')}} />
        </View>


        <View className={styles.label}>
          公司网站
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入公司网站…"  value={phone} onChange={(e)=>{this.infoChange(e,'phone')}} />
        </View>


        <View className={styles.label}>
          企业类型
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="companyTypeName" placeholder="请输入企业类型…"  value={companyTypeName} onChange={(e)=>{this.infoChange(e,'companyTypeName')}} />
        </View>

        <View className={styles.label}>
          企业性质
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="companyPropertyname" placeholder="请输入企业性质…"  value={companyPropertyname} onChange={(e)=>{this.infoChange(e,'companyPropertyname')}} />
        </View>

        <View className={styles.label}>
          行业类型
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="industryTypeName" placeholder="请输入企业性质…"  value={industryTypeName} onChange={(e)=>{this.infoChange(e,'industryTypeName')}} />
        </View>
        <View className={styles.label}>
          行业排名
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="industryRankingName" placeholder="请输入企业性质…"  value={industryRankingName} onChange={(e)=>{this.infoChange(e,'industryRankingName')}} />
        </View>

        <View className={styles.label}>
          汇报对象
        </View>
        <View className={styles.formcheckboxItem}>
          <View>
            <View className={styles.checkboxItem}>
              <Checkbox value='0' checked>机处理</Checkbox>
            </View>
            <View className={styles.checkboxItem}>
              <Checkbox value='1'>表面加工</Checkbox>
            </View>
          </View>
        </View>

        <View className={styles.label}>
          主要供货类别
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入企业性质…"  value={phone} onChange={(e)=>{this.infoChange(e,'phone')}} />
        </View>


        <View className={styles.label}>
          营业执照生效日期
        </View>
        <View className={styles.formItem}>
          <View>
              <Picker value={""} mode='date' onChange={this.onDateChange}>
                <AtInput className={styles.input} name="licenseDate" placeholder="请选择您的出生日期…"  value={licenseDate} onChange={(e)=>{this.infoChange(e,'licenseDate')}}/>
              </Picker>
          </View>
          
        </View>

        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>保存</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
