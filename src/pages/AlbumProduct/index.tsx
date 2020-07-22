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
  srmalbums:any;
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
  const {srmalbums={}} = factory;
  return {
    srmalbums,
    loading: loading.effects['parent/getStudentList'],
  }
})
class Home extends Component {

  

  state = {
    activeIndex: 0,
  }
  config: Config = {
    navigationBarTitleText: "产品相册",
    navigationBarTextStyle:'black',
    navigationBarBackgroundColor: "#F2F3FE",
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
    this.setState({activeIndex:value})
  }

  render() {

    const {srmalbums} = this.props;
    console.log(srmalbums)
    return (
      <View className={styles.album}>
          {/* <View className={styles.taglabel} >
            { industryList.map((item,idx) => (
                <AtTag 
                  className={styles.tag}
                  name={`tag${idx}`} 
                  key={`album${idx}`} 
                  circle  
                  type='primary' 
                  active={idx===activeIndex} 
                  onClick={this.onClick.bind(this,idx)}>
                  {item.title}
                </AtTag>
            ))}
          </View> */}
        <View className={styles.taglabel} >
          {srmalbums && srmalbums.photos.map((item,idx) => (
                 <Image
                 className={styles.myphoto}
                 src={`http://sz-spd.cn:889/${item.photo}`}
                 onClick={()=>{
                  const photos = srmalbums.photos.map((m)=>(`http://sz-spd.cn:889/${m.photo}`))
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
