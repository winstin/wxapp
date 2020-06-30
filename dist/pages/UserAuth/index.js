(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/UserAuth/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserAuth/index.tsx?taro&type=script&parse=PAGE&":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/UserAuth/index.tsx?taro&type=script&parse=PAGE& ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tslib = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _indexModules = __webpack_require__(/*! ./index.modules.less */ "./src/pages/UserAuth/index.modules.less");

var _indexModules2 = _interopRequireDefault(_indexModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import "taro-ui/dist/style/components/icon.scss";


var UserAuth = /** @class */function () {
  var _class, _temp2;

  var UserAuth = (_temp2 = _class = function (_BaseComponent) {
    _inherits(UserAuth, _BaseComponent);

    function UserAuth() {
      var _ref,
          _this2 = this;

      var _temp, _this, _ret;

      _classCallCheck(this, UserAuth);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserAuth.__proto__ || Object.getPrototypeOf(UserAuth)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__89", "$compid__90", "$compid__91", "styles", "name", "IDNumber", "frontFilePath", "reverseFilePath", "makerInfo", "dispatch"], _this.config = {
        navigationBarTitleText: "实名认证",
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: "#ffffff"
      }, _this.chooseImageFront = function () {
        _taroWeapp2.default.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            console.log('----res:', res);
            // tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            _taroWeapp2.default.uploadFile({
              url: "https://bid.sz-spd.cn/api/agileworker-resource/oss/put-file",
              filePath: tempFilePaths[0],
              name: 'file',
              header: {
                'Blade-Auth': "bearer " + _taroWeapp2.default.getStorageSync('token') || false
              },
              // formData: {
              //   'token': `bearer ${Taro.getStorageSync('token')}` || '',
              //   'key': '1'
              // },
              success: function success(res) {
                var data = res.data;
                //do something
              }
            });
            _this.setState({
              frontFilePath: tempFilePaths[0]
            });
          }
        });
      }, _this.deleteFont = function () {
        _this.setState({
          frontFilePath: ''
        });
      }, _this.chooseImageReverse = function () {
        _taroWeapp2.default.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            console.log('----res:', res);
            // tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            _this.setState({
              reverseFilePath: tempFilePaths[0]
            });
          }
        });
      }, _this.deleteReverse = function () {
        _this.setState({
          reverseFilePath: ''
        });
      }, _this.submit = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this$state, frontFilePath, reverseFilePath, name, IDNumber, _this$props, dispatch, makerInfo;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = _this.state, frontFilePath = _this$state.frontFilePath, reverseFilePath = _this$state.reverseFilePath, name = _this$state.name, IDNumber = _this$state.IDNumber;

                if (name) {
                  _context.next = 4;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: '请输入真实姓名'
                });
                return _context.abrupt("return");

              case 4:
                if (IDNumber) {
                  _context.next = 7;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: '请输入身份证号'
                });
                return _context.abrupt("return");

              case 7:
                if (frontFilePath) {
                  _context.next = 10;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: '请上传身份证正面照'
                });
                return _context.abrupt("return");

              case 10:
                if (reverseFilePath) {
                  _context.next = 13;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: '请上传身份证反面照'
                });
                return _context.abrupt("return");

              case 13:
                _this$props = _this.props, dispatch = _this$props.dispatch, makerInfo = _this$props.makerInfo;

                if (!dispatch) {
                  _context.next = 20;
                  break;
                }

                _context.next = 17;
                return dispatch({
                  type: "user/makerIdentity",
                  payload: {
                    "realName": name,
                    "idNo": IDNumber,
                    "idImage1": frontFilePath,
                    "idImage2": reverseFilePath,
                    "id": makerInfo.id
                  }
                });

              case 17:
                _context.next = 19;
                return dispatch({
                  type: "user/fetchmakerDetails",
                  payload: {
                    user_id: _taroWeapp2.default.getStorageSync('user_id')
                  }
                });

              case 19:
                _taroWeapp2.default.navigateBack();
                // Taro.redirectTo({
                //   url: "/pages/UserInfo/index"
                // })

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), _this.customComponents = ["AtIcon", "AtButton"], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UserAuth, [{
      key: "_constructor",
      value: function _constructor() {
        _get(UserAuth.prototype.__proto__ || Object.getPrototypeOf(UserAuth.prototype), "_constructor", this).apply(this, arguments);
        this.state = {
          name: '',
          IDNumber: '',
          frontFilePath: '',
          reverseFilePath: ''
        };
        this.$$refs = new _taroWeapp2.default.RefsArray();
      }
    }, {
      key: "componentDidMount",
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var _props, makerInfo, dispatch, frontFilePath, reverseFilePath;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _props = this.props, makerInfo = _props.makerInfo, dispatch = _props.dispatch;

                  if (!(makerInfo.verifyStatus === 1)) {
                    _context2.next = 10;
                    break;
                  }

                  if (!dispatch) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.next = 5;
                  return dispatch({
                    type: "user/getOssFile",
                    payload: {
                      name: makerInfo.idImage1
                    }
                  });

                case 5:
                  frontFilePath = _context2.sent;
                  _context2.next = 8;
                  return dispatch({
                    type: "user/getOssFile",
                    payload: {
                      name: makerInfo.idImage2
                    }
                  });

                case 8:
                  reverseFilePath = _context2.sent;

                  this.setState({
                    name: makerInfo.realName,
                    IDNumber: makerInfo.idNo,
                    frontFilePath: frontFilePath,
                    reverseFilePath: reverseFilePath
                  });

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function componentDidMount() {
          return _ref3.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: "_createData",
      value: function _createData() {
        var _this3 = this;

        this.__state = arguments[0] || this.state || {};
        this.__props = arguments[1] || this.props || {};
        var __isRunloopRef = arguments[2];
        var __prefix = this.$prefix;
        ;

        var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__89"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__89 = _genCompid2[0],
            $compid__89 = _genCompid2[1];

        var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__90"),
            _genCompid4 = _slicedToArray(_genCompid3, 2),
            $prevCompid__90 = _genCompid4[0],
            $compid__90 = _genCompid4[1];

        var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__91"),
            _genCompid6 = _slicedToArray(_genCompid5, 2),
            $prevCompid__91 = _genCompid6[0],
            $compid__91 = _genCompid6[1];

        var _state = this.__state,
            frontFilePath = _state.frontFilePath,
            reverseFilePath = _state.reverseFilePath,
            name = _state.name,
            IDNumber = _state.IDNumber;
        var makerInfo = this.__props.makerInfo;


        this.anonymousFunc0 = function (e) {
          _this3.setState({
            name: e.detail.value
          });
        };

        this.anonymousFunc1 = function (e) {
          _this3.setState({
            IDNumber: e.detail.value
          });
        };

        frontFilePath && _taroWeapp.propsManager.set({
          "value": "close",
          "size": "20",
          "color": "#FF6461",
          "className": _indexModules2.default.deleteBtn,
          "onClick": this.deleteFont
        }, $compid__89, $prevCompid__89);
        reverseFilePath && _taroWeapp.propsManager.set({
          "value": "close",
          "size": "20",
          "color": "#FF6461",
          "className": _indexModules2.default.deleteBtn,
          "onClick": this.deleteReverse
        }, $compid__90, $prevCompid__90);
        makerInfo.verifyStatus !== 0 && _taroWeapp.propsManager.set({
          "className": _indexModules2.default.submitBtn,
          "type": "primary",
          "onClick": this.submit
        }, $compid__91, $prevCompid__91);
        Object.assign(this.__state, {
          $compid__89: $compid__89,
          $compid__90: $compid__90,
          $compid__91: $compid__91,
          styles: _indexModules2.default,
          makerInfo: makerInfo
        });
        return this.__state;
      }
    }, {
      key: "anonymousFunc0",
      value: function anonymousFunc0(e) {
        ;
      }
    }, {
      key: "anonymousFunc1",
      value: function anonymousFunc1(e) {
        ;
      }
    }]);

    return UserAuth;
  }(_taroWeapp.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "chooseImageFront", "chooseImageReverse"], _class.$$componentPath = "pages/UserAuth/index", _temp2);
  UserAuth = (0, _tslib.__decorate)([(0, _redux.connect)(function (_ref4) {
    var user = _ref4.user,
        loading = _ref4.loading;
    var _user$makerInfo = user.makerInfo,
        makerInfo = _user$makerInfo === undefined ? {} : _user$makerInfo;

    return {
      makerInfo: makerInfo,
      loading: loading.effects['parent/getStudentList']
    };
  })], UserAuth);
  return UserAuth;
}();
exports.default = UserAuth;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(UserAuth, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserAuth/index.tsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/UserAuth/index.tsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/UserAuth/index.wxml";

/***/ }),

