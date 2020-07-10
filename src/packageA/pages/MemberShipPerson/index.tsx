import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Picker,Checkbox,CheckboxGroup } from "@tarojs/components";
import { AtInput,AtButton,AtIcon,AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import phoneIcon from '../../../assets/ico_name@3x.png';
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_person.png';
import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";

type PageStateProps = {
  userInfo:any;
  SKILLED_FIELD:any;
  EDUCATION_LEVEL:any;
  PROCUREMENT_CATEGORY_PROCESSES:any;
  PURCHASE_SIZE:any;
  STAFF_AMOUNT:any;
  INDUSTRY_TYPE:any;
  COMPANY_PROPERTY:any;
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
  const {userInfo={},SKILLED_FIELD=[],EDUCATION_LEVEL=[],PROCUREMENT_CATEGORY_PROCESSES=[],PURCHASE_SIZE=[],STAFF_AMOUNT=[],INDUSTRY_TYPE=[]
  ,COMPANY_PROPERTY=[]} = global;
  return {
    userInfo,
    SKILLED_FIELD,
    EDUCATION_LEVEL,
    PROCUREMENT_CATEGORY_PROCESSES,
    PURCHASE_SIZE,
    STAFF_AMOUNT,
    COMPANY_PROPERTY,
    INDUSTRY_TYPE,
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
    "name":"",
    "nickname":"",
    "account":"",
    "photo":"", 
    "sex":"male",
    "birthday":"",
    "native_place":"", 
    "education":[],
    "school":"",
    "email":"",
    "telephoe":"", 
    "qq":"",
    "referrerName":"",
    "wx_id":"",
    "skilledField": [],
    "companyType": [],
    "companyProperty": [],
    "industryType": [],
    "industryRanking": [],
    "companyScale" :[],
    "dptScale": [],
    "purType": []

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
              photo:dataJson.data.url,
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
    console.log(value);
    this.setState({sex:value})
  }

  onDateChange = e => {
    this.setState({
      birthday: e.detail.value
    })
  }

  onChange = (type,e)=>{
    console.log(type,e);
    this.setState({
      [`${type}`]:e.detail.value
    })
  }

  submit = () =>{
    const {dispatch} = this.props;
    const {
      photo,name,birthday,native_place,education,school,email,telephoe,qq,referrerName,
      wx_id,sex,skilledField,industryType,companyProperty,companyScale,dptScale,purType
    } = this.state;

    if(dispatch){
      dispatch({
        type: "factory/registerBaseMember",
        payload:  {
          photo,name,
          nickname:name,
          account:telephoe,
          birthday,
          native_place,
          education:education.join(','),
          school,email,telephoe,qq,referrerName,wx_id,sex,
          skilledField:skilledField.join(','),
          industryType:industryType.join(','),
          companyProperty:companyProperty.join(','),
          companyScale:companyScale.join(','),
          dptScale:dptScale.join(','),
          purType:purType.join(',')
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
    const {phone,name,birthday,native_place,school,email,telephoe,qq,referrerName,wx_id,frontFilePath,sex} = this.state;

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
          登记人姓名
        </View>
        <View className={classNames(styles.formItem,styles.codeItem)}>
          <View className={styles.left}>
            <Image
              className={styles.itemIcon}
              src={phoneIcon}
            />
            <AtInput className={styles.input} name="name" placeholder="请输入登记人姓名…"  value={name} onChange={(e)=>{this.Change('name',e)}} />
          </View>
          <View className={styles.codeBtn} >
              <AtTag name='tag-1'  circle  type='primary' active={sex==='male'} onClick={this.onClick.bind(this,"male")}>先生</AtTag>
              <AtTag  circle type='primary' active={sex==='female'} onClick={this.onClick.bind(this,'female')}>女士</AtTag>
          </View>

        </View>

        <View className={styles.label}>
          生日
        </View>
        <View className={styles.formItem}>
          <View>
              <Picker value={""} mode='date' onChange={this.onDateChange}>
                <AtInput className={styles.input} name="birthday" placeholder="请选择您的出生日期…"  value={birthday} onChange={(e)=>{
                  this.Change('birthday',e)
                  }}/>
              </Picker>
          </View>
          
        </View>
        <View className={styles.label}>
          籍贯
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="native_place" placeholder="请选择您的籍贯…"  value={native_place} onChange={(e)=>{this.Change('native_place',e)}} />
        </View>

        
        <View className={styles.label}>
          学历
        </View>
        <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("education",e)}}>
            {
              this.props.EDUCATION_LEVEL && this.props.EDUCATION_LEVEL.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" >{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View>
       
        
        <View className={styles.label}>
          毕业院校
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="school" placeholder="请输入您的毕业院校…"  value={school} onChange={(e)=>{this.Change('school',e)}} />
        </View>

        <View className={styles.label}>
          E-mail
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="email" placeholder="请输入您的电子邮箱…"  value={email} onChange={(e)=>{this.Change('email',e)}} />
        </View>

        <View className={styles.label}>
          手机
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="telephoe" placeholder="请输入您的手机号…"  value={telephoe} onChange={(e)=>{this.Change('telephoe',e)}} />
        </View>

        <View className={styles.label}>
          微信
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="wx_id" placeholder="请输入您的微信号…"  value={wx_id} onChange={(e)=>{this.Change('wx_id',e)}} />
        </View>

        <View className={styles.label}>
          QQ
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="qq" placeholder="请输入您的QQ号…"  value={qq} onChange={(e)=>{this.Change('qq',e)}} />
        </View>

        <View className={styles.label}>
          公司
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的公司…"  value={phone} onChange={(e)=>{this.Change('name',e)}} />
        </View>

        <View className={styles.label}>
          职位
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的职位…"  value={phone} onChange={(e)=>{this.Change('name',e)}} />
        </View>

        <View className={styles.label}>
          通讯地址
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入通讯地址…"  value={phone} onChange={(e)=>{this.Change('name',e)}} />
        </View>

        <View className={styles.label}>
          汇报对象
        </View>
        <View className={styles.formcheckboxItem}>
          <View>
            <View className={styles.checkboxItem}>
              <Checkbox value='0' checked>总经理</Checkbox>
            </View>
            <View className={styles.checkboxItem}>
              <Checkbox value='1'>CPO</Checkbox>
            </View>
            <View className={styles.checkboxItem}>
              <Checkbox value='2'>供应链总监</Checkbox>
            </View>
            <View className={styles.checkboxItem}>
              <Checkbox value='3'>运营经理</Checkbox>
            </View>
            <View className={styles.checkboxItem}>
              <Checkbox value='4'>其他</Checkbox>
            </View>
          </View>
        </View>



        <View className={styles.label}>
          擅长领域
        </View>
        <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("skilledField",e)}}>
            {
              this.props.SKILLED_FIELD && this.props.SKILLED_FIELD.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" >{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View>

        <View className={styles.label}>
          公司行业
        </View>
        <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("industryType",e)}}>
            {
              this.props.INDUSTRY_TYPE && this.props.INDUSTRY_TYPE.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" >{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View>
        
        <View className={styles.label}>
          公司性质
        </View>
        <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("companyProperty",e)}}>
            {
              this.props.COMPANY_PROPERTY && this.props.COMPANY_PROPERTY.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" >{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View>

        <View className={styles.label}>
          公司规模
        </View>
        <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("companyScale",e)}}>
            {
              this.props.STAFF_AMOUNT && this.props.STAFF_AMOUNT.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" >{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View>

        <View className={styles.label}>
          采购部门规模
        </View>
        
        <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("dptScale",e)}}>
            {
              this.props.PURCHASE_SIZE && this.props.PURCHASE_SIZE.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" >{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View>

        <View className={styles.label}>
          采购涉及品类或工艺
        </View>
        <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("purType",e)}}>
            {
              this.props.PROCUREMENT_CATEGORY_PROCESSES && this.props.PROCUREMENT_CATEGORY_PROCESSES.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" >{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View>
        <View className={styles.label}>
          推荐人
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="referrerName" placeholder="请输入推荐人…"  value={referrerName} onChange={(e)=>{this.Change('referrerName',e)}} />
        </View>

        <View className={styles.label}>
          名片上传
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

        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>注册</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
