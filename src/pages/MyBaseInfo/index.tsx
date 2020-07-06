import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Picker,Checkbox,Image } from "@tarojs/components";
import { AtInput,AtButton,AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import img_my_bg_corp from '../../assets/factory/img_djb_bg_person.png';

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
    dateSel: ''

  }
  config: Config = {
    navigationBarTitleText: "基本信息",
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

  render() {
    const {phone,dateSel} = this.state;

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
          公司名称
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入公司名称…"  value={phone} onChange={()=>{}} />
        </View>

        <View className={styles.label}>
          公司平台代码
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="code" placeholder="请输入公司平台代码…" disabled={true} value={"101295"} onChange={()=>{}}/>
        </View>

        <View className={styles.label}>
          公司简称
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入公司简称…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          统一税务登记号
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入统一税务登记号…"  value={phone} onChange={this.phoneChange} />
        </View>


        <View className={styles.label}>
          公司网站
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入公司网站…"  value={phone} onChange={this.phoneChange} />
        </View>


        <View className={styles.label}>
          企业类型
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入企业类型…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          企业性质
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入企业性质…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          行业类型
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入企业性质…"  value={phone} onChange={this.phoneChange} />
        </View>
        <View className={styles.label}>
          行业排名
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入企业性质…"  value={phone} onChange={this.phoneChange} />
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
          <AtInput className={styles.input} name="phone" placeholder="请输入企业性质…"  value={phone} onChange={this.phoneChange} />
        </View>


        <View className={styles.label}>
          营业执照生效日期
        </View>
        <View className={styles.formItem}>
          <View>
              <Picker value={""} mode='date' onChange={this.onDateChange}>
                <AtInput className={styles.input} name="phone" placeholder="请选择您的出生日期…"  value={dateSel} onChange={()=>{}}/>
              </Picker>
          </View>
          
        </View>

        <AtButton type='primary' className={styles.loginBtn} >保存</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
