import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Picker,Checkbox } from "@tarojs/components";
import { AtInput,AtButton,AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
// import "taro-ui/dist/style/components/input.scss";

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

  render() {
    const {phone,dateSel} = this.state;

    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    // const titletop = `margin-top:${MenuButtonBounding.top}px;`

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <View className={styles.userInfo} >
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>


        <View className={styles.label}>
          注册资本
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="code" placeholder="请输入注册资本…" disabled={true} value={"101295"} onChange={()=>{}}/>
        </View>

        <View className={styles.label}>
          实缴资本
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入实收资本…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          工厂面积
        </View>
        <View className={styles.formItem}>
          <View>
              <Picker value={this.state.selectorChecked} mode='selector' range={this.state.selector} onChange={this.onPickerChange}>
                <AtInput className={styles.input} name="phone" placeholder=""  value={this.state.selectorChecked} onChange={()=>{}}/>
              </Picker>
          </View>
        </View>


        <View className={styles.label}>
          雇员数量
        </View>
        <View className={styles.formItem}>
          <View>
              <Picker value={this.state.selectorChecked} mode='selector' range={this.state.selector} onChange={this.onPickerChange}>
                <AtInput className={styles.input} name="phone" placeholder=""  value={this.state.selectorChecked} onChange={()=>{}}/>
              </Picker>
          </View>
        </View>



        <View className={styles.label}>
          年产值
        </View>
        <View className={styles.formItem}>
          <View>
              <Picker value={this.state.selectorChecked} mode='selector' range={this.state.selector} onChange={this.onPickerChange}>
                <AtInput className={styles.input} name="phone" placeholder=""  value={this.state.selectorChecked} onChange={()=>{}}/>
              </Picker>
          </View>
        </View>


        <View className={styles.label}>
          年销售额
        </View>
        <View className={styles.formItem}>
          <View>
              <Picker value={this.state.selectorChecked} mode='selector' range={this.state.selector} onChange={this.onPickerChange}>
                <AtInput className={styles.input} name="phone" placeholder=""  value={this.state.selectorChecked} onChange={()=>{}}/>
              </Picker>
          </View>
        </View>

        <AtButton type='primary' className={styles.loginBtn} >保存</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
