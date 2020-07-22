import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View,Image,Picker } from "@tarojs/components";
import { AtInput,AtButton,AtIcon,AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import arrowIcon from '../../../assets/user/ico_arrow@3x.png';

import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";

type PageStateProps = {
  myInfo:any;
  userInfo:any;
  ALBUM_TYPE:any;
  albums:any;
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

@connect(({ factory,myindex,global,user,loading }) => {
  const { myInfo={} } = user;
  const {ALBUM_TYPE=[]} = global;
  const {userInfo={}} = myindex;
  const {albums=[]} = factory
  return {
    myInfo,
    userInfo,
    ALBUM_TYPE,
    albums,
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
    frontPagePath:"",
    photoCover:'',
    intro:'',
    desc:'',
    albumId:'',
    selector: this.props.ALBUM_TYPE,
    selectorChecked: {label:'公司',value:'company'},
    isadded:false,
  }
  config: Config = {
    navigationBarTitleText: "企业相册",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentWillMount() {
    console.log(this.$router.params,this.props.userInfo);
    if(this.props.myInfo.albums>0){
      this.fetchList()
    }
    
  }

  fetchList = ()=>{
    const {dispatch,userInfo} = this.props;
    if(dispatch){
      dispatch({
        type: "factory/getbaseVendorAlbum",
        payload: {
          vendorId:userInfo.supplierId
        }
      }).then(()=>{
        this.albumsChange()
      });
    }
  }

  albumsChange = () =>{
      const {albums} = this.props;
      const {selectorChecked} = this.state;
      this.state.isadded = false;
      albums.forEach(item => {
        if(item.type === selectorChecked.value){
          const {intro,desc,photoCover,photos,id } = item;
          const frontFilePath = photos.map((item)=>`http://sz-spd.cn:889/${item.photo}`)
          this.setState({
            name:intro,
            category:intro,
            intro,
            desc,
            photoCover,
            photos,
            frontFilePath,
            isadded:true,
            albumId:id
          })
        }
      });
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
      count: 6-this.state.frontFilePath.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('----res:',res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        let {frontFilePath,photos,intro,selectorChecked}:any = this.state;
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
              const { userInfo } = this.props;
              console.log('-------success--dataJson:',dataJson);
              photos.push({
                "vendorId":userInfo.supplierId,
                'photo':dataJson.data.url,
                "photoName":dataJson.data.name,
                "type":selectorChecked.value,
                intro,
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
        Taro.uploadFile({
          url: process.env.PREFIX_URL + '/api/upload/sysUpload/add', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Authorization': `Bearer ${Taro.getStorageSync('token')}` || '',
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            const data = res.data;
            const dataJson = JSON.parse(data);
            console.log('-------success--dataJson:',dataJson);
            
            this.setState({
              photoCover:dataJson.data.url,
              frontPagePath: tempFilePaths[0]
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
    console.log(e)
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
      name:'',
      category:'',
      intro:'',
      desc:'',
      photoCover:'',
      photos:''
    },()=>{
      this.albumsChange()
    })
  }

  submit = () =>{
    const {dispatch,userInfo} = this.props;
    const {albumId,intro,desc,photoCover,photos,selectorChecked,isadded}:any = this.state;

    if(dispatch){
      dispatch({
        type: isadded?"factory/updatebaseVendorAlbum":"factory/addbaseVendorAlbum",
        payload:  {
          id:albumId,
          "vendorId":userInfo.supplierId,
          "type":selectorChecked.value,
          "name":intro,
          "category":intro,
          intro,
          desc,
          photoCover,
          photos
        }
      })
    }
  }

  render() {
    const {intro,desc,frontFilePath,frontPagePath} = this.state;

    return (
      <View className={styles.needdetail}>
        {/* <View className={styles.backImageItem}>
          {
            frontPagePath&&(
              <View className={styles.imageView}>
                <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteFontpage.bind(this)}></AtIcon>
                <Image mode="scaleToFill" src={frontPagePath} className={styles.image} />
              </View>
            )
          }
          {
          !frontPagePath && <View className={styles.uploadBtn} onClick={this.chooseImageFontpage}>
            <View className={styles.addIcon}>+</View>
            <View className={styles.btnTitle}>点击上传封面图片</View>
          </View>
          }
          
        </View> */}
       
        <View className={styles.label}>
          相册分类
        </View>
        <Picker value={this.state.selectorChecked.label} mode='selector' range={this.state.selector}  range-key='label' onChange={this.onPickerChange}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder=""  value={this.state.selectorChecked.label} onChange={()=>{}}/>
            </View>
            <Image
              className={styles.arrow}
              src={arrowIcon}
            />
            {/* <AtInput className={styles.input} name="phone" placeholder="请输入产品描述…"  value={phone} onChange={this.phoneChange} /> */}
          </View>
        </Picker>

        <View className={styles.label}>
          简介
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="intro" placeholder="请输入相册简介…"  value={intro} onChange={(e)=>{this.setState({intro:e})}} />
        </View>

        <View className={styles.label}>
          描述
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="desc" placeholder="请输入相册描述…"  value={desc} onChange={(e)=>{this.setState({desc:e})}} />
        </View>

        <View className={styles.label}>
          图片库
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
