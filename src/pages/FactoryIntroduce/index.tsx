import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import Index2 from '../../assets/Index2.jpeg';

type PageStateProps = {
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

@connect(({ factory,global,loading }) => {
  const {corporateDetail={}} = factory;
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
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  state = {
    current: 0,
    show:false,
    sort:false,
    industry:false
  }
  config: Config = {
    navigationBarTitleText: "企业介绍",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentDidShow() {
    console.log(this.$router.params);
    this.fetchList()
  }

  fetchList = ()=>{
    const {dispatch} = this.props;
    if(dispatch){
      // Taro.showToast({
      //   icon:'loading',
      //   title: "加载中",
      //   duration:500
      // })
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

  render() {

    const {
      name,productTech,countryName,provinceName,factoryArea,
      staffAmount,introduction,businessLicenseNo,referrerOpinion,
      address,companyTel,legalPerson,star,linkmanPhone,shortName,companyTypeName,companyPropertyName,industryType=''
    } = this.props.corporateDetail;
    const industryData = this.props.INDUSTRY_TYPE.filter((item)=>`${industryType}`.includes(item.value))||[];
    const industryarr = industryData && industryData.map((item)=>item.label) || ''
    return (
      <View className={styles.needdetail}>
        <View className={styles.title}>
          {name}
        </View>
        <View className={styles.list}>
        <View>
          <Image src={Index2} className={styles.listimg} />
        </View>
        <View >
          <View className={styles.tips} >
            主要工艺
          </View>
          <View className={styles.title} >
            {productTech}
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
            <View className={styles.conenttext} >
            {introduction}
            </View>
          </View>
        </View>


        <View className={styles.content} >
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
            {factoryArea}
            </View>
          </View>
          <View className={styles.tips2} >
            <View className={styles.label} >
            雇员数量
            </View>
            <View className={styles.conenttext} >
            {staffAmount}
            </View>
          </View>
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
       
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
