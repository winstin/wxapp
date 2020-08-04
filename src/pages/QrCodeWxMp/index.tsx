import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { AtInput, AtButton } from 'taro-ui'
import classNames from 'classnames';
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";
import ico_comment from '../../assets/need/ico_comment@3x.png';
import ico_share from '../../assets/need/ico_share@3x.png';
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
  return {
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  state = {
    qrCode: 0,
  }
  config: Config = {
    navigationBarTitleText: "公众号二维码",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentDidShow() {
    console.log(this.$router.params);
    this.QrCode()
  }

  QrCode = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: "user/getQrCode",
        payload: {}
      }).then((res) => {
        this.setState({
          qrCode: res.data
        })
      });
    }
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

  //转发
  onShareAppMessage(res) {
    const { id } = this.props.jxhReqDetail;

    return {
      title: "需求详情",
      path: `/pages/NeedDetail/index?id=${id}`
    }
  }

  render() {

    const { qrCode } = this.state;
    return (
      <View className={styles.qrCode}>
        <View>
          <Image src={`${qrCode}`} />
        </View>
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
