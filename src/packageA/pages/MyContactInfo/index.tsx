import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Picker, Checkbox, Image } from "@tarojs/components";
import { AtInput, AtButton, AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import classNames from 'classnames';
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/tag.scss";
// import "taro-ui/dist/style/components/input.scss";
import img_my_bg_corp from '../../../assets/factory/img_djb_bg_person.png';

type PageStateProps = {
  myInfo: any;
  dispatch<K = any>(action: AnyAction): K;
};

type PageOwnProps = {
  loading: boolean;
};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Home {
  props: IProps;
}

@connect(({ user, loading }) => {
  const { myInfo = {} } = user;
  return {
    myInfo,
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
    country: [],
    province: [],
    city: [],
    countryObject: { name: '', id: '', code: '' },
    provinceObject: { name: '', id: '', code: '' },
    cityObject: { name: '', id: '', code: '' },

  }
  config: Config = {
    navigationBarTitleText: "联系信息",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#F2F3FE",
    navigationStyle: "custom",
  };
  componentWillMount() {
    this.initData();
  }

  initData = () => {
    const { myInfo } = this.props;
    console.log(myInfo)
    const {
      photoCover
    } = myInfo.basic;
    this.setState({
      frontFilePath: photoCover ? photoCover : '/xcxhome/img_my_bg_corp.png'
    })

  }
  async componentDidShow() {
    const { dispatch, myInfo } = this.props;
    const { contact = {} } = myInfo;
    if (dispatch) {
      const country = await dispatch({
        type: "user/getSysRegionAllList",
        payload: {
          type: 0,
          parentid: -1
        }
      });
      let countryObject;
      if (contact.countryCode) {
        countryObject = country.filter(item => item.code === contact.countryCode)[0];
      } else {
        countryObject = country[0];
      }
      const province = await dispatch({
        type: "user/getSysRegionAllList",
        payload: {
          type: 1,
          parentid: countryObject.id
        }
      });
      let provinceObject;
      if (contact.provinceCode) {
        provinceObject = province.filter(item => item.code === contact.provinceCode)[0];
      } else {
        provinceObject = province[0];
      }
      const city = await dispatch({
        type: "user/getSysRegionAllList",
        payload: {
          type: 2,
          parentid: provinceObject.id
        }
      });
      let cityObject;
      if (contact.cityCode) {
        cityObject = city.filter(item => item.code === contact.cityCode)[0];
      } else {
        cityObject = city[0];
      }
      // console.log(countryObject,provinceObject,cityObject)
      this.setState({
        country,
        province,
        city,
        countryObject,
        provinceObject,
        cityObject,
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
        console.log('----res:', res);
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

  onClick = (value) => {
    console.log(value)
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }


  infoChange = (value, type) => {
    const { dispatch, myInfo } = this.props;
    myInfo.contact[`${type}`] = value;
    if (dispatch) {
      dispatch({
        type: "user/updateState",
        payload: myInfo
      });
    }
  }

  onPickerChange = (e, type, fetchType) => {
    const { dispatch } = this.props;
    this.setState({
      [`${type}Object`]: this.state[`${type}`][e.detail.value],
    }, async () => {
      if (type === "province") {
        const city = await dispatch({
          type: "user/getSysRegionAllList",
          payload: {
            type: 2,
            parentid: this.state.provinceObject.id
          }
        });
        const cityObject = city[0];

        this.setState({
          // country,
          // province,
          city,
          // countryObject,
          // provinceObject,
          cityObject,
        })
      }
    })
  }
  imgError = (obj) => {
    obj.src = img_my_bg_corp;
  }

  submit = () => {
    const { dispatch, myInfo } = this.props;
    const { introduce, basic, contact, scale } = myInfo;
    const { countryObject, provinceObject, cityObject } = this.state;
    if (dispatch) {
      Taro.showLoading({
        title: '提交中',
        mask: true,
      })
      dispatch({
        type: "user/updatebaseMember",
        payload: {
          ...introduce, ...basic, ...contact, ...scale,
          countryCode: countryObject.code,
          provinceCode: provinceObject.code,
          cityCode: cityObject.code,
        }
      }).then(() => {
        Taro.hideLoading();
      });
    }
  }

  render() {
    const MenuButtonBounding = Taro.getMenuButtonBoundingClientRect();
    const topstyle = `top:${MenuButtonBounding.top}px;`;
    // const titletop = `margin-top:${MenuButtonBounding.top}px;`
    const { myInfo = { contact: {} } } = this.props;
    const { companyTel, legalPerson, countryName, provinceName, cityName, address, zipCode, linkman, linkmanPhone, email } = myInfo.contact;

    return (
      <View className={styles.needdetail}>
        <View className='at-icon at-icon-chevron-left goback' onClick={this.back} style={topstyle}></View>

        <Image className={styles.bg_img} src={`http://sz-spd.cn:889/${frontFilePath}`} onError={(e) => { this.imgError(e) }} />

        <View className={styles.userInfo} >
          {/* <View className={styles.tips} style={titletop}>产品展示</View> */}
        </View>

        <View className={styles.label}>
          企业电话
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="companyTel" placeholder="请输入企业电话…" value={companyTel} onChange={(e) => { this.infoChange(e, 'companyTel') }} />
        </View>

        <View className={styles.label}>
          法人
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="legalPerson" placeholder="请输入法人…" value={legalPerson} onChange={(e) => { this.infoChange(e, 'legalPerson') }} />
        </View>

        <View className={styles.label}>
          供应商所属国家
        </View>
        {/* <View className={styles.formItem}>
          <View>
              <AtInput className={styles.input} name="countryName" placeholder=""  value={countryName} onChange={(e)=>{this.infoChange(e,'countryName')}}/>
          </View>
        </View> */}
        <Picker value={this.state.countryObject.name} mode='selector' range={this.state.country} range-key='name' onChange={(e) => this.onPickerChange(e, "country", 0)}>
          <View className={styles.formItem}>
            <View>
              <AtInput className={styles.input} name="country" placeholder="" value={this.state.countryObject.name} onChange={() => { }} />
            </View>
          </View>
        </Picker>
        <View className={styles.label}>
          省份
        </View>
        <Picker value={this.state.provinceObject.name} mode='selector' range={this.state.province} range-key='name' onChange={(e) => this.onPickerChange(e, "province", 1)}>
          <View className={styles.formItem}>
            <View>
              <AtInput className={styles.input} name="province" placeholder="" value={this.state.provinceObject.name} onChange={() => { }} />
            </View>
          </View>
        </Picker>
        {/* <View className={styles.formItem}>
          <AtInput className={styles.input} name="provinceName" placeholder="请输入省份…"  value={provinceName} onChange={(e)=>{this.infoChange(e,'provinceName')}} />
        </View> */}


        <View className={styles.label}>
          城市
        </View>
        <Picker value={this.state.cityObject.name} mode='selector' range={this.state.city} range-key='name' onChange={(e) => this.onPickerChange(e, "city", 2)}>
          <View className={styles.formItem}>
            <View>
              <AtInput className={styles.input} name="city" placeholder="" value={this.state.cityObject.name} onChange={() => { }} />
            </View>
          </View>
        </Picker>
        {/* <View className={styles.formItem}>
          <AtInput className={styles.input} name="cityName" placeholder="请输入城市…"  value={cityName} onChange={(e)=>{this.infoChange(e,'cityName')}} />
        </View> */}


        <View className={styles.label}>
          详细地址
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="address" placeholder="请输入详细地址…" value={address} onChange={(e) => { this.infoChange(e, 'address') }} />
        </View>

        <View className={styles.label}>
          邮编
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="zipCode" placeholder="请输入邮编…" value={zipCode} onChange={(e) => { this.infoChange(e, 'zipCode') }} />
        </View>

        <View className={styles.label}>
          联系人
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="linkman" placeholder="请输入联系人…" value={linkman} onChange={(e) => { this.infoChange(e, 'linkman') }} />
        </View>
        <View className={styles.label}>
          联系电话
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="linkmanPhone" placeholder="请输入联系电话…" value={linkmanPhone} onChange={(e) => { this.infoChange(e, 'linkmanPhone') }} />
        </View>

        <View className={styles.label}>
          电子邮箱
        </View>
        <View className={styles.formItem}>
          <AtInput className={styles.input} name="email" placeholder="请输入电子邮箱…" value={email} onChange={(e) => { this.infoChange(e, 'email') }} />
        </View>

        <AtButton type='primary' className={styles.loginBtn} onClick={this.submit}>保存</AtButton>

      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
