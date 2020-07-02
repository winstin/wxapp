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
    frontFilePath:[], // 正面照

  }
  config: Config = {
    navigationBarTitleText: "发布需求",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

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

  deleteFont = (index) => {
    const {frontFilePath}:any = this.state;
    frontFilePath.splice(index,1)
    this.setState({
      frontFilePath: JSON.parse(JSON.stringify(frontFilePath))
    })
  }

  onClick = (value)=>{
    console.log(value)
  }

  render() {
    const {phone,frontFilePath} = this.state;

    return (
      <View className={styles.needdetail}>
       
        <View className={styles.label}>
          产品描述
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入产品描述…"  value={phone} onChange={this.phoneChange} />
        </View>
        <View className={styles.label}>
          需求数量
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入需求数量…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          要求
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="phone" placeholder="请输入要求…"  value={phone} onChange={this.phoneChange} />
        </View>

        <View className={styles.label}>
          图纸
        </View>
        <View className={styles.formImageItem}>
          {
            frontFilePath.map((item,index)=>(
              <View className={styles.imageView}>
                <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteFont.bind(this,index)}></AtIcon>
                <Image mode="scaleToFill" src={item} className={styles.image} />
              </View>
            ))
          }
          {
            <View className={styles.uploadBtn} onClick={this.chooseImageReverse}>
            <View className={styles.addIcon}>+</View>
            {/* <View className={styles.btnTitle}>点击上传</View> */}
          </View>
          }
          
        </View>
        <AtButton type='primary' className={styles.loginBtn} >发布</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
