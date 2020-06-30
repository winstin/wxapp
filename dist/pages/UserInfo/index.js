(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/UserInfo/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserInfo/index.tsx?taro&type=script&parse=PAGE&":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/UserInfo/index.tsx?taro&type=script&parse=PAGE& ***!
  \****************************************************************************************************************************************************/
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

__webpack_require__(/*! taro-ui/dist/style/components/list.scss */ "./node_modules/taro-ui/dist/style/components/list.scss");

__webpack_require__(/*! taro-ui/dist/style/components/button.scss */ "./node_modules/taro-ui/dist/style/components/button.scss");

var _indexModules = __webpack_require__(/*! ./index.modules.less */ "./src/pages/UserInfo/index.modules.less");

var _indexModules2 = _interopRequireDefault(_indexModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserInfo = /** @class */function () {
  var _class, _temp2;

  var UserInfo = (_temp2 = _class = function (_BaseComponent) {
    _inherits(UserInfo, _BaseComponent);

    function UserInfo() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, UserInfo);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__81", "$compid__82", "$compid__83", "$compid__84", "$compid__85", "styles", "makerInfo"], _this.config = {
        navigationBarTitleText: "个人信息",
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: "#ffffff"
      }, _this.handleClick = function () {
        _taroWeapp2.default.navigateTo({
          url: '/pages/UserAuth/index'
        });
      }, _this.cancelLogin = function () {
        _taroWeapp2.default.clearStorage();
        _taroWeapp2.default.redirectTo({
          url: "/pages/Index/index"
        });
      }, _this.customComponents = ["AtList", "AtListItem", "AtButton"], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UserInfo, [{
      key: "_constructor",
      value: function _constructor() {
        _get(UserInfo.prototype.__proto__ || Object.getPrototypeOf(UserInfo.prototype), "_constructor", this).apply(this, arguments);
        this.$$refs = new _taroWeapp2.default.RefsArray();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "_createData",
      value: function _createData() {
        this.__state = arguments[0] || this.state || {};
        this.__props = arguments[1] || this.props || {};
        var __isRunloopRef = arguments[2];
        var __prefix = this.$prefix;
        ;

        var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__81"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__81 = _genCompid2[0],
            $compid__81 = _genCompid2[1];

        var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__82"),
            _genCompid4 = _slicedToArray(_genCompid3, 2),
            $prevCompid__82 = _genCompid4[0],
            $compid__82 = _genCompid4[1];

        var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__83"),
            _genCompid6 = _slicedToArray(_genCompid5, 2),
            $prevCompid__83 = _genCompid6[0],
            $compid__83 = _genCompid6[1];

        var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__84"),
            _genCompid8 = _slicedToArray(_genCompid7, 2),
            $prevCompid__84 = _genCompid8[0],
            $compid__84 = _genCompid8[1];

        var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__85"),
            _genCompid10 = _slicedToArray(_genCompid9, 2),
            $prevCompid__85 = _genCompid10[0],
            $compid__85 = _genCompid10[1];

        var makerInfo = this.__props.makerInfo;

        _taroWeapp.propsManager.set({
          "hasBorder": false
        }, $compid__81, $prevCompid__81);
        _taroWeapp.propsManager.set({
          "title": "\u6635\u79F0",
          "extraText": makerInfo.makerName
        }, $compid__82, $prevCompid__82);
        _taroWeapp.propsManager.set({
          "title": "\u624B\u673A\u53F7",
          "extraText": makerInfo.makerMobile
        }, $compid__83, $prevCompid__83);
        _taroWeapp.propsManager.set({
          "title": "\u5B9E\u540D\u8BA4\u8BC1",
          "extraText": makerInfo.verifyStatus === 0 ? '去认证' : '已认证',
          "arrow": "right",
          "onClick": this.handleClick
        }, $compid__84, $prevCompid__84);
        _taroWeapp.propsManager.set({
          "className": _indexModules2.default.logotBnt,
          "onClick": this.cancelLogin
        }, $compid__85, $prevCompid__85);
        Object.assign(this.__state, {
          $compid__81: $compid__81,
          $compid__82: $compid__82,
          $compid__83: $compid__83,
          $compid__84: $compid__84,
          $compid__85: $compid__85,
          styles: _indexModules2.default
        });
        return this.__state;
      }
    }]);

    return UserInfo;
  }(_taroWeapp.Component), _class.$$events = [], _class.$$componentPath = "pages/UserInfo/index", _temp2);
  UserInfo = (0, _tslib.__decorate)([(0, _redux.connect)(function (_ref2) {
    var user = _ref2.user;
    var _user$makerInfo = user.makerInfo,
        makerInfo = _user$makerInfo === undefined ? {} : _user$makerInfo;

    return {
      makerInfo: makerInfo
    };
  })], UserInfo);
  return UserInfo;
}();
exports.default = UserInfo;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(UserInfo, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserInfo/index.tsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/UserInfo/index.tsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/UserInfo/index.wxml";

/***/ }),

/***/ "./src/pages/UserInfo/index.modules.less":
/*!***********************************************!*\
  !*** ./src/pages/UserInfo/index.modules.less ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"userInformation":"index-modules__userInformation___2CASh","logotBnt":"index-modules__logotBnt___stgPk"};

/***/ }),

/***/ "./src/pages/UserInfo/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/UserInfo/index.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/UserInfo/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/UserInfo/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/UserInfo/index.tsx?taro&type=script&parse=PAGE&":
/*!*******************************************************************!*\
  !*** ./src/pages/UserInfo/index.tsx?taro&type=script&parse=PAGE& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserInfo/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/UserInfo/index.tsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************!*\
  !*** ./src/pages/UserInfo/index.tsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserInfo/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/UserInfo/index.tsx","runtime","taro","vendors","common"]]]);