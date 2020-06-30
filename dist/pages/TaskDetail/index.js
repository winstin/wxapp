(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/TaskDetail/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskDetail/index.tsx?taro&type=script&parse=PAGE&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/TaskDetail/index.tsx?taro&type=script&parse=PAGE& ***!
  \******************************************************************************************************************************************************/
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

__webpack_require__(/*! taro-ui/dist/style/components/modal.scss */ "./node_modules/taro-ui/dist/style/components/modal.scss");

var _indexModules = __webpack_require__(/*! ./index.modules.less */ "./src/pages/TaskDetail/index.modules.less");

var _indexModules2 = _interopRequireDefault(_indexModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskDetail = /** @class */function () {
  var _class, _temp2;

  var TaskDetail = (_temp2 = _class = function (_BaseComponent) {
    _inherits(TaskDetail, _BaseComponent);

    function TaskDetail() {
      var _ref,
          _this2 = this;

      var _temp, _this, _ret;

      _classCallCheck(this, TaskDetail);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TaskDetail.__proto__ || Object.getPrototypeOf(TaskDetail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__86", "$compid__87", "$compid__88", "styles", "taskAttachments", "taskStatus", "taskName", "publishUserName", "createTime", "taskContent", "taskCost", "open", "isX", "detail", "dispatch", "makerInfo"], _this.config = {
        navigationBarTitleText: "任务详情",
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: "#ffffff"
      }, _this.fetchDetail = function (id) {
        var dispatch = _this.props.dispatch;

        if (dispatch) {
          dispatch({
            type: "taskhall/taskdetail",
            payload: {
              "taskId": id
            }
          });
        }
      }, _this.handleRecieve = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this$props, dispatch, detail, makerInfo;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, dispatch = _this$props.dispatch, detail = _this$props.detail, makerInfo = _this$props.makerInfo;

                if (!(makerInfo.verifyStatus === 0)) {
                  _context.next = 4;
                  break;
                }

                _this.setState({
                  open: true
                });
                return _context.abrupt("return");

              case 4:
                if (!dispatch) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return dispatch({
                  type: "taskhall/accepttask",
                  payload: {
                    taskId: detail.id
                  }
                });

              case 7:
                _taroWeapp2.default.showToast({
                  title: '领取成功'
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), _this.handleComplete = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _this$props2, dispatch, detail;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props2 = _this.props, dispatch = _this$props2.dispatch, detail = _this$props2.detail;
                // if(makerInfo.verifyStatus === 0){
                //   this.setState({
                //       open: true
                //   })
                //   return
                // }

                if (!dispatch) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 4;
                return dispatch({
                  type: "mytask/completetask",
                  payload: {
                    taskId: detail.id
                  }
                });

              case 4:
                _taroWeapp2.default.showToast({
                  title: '操作成功'
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })), _this.handleClose = function () {}, _this.handleCancel = function () {
        _this.setState({
          open: false
        });
      }, _this.handleConfirm = function () {
        _this.setState({
          open: false
        });
        _taroWeapp2.default.navigateTo({
          url: '/pages/UserAuth/index'
        });
      }, _this.customComponents = ["AtButton", "AtModal"], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TaskDetail, [{
      key: "_constructor",
      value: function _constructor() {
        _get(TaskDetail.prototype.__proto__ || Object.getPrototypeOf(TaskDetail.prototype), "_constructor", this).apply(this, arguments);
        this.state = {
          open: false,
          isX: false
        };
        this.$$refs = new _taroWeapp2.default.RefsArray();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var id = this.$router.params.id;

        console.log('id:', id);
        this.fetchDetail(id);
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        // const {clientInfo} = this.props;
        // const isX = clientInfo.model.search('iPhone X') != -1;
        // this.setState({
        //   isX
        // })
      }
    }, {
      key: "_createData",
      value: function _createData() {
        this.__state = arguments[0] || this.state || {};
        this.__props = arguments[1] || this.props || {};
        var __isRunloopRef = arguments[2];
        var __prefix = this.$prefix;
        ;

        var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__86"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__86 = _genCompid2[0],
            $compid__86 = _genCompid2[1];

        var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__87"),
            _genCompid4 = _slicedToArray(_genCompid3, 2),
            $prevCompid__87 = _genCompid4[0],
            $compid__87 = _genCompid4[1];

        var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__88"),
            _genCompid6 = _slicedToArray(_genCompid5, 2),
            $prevCompid__88 = _genCompid6[0],
            $compid__88 = _genCompid6[1];

        var _state = this.__state,
            open = _state.open,
            isX = _state.isX;
        var _props$detail = this.__props.detail,
            taskName = _props$detail.taskName,
            publishUserName = _props$detail.publishUserName,
            createTime = _props$detail.createTime,
            taskContent = _props$detail.taskContent,
            taskCost = _props$detail.taskCost,
            taskAttachments = _props$detail.taskAttachments,
            taskStatus = _props$detail.taskStatus;

        var anonymousState__temp = taskStatus === "1" || taskStatus === "0" ? (0, _taroWeapp.internal_inline_style)({ bottom: isX ? '68rpx' : '0rpx' }) : null;
        var anonymousState__temp2 = taskStatus === "2" ? (0, _taroWeapp.internal_inline_style)({ bottom: isX ? '68rpx' : '0rpx' }) : null;
        (taskStatus === "1" || taskStatus === "0") && _taroWeapp.propsManager.set({
          "className": _indexModules2.default.recieve,
          "onClick": this.handleRecieve
        }, $compid__86, $prevCompid__86);
        taskStatus === "2" && _taroWeapp.propsManager.set({
          "className": _indexModules2.default.complete,
          "onClick": this.handleComplete
        }, $compid__87, $prevCompid__87);
        _taroWeapp.propsManager.set({
          "isOpened": open,
          "title": "\u63D0\u793A",
          "cancelText": "\u53D6\u6D88",
          "confirmText": "\u53BB\u8BA4\u8BC1",
          "closeOnClickOverlay": false,
          "onClose": this.handleClose,
          "onCancel": this.handleCancel,
          "onConfirm": this.handleConfirm,
          "content": "\u8BF7\u5148\u8FDB\u884C\u8EAB\u4EFD\u8BA4\u8BC1\uFF0C\u624D\u80FD\u5B8C\u6210\u4EFB\u52A1"
        }, $compid__88, $prevCompid__88);
        Object.assign(this.__state, {
          anonymousState__temp: anonymousState__temp,
          anonymousState__temp2: anonymousState__temp2,
          $compid__86: $compid__86,
          $compid__87: $compid__87,
          $compid__88: $compid__88,
          styles: _indexModules2.default,
          taskAttachments: taskAttachments,
          taskStatus: taskStatus,
          taskName: taskName,
          publishUserName: publishUserName,
          createTime: createTime,
          taskContent: taskContent,
          taskCost: taskCost
        });
        return this.__state;
      }
    }]);

    return TaskDetail;
  }(_taroWeapp.Component), _class.$$events = [], _class.$$componentPath = "pages/TaskDetail/index", _temp2);
  TaskDetail = (0, _tslib.__decorate)([(0, _redux.connect)(function (_ref4) {
    var taskhall = _ref4.taskhall,
        user = _ref4.user,
        loading = _ref4.loading;
    var _taskhall$detail = taskhall.detail,
        detail = _taskhall$detail === undefined ? {} : _taskhall$detail;
    var makerInfo = user.makerInfo;

    return {
      detail: detail,
      makerInfo: makerInfo,
      loading: loading.effects['parent/getStudentList']
    };
  })], TaskDetail);
  return TaskDetail;
}();
exports.default = TaskDetail;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(TaskDetail, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskDetail/index.tsx?taro&type=template&parse=PAGE&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/TaskDetail/index.tsx?taro&type=template&parse=PAGE& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/TaskDetail/index.wxml";

/***/ }),

/***/ "./src/pages/TaskDetail/index.modules.less":
/*!*************************************************!*\
  !*** ./src/pages/TaskDetail/index.modules.less ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"taskDetail":"index-modules__taskDetail___ohreU","name":"index-modules__name___1tHMo","tit":"index-modules__tit___3syFs","cont":"index-modules__cont___3NR3N","bottom":"index-modules__bottom___26rjG","bottomView":"index-modules__bottomView___wooVz","cost":"index-modules__cost___1Dp50","recieve":"index-modules__recieve___2GhRb","complete":"index-modules__complete___3w-3G"};

/***/ }),

/***/ "./src/pages/TaskDetail/index.tsx":
/*!****************************************!*\
  !*** ./src/pages/TaskDetail/index.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/TaskDetail/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/TaskDetail/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/TaskDetail/index.tsx?taro&type=script&parse=PAGE&":
/*!*********************************************************************!*\
  !*** ./src/pages/TaskDetail/index.tsx?taro&type=script&parse=PAGE& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskDetail/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/TaskDetail/index.tsx?taro&type=template&parse=PAGE&":
/*!***********************************************************************!*\
  !*** ./src/pages/TaskDetail/index.tsx?taro&type=template&parse=PAGE& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskDetail/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/TaskDetail/index.tsx","runtime","taro","vendors","common"]]]);