import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { AtIcon,AtButton } from 'taro-ui';
import { View,Input,Text,Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
// import "taro-ui/dist/style/components/icon.scss";
import styles from "./index.modules.less";

type PageStateProps = {
  makerInfo:any;
  dispatch?<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface UserAuth {
  props: IProps;
}

@connect(({ user,loading }) => {
  const {makerInfo={}} = user;
  return {
    makerInfo,
    loading: loading.effects['parent/getStudentList'],
  }
})
class UserAuth extends Component {
  state = {
    name: '',
    IDNumber: '',
    frontFilePath:'', // 正面照
    reverseFilePath:'',// 反面照
  }
  config: Config = {
    navigationBarTitleText: "实名认证",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#ffffff",
  };

  async componentDidMount() {
    const { makerInfo, dispatch } = this.props;
    if(makerInfo.verifyStatus === 1){
      if(dispatch){
        const frontFilePath = await dispatch({
          type: "user/getOssFile",
          payload: {
            name:makerInfo.idImage1
          }
        });

        const reverseFilePath = await dispatch({
          type: "user/getOssFile",
          payload: {
            name:makerInfo.idImage2
          }
        });

        this.setState({
          name:makerInfo.realName,
          IDNumber:makerInfo.idNo,
          frontFilePath,
          reverseFilePath
        })
      }
      
    }
   
  }

  chooseImageFront = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('----res:',res);

        
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        Taro.uploadFile({
          url: process.env.PREFIX_URL + '/api/agileworker-resource/oss/put-file', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Blade-Auth': `bearer ${Taro.getStorageSync('token')}` || '',
          },
          // formData: {
          //   'token': `bearer ${Taro.getStorageSync('token')}` || '',
          //   'key': '1'
          // },
          success (res){
            const data = res.data
            //do something
          }
        })

        this.setState({
          frontFilePath: tempFilePaths[0]
        })
      }
    })
  }

  // 删除正面照
  deleteFont = () => {
    this.setState({
      frontFilePath: ''
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

  // 删除反面照
  deleteReverse = () => {
    this.setState({
      reverseFilePath: ''
    })
  }

  // 提交
  submit = async () => {
    const {frontFilePath,reverseFilePath,name,IDNumber} = this.state;
    if (!name) {
      Taro.showToast({
        title: '请输入真实姓名'
      })
      return;
    }
    if (!IDNumber) {
      Taro.showToast({
        title: '请输入身份证号'
      })
      return;
    }
    if (!frontFilePath) {
      Taro.showToast({
        title: '请上传身份证正面照'
      })
      return;
    }
    if (!reverseFilePath) {
      Taro.showToast({
        title: '请上传身份证反面照'
      })
      return;
    }

    const {dispatch,makerInfo} = this.props;
    if(dispatch){
      await dispatch({
        type: "user/makerIdentity",
        payload: {
          "realName": name,
          "idNo": IDNumber,
          "idImage1": frontFilePath,
          "idImage2": reverseFilePath,
          "id": makerInfo.id
        }
      });

      await dispatch({
        type: "user/fetchmakerDetails",
        payload: {
          user_id:Taro.getStorageSync('user_id')
        }
      });

      Taro.navigateBack()
      // Taro.redirectTo({
      //   url: "/pages/UserInfo/index"
      // })
    }
    // TODO 处理参数 调用认证api
  }

 
  render() {
    const {frontFilePath,reverseFilePath,name,IDNumber} = this.state;
    const { makerInfo } = this.props;
    return (
      <View className={styles.userAuth}>
        <View className={styles.formView}>
          <View className={styles.formItem}>
            <Text className={styles.itemTitle}>真实姓名</Text>
            <Input 
              className={styles.input} 
              placeholder="请输入真实姓名" 
              value={name}
              onInput={(e) => {
                this.setState({
                  name:e.detail.value
                })
              }} 
            />
          </View>
          <View className={styles.formItem}>
            <Text className={styles.itemTitle}>身份证号</Text>
            <Input 
              className={styles.input} 
              placeholder="请输入身份证号" 
              value={IDNumber}
              onInput={(e) => {
                this.setState({
                  IDNumber:e.detail.value
                })
              }}
            />
          </View>
          <View className={styles.formImageItem}>
            <Text className={styles.itemTitle}>身份证正面（人像面）</Text>
            {
              frontFilePath && <View className={styles.imageView}>
                <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteFont}></AtIcon>
                <Image mode="scaleToFill" src={frontFilePath} className={styles.image} />
              </View>
            }
            {
              !frontFilePath && <View className={styles.uploadBtn} onClick={this.chooseImageFront}>
              <View className={styles.addIcon}>+</View>
              <View className={styles.btnTitle}>点击上传</View>
            </View>
            }
            
          </View>
          <View className={styles.formImageItem}>
            <Text className={styles.itemTitle}>身份证反面（国徽面）</Text>
            {
              reverseFilePath && <View className={styles.imageView}>
              <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteReverse}></AtIcon>
              <Image mode="scaleToFill" src={reverseFilePath} className={styles.image} />
            </View>
            }
            {
              !reverseFilePath && <View className={styles.uploadBtn} onClick={this.chooseImageReverse}>
              <View className={styles.addIcon}>+</View>
              <View className={styles.btnTitle}>点击上传</View>
            </View>
            }
          </View>
        </View>
        {makerInfo.verifyStatus !== 0 && <AtButton className={styles.submitBtn} type="primary" onClick={this.submit}>提交</AtButton>}
      </View>
    );
  }
}

export default UserAuth as ComponentClass<PageOwnProps, PageState>;
