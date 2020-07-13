import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Picker } from "@tarojs/components";
import { AtInput,AtButton,AtIcon,AtRadio } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import arrowIcon from '../../../assets/user/ico_arrow@3x.png';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
import "taro-ui/dist/style/components/radio.scss";
type PageStateProps = {
  jxhReqDetail:any;
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

@connect(({ needcheck,loading }) => {
  const {jxhReqDetail={}} = needcheck;
  return {
    jxhReqDetail,
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

  }
  config: Config = {
    navigationBarTitleText: "需求审核",
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
        type: "needcheck/getjxhReqDetail",
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
    const {reqDesc,qty,itemName,drawings,id} = this.props.jxhReqDetail;

    if(dispatch){
      dispatch({
        type: type==="agree"?"needcheck/passAudit":"needcheck/rejectpassAudit",
        payload: {
          id,
          reqDesc,
          qty,
          itemName,
          drawings,
          isTop:"1",
          isShowDrawing:this.state.selectorChecked==="显示"?'1':'0'
        }
      }).then(()=>{
        Taro.showToast({
          'title': '操作成功',
        });
        Taro.navigateBack()
      });
    }
  }

  render() {
    // const {phone,frontFilePath,frontPagePath} = this.state;
    const {reqDesc,qty,itemName,createdDate,drawings,reqName,status,isShowDrawing} = this.props.jxhReqDetail;
    if(status==='2'){
      this.state.selectorChecked = isShowDrawing==="1"?'显示':'不显示'
    }
    return (
      <View className={styles.needdetail}>
        <View className={styles.toplabel}>
          <View className={styles.leftlabel}>
            发布人
          </View>
          <View className={styles.text}>
            {reqName}
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
        <View className={styles.label}>
          产品描述
        </View>
        <View className={styles.formItem}>
          {itemName}
          {/* <AtInput className={styles.input} name="phone" placeholder=""  value={phone} onChange={this.phoneChange} /> */}
        </View>

        <View className={styles.label}>
          需求数量
        </View>
        <View className={styles.formItem}>
          {qty}
          {/* <AtInput className={styles.input} name="phone" placeholder=""  value={phone} onChange={this.phoneChange} /> */}
        </View>

        <View className={styles.label}>
          要求
        </View>
        <View className={styles.formItem}>
          {reqDesc}
          {/* <AtInput className={styles.input} name="phone" placeholder=""  value={phone} onChange={this.phoneChange} /> */}
        </View>

        <View className={styles.label}>
          产品图片库
        </View>
        <View className={styles.formImageItem}>
          {
            drawings.map((item,index)=>(
              <View className={styles.imageView}>
                <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteFont.bind(this,index)}></AtIcon>
                <Image mode="scaleToFill" src={`http://sz-spd.cn:889/${item.url}`} className={styles.image} />
              </View>
            ))
          }
          {
          //   <View className={styles.uploadBtn} onClick={this.chooseImageReverse}>
          //   <View className={styles.addIcon}>+</View>
          //   {/* <View className={styles.btnTitle}>点击上传</View> */}
          // </View>
          }
        </View>

        <View className={styles.label}>
          是否显示图纸
        </View>
        <Picker value={this.state.selectorChecked} mode='selector' range={this.state.selector} onChange={this.onPickerChange}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder=""  value={this.state.selectorChecked} onChange={()=>{}}/>
            </View>
            <Image
              className={styles.arrow}
              src={arrowIcon}
            />
            {/* <AtInput className={styles.input} name="phone" placeholder="请输入产品描述…"  value={phone} onChange={this.phoneChange} /> */}
          </View>
        </Picker>
        {status!=='2'&&<View className={styles.bottom}>
          <View className={classNames(styles.loginout,styles.agree)} onClick={()=>{this.submit('agree')}}>通过</View>
          <View className={styles.loginout} onClick={()=>{this.submit('reject')}}>作废</View>
        </View>}
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
