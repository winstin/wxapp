import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Picker } from "@tarojs/components";
import { AtInput,AtButton,AtIcon,AtRadio,AtTextarea } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import arrowIcon from '../../../assets/user/ico_arrow@3x.png';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
import "taro-ui/dist/style/components/radio.scss";
import "taro-ui/dist/style/components/textarea.scss";

type PageStateProps = {
  memberCheckDetail:any;
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

@connect(({ membercheck,loading }) => {
  const {memberCheckDetail={}} = membercheck;
  return {
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
    navigationBarTitleText: "需求审核",
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

  render() {
    // const {phone,frontFilePath,frontPagePath} = this.state;
    console.log('memberCheckDetail',this.props.memberCheckDetail)
    const {name,createdDate,status,referrerOpinion} = this.props.memberCheckDetail;
    if(status!=='2'){
      this.state.referrerOpinion = referrerOpinion
    }
    return (
      <View className={styles.needdetail}>
        <View className={styles.toplabel}>
          <View className={styles.leftlabel}>
            申请人
          </View>
          <View className={styles.text}>
            {name}
          </View>
        </View>
        <View className={styles.toplabel}>
          <View className={styles.leftlabel}>
            发布日期
          </View>
          <View className={styles.text}>
            {createdDate}
          </View>
        </View>
        <View className={styles.margin20}/>
        {/* <View className={styles.label}>
          产品描述
        </View>
        <View className={styles.formItem}>
          {itemName}
        </View> */}

        <View className={styles.label}>
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

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
