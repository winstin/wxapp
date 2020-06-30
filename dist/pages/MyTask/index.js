(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/MyTask/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/MyTask/index.tsx?taro&type=script&parse=PAGE&":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/MyTask/index.tsx?taro&type=script&parse=PAGE& ***!
  \**************************************************************************************************************************************************/
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

__webpack_require__(/*! taro-ui/dist/style/components/tabs.scss */ "./node_modules/taro-ui/dist/style/components/tabs.scss");

__webpack_require__(/*! taro-ui/dist/style/components/button.scss */ "./node_modules/taro-ui/dist/style/components/button.scss");

var _indexModules = __webpack_require__(/*! ./index.modules.less */ "./src/pages/MyTask/index.modules.less");

var _indexModules2 = _interopRequireDefault(_indexModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyTask = /** @class */function () {
  var _class, _temp2;

  var MyTask = (_temp2 = _class = function (_BaseComponent) {
    _inherits(MyTask, _BaseComponent);

    function MyTask() {
      var _ref,
          _this2 = this;

      var _temp, _this, _ret;

      _classCallCheck(this, MyTask);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyTask.__proto__ || Object.getPrototypeOf(MyTask)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["taskList", "loopArray23", "$compid__71", "token", "styles", "tabList", "scrollTop", "Threshold", "current", "dispatch"], _this.config = {
        navigationBarTitleText: "我的任务",
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: "#ffffff"
      }, _this.fetchList = function () {
        var dispatch = _this.props.dispatch;
        var current = _this.state.current;

        var type = "mytask/progresstask";
        if (current !== 0) {
          type = "mytask/completedtask";
        }
        if (dispatch) {
          dispatch({
            type: type,
            payload: {
              // "task_trade": tradeLists[current].key,
            }
          });
        }
      }, _this.handleClick = function (value) {
        _this.setState({
          current: value
        }, function () {
          _this.fetchList();
        });
      }, _this.onScrollToUpper = function () {
        console.log('onScrollToUpper');
      }, _this.onScroll = function (e) {
        // console.log('---onScroll:',e);
      }, _this.handleDetail = function (id) {
        console.log('详情', id);
        _taroWeapp2.default.navigateTo({
          url: "/pages/TaskDetail/index?id=" + id
        });
      }, _this.handleReceive = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
          var dispatch;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  dispatch = _this.props.dispatch;

                  if (!dispatch) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 4;
                  return dispatch({
                    type: "mytask/completetask",
                    payload: {
                      taskId: id
                    }
                  });

                case 4:
                  _this.fetchList();
                  _taroWeapp2.default.showToast({
                    title: '操作成功'
                  });

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }(), _this.anonymousFunc1Map = {}, _this.anonymousFunc2Map = {}, _this.customComponents = ["AtTabs", "AtTabsPane", "MyTaskItem"], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MyTask, [{
      key: "_constructor",
      value: function _constructor() {
        _get(MyTask.prototype.__proto__ || Object.getPrototypeOf(MyTask.prototype), "_constructor", this).apply(this, arguments);
        this.state = {
          current: 0
        };

        this.tabList = [{
          title: '未完成'
        }, {
          title: '已完成'
        }];
        this.$$refs = new _taroWeapp2.default.RefsArray();
      }
    }, {
      key: "componentDidShow",
      value: function componentDidShow() {
        var token = _taroWeapp2.default.getStorageSync('token');
        if (token) {
          this.fetchList();
        }
      }
    }, {
      key: "_createData",
      value: function _createData() {
        var _this3 = this;

        this.__state = arguments[0] || this.state || {};
        this.__props = arguments[1] || this.props || {};
        var __isRunloopRef = arguments[2];
        var __prefix = this.$prefix;
        var tabList = this.tabList;

        var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__71"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__71 = _genCompid2[0],
            $compid__71 = _genCompid2[1];

        var scrollStyle = {
          height: '90vh'
        };
        var scrollTop = 0;
        var Threshold = 20;
        var taskList = this.__props.taskList;

        var token = _taroWeapp2.default.getStorageSync('token');
        if (!token) {
          this.anonymousFunc0 = function () {
            _taroWeapp2.default.navigateTo({
              url: '/pages/Home/index'
            });
          };
        }
        var loopArray23 = this.tabList.map(function (item, idx) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };
          var $loopState__temp2 = "tabpan" + idx;
          var $loopState__temp4 = (0, _taroWeapp.internal_inline_style)(scrollStyle);
          var $anonymousCallee__3 = taskList.records.map(function (task, __index1) {
            task = {
              $original: (0, _taroWeapp.internal_get_original)(task)
            };
            var _$indexKey = "eazzz" + idx + "-" + __index1;

            _this3.anonymousFunc1Map[_$indexKey] = function () {
              return _this3.handleReceive(task.$original.id);
            };

            var _$indexKey2 = "ebzzz" + idx + "-" + __index1;

            _this3.anonymousFunc2Map[_$indexKey2] = function () {
              return _this3.handleDetail(task.$original.id);
            };

            var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "eczzzzzzzz" + idx + "-" + __index1, true),
                _genCompid4 = _slicedToArray(_genCompid3, 2),
                $prevCompid__69 = _genCompid4[0],
                $compid__69 = _genCompid4[1];

            _taroWeapp.propsManager.set({
              "item": task.$original,
              "onReceive": _this3.anonymousFunc1.bind(_this3, _$indexKey),
              "onDetail": _this3.anonymousFunc2.bind(_this3, _$indexKey2)
            }, $compid__69, $prevCompid__69);
            return {
              _$indexKey: _$indexKey,
              _$indexKey2: _$indexKey2,
              $compid__69: $compid__69,
              $original: task.$original
            };
          });

          var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "edzzzzzzzz" + idx, true),
              _genCompid6 = _slicedToArray(_genCompid5, 2),
              $prevCompid__70 = _genCompid6[0],
              $compid__70 = _genCompid6[1];

          _taroWeapp.propsManager.set({
            "current": _this3.__state.current,
            "index": idx
          }, $compid__70, $prevCompid__70);
          return {
            $loopState__temp2: $loopState__temp2,
            $loopState__temp4: $loopState__temp4,
            $anonymousCallee__3: $anonymousCallee__3,
            $compid__70: $compid__70,
            $original: item.$original
          };
        });
        _taroWeapp.propsManager.set({
          "current": this.__state.current,
          "scroll": true,
          "swipeable": true,
          "tabDirection": "horizontal",
          "tabList": this.tabList,
          "onClick": this.handleClick
        }, $compid__71, $prevCompid__71);
        Object.assign(this.__state, {
          taskList: taskList,
          loopArray23: loopArray23,
          $compid__71: $compid__71,
          token: token,
          styles: _indexModules2.default,
          tabList: tabList,
          scrollTop: scrollTop,
          Threshold: Threshold
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
      value: function anonymousFunc1(_$indexKey) {
        var _anonymousFunc1Map;

        ;

        for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          e[_key2 - 1] = arguments[_key2];
        }

        return this.anonymousFunc1Map[_$indexKey] && (_anonymousFunc1Map = this.anonymousFunc1Map)[_$indexKey].apply(_anonymousFunc1Map, e);
      }
    }, {
      key: "anonymousFunc2",
      value: function anonymousFunc2(_$indexKey2) {
        var _anonymousFunc2Map;

        ;

        for (var _len3 = arguments.length, e = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          e[_key3 - 1] = arguments[_key3];
        }

        return this.anonymousFunc2Map[_$indexKey2] && (_anonymousFunc2Map = this.anonymousFunc2Map)[_$indexKey2].apply(_anonymousFunc2Map, e);
      }
    }]);

    return MyTask;
  }(_taroWeapp.Component), _class.$$events = ["anonymousFunc0", "onScrollToUpper", "onScroll"], _class.$$componentPath = "pages/MyTask/index", _temp2);
  MyTask = (0, _tslib.__decorate)([(0, _redux.connect)(function (_ref3) {
    var mytask = _ref3.mytask,
        loading = _ref3.loading;
    var taskList = mytask.taskList;

    return {
      taskList: taskList,
      loading: loading.effects['parent/getStudentList']
    };
  })], MyTask);
  return MyTask;
}();
exports.default = MyTask;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(MyTask, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/MyTask/index.tsx?taro&type=template&parse=PAGE&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/MyTask/index.tsx?taro&type=template&parse=PAGE& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/MyTask/index.wxml";

/***/ }),

/***/ "./src/pages/MyTask/index.modules.less":
/*!*********************************************!*\
  !*** ./src/pages/MyTask/index.modules.less ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"myTask":"index-modules__myTask___Aiz7b","tabContent":"index-modules__tabContent___32SOw","unLogin":"index-modules__unLogin___2uTgG","receiveBtn":"index-modules__receiveBtn___1r_fn"};

/***/ }),

/***/ "./src/pages/MyTask/index.tsx":
/*!************************************!*\
  !*** ./src/pages/MyTask/index.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/MyTask/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/MyTask/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/MyTask/index.tsx?taro&type=script&parse=PAGE&":
/*!*****************************************************************!*\
  !*** ./src/pages/MyTask/index.tsx?taro&type=script&parse=PAGE& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/MyTask/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/MyTask/index.tsx?taro&type=template&parse=PAGE&":
/*!*******************************************************************!*\
  !*** ./src/pages/MyTask/index.tsx?taro&type=template&parse=PAGE& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/MyTask/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/MyTask/index.tsx","runtime","taro","vendors","common"]]]);