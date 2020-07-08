import { ComponentClass } from "react";
import { AnyAction } from 'redux';
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtTag } from 'taro-ui'
import { connect } from "@tarojs/redux";
import styles from "./index.modules.less";
import "taro-ui/dist/style/components/tag.scss";
import Index2 from '../../assets/Index2.jpeg';

type PageStateProps = {
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

@connect(({ factory,loading }) => {
  const {albums=[]} = factory;
  return {
    albums,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {
  state = {
    activeIndex: 0,
  }
  config: Config = {
    navigationBarTitleText: "企业相册",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
  };

  componentDidShow() {
    console.log(this.$router.params);
    this.fetchList()
  }

  fetchList = ()=>{
    const {dispatch} = this.props;
    if(dispatch){
      // Taro.showToast({
      //   icon:'loading',
      //   title: "加载中",
      //   duration:500
      // })
      dispatch({
        type: "factory/getbaseVendorAlbum",
        payload: this.$router.params
      });
    }
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

  onClick = (value,idx)=>{
    // console.log(value);
    this.setState({activeIndex:value})
  }

  render() {

    const {activeIndex} = this.state;
    const {albums} = this.props;
    return (
      <View className={styles.album}>
          <View className={styles.taglabel} >
            { albums.map((item,idx) => (
                <AtTag 
                  className={styles.tag}
                  name={`tag${idx}`} 
                  key={`album${idx}`} 
                  circle  
                  type='primary' 
                  active={idx===activeIndex} 
                  onClick={this.onClick.bind(this,idx)}>
                  {item.typeName}({item.total})
                </AtTag>
            ))}
          </View>
        <View className={styles.taglabel} >
          {albums[activeIndex] && albums[activeIndex].photos.map((item,idx) => (
                 <Image
                 className={styles.myphoto}
                 src={`http://sz-spd.cn:889/${item.photo}`}
                 onClick={()=>{
                  const photos = albums[activeIndex].photos.map((m)=>(`http://sz-spd.cn:889/${m.photo}`))
                  Taro.previewImage({
                    current: `http://sz-spd.cn:889/${item.photo}`, // 当前显示图片的http链接
                    urls: photos, // 需要预览的图片http链接列表
                    success:(e)=>{
                      console.log(e)
                    },
                    fail:(e)=>{
                      console.log("fail",e)
                    }
                  })
                 }}
               />
            ))}
        </View>
      </View>

    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
