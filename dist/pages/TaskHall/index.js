(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/TaskHall/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskHall/index.tsx?taro&type=script&parse=PAGE&":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/TaskHall/index.tsx?taro&type=script&parse=PAGE& ***!
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

__webpack_require__(/*! taro-ui/dist/style/components/tabs.scss */ "./node_modules/taro-ui/dist/style/components/tabs.scss");

__webpack_require__(/*! taro-ui/dist/style/components/button.scss */ "./node_modules/taro-ui/dist/style/components/button.scss");

var _indexModules = __webpack_require__(/*! ./index.modules.less */ "./src/pages/TaskHall/index.modules.less");

var _indexModules2 = _interopRequireDefault(_indexModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskHall = /** @class */function () {
  var _class, _temp2;

  var TaskHall = (_temp2 = _class = function (_BaseComponent) {
    _inherits(TaskHall, _BaseComponent);

    function TaskHall() {
      var _ref,
          _this2 = this;

      var _temp, _this, _ret;

      _classCallCheck(this, TaskHall);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TaskHall.__proto__ || Object.getPrototypeOf(TaskHall)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "taskList", "loopArray22", "$compid__68", "token", "styles", "tradeLists", "scrollTop", "Threshold", "current", "dispatch", "makerInfo"], _this.config = {
        navigationBarTitleText: "任务大厅",
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: "#ffffff"
      }, _this.fetchList = function () {
        var tradeLists = _this.props.tradeLists;
        var current = _this.state.current;
        var dispatch = _this.props.dispatch;

        if (dispatch) {
          dispatch({
            type: "taskhall/taskpage",
            payload: {
              "task_trade": tradeLists[current].key
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
      }, _this.onScrollToLower = function () {
        console.log('onScrollToLower');
      }, _this.onScroll = function (e) {
        // console.log('---onScroll:',e);
      }, _this.handleReceive = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
          var _this$props, dispatch, makerInfo;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this$props = _this.props, dispatch = _this$props.dispatch, makerInfo = _this$props.makerInfo;

                  if (!(makerInfo.verifyStatus === 0)) {
                    _context.next = 4;
                    break;
                  }

                  _taroWeapp2.default.navigateTo({
                    url: "/pages/TaskDetail/index?id=" + id
                  });
                  // this.setState({
                  //     open: true
                  // })
                  return _context.abrupt("return");

                case 4:
                  if (!dispatch) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 7;
                  return dispatch({
                    type: "taskhall/accepttask",
                    payload: {
                      taskId: id
                    }
                  });

                case 7:
                  _this.fetchList();
                  _taroWeapp2.default.showToast({
                    title: '领取成功'
                  });

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }(), _this.handleDetail = function (id) {
        console.log('详情', id);
        _taroWeapp2.default.navigateTo({
          url: "/pages/TaskDetail/index?id=" + id
        });
      }, _this.anonymousFunc1Map = {}, _this.anonymousFunc2Map = {}, _this.anonymousFunc3Map = {}, _this.anonymousFunc4Map = {}, _this.anonymousFunc5Map = {}, _this.anonymousFunc6Map = {}, _this.customComponents = ["AtTabs", "AtTabsPane", "TaskItem"], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TaskHall, [{
      key: "_constructor",
      value: function _constructor() {
        _get(TaskHall.prototype.__proto__ || Object.getPrototypeOf(TaskHall.prototype), "_constructor", this).apply(this, arguments);
        this.state = {
          current: 0
        };
        this.$$refs = new _taroWeapp2.default.RefsArray();
      }
    }, {
      key: "componentDidShow",
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          var token, dispatch;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  token = _taroWeapp2.default.getStorageSync('token');

                  if (!token) {
                    _context2.next = 9;
                    break;
                  }

                  dispatch = this.props.dispatch;

                  if (!dispatch) {
                    _context2.next = 9;
                    break;
                  }

                  _context2.next = 6;
                  return dispatch({
                    type: "taskhall/queryDictionary",
                    payload: {
                      "code": "task_trade"
                    }
                  });

                case 6:
                  _context2.next = 8;
                  return dispatch({
                    type: "user/fetchmakerDetails",
                    payload: {
                      user_id: _taroWeapp2.default.getStorageSync('user_id')
                    }
                  });

                case 8:
                  this.fetchList();

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function componentDidShow() {
          return _ref3.apply(this, arguments);
        }

        return componentDidShow;
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

        var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__68"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__68 = _genCompid2[0],
            $compid__68 = _genCompid2[1];

        var scrollStyle = {
          height: '90vh'
        };
        var scrollTop = 0;
        var Threshold = 20;
        var _props = this.__props,
            tradeLists = _props.tradeLists,
            taskList = _props.taskList;

        var token = _taroWeapp2.default.getStorageSync('token');
        if (!token) {
          this.anonymousFunc0 = function () {
            _taroWeapp2.default.navigateTo({
              url: '/pages/Home/index'
            });
          };
        }
        var anonymousState__temp = (0, _taroWeapp.internal_inline_style)({ textAlign: 'center' });
        var loopArray22 = tradeLists.map(function (item, idx) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };
          var $loopState__temp3 = "tabpan" + idx;
          var $loopState__temp5 = (0, _taroWeapp.internal_inline_style)(scrollStyle);

          var _$indexKey = "dczzz" + idx;

          _this3.anonymousFunc1Map[_$indexKey] = function () {
            console.log('自定义下拉刷新控件被下拉');
          };

          var _$indexKey2 = "ddzzz" + idx;

          _this3.anonymousFunc2Map[_$indexKey2] = function () {
            console.log('自定义下拉刷新被触发');
          };

          var _$indexKey3 = "dezzz" + idx;

          _this3.anonymousFunc3Map[_$indexKey3] = function () {
            console.log('自定义下拉刷新被复位');
          };

          var _$indexKey4 = "dfzzz" + idx;

          _this3.anonymousFunc4Map[_$indexKey4] = function () {
            console.log('自定义下拉刷新被中止');
          };

          var $anonymousCallee__2 = taskList.records.map(function (task, __index5) {
            task = {
              $original: (0, _taroWeapp.internal_get_original)(task)
            };
            var _$indexKey5 = "dgzzz" + idx + "-" + __index5;

            _this3.anonymousFunc5Map[_$indexKey5] = function () {
              return _this3.handleReceive(task.$original.id);
            };

            var _$indexKey6 = "dhzzz" + idx + "-" + __index5;

            _this3.anonymousFunc6Map[_$indexKey6] = function () {
              return _this3.handleDetail(task.$original.id);
            };

            var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "dizzzzzzzz" + idx + "-" + __index5, true),
                _genCompid4 = _slicedToArray(_genCompid3, 2),
                $prevCompid__66 = _genCompid4[0],
                $compid__66 = _genCompid4[1];

            _taroWeapp.propsManager.set({
              "item": task.$original,
              "onReceive": _this3.anonymousFunc5.bind(_this3, _$indexKey5),
              "onDetail": _this3.anonymousFunc6.bind(_this3, _$indexKey6)
            }, $compid__66, $prevCompid__66);
            return {
              _$indexKey5: _$indexKey5,
              _$indexKey6: _$indexKey6,
              $compid__66: $compid__66,
              $original: task.$original
            };
          });

          var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "djzzzzzzzz" + idx, true),
              _genCompid6 = _slicedToArray(_genCompid5, 2),
              $prevCompid__67 = _genCompid6[0],
              $compid__67 = _genCompid6[1];

          _taroWeapp.propsManager.set({
            "current": _this3.__state.current,
            "index": idx
          }, $compid__67, $prevCompid__67);
          return {
            $loopState__temp3: $loopState__temp3,
            $loopState__temp5: $loopState__temp5,
            _$indexKey: _$indexKey,
            _$indexKey2: _$indexKey2,
            _$indexKey3: _$indexKey3,
            _$indexKey4: _$indexKey4,
            $anonymousCallee__2: $anonymousCallee__2,
            $compid__67: $compid__67,
            $original: item.$original
          };
        });
        _taroWeapp.propsManager.set({
          "current": this.__state.current,
          "scroll": true,
          "swipeable": true,
          "tabDirection": "horizontal",
          "tabList": tradeLists,
          "onClick": this.handleClick
        }, $compid__68, $prevCompid__68);
        Object.assign(this.__state, {
          anonymousState__temp: anonymousState__temp,
          taskList: taskList,
          loopArray22: loopArray22,
          $compid__68: $compid__68,
          token: token,
          styles: _indexModules2.default,
          tradeLists: tradeLists,
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
    }, {
      key: "anonymousFunc3",
      value: function anonymousFunc3(_$indexKey3) {
        var _anonymousFunc3Map;

        ;

        for (var _len4 = arguments.length, e = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          e[_key4 - 1] = arguments[_key4];
        }

        return this.anonymousFunc3Map[_$indexKey3] && (_anonymousFunc3Map = this.anonymousFunc3Map)[_$indexKey3].apply(_anonymousFunc3Map, e);
      }
    }, {
      key: "anonymousFunc4",
      value: function anonymousFunc4(_$indexKey4) {
        var _anonymousFunc4Map;

        ;

        for (var _len5 = arguments.length, e = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          e[_key5 - 1] = arguments[_key5];
        }

        return this.anonymousFunc4Map[_$indexKey4] && (_anonymousFunc4Map = this.anonymousFunc4Map)[_$indexKey4].apply(_anonymousFunc4Map, e);
      }
    }, {
      key: "anonymousFunc5",
      value: function anonymousFunc5(_$indexKey5) {
        var _anonymousFunc5Map;

        ;

        for (var _len6 = arguments.length, e = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          e[_key6 - 1] = arguments[_key6];
        }

        return this.anonymousFunc5Map[_$indexKey5] && (_anonymousFunc5Map = this.anonymousFunc5Map)[_$indexKey5].apply(_anonymousFunc5Map, e);
      }
    }, {
      key: "anonymousFunc6",
      value: function anonymousFunc6(_$indexKey6) {
        var _anonymousFunc6Map;

        ;

        for (var _len7 = arguments.length, e = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          e[_key7 - 1] = arguments[_key7];
        }

        return this.anonymousFunc6Map[_$indexKey6] && (_anonymousFunc6Map = this.anonymousFunc6Map)[_$indexKey6].apply(_anonymousFunc6Map, e);
      }
    }]);

    return TaskHall;
  }(_taroWeapp.Component), _class.$$events = ["anonymousFunc0", "onScrollToUpper", "onScrollToLower", "onScroll", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4"], _class.$$componentPath = "pages/TaskHall/index", _temp2);
  TaskHall = (0, _tslib.__decorate)([(0, _redux.connect)(function (_ref4) {
    var taskhall = _ref4.taskhall,
        user = _ref4.user,
        loading = _ref4.loading;
    var _taskhall$tradeList = taskhall.tradeList,
        tradeList = _taskhall$tradeList === undefined ? {} : _taskhall$tradeList,
        taskList = taskhall.taskList;
    var makerInfo = user.makerInfo;

    var tradeLists = tradeList.map(function (item) {
      return { title: item.dictValue, key: item.dictKey };
    });
    return {
      tradeLists: tradeLists,
      taskList: taskList,
      makerInfo: makerInfo,
      loading: loading.effects['parent/getStudentList']
    };
  })], TaskHall);
  return TaskHall;
}();
exports.default = TaskHall;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(TaskHall, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskHall/index.tsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/TaskHall/index.tsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/TaskHall/index.wxml";

/***/ }),

/***/ "./src/pages/TaskHall/index.modules.less":
/*!***********************************************!*\
  !*** ./src/pages/TaskHall/index.modules.less ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"taskHall":"index-modules__taskHall___1yEby","noneTaskView":"index-modules__noneTaskView___1qrXv","noneBox":"index-modules__noneBox___3a62V","noneIcon":"index-modules__noneIcon___3zo0y","noneTitle":"index-modules__noneTitle___CtSdF","tabContent":"index-modules__tabContent___wupCW","unLogin":"index-modules__unLogin___303Nf","receiveBtn":"index-modules__receiveBtn___1CkIV"};

/***/ }),

/***/ "./src/pages/TaskHall/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/TaskHall/index.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/TaskHall/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/TaskHall/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/TaskHall/index.tsx?taro&type=script&parse=PAGE&":
/*!*******************************************************************!*\
  !*** ./src/pages/TaskHall/index.tsx?taro&type=script&parse=PAGE& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskHall/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/TaskHall/index.tsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************!*\
  !*** ./src/pages/TaskHall/index.tsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/apple/Desktop/wxapp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/TaskHall/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_Users_apple_Desktop_wxapp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/TaskHall/index.tsx","runtime","taro","vendors","common"]]]);