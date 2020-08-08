import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Picker, Checkbox, CheckboxGroup, Button } from "@tarojs/components";
import { AtInput, AtButton, AtIcon, AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import phoneIcon from '../../../assets/ico_name@3x.png';
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_person.png';
import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";

type PageStateProps = {
  userInfo: any;
  SKILLED_FIELD: any;
  EDUCATION_LEVEL: any;
  PROCUREMENT_CATEGORY_PROCESSES: any;
  PURCHASE_SIZE: any;
  STAFF_AMOUNT: any;
  INDUSTRY_TYPE: any;
  COMPANY_PROPERTY: any;
  VIP_LEVEL: any;
  myInfo: any;
  code: any;
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

@connect(({ user, global, loading }) => {
  const { userInfo = {}, SKILLED_FIELD = [], EDUCATION_LEVEL = [], PROCUREMENT_CATEGORY_PROCESSES = [], PURCHASE_SIZE = [], STAFF_AMOUNT = [], INDUSTRY_TYPE = []
    , COMPANY_PROPERTY = [], code, VIP_LEVEL = [] } = global;
  const { myInfo } = user;
  return {
    userInfo,
    SKILLED_FIELD,
    EDUCATION_LEVEL,
    PROCUREMENT_CATEGORY_PROCESSES,
    PURCHASE_SIZE,
    STAFF_AMOUNT,
    COMPANY_PROPERTY,
    INDUSTRY_TYPE,
    myInfo,
    code,
    VIP_LEVEL,
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
    frontFilePath: '', // 正面照
    dateSel: '',
    reportTo: '',
    "name": "",
    "nickname": "",
    "account": "",
    "photo": "",
    "sex": "male",
    "birthday": "",
    "nativePlace": "",
    "education": [],
    "school": "",
    "email": "",
    "telephoe": "",
    "qq": "",
    "referrerName": "",
    "wxId": "",
    "skilledField": [],
    "companyType": [],
    "companyProperty": [],
    "industryType": [],
    "industryRanking": [],
    "companyScale": [],
    "dptScale": [],
    "purType": [],
    company: '',
    position: '',
    address: '',
    nameCard: '',
    getUserInfoLoading: false,
    submitLoading: false,
    levelNow: '',
    levelApply: '',
    levelNowName: 'VIP会员',

  }
  config: Config = {
    navigationBarTitleText: "基本信息",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#F2F3FE",
  };

  componentWillMount() {
    if (this.$router.params.userId) {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: "user/getMyInfo",
          payload: {
            // user_id:Taro.getStorageSync('user_id')
          }
        }).then(() => {
          this.initData();
        });
      }
    } else {
      this.initData();
    }
  }

  initData = () => {
    const { myInfo } = this.props; 
    console.log(myInfo)
    if (myInfo.type === "personal")
    {
      const { photo,
        name,
        birthday,
        nativePlace,
        education,
        school,
        email,
        telephoe,
        qq,
        referrerName,
        wxId,
        sex,
        levelNow, levelNowName
      } = myInfo.basic;
      const { company, reportTo, companyProperty, companyType, skilledField, industryType, industryRanking, companyScale, dptScale, purType, position, address, nameCard } = myInfo.company;
      this.setState({
        photo: nameCard,
        levelApply: levelNow, levelNowName,
        name,
        birthday,
        nativePlace,
        education,
        school,
        email,
        telephoe,
        qq,
        referrerName,
        wxId,
        sex,
        skilledField,
        industryType,
        companyProperty,
        companyScale,
        dptScale,
        purType,
        reportTo,
        company,
        position, address, frontFilePath: nameCard ? `http://sz-spd.cn:889/${nameCard}` : ''
      })
    }else{
      const { photo,
        name,
        birthday,
        nativePlace,
        education,
        school,
        email,
        telephoe,
        qq,
        referrerName,
        wxId,
        sex,
        levelNow, levelNowName
      } = myInfo.personal_basic;
      const { company, reportTo, companyProperty, companyType, skilledField, industryType, industryRanking, companyScale, dptScale, purType, position, address, nameCard } = myInfo.personal_company;
      this.setState({
        photo: nameCard,
        levelApply: levelNow, levelNowName,
        name,
        birthday,
        nativePlace,
        education,
        school,
        email,
        telephoe,
        qq,
        referrerName,
        wxId,
        sex,
        skilledField,
        industryType,
        companyProperty,
        companyScale,
        dptScale,
        purType,
        reportTo,
        company,
        position, address, frontFilePath: nameCard ? `http://sz-spd.cn:889/${nameCard}` : ''
      })
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

  Change = (type, value) => {
    console.log(type, value)
    this.setState({
      [`${type}`]: value
    })
  }

  chooseImageReverse = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('----res:', res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        Taro.uploadFile({
          url: process.env.PREFIX_URL + '/api/upload/sysUpload/add', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Authorization': Taro.getStorageSync('token') ? `Bearer ${Taro.getStorageSync('token')}` : '',
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            const data = res.data;
            const dataJson = JSON.parse(data);
            console.log('-------success--dataJson:', dataJson);

            this.setState({
              photo: dataJson.data.url,
              frontFilePath: tempFilePaths[0]
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
    })
  }

  deleteFont = () => {
    this.setState({
      frontFilePath: '',
      photo: ''
    })
  }

  onClick = (value) => {
    console.log(value);
    this.setState({ sex: value })
  }

  onClicks = async (value) => {
    this.setState({
      getUserInfoLoading: true
    });
    const { dispatch } = this.props;
    if (dispatch) {
      await dispatch({
        type: "global/getCode",
        payload: {}
      })
    }
  }

  getPhoneNumber = async e => {
    const { dispatch } = this.props;
    console.log(e);
    if (e.detail.encryptedData) {
      if (dispatch) {
        const { code } = this.props;
        dispatch({
          type: "user/getPhone",
          payload: {
            ...e.detail,
            code,
          }
        }).then((e) => {
          console.log(e);
          if (e.data) {
            this.setState({
              getUserInfoLoading: false,
              telephoe: e.data.phoneNumber
            });
          } else {
            this.setState({
              getUserInfoLoading: false,
            });
            Taro.showToast({
              'title': '手机号获取频繁，稍后再试。',
            });
          }
        });
      }
    } else {
      this.setState({
        getUserInfoLoading: false,
      });
      Taro.showToast({
        'title': '授权失败',
      });
    }

  };



  onDateChange = e => {
    debugger
    this.setState({
      birthday: e.detail.value
    })
  }

  onChange = (type, e, data: any = undefined) => {
    console.log(type, e);
    let value = e.detail.value;
    if (value instanceof Array) {
      value = value.join(',')
    }
    if (data) {
      this.setState({
        [`${type}`]: data[e.detail.value].value,
      })
    } else {
      this.setState({
        [`${type}`]: value,
        // [`${type}Name`]:e.detail.value,
      })
    }
    // this.setState({
    //   [`${type}`]:value
    // })
  }

  submit = async () => {
    const { dispatch, myInfo, userInfo } = this.props;
    const { type } = myInfo;

    const {
      photo, name, birthday, nativePlace, education, school, email, telephoe, qq, referrerName,
      wxId, sex, skilledField, industryType, companyProperty, companyScale, dptScale, purType,
      reportTo, company, position, address, submitLoading, levelApply
    } = this.state;

    if (submitLoading) {
      return
    }
    if (dispatch) {
      if (type) {
        const { introduce, basic, contact, scale, type } = myInfo;
        console.log("升级会员")
        Taro.showLoading({
          title: '提交中',
          mask: true,
        })
        dispatch({
          type: "user/updatebaseMember",
          payload: {
            ...introduce, ...basic, ...contact, ...scale, type: 'personal',
            name,
            nickname: name,
            account: telephoe,
            birthday,
            nativePlace,
            reportTo,
            education,
            school, email, telephoe, qq, referrerName, wxId, sex,
            skilledField,
            industryType,
            companyProperty,
            companyScale,
            dptScale,
            purType,
            company, position, address, nameCard: photo,
            levelApply,
            wxUser: { ...userInfo },
            // levelNow,
            // levelApply,
          }
        }).then((e) => {
          this.setState({
            submitLoading: false
          })
          Taro.hideLoading();
          // Taro.showToast({
          //   'title': '升级成功',
          // });
          // Taro.navigateBack()
        });
      } else {
        if (telephoe === '') {
          Taro.showToast({
            'title': '请输入手机号',
          });
          return;
        }
        console.log("注册会员");
        await dispatch({
          type: "global/getCode",
          payload: {}
        })
        const { code } = this.props;
        Taro.showLoading({
          title: '提交中',
          mask: true,
        })
        dispatch({
          type: "factory/registerBaseMember",
          payload: {
            name,
            nickname: name,
            account: telephoe,
            birthday,
            nativePlace,
            reportTo,
            education,
            school, email, telephoe, qq, referrerName, wxId, sex,
            skilledField,
            industryType,
            companyProperty,
            companyScale,
            dptScale,
            purType,
            // levelNow,
            // levelApply,
            company, position, address, nameCard: photo,
            wxCode: code,
            wxUser: { ...userInfo }
          }
        }).then((e) => {
          Taro.hideLoading();
          this.setState({
            submitLoading: false
          })
          // Taro.showToast({
          //   'title': '注册成功',
          // });
          // Taro.navigateBack()
        });
      }
    }
  }

  getUserInfo = e => {
    const { dispatch } = this.props;
    if (e && dispatch && e.detail && e.detail.rawData) {
      const userInfo = JSON.parse(e.detail.rawData);
      dispatch({
        type: "global/getUserInfo",
        payload: { userInfo }
      }).then(() => {
        this.submit();
      })
    } else {
      Taro.showToast({
        'title': '授权失败',
      });
    }
  };

  dicValue = (data, type) => {

    const key = data.filter(item => item.value == type);
    console.log(data, type, key)

    return key[0] && key[0].label
  }

  render() {
    const {
      name, birthday, nativePlace, education, school, email, telephoe, qq, referrerName,
      wxId, sex, skilledField, industryType, companyProperty, companyScale, dptScale,
      purType, reportTo, company, position, address, frontFilePath, submitLoading, levelApply,
    }: any = this.state;
    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    // const titletop = `margin-top:${MenuButtonBounding.top}px;`

    return (
      <View className={styles.needdetail}>
        {/* <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>
        <Image className={styles.bg_img} src={img_my_bg_corp} />

        <View className={styles.userInfo} >
        </View>

        <View className={styles.label}>
          会员等级
        </View>

        <Picker value={''} mode='selector' range={this.props.VIP_LEVEL}  range-key='label' onChange={(e)=>{this.onChange("levelApply",e,this.props.VIP_LEVEL)}}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder="请选择会员等级"  value={this.dicValue(this.props.VIP_LEVEL,levelApply)} onChange={()=>{}}/>
            </View>
          </View>
        </Picker> */}

        <View className={styles.label}>
          登记人姓名
        </View>
        <View className={classNames(styles.formItem, styles.codeItem)}>
          <View className={styles.left}>
            <Image
              className={styles.itemIcon}
              src={phoneIcon}
            />
            <AtInput className={styles.input} name="name" placeholder="请输入登记人姓名…" value={name} onChange={(e) => { this.Change('name', e) }} />
          </View>
          <View className={styles.codeBtn} >
            <AtTag name='tag-1' circle type='primary' active={sex === 'male'} onClick={this.onClick.bind(this, "male")}>先生</AtTag>
            <AtTag circle type='primary' active={sex === 'female'} onClick={this.onClick.bind(this, 'female')}>女士</AtTag>
          </View>

        </View>

        <View className={styles.label}>
          生日
        </View>
        {/* <View className={styles.formItem}> */}
            <Picker value={""} mode='date' onChange={this.onDateChange}>
            <View className={styles.formItem}>
            
            <div className={styles.input}>{birthday}</div>

              {/* <AtInput className={styles.input} name="birthday" placeholder="请选择您的出生日期…" value={birthday} onChange={(e) => {
                this.Change('birthday', e)
              }} /> */}
            </View>
            </Picker>

        {/* </View> */}
        <View className={styles.label}>
          籍贯
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="nativePlace" placeholder="请选择您的籍贯…" value={nativePlace} onChange={(e) => { this.Change('nativePlace', e) }} />
        </View>


        <View className={styles.label}>
          学历
        </View>
        {/* <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("education",e)}}>
            {
              this.props.EDUCATION_LEVEL && this.props.EDUCATION_LEVEL.map((item:any)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1"  checked={education.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>


        </View> */}
        <Picker value={''} mode='selector' range={this.props.EDUCATION_LEVEL} range-key='label' onChange={(e) => { this.onChange("education", e) }}>
          <View className={styles.formItem}>
            <View>
            <div className={styles.input}>{this.props.EDUCATION_LEVEL[education] && this.props.EDUCATION_LEVEL[education].label}</div>
              {/* <AtInput className={styles.input} name="phone" placeholder="请选择学历" value={this.props.EDUCATION_LEVEL[education] && this.props.EDUCATION_LEVEL[education].label} onChange={() => { }} /> */}
            </View>
          </View>
        </Picker>


        <View className={styles.label}>
          毕业院校
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="school" placeholder="请输入您的毕业院校…" value={school} onChange={(e) => { this.Change('school', e) }} />
        </View>

        <View className={styles.label}>
          E-mail
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="email" placeholder="请输入您的电子邮箱…" value={email} onChange={(e) => { this.Change('email', e) }} />
        </View>

        <View className={styles.label}>
          手机
        </View>
        {this.props.myInfo.type ? <View className={classNames(styles.input, styles.formItem)}>{telephoe}</View> : <View className={styles.formItem}>
          <Image
            className={styles.itemIcon}
            src={phoneIcon}
          />
          <AtInput className={styles.input} name="telephoe" placeholder="请输入您的手机号…" value={telephoe} onChange={(e) => { this.Change('telephoe', e) }} />
          <Button
            className={styles.authBtn}
            openType="getPhoneNumber"
            onGetPhoneNumber={this.getPhoneNumber}
            onClick={this.onClicks}
          // loading={this.state.getUserInfoLoading}
          >
            获取手机号码
          </Button>
        </View>}

        <View className={styles.label}>
          微信
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="wxId" placeholder="请输入您的微信号…" value={wxId} onChange={(e) => { this.Change('wxId', e) }} />
        </View>

        <View className={styles.label}>
          QQ
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="qq" placeholder="请输入您的QQ号…" value={qq} onChange={(e) => { this.Change('qq', e) }} />
        </View>

        <View className={styles.label}>
          公司
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="company" placeholder="请输入您的公司…" value={company} onChange={(e) => { this.Change('company', e) }} />
        </View>

        <View className={styles.label}>
          职位
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="position" placeholder="请输入您的职位…" value={position} onChange={(e) => { this.Change('position', e) }} />
        </View>

        <View className={styles.label}>
          通讯地址
        </View>
        <View className={styles.formItem}>
          {/* <Image
            className={styles.itemIcon}
            src={phoneIcon}
          /> */}
          <AtInput className={styles.input} name="address" placeholder="请输入通讯地址…" value={address} onChange={(e) => { this.Change('address', e) }} />
        </View>

        <View className={styles.label}>
          汇报对象
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="reportTo" placeholder="请输入汇报对象…" value={reportTo} onChange={(e) => { this.Change('reportTo', e) }} />
        </View>



        <View className={styles.label}>
          擅长领域
        </View>
        <View className={styles.formcheckboxItem}>
          <CheckboxGroup onChange={(e) => { this.onChange("skilledField", e) }}>
            {
              this.props.SKILLED_FIELD && this.props.SKILLED_FIELD.map((item) => (
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={skilledField.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
          </CheckboxGroup>
        </View>

        <View className={styles.label}>
          公司行业
        </View>
        <View className={styles.formcheckboxItem}>
          <CheckboxGroup onChange={(e) => { this.onChange("industryType", e) }}>
            {
              this.props.INDUSTRY_TYPE && this.props.INDUSTRY_TYPE.map((item) => (
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={industryType.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
          </CheckboxGroup>
        </View>
        {/* <Picker value={''} mode='selector' range={this.props.INDUSTRY_TYPE}  range-key='label' onChange={(e)=>{this.onChange("industryType",e)}}>
          <View className={styles.formItem}>
            <View>
                  <AtInput className={styles.input} name="phone" placeholder="请选择公司行业"  value={this.props.INDUSTRY_TYPE[industryType] && this.props.INDUSTRY_TYPE[industryType].label} onChange={()=>{}}/>
            </View>
          </View>
        </Picker> */}

        <View className={styles.label}>
          公司性质
        </View>
        {/* <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("companyProperty",e)}}>
            {
              this.props.COMPANY_PROPERTY && this.props.COMPANY_PROPERTY.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={companyProperty.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View> */}
        <Picker value={''} mode='selector' range={this.props.COMPANY_PROPERTY} range-key='label' onChange={(e) => { this.onChange("companyProperty", e, this.props.COMPANY_PROPERTY) }}>
          <View className={styles.formItem}>
            <View>
            <div className={styles.input}>{this.dicValue(this.props.COMPANY_PROPERTY, companyProperty)}</div>

              {/* <AtInput className={styles.input} name="phone" placeholder="请选择公司性质" value={this.dicValue(this.props.COMPANY_PROPERTY, companyProperty)} onChange={() => { }} /> */}
            </View>
          </View>
        </Picker>

        <View className={styles.label}>
          公司规模
        </View>
        {/* <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("companyScale",e)}}>
            {
              this.props.STAFF_AMOUNT && this.props.STAFF_AMOUNT.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={companyScale.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View> */}
        <Picker value={''} mode='selector' range={this.props.STAFF_AMOUNT} range-key='label' onChange={(e) => { this.onChange("companyScale", e) }}>
          <View className={styles.formItem}>
            <View>
            <div className={styles.input}>{this.props.STAFF_AMOUNT[companyScale] && this.props.STAFF_AMOUNT[companyScale].label}</div>
              {/* <AtInput className={styles.input} name="phone" placeholder="请选择公司规模" value={this.props.STAFF_AMOUNT[companyScale] && this.props.STAFF_AMOUNT[companyScale].label} onChange={() => { }} /> */}
            </View>
          </View>
        </Picker>

        <View className={styles.label}>
          采购部门规模
        </View>

        {/* <View className={styles.formcheckboxItem}>
            <CheckboxGroup onChange={(e)=>{this.onChange("dptScale",e)}}>
            {
              this.props.PURCHASE_SIZE && this.props.PURCHASE_SIZE.map((item)=>(
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={dptScale.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
            </CheckboxGroup>
        </View> */}

        <Picker value={''} mode='selector' range={this.props.PURCHASE_SIZE} range-key='label' onChange={(e) => { this.onChange("dptScale", e) }}>
          <View className={styles.formItem}>
            <View>
            <div className={styles.input}>{this.props.PURCHASE_SIZE[dptScale] && this.props.PURCHASE_SIZE[dptScale].label}</div>

              {/* <AtInput className={styles.input} name="phone" placeholder="请选择采购部门规模" value={this.props.PURCHASE_SIZE[dptScale] && this.props.PURCHASE_SIZE[dptScale].label} onChange={() => { }} /> */}
            </View>
          </View>
        </Picker>

        <View className={styles.label}>
          采购涉及品类或工艺
        </View>
        <View className={styles.formcheckboxItem}>
          <CheckboxGroup onChange={(e) => { this.onChange("purType", e) }}>
            {
              this.props.PROCUREMENT_CATEGORY_PROCESSES && this.props.PROCUREMENT_CATEGORY_PROCESSES.map((item) => (
                <View className={styles.checkboxItem}>
                  <Checkbox value={item.value} style="flex:1" checked={purType.includes(item.value)}>{item.label}</Checkbox>
                </View>
              ))
            }
          </CheckboxGroup>
        </View>
        <View className={styles.label}>
          推荐人
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="referrerName" placeholder="请输入推荐人…" value={referrerName} onChange={(e) => { this.Change('referrerName', e) }} />
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

        <AtButton
          type='primary'
          loading={submitLoading}
          className={styles.loginBtn}
          // onClick={this.submit}
          openType="getUserInfo"
          onGetUserInfo={this.getUserInfo}
        >保存</AtButton>

      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
