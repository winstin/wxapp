import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Picker,Checkbox,Image,CheckboxGroup } from "@tarojs/components";
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
  userInfo:any;
  SKILLED_FIELD:any;
  EDUCATION_LEVEL:any;
  PROCUREMENT_CATEGORY_PROCESSES:any;
  PURCHASE_SIZE:any;
  STAFF_AMOUNT:any;
  INDUSTRY_TYPE:any;
  COMPANY_PROPERTY:any;
  INDUSTRY_RANKING:any;
  COMPANY_TYPE:any;
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

@connect(({ user,global,loading }) => {    
  const {userInfo={},SKILLED_FIELD=[],EDUCATION_LEVEL=[],PROCUREMENT_CATEGORY_PROCESSES=[],PURCHASE_SIZE=[],STAFF_AMOUNT=[],INDUSTRY_TYPE=[]
  ,COMPANY_PROPERTY=[],INDUSTRY_RANKING=[],COMPANY_TYPE=[]} = global;
  const {myInfo} = user;
  return {
    userInfo,
    SKILLED_FIELD,
    EDUCATION_LEVEL,
    PROCUREMENT_CATEGORY_PROCESSES,
    PURCHASE_SIZE,
    STAFF_AMOUNT,
    COMPANY_PROPERTY,
    INDUSTRY_TYPE,
    INDUSTRY_RANKING,
    COMPANY_TYPE,
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
    frontPagePath:'',
    companyType:'',
    companyProperty:'',
    industryType:[],
    industryRanking:'',
    reportTo:'',
  }
  config: Config = {
    navigationBarTitleText: "基本信息",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentWillMount(){
    const {myInfo} = this.props;
    const {company,reportTo,companyProperty,companyType,skilledField,industryType,industryRanking,companyScale,dptScale,purType,position,address,nameCard} = myInfo.company || myInfo.basic;

    this.setState({
      frontPagePath:`http://sz-spd.cn:889/${myInfo.basic.photoCover}`,
      photoCover:myInfo.basic.photoCover,
      companyType,
      companyProperty,
      industryType,
      industryRanking,
      reportTo,
    })
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
    const {industryType,companyProperty,industryRanking,companyType,reportTo} = this.state;
    if(dispatch){
      dispatch({
        type: "user/updatebaseMember",
        payload: {
          ...introduce,...basic,...contact,...scale,photoCover:this.state.photoCover,industryType,companyProperty,industryRanking,companyType,reportTo
          
        }
      });
    }
  }

  onChange = (type,e,data:any = undefined)=>{
    console.log(type,e);
    if(type === "industryType"){
      this.setState({
        [`${type}`]:e.detail.value.join(','),
        // [`${type}Name`]:e.detail.value,
      })
    }else{
      if(data){
        this.setState({
          [`${type}`]:data[e.detail.value].value,
        })
      }else{
        this.setState({
          [`${type}`]:e.detail.value,
          // [`${type}Name`]:e.detail.value,
        })
      }
      
    }
    
  }

  dicValue = (data,type) =>{
    const key = data.filter(item=>item.value == type);
    console.log(data,type,key)
    return key[0] && key[0].label
  }

  render() {
    const {phone,frontPagePath,industryType,companyProperty,industryRanking,companyType,reportTo} = this.state;
    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;

    const {myInfo={basic:{}}} = this.props;
    const {code,name,companyTypeName,companyPropertyname,industryTypeName,industryRankingName,productTechName,businessLicenseNo,licenseDate,licensePic,birthday} = myInfo.basic;
    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        {/* <Image className={styles.bg_img} src={img_my_bg_corp} />

        <View className={styles.userInfo} >
        </View> */}

        {myInfo.type==="enterprise" && <View className={styles.backImageItem}>
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
          
        </View>}
        
        <View className={styles.label}>
          {myInfo.type==="personal"?"姓名":"公司名称"}
        </View>
        <View className={styles.formItem}>
          <View className={styles.flex}>
          <AtInput className={styles.input} name="name" placeholder="请输入公司名称…"  value={name} onChange={(e)=>{this.infoChange(e,'name')}} />
          </View>
        </View>
        
        {myInfo.type==="personal" && 
          <View>
              <View className={styles.label}>
                生日
              </View>
              <View className={styles.formItem}>
                <View>
                    <Picker value={""} mode='date' onChange={this.onDateChange}>
                      <AtInput className={styles.input} name="birthday" placeholder="请选择您的出生日期…"  value={birthday} onChange={(e)=>{this.infoChange(e,'birthday')}}/>
                    </Picker>
                </View>
              </View>
          </View>
        }
        {myInfo.type==="enterprise" && 
          <View>
            <View className={styles.label}>
              公司平台编码
            </View>
            <View className={styles.formItem}>
              <AtInput className={styles.input} name="code" placeholder="请输入公司平台编码…" disabled={true} value={code} onChange={(e)=>{this.infoChange(e,'code')}}/>
            </View>
          </View>
        }
        {/* <View className={styles.label}>
          公司简称
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入公司简称…"  value={phone} onChange={(e)=>{this.infoChange(e,'phone')}} />
        </View> */}
        {myInfo.type==="enterprise" && 
          <View>
            <View className={styles.label}>
              统一税务登记号
            </View>
            <View className={styles.formItem}>
              <AtInput className={styles.input} name="businessLicenseNo" placeholder="请输入统一税务登记号…"  value={businessLicenseNo} onChange={(e)=>{this.infoChange(e,'businessLicenseNo')}} />
            </View>
          </View>
        }

        {/* <View className={styles.label}>
          公司网站
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入公司网站…"  value={phone} onChange={(e)=>{this.infoChange(e,'phone')}} />
        </View> */}


        <View className={styles.label}>
          企业类型
        </View>
        {/* <View className={styles.formcheckboxItem}> */}
          {/* <CheckboxGroup onChange={(e)=>{this.onChange("companyType",e)}}>
            {
              this.props.COMPANY_TYPE && this.props.COMPANY_TYPE.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={companyType.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
          </CheckboxGroup> */}
          <Picker value={''} mode='selector' range={this.props.COMPANY_TYPE}  range-key='label' onChange={(e)=>{this.onChange("companyType",e,this.props.COMPANY_TYPE)}}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder=""  value={this.dicValue(this.props.COMPANY_TYPE,this.state.companyType)} onChange={()=>{}}/>
            </View>
            {/* <AtInput className={styles.input} name="phone" placeholder="请输入产品描述…"  value={phone} onChange={this.phoneChange} /> */}
          </View>
        </Picker>
          {/* <AtInput className={styles.input} name="companyTypeName" placeholder="请输入企业类型…"  value={companyTypeName} onChange={(e)=>{this.infoChange(e,'companyTypeName')}} /> */}
        {/* </View> */}

        <View className={styles.label}>
          企业性质
        </View>
        {/* <View className={styles.formcheckboxItem}> */}
          {/* <CheckboxGroup onChange={(e)=>{this.onChange("companyProperty",e)}}>
            {
              this.props.COMPANY_PROPERTY && this.props.COMPANY_PROPERTY.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={companyProperty.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
          </CheckboxGroup> */}
          <Picker value={''} mode='selector' range={this.props.COMPANY_PROPERTY}  range-key='label' onChange={(e)=>{this.onChange("companyProperty",e,this.props.COMPANY_PROPERTY)}}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder=""  value={this.dicValue(this.props.COMPANY_PROPERTY,this.state.companyProperty)} onChange={()=>{}}/>
            </View>
            {/* <AtInput className={styles.input} name="phone" placeholder="请输入产品描述…"  value={phone} onChange={this.phoneChange} /> */}
          </View>
          </Picker>
          {/* <AtInput className={styles.input} name="companyPropertyname" placeholder="请输入企业性质…"  value={companyPropertyname} onChange={(e)=>{this.infoChange(e,'companyPropertyname')}} /> */}
        {/* </View> */}

        <View className={styles.label}>
          行业类型
        </View>
        <View className={styles.formcheckboxItem}>
          <CheckboxGroup onChange={(e)=>{this.onChange("industryType",e)}}>
            {
              this.props.INDUSTRY_TYPE && this.props.INDUSTRY_TYPE.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={industryType.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
          </CheckboxGroup>
          {/* <AtInput className={styles.input} name="industryTypeName" placeholder="请输入企业性质…"  value={industryTypeName} onChange={(e)=>{this.infoChange(e,'industryTypeName')}} /> */}
        </View>
        <View className={styles.label}>
          行业排名
        </View>
        {/* <View className={styles.formcheckboxItem}> */}
          {/* <CheckboxGroup onChange={(e)=>{this.onChange("industryRanking",e)}}>
            {
              this.props.INDUSTRY_RANKING && this.props.INDUSTRY_RANKING.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={industryRanking.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
          </CheckboxGroup> */}

          <Picker value={''} mode='selector' range={this.props.INDUSTRY_RANKING}  range-key='label' onChange={(e)=>{this.onChange("industryRanking",e,this.props.INDUSTRY_RANKING)}}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder=""  value={this.dicValue(this.props.INDUSTRY_RANKING,this.state.industryRanking)} onChange={()=>{}}/>
            </View>
            {/* <AtInput className={styles.input} name="phone" placeholder="请输入产品描述…"  value={phone} onChange={this.phoneChange} /> */}
          </View>
          </Picker>
          {/* <AtInput className={styles.input} name="industryRankingName" placeholder="请输入企业性质…"  value={industryRankingName} onChange={(e)=>{this.infoChange(e,'industryRankingName')}} /> */}
        {/* </View> */}
        {myInfo.type !== "enterprise" && 
          <View>
            <View className={styles.label}>
              汇报对象
            </View>
            <View className={styles.formItem}>
                <AtInput className={styles.input} name="reportTo" placeholder="请输入企业性质…"  value={reportTo} onChange={(e)=>{this.infoChange(e,'reportTo')}} /> 
            </View>
          </View>
        }

        {/* <View className={styles.label}>
          主要供货类别
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入企业性质…"  value={phone} onChange={(e)=>{this.infoChange(e,'phone')}} />
        </View> */}

        {myInfo.type === "enterprise" && 
          <View>
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
          </View>
      }

        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>保存</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
