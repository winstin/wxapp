import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Picker,Image } from "@tarojs/components";
import { AtInput,AtButton } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
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
    navigationBarTitleText: "企业规模",
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
    myInfo.scale[`${type}`] = value;
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
    const {myInfo={scale:{}}} = this.props;
    const {staffAmount,factoryArea,annualSale,registCapital,annualValue} = myInfo.scale;

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={`http://sz-spd.cn:889/${myInfo.basic.photoCover}`} />

        <View className={styles.userInfo} >
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>


        <View className={styles.label}>
          注册资本
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="registCapital" placeholder="请输入注册资本…" disabled={true} value={registCapital} onChange={(e)=>{this.infoChange(e,'registCapital')}}/>
        </View>

        <View className={styles.label}>
          实缴资本
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="registCapital" placeholder="请输入实收资本…"  value={registCapital} onChange={(e)=>{this.infoChange(e,'introduction')}} />
        </View>

        <View className={styles.label}>
          工厂面积
        </View>
        <View className={styles.formItem}>
          <View>
              <AtInput className={styles.input} name="factoryArea" placeholder=""  value={factoryArea} onChange={(e)=>{this.infoChange(e,'factoryArea')}}/>
          </View>
        </View>


        <View className={styles.label}>
          雇员数量
        </View>
        <View className={styles.formItem}>
          <View>
              <AtInput className={styles.input} name="staffAmount" placeholder=""  value={staffAmount} onChange={(e)=>{this.infoChange(e,'staffAmount')}}/>
          </View>
        </View>



        <View className={styles.label}>
          年产值
        </View>
        <View className={styles.formItem}>
          <View>
            <AtInput className={styles.input} name="annualValue" placeholder=""  value={annualValue} onChange={(e)=>{this.infoChange(e,'annualValue')}}/>
          </View>
        </View>


        <View className={styles.label}>
          年销售额
        </View>
        <View className={styles.formItem}>
          <View>
            <AtInput className={styles.input} name="annualSale" placeholder=""  value={annualSale} onChange={(e)=>{this.infoChange(e,'annualSale')}}/>
          </View>
        </View>

        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>保存</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
