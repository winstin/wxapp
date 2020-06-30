(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/Need/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/Need/index.tsx?taro&type=script&parse=PAGE&":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/Need/index.tsx?taro&type=script&parse=PAGE& ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _indexModules = __webpack_require__(/*! ./index.modules.less */ "./src/pages/Need/index.modules.less");

var _indexModules2 = _interopRequireDefault(_indexModules);

var _Index = __webpack_require__(/*! ../../assets/Index2.jpeg */ "./src/assets/Index2.jpeg");

var _Index2 = _interopRequireDefault(_Index);

var _btn_new3x = __webpack_require__(/*! ../../assets/need/btn_new@3x.png */ "./src/assets/need/btn_new@3x.png");

var _btn_new3x2 = _interopRequireDefault(_btn_new3x);

__webpack_require__(/*! taro-ui/dist/style/components/icon.scss */ "./node_modules/taro-ui/dist/style/components/icon.scss");

__webpack_require__(/*! taro-ui/dist/style/components/tabs.scss */ "./node_modules/taro-ui/dist/style/components/tabs.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = /** @class */function () {
  var _class, _temp2;

  var Home = (_temp2 = _class = function (_BaseComponent) {
    _inherits(Home, _BaseComponent);

    function Home() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Home);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp4", "loopArray38", "loopArray39", "$compid__121", "$compid__122", "$compid__123", "styles", "btn_new", "scrollTop", "Threshold", "industryList", "current", "show", "sort", "industry"], _this.config = {
        navigationBarTitleText: "最新需求",
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: "#F2F3FE"
      }, _this.customComponents = ["AtTabs", "AtTabsPane", "NeedItem"], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Home, [{
      key: "_constructor",
      value: function _constructor() {
        _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "_constructor", this).apply(this, arguments);
        this.industryList = [{
          title: '找工厂',
          star: 2
        }, {
          title: '最新需求',
          star: 3
        }, {
          title: '会员审核',
          star: 4
        }, {
          title: '需求审核',
          star: 5
        }, {
          title: '邀请企业',
          star: 5
        }, {
          title: '邀请好友',
          star: 5
        }, {
          title: '签到',
          star: 5
        }, {
          icon: "",
          title: ''
        }];
        this.state = {
          current: 0,
          show: false,
          sort: false,
          industry: false
        };
        this.$$refs = new _taroWeapp2.default.RefsArray();
      }
    }, {
      key: "componentDidShow",
      value: function componentDidShow() {}
    }, {
      key: "handleClick",
      value: function handleClick(value) {
        this.setState({
          current: value
        });
      }
    }, {
      key: "onScrollToUpper",
      value: function onScrollToUpper() {}
      // or 使用箭头函数
      // onScrollToUpper = () => {}

    }, {
      key: "onScroll",
      value: function onScroll(e) {
        console.log(e.detail);
      }
    }, {
      key: "_createData",
      value: function _createData() {
        this.__state = arguments[0] || this.state || {};
        this.__props = arguments[1] || this.props || {};
        var __isRunloopRef = arguments[2];
        var __prefix = this.$prefix;
        var industryList = this.industryList;

        var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__121"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__121 = _genCompid2[0],
            $compid__121 = _genCompid2[1];

        var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__122"),
            _genCompid4 = _slicedToArray(_genCompid3, 2),
            $prevCompid__122 = _genCompid4[0],
            $compid__122 = _genCompid4[1];

        var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__123"),
            _genCompid6 = _slicedToArray(_genCompid5, 2),
            $prevCompid__123 = _genCompid6[0],
            $compid__123 = _genCompid6[1];

        var tabList = [{ title: '最新需求' }, { title: '我的需求' }];
        var scrollStyle = {
          height: '100vh',
          backgroundColor: "#fff",
          padding: "0pt 16pt"
        };
        var scrollTop = 0;
        var Threshold = 20;
        var anonymousState__temp = (0, _taroWeapp.internal_inline_style)(scrollStyle);
        var anonymousState__temp4 = (0, _taroWeapp.internal_inline_style)(scrollStyle);
        var loopArray38 = this.industryList.map(function (item, idx) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };
          var $loopState__temp3 = "FactoryItem" + idx;

          var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "fgzzzzzzzz" + idx, true),
              _genCompid8 = _slicedToArray(_genCompid7, 2),
              $prevCompid__119 = _genCompid8[0],
              $compid__119 = _genCompid8[1];

          _taroWeapp.propsManager.set({
            "src": _Index2.default
          }, $compid__119, $prevCompid__119);
          return {
            $loopState__temp3: $loopState__temp3,
            $compid__119: $compid__119,
            $original: item.$original
          };
        });
        var loopArray39 = this.industryList.map(function (item, idx) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };
          var $loopState__temp6 = "FactoryItem" + idx;

          var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "fhzzzzzzzz" + idx, true),
              _genCompid10 = _slicedToArray(_genCompid9, 2),
              $prevCompid__120 = _genCompid10[0],
              $compid__120 = _genCompid10[1];

          _taroWeapp.propsManager.set({
            "src": _Index2.default
          }, $compid__120, $prevCompid__120);
          return {
            $loopState__temp6: $loopState__temp6,
            $compid__120: $compid__120,
            $original: item.$original
          };
        });
        _taroWeapp.propsManager.set({
          "current": this.__state.current,
          "tabList": tabList,
          "onClick": this.handleClick.bind(this)
        }, $compid__121, $prevCompid__121);
        _taroWeapp.propsManager.set({
          "current": this.__state.current,
          "index": 0
        }, $compid__122, $prevCompid__122);
        _taroWeapp.propsManager.set({
          "current": this.__state.current,
          "index": 1
        }, $compid__123, $prevCompid__123);
        Object.assign(this.__state, {
          anonymousState__temp: anonymousState__temp,
          anonymousState__temp4: anonymousState__temp4,
          loopArray38: loopArray38,
          loopArray39: loopArray39,
          $compid__121: $compid__121,
          $compid__122: $compid__122,
          $compid__123: $compid__123,
          styles: _indexModules2.default,
          btn_new: _btn_new3x2.default,
          scrollTop: scrollTop,
          Threshold: Threshold,
          industryList: industryList
        });
        return this.__state;
      }
    }]);

    return Home;
  }(_taroWeapp.Component), _class.$$events = ["onScrollToUpper", "onScroll"], _class.$$componentPath = "pages/Need/index", _temp2);
  Home = (0, _tslib.__decorate)([(0, _redux.connect)(function (_ref2) {
    var global = _ref2.global,
        loading = _ref2.loading;
    var _global$userInfo = global.userInfo,
        userInfo = _global$userInfo === undefined ? {} : _global$userInfo;

    return {
      userInfo: userInfo,
      loading: loading.effects['parent/getStudentList']
    };
  })], Home);
  return Home;
}();
exports.default = Home;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Home, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/Need/index.tsx?taro&type=template&parse=PAGE&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/Need/index.tsx?taro&type=template&parse=PAGE& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/Need/index.wxml";

/***/ }),

/***/ "./src/assets/need/btn_new@3x.png":
/*!****************************************!*\
  !*** ./src/assets/need/btn_new@3x.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/pages/Need/index.modules.less":
/*!*******************************************!*\
  !*** ./src/pages/Need/index.modules.less ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"need":"index-modules__need___2kGCv","addicon":"index-modules__addicon___13tPU"};

/***/ }),

/***/ "./src/pages/Need/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Need/index.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/Need/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/Need/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/Need/index.tsx?taro&type=script&parse=PAGE&":
/*!***************************************************************!*\
  !*** ./src/pages/Need/index.tsx?taro&type=script&parse=PAGE& ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/Need/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/Need/index.tsx?taro&type=template&parse=PAGE&":
/*!*****************************************************************!*\
  !*** ./src/pages/Need/index.tsx?taro&type=template&parse=PAGE& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/Need/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/Need/index.tsx","runtime","taro","vendors","common"]]]);