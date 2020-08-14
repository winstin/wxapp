import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { AtInput, AtButton, AtList, AtListItem, AtAvatar } from 'taro-ui'
import classNames from 'classnames';
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/icon.scss";
import ico_comment from '../../assets/need/ico_comment@3x.png';
import ico_share from '../../assets/need/ico_share@3x.png';
import "taro-ui/dist/style/components/list.scss"
import "taro-ui/dist/style/components/avatar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/article.scss";
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
    msg: "",
    parentsId: '1',
    parentsName: '',
  }
  config: Config = {
    navigationBarTitleText: "需求详情",
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: "#F2F3FE",
    // navigationStyle:"custom",
  };

  componentDidShow() {
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
        payload: this.$router.params,
        // payload:{
        //   id:'1278941345442643969'
        // }
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

  reqComment = () => {
    const { dispatch, jxhReqDetail } = this.props;
    const { msg, parentsId } = this.state;
    Taro.showToast({
      icon: 'loading',
      title: "提交中",
      duration: 500
    })
    if (dispatch) {
      dispatch({
        type: "need/addjxhReqMsg",
        payload: {
          reqId: jxhReqDetail.id,
          parentsId,
          msg,
        }
      }).then((e) => {
        this.setState({
          parentsId: '1',
          parentsName: "",
          msg: ''
        })
        this.fetchList();
        Taro.hideLoading();
      });
    }
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

    const { name, desc, intro, category, reqName, phone, itemName, levelName, createdDate, companyName, qty, reqDesc, drawings, id, jxhReqMsgs, closeDesc, statusName, status } = this.props.jxhReqDetail;
    const { msg, parentsName } = this.state;
    return (
      <View className={styles.needdetail}>
        <View className={styles.list}>
          {/* <View>
            <Image src={`http://sz-spd.cn:889/${drawings[0].url}`} className={styles.listimg} />
          </View> */}
          <View style='flex:1'>
            <View className={styles.title} >
              {itemName}
            </View>
            <View className={styles.tips} >
              {reqName}/{phone} {levelName}
            </View>
            <View className={styles.tips} >
              {createdDate}
            </View>
            <View className={styles.tips} >
              数量  {qty}台
            </View>
            <View className={styles.tips} >
              要求  {reqDesc}
            </View>

            {status === "3" && <View className={styles.tips} >
              状态  {statusName}
            </View>}
            {status === "3" && <View className={styles.tips} >
              审核意见  {closeDesc}
            </View>}

            <View className={styles.drawings}>
              {drawings && drawings.map((item) => (<Image src={`http://sz-spd.cn:889/${item.url}`} className={styles.listimg} onClick={() => {
                const photos = drawings.map((m) => (`http://sz-spd.cn:889/${m.url}`))
                Taro.previewImage({
                  current: `http://sz-spd.cn:889/${item.url}`, // 当前显示图片的http链接
                  urls: photos, // 需要预览的图片http链接列表
                  success: (e) => {
                    console.log(e)
                  },
                  fail: (e) => {
                    console.log("fail", e)
                  }
                })
              }} />))}

            </View>

            <View className={styles.tips3} >
              <View />
              <View className={styles.share} >
                <View className={styles.item}>
                  <Image src={ico_share} className={styles.bottom_btn} />
                  <View>分享</View>
                  <Button openType="share" className={styles.sharebtn}>分享</Button>
                </View>
                <View className={styles.item}>
                  <Image src={ico_comment} className={styles.bottom_btn} />
                  <View>评论 {jxhReqMsgs.length}</View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className={styles.comment}>
          {jxhReqMsgs.length > 0 && <View className={styles.d3}></View>}
          {
            jxhReqMsgs.map((item) => (
              <View className={styles.commentbg} onClick={() => {
                this.setState({
                  parentsId: item.id,
                  parentsName: item.commentatorName,
                })
              }}>

                <View className='at-row'>
                  <View className='at-col at-col-1 at-col--auto'>
                    <AtAvatar circle image={`${item.avatarUrl}`}></AtAvatar>
                  </View>
                  <View className='at-col'>
                    <View className={styles.article__h3}> {item.nickName}</View>
                    <View className='at-article__info'>{item.dateTime}</View>
                    <View className={styles.article__p} style="margin-top:1px!impportant;">
                      {item.msg}
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </View>

        <View className={classNames(styles.comment, styles.flex)}>
          <View className={styles.commentmsg}>
            <AtInput className={styles.input} name="msg" placeholder={`${parentsName}评论:`} value={msg} onChange={(e) => { this.setState({ msg: e }) }} />
          </View>
          <AtButton
            type="primary"
            onClick={this.reqComment}
          >评论</AtButton>
        </View>

      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
