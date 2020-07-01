import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { AtInput,AtButton,AtIcon,AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import phoneIcon from '../../assets/ico_name@3x.png';
import ico_mobilephone from '../../assets/ico_mobilephone@3x.png';
import ico_message from '../../assets/ico_message@3x.png';

import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";

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

  render() {
    const {phone,code,frontFilePath} = this.state;

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
          登记人姓名
        </View>
        <View className={classNames(styles.formItem,styles.codeItem)}>
          <View className={styles.left}>
            <Image
              className={styles.itemIcon}
              src={phoneIcon}
            />
            <AtInput className={styles.input} name="phone" placeholder="请输入登记人姓名…"  value={phone} onChange={this.phoneChange} />
          </View>
          <View className={styles.codeBtn} >
              <AtTag name='tag-1'  circle  type='primary' active={true} onClick={this.onClick.bind(this)}>先生</AtTag>
              <AtTag  circle>女士</AtTag>
          </View>

        </View>

        <View className={styles.label}>
          生日
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请选择您的出生日期…"  value={phone} onChange={this.phoneChange} />
        </View>
        <View className={styles.label}>
          籍贯
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请选择您的籍贯…"  value={phone} onChange={this.phoneChange} />
        </View>

        
        <View className={styles.label}>
          学历
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请选择您的最高学历…"  value={phone} onChange={this.phoneChange} />
        </View>
        
        <View className={styles.label}>
          毕业院校
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的毕业院校…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          E-mail
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的电子邮箱…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          手机
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的手机号…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          微信
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的微信号…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          QQ
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的QQ号…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          公司
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的公司…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          职位
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入您的职位…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          通讯地址
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入通讯地址…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          汇报对象
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入汇报对象…"  value={phone} onChange={this.phoneChange} />
        </View>


        <View className={styles.label}>
          汇报对象
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入汇报对象…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          擅长领域
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入擅长领域…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          公司行业
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入公司行业…"  value={phone} onChange={this.phoneChange} />
        </View>
        
        <View className={styles.label}>
          公司性质
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入公司性质…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          公司规模
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="phone" placeholder="请输入公司规模…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          采购部门规模
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入采购部门规模…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          采购涉及品类或工艺
        </View>
        <View className={styles.formItem}>
          <View style='flex:1'>
            <AtInput className={styles.input} name="phone" placeholder="请输入采购涉及品类或工艺…"  value={phone} onChange={this.phoneChange} />
          </View>
        </View>
        <View className={styles.label}>
          推荐人
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入推荐人…"  value={phone} onChange={this.phoneChange} />
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

        <AtButton type='primary' className={styles.loginBtn} >注册</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
