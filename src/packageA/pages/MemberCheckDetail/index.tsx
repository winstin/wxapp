import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Picker } from "@tarojs/components";
import { AtInput,AtButton,AtIcon,AtRadio,AtTextarea } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import arrowIcon from '../../../assets/user/ico_arrow@3x.png';
import Index2 from '../../../assets/Index2.jpeg';
import ListItem from '../../../pages/User/components/ListItem/index';
import qyxc from '../../../assets/user/ico_my_qyxc@3x.png';
import cpxc from '../../../assets/user/ico_my_cpxc@3x.png';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
import "taro-ui/dist/style/components/radio.scss";
import "taro-ui/dist/style/components/textarea.scss";

type PageStateProps = {
  memberCheckDetail:any;
  corporateDetail:any;
  SKILLED_FIELD:any;
  EDUCATION_LEVEL:any;
  PROCUREMENT_CATEGORY_PROCESSES:any;
  PURCHASE_SIZE:any;
  STAFF_AMOUNT:any;
  INDUSTRY_TYPE:any;
  COMPANY_PROPERTY:any;
  INDUSTRY_RANKING:any;
  COMPANY_TYPE:any;
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

@connect(({ membercheck,global,factory,loading }) => {
  const {corporateDetail={}} = factory;
  const {memberCheckDetail={}} = membercheck;
  const {SKILLED_FIELD=[],EDUCATION_LEVEL=[],PROCUREMENT_CATEGORY_PROCESSES=[],PURCHASE_SIZE=[],STAFF_AMOUNT=[],INDUSTRY_TYPE=[]
  ,COMPANY_PROPERTY=[],INDUSTRY_RANKING=[],COMPANY_TYPE=[]} = global;
  return {
    corporateDetail,
    SKILLED_FIELD,
    EDUCATION_LEVEL,
    PROCUREMENT_CATEGORY_PROCESSES,
    PURCHASE_SIZE,
    STAFF_AMOUNT,
    COMPANY_PROPERTY,
    INDUSTRY_TYPE,
    INDUSTRY_RANKING,
    COMPANY_TYPE,
    memberCheckDetail,
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
    frontFilePath:[], // 正面照
    frontPagePath:"",
    selector: ['显示', '不显示'],
    selectorChecked: '显示',
    referrerOpinion:''

  }
  config: Config = {
    navigationBarTitleText: "会员审核",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentDidShow() {
    var pages = Taro.getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setState()方法，把数据存到上一个页面中去
    prevPage.$component.setState({
      reload:true,
      type:this.$router.params.type 
    })
    console.log(this.$router.params)
    this.fetchList()
  }

  fetchList = ()=>{
    const {dispatch} = this.props;
    if(dispatch){
      dispatch({
        type: "factory/getcorporateDetail",
        payload: this.$router.params
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
        const {frontFilePath}:any = this.state;
        frontFilePath.push(tempFilePaths[0])
        this.setState({
          frontFilePath: JSON.parse(JSON.stringify(frontFilePath))
        })
      }
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
        this.setState({
          frontPagePath: tempFilePaths[0]
        })
      }
    })
  }

  deleteFont = (index) => {
    const {frontFilePath}:any = this.state;
    frontFilePath.splice(index,1)
    this.setState({
      frontFilePath: JSON.parse(JSON.stringify(frontFilePath))
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

  onPickerChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  submit = (type) =>{
    const {dispatch} = this.props;
    const {id} = this.props.memberCheckDetail;
    let dispatchType;
    if(this.$router.params.type === "person"){
      dispatchType = type==="agree"?"membercheck/auditbasemember":"membercheck/rejectbasemember"
    }else{
      dispatchType = type==="agree"?"membercheck/auditcorporate":"membercheck/rejectcorporate"
    }
    
    if(dispatch){
      dispatch({
        type: dispatchType,
        payload: {
          id,
          referrerOpinion:this.state.referrerOpinion
        }
      })
    }
  }

  manageCard = (url) => {
    Taro.navigateTo({
      url
    })
  }

  render() {
    
    const {
      name,productTechName,countryName,provinceName,factoryAreaName,logo,
      staffAmountName,introduction,businessLicenseNo,referrerOpinion,
      address,companyTel,legalPerson,star,linkmanPhone,shortName,companyTypeName,companyPropertyName,industryType='',id
    } = this.props.corporateDetail;
    const industryData = this.props.INDUSTRY_TYPE.filter((item)=>`${industryType}`.includes(item.value))||[];
    const industryarr = industryData && industryData.map((item)=>item.label) || '';
    const {createdDate,status} = this.props.memberCheckDetail;
    if(status!=='2'){
      this.state.referrerOpinion = referrerOpinion
    }
    return (
      <View className={styles.needdetail}>
        <View className={styles.title}>
          {name}
        </View>
        <View className={styles.list}>
        <View>
          <Image src={logo?`http://sz-spd.cn:889/${logo}`:Index2} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.tips} >
            主要工艺
          </View>
          <View className={styles.title} >
            {productTechName}
          </View>
        </View>
      </View>
        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              公司介绍
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.conenttext} style="margin-left:0px">
            {introduction}
            </View>
          </View>
        </View>


        <View className={styles.content} style="padding-bottom:0px" >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              公司档案
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            企业简称
            </View>
            <View className={styles.conenttext} >
            {shortName}
            </View>
          </View>

          <View className={styles.tips2} >
            <View className={styles.label} >
            企业类型
            </View>
            <View className={styles.conenttext} >
            {companyTypeName}
            </View>
          </View>

          <View className={styles.tips2} >
            <View className={styles.label} >
            企业性质
            </View>
            <View className={styles.conenttext} >
            {companyPropertyName}
            </View>
          </View>

          <View className={styles.tips2} >
            <View className={styles.label} >
            行业类别
            </View>
            <View className={styles.conenttext} >
            {industryarr.join(',')}
            </View>
          </View>


          <View className={styles.tips2} >
            <View className={styles.label} >
            国家地区
            </View>
            <View className={styles.conenttext} >
            {countryName}，{provinceName}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            详细地址
            </View>
            <View className={styles.conenttext} >
            {address}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            统一税务登记号
            </View>
            <View className={styles.conenttext} >
            {businessLicenseNo}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            企业电话
            </View>
            <View className={styles.conenttext} >
            {companyTel}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            法人
            </View>
            <View className={styles.conenttext} >
            {legalPerson}
            </View>
          </View>

          <View className={styles.tips2} >
            <View className={styles.label} >
            联系人手机
            </View>
            <View className={styles.conenttext} >
            {linkmanPhone}
            </View>
          </View>

          <View className={styles.tips2} >
            <View className={styles.label} >
            星级
            </View>
            <View className={styles.conenttext} >
            {star}
            </View>
          </View>
          
          <View className={styles.tips2} >
            <View className={styles.label} >
            工厂面积
            </View>
            <View className={styles.conenttext} >
            {factoryAreaName}
            </View>
          </View>
          <View className={styles.tips2} style="margin-bottom:10px">
            <View className={styles.label} >
            雇员数量
            </View>
            <View className={styles.conenttext} >
            {staffAmountName}
            </View>
          </View>
          <ListItem 
          onClick={()=>{this.manageCard(`/pages/AlbumEnterprise/index?vendorId=${id}`)}}
          cardIcon={qyxc}
            title={'企业相册'}
          ></ListItem>
          <ListItem 
            onClick={()=>{this.manageCard("/pages/AlbumProduct/index")}}
            cardIcon={cpxc}
            title={'产品相册'}
          ></ListItem>
        </View>


        <View className={styles.content} >
          <View className={styles.tips} >
            <View className={styles.tipicon} />
            <View className={styles.tipstext} >
              协会评价
            </View>
          </View>
          <View className={styles.tips2} >
           
            <View className={styles.conenttext} >
            {referrerOpinion}
            </View>
          </View>
          
        </View>

        <View className={styles.content} >
          <View className={styles.label} style="margin-bottom:12px">
            审核理由
          </View>
          <View className={styles.formItem}>
            <View className={styles.formItemwidth}>
              <AtTextarea
                className={styles.textarea}
                value={this.state.referrerOpinion}
                onChange={(e)=>{this.setState({referrerOpinion:e})}}
                maxLength={200}
                placeholder='请输入审核理由…'
              />
            </View>
          </View>

        
          {status==='2'&&
          <View className={styles.bottom}>
            <View className={classNames(styles.loginout,styles.agree)} onClick={()=>{this.submit('agree')}}>通过</View>
            <View className={styles.loginout} onClick={()=>{this.submit('reject')}}>拒绝</View>
          </View>}
        </View>
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
