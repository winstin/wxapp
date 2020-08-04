import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Picker } from "@tarojs/components";
import { AtInput, AtButton, AtIcon, AtRadio, AtTextarea } from 'taro-ui'
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
  jxhReqDetail: any;
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

@connect(({ needcheck, loading }) => {
  const { jxhReqDetail = {} } = needcheck;
  return {
    jxhReqDetail,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {


  state = {
    current: 0,
    show: false,
    sort: false,
    industry: false,
    value: '',
    phone: "",
    code: '',
    frontFilePath: [], // 正面照
    photos: [],
    frontPagePath: "",
    selector: ['显示', '不显示'],
    selectorChecked: '显示',
    closeDesc: '',
    isload: true
  }
  config: Config = {
    navigationBarTitleText: "需求审核",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentWillMount() {
    console.log(this.$router.params);
    this.fetchList()
  }

  fetchList = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      // Taro.showToast({
      //   icon:'loading',
      //   title: "加载中",
      //   duration:500
      // })
      dispatch({
        type: "needcheck/getjxhReqDetail",
        payload: this.$router.params
      }).then(() => {
        const { drawings } = this.props.jxhReqDetail;
        if (drawings != null && drawings.length > 0) {
          const frontFilePath = drawings.map((item) => `http://sz-spd.cn:889/${item.url}`)
          this.setState({
            photos: drawings,
            frontFilePath,
            isLoaded: true
          })
        }
        this.setState({ isload: false })
      });
    }
  }


  handleClick(value) {
    this.setState({
      current: value
    })
  }

  onScrollToUpper() { }

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  onScroll(e) {
    console.log(e.detail)
  }

  back = () => {
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
        console.log('----res:', res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        let { frontFilePath, photos }: any = this.state;
        frontFilePath = frontFilePath.concat(tempFilePaths)
        for (let i in tempFilePaths) {
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
              console.log('-------success--dataJson:', dataJson);
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
              console.log('-----complete:', res);
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
    const { frontFilePath, photos }: any = this.state;
    frontFilePath.splice(index, 1);
    photos.splice(index, 1);
    this.setState({
      frontFilePath: JSON.parse(JSON.stringify(frontFilePath)),
      photos: JSON.parse(JSON.stringify(photos))
    })
  }

  chooseImageFontpage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('----res:', res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        this.setState({
          frontPagePath: tempFilePaths[0]
        })
      }
    })
  }



  deleteFontpage = () => {
    this.setState({
      frontPagePath: ""
    })
  }

  onClick = (value) => {
    console.log(value)
  }

  onPickerChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  submit = (type) => {
    const { dispatch } = this.props;
    const { reqDesc, qty, itemName, drawings, id } = this.props.jxhReqDetail;

    if (dispatch) {
      Taro.showToast({
        icon: 'loading',
        title: "提交中",
        duration: 500
      })
      dispatch({
        type: type === "agree" ? "needcheck/passAudit" : "needcheck/rejectpassAudit",
        payload: {
          id,
          reqDesc,
          qty,
          itemName,
          drawings: this.state.photos,
          isTop: "1",
          isShowDrawing: this.state.selectorChecked === "显示" ? '1' : '0',
          closeDesc: this.state.closeDesc
        }
      }).then(() => {
        Taro.hideLoading();
        // Taro.showToast({
        //   'title': '操作成功',
        // });
        // Taro.navigateBack()
      });
    }
  }

  infoChange = (value, type) => {
    const { dispatch, jxhReqDetail } = this.props;
    jxhReqDetail[`${type}`] = value;
    if (dispatch) {
      dispatch({
        type: "user/updateState",
        payload: jxhReqDetail
      });
    }
  }

  render() {
    // const {phone,frontFilePath,frontPagePath} = this.state;
    const { reqDesc, qty, itemName, createdDate, drawings, reqName, status, isShowDrawing, closeDesc } = this.props.jxhReqDetail;
    const { frontFilePath } = this.state;
    console.log('this.props.jxhReqDetail', closeDesc, reqDesc)
    if (status === '2') {
      this.state.selectorChecked = isShowDrawing === "1" ? '显示' : '不显示';
    }
    if (this.state.isload) {
      return null
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
        <View className={styles.margin20} />
        <View className={styles.label}>
          产品描述
        </View>
        <View className={styles.formItem}>
          {/* {itemName} */}
          <View style="flex:1">
            {status === '1' ? <AtInput className={styles.input} name="itemName" placeholder="" value={itemName} onChange={(e) => { this.infoChange(e, 'itemName') }} /> : itemName}
          </View>
          {/* <AtInput className={styles.input} name="phone" placeholder=""  value={phone} onChange={this.phoneChange} /> */}
        </View>

        <View className={styles.label}>
          需求数量
        </View>
        <View className={styles.formItem}>
          {/* {qty} */}
          {status === '1' ? <AtInput className={styles.input} name="qty" placeholder="" value={qty} onChange={(e) => { this.infoChange(e, 'qty') }} /> : qty}

          {/* <AtInput className={styles.input} name="phone" placeholder=""  value={phone} onChange={this.phoneChange} /> */}
        </View>

        <View className={styles.label}>
          要求
        </View>
        <View className={styles.formItem}>
          {/* {reqDesc} */}
          <View style="flex:1">
            {status === '1' ? <AtInput className={styles.input} name="reqDesc" placeholder="" value={reqDesc} onChange={(e) => { this.infoChange(e, 'reqDesc') }} /> : reqDesc}
          </View>
          {/* <AtInput className={styles.input} name="phone" placeholder=""  value={phone} onChange={this.phoneChange} /> */}
        </View>

        <View className={styles.label}>
          产品图片库
        </View>
        <View className={styles.formImageItem}>
          {
            frontFilePath && frontFilePath.map((item, index) => (
              <View className={styles.imageView}>
                <AtIcon value='close' size='20' color='#FF6461' className={styles.deleteBtn} onClick={this.deleteFont.bind(this, index)}></AtIcon>
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

        <View className={styles.label}>
          是否显示图纸
        </View>
        <Picker value={this.state.selectorChecked} mode='selector' range={this.state.selector} onChange={this.onPickerChange}>
          <View className={styles.formItem}>
            <View>
              <AtInput className={styles.input} name="phone" placeholder="" value={this.state.selectorChecked} onChange={() => { }} />
            </View>
            <Image
              className={styles.arrow}
              src={arrowIcon}
            />
            {/* <AtInput className={styles.input} name="phone" placeholder="请输入产品描述…"  value={phone} onChange={this.phoneChange} /> */}
          </View>
        </Picker>
        {status === "1" && <View className={styles.content} >
          <View className={styles.label} style="margin-bottom:12px">
            审核意见
          </View>
          <View className={styles.formItems}>
            <View className={styles.formItemwidth}>
              <AtTextarea
                className={styles.textarea}
                value={this.state.closeDesc}
                onChange={(e) => { this.setState({ closeDesc: e }) }}
                maxLength={200}
                placeholder='请输入审核意见…'
              />
            </View>
          </View>
        </View>
        }
        {(status === '2' || status === '3') &&
          <View>
            <View className={styles.label}>
              审核意见
            </View>
            <View className={styles.formItem}>
              {this.props.jxhReqDetail.closeDesc}
            </View>
          </View>
        }


        {status !== '2' && status !== '3' && <View className={styles.bottom}>
          <View className={classNames(styles.loginout, styles.agree)} onClick={() => { this.submit('agree') }}>通过</View>
          <View className={styles.loginout} onClick={() => { this.submit('reject') }}>作废</View>
        </View>}

      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