/***/ "./src/pages/UserAuth/index.modules.less":
/*!***********************************************!*\
  !*** ./src/pages/UserAuth/index.modules.less ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"userAuth":"index-modules__userAuth___29ush","formView":"index-modules__formView___2G9LZ","formItem":"index-modules__formItem___4TuDm","input":"index-modules__input___qj_Jy","itemTitle":"index-modules__itemTitle___1LHu8","formImageItem":"index-modules__formImageItem___3q2DN","uploadBtn":"index-modules__uploadBtn___WNI2m","addIcon":"index-modules__addIcon___16BwQ","btnTitle":"index-modules__btnTitle___OwjJe","imageView":"index-modules__imageView___3iCrz","image":"index-modules__image___o7nJt","deleteBtn":"index-modules__deleteBtn___6X3_J","submitBtn":"index-modules__submitBtn___3TtM5"};

/***/ }),

/***/ "./src/pages/UserAuth/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/UserAuth/index.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/UserAuth/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/UserAuth/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/UserAuth/index.tsx?taro&type=script&parse=PAGE&":
/*!*******************************************************************!*\
  !*** ./src/pages/UserAuth/index.tsx?taro&type=script&parse=PAGE& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserAuth/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/UserAuth/index.tsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************!*\
  !*** ./src/pages/UserAuth/index.tsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/UserAuth/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/UserAuth/index.tsx","runtime","taro","vendors"]]]);