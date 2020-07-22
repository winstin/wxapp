import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image } from "@tarojs/components";
import { AtInput,AtButton,AtIcon } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
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


  state = {
    current: 0,
    show:false,
    sort:false,
    industry:false,
    value: '',
    phone:"",
    code:'',
    frontFilePath:[], // 正面照
    photos:[],
    reqDesc:'',
    qty:'',
    itemName:''
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
      count: 6 - this.state.frontFilePath.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('----res:',res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        let {frontFilePath,photos}:any = this.state;
        frontFilePath = frontFilePath.concat(tempFilePaths)
        for(let i in tempFilePaths){
          Taro.uploadFile({
            url: process.env.PREFIX_URL + '/api/upload/sysUpload/add', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              'Authorization': `Bearer ${Taro.getStorageSync('token')}` || '',
              'content-type': 'multipart/form-data',
            },
            success: (res) => {
              const data = res.data;
              const dataJson = JSON.parse(data);
              console.log('-------success--dataJson:',dataJson);
              photos.push({
                ...dataJson.data
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

        this.setState({
          frontFilePath: JSON.parse(JSON.stringify(frontFilePath))
        })
        // Taro.uploadFile({
        //   url: process.env.PREFIX_URL + '/api/upload/sysUpload/add', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   header: {
        //     'Authorization': `Bearer ${Taro.getStorageSync('token')}` || '',
        //     'content-type': 'multipart/form-data',
        //   },
        //   success: (res) => {
        //     const data = res.data;
        //     const dataJson = JSON.parse(data);
        //     console.log('-------success--dataJson:',dataJson);
        //     photos.push({
        //       ...dataJson.data
        //     })
        //     this.setState({
        //       photos:JSON.parse(JSON.stringify(photos)),
        //       frontFilePath: JSON.parse(JSON.stringify(frontFilePath))
        //     })
            
        //   },
        //   fail: (res: any) => {
        //     Taro.showToast({
        //       title: '上传失败'
        //     })
        //   },
        //   complete: (res: any) => {
        //     console.log('-----complete:',res);
        //   }
        // })
      
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

  Change = (type,value) => {
    this.setState({
      [`${type}`]: value
    })
  }

  submit = () =>{
    const {dispatch} = this.props;
    const {photos,reqDesc,qty,itemName} = this.state;

    if(dispatch){
      dispatch({
        type: "need/addjxhReq",
        payload:  {
          drawings:photos,
          reqDesc,
          qty,
          itemName
        }
      });
    }
  }


  render() {
    const {frontFilePath,reqDesc,qty,itemName} = this.state;

    return (
      <View className={styles.needdetail}>
       
        <View className={styles.label}>
          产品描述
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="itemName" placeholder="请输入产品描述…"  value={itemName} onChange={(e)=>{this.Change('itemName',e)}} />
        </View>
        <View className={styles.label}>
          需求数量
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="qty" placeholder="请输入需求数量…"  value={qty} onChange={(e)=>{this.Change('qty',e)}} />
        </View>

        <View className={styles.label}>
          要求
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="reqDesc" placeholder="请输入要求…"  value={reqDesc} onChange={(e)=>{this.Change('reqDesc',e)}} />
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
          {this.state.frontFilePath.length <6 &&
            <View className={styles.uploadBtn} onClick={this.chooseImageReverse}>
            <View className={styles.addIcon}>+</View>
            {/* <View className={styles.btnTitle}>点击上传</View> */}
          </View>
          }
          
        </View>
        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>发布</AtButton>
      
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
