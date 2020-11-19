(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 11);

/***/ }),

/***/ 11:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 12);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 113:
/*!*****************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/common/js/permission.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 本模块封装了Android、iOS的应用权限判断、打开应用权限设置界面、以及位置系统服务是否开启
 */

var isIos;




// 判断推送权限是否开启
function judgeIosPermissionPush() {
  var result = false;
  var UIApplication = plus.ios.import("UIApplication");
  var app = UIApplication.sharedApplication();
  var enabledTypes = 0;
  if (app.currentUserNotificationSettings) {
    var settings = app.currentUserNotificationSettings();
    enabledTypes = settings.plusGetAttribute("types");
    console.log("enabledTypes1:" + enabledTypes);
    if (enabledTypes == 0) {
      console.log("推送权限没有开启");
    } else {
      result = true;
      console.log("已经开启推送功能!");
    }
    plus.ios.deleteObject(settings);
  } else {
    enabledTypes = app.enabledRemoteNotificationTypes();
    if (enabledTypes == 0) {
      console.log("推送权限没有开启!");
    } else {
      result = true;
      console.log("已经开启推送功能!");
    }
    console.log("enabledTypes2:" + enabledTypes);
  }
  plus.ios.deleteObject(app);
  plus.ios.deleteObject(UIApplication);
  return result;
}

// 判断定位权限是否开启
function judgeIosPermissionLocation() {
  var result = false;
  var cllocationManger = plus.ios.import("CLLocationManager");
  var status = cllocationManger.authorizationStatus();
  result = status != 2;
  console.log("定位权限开启：" + result);
  // 以下代码判断了手机设备的定位是否关闭，推荐另行使用方法 checkSystemEnableLocation
  /* var enable = cllocationManger.locationServicesEnabled();
  var status = cllocationManger.authorizationStatus();
  console.log("enable:" + enable);
  console.log("status:" + status);
  if (enable && status != 2) {
  	result = true;
  	console.log("手机定位服务已开启且已授予定位权限");
  } else {
  	console.log("手机系统的定位没有打开或未给予定位权限");
  } */
  plus.ios.deleteObject(cllocationManger);
  return result;
}

// 判断麦克风权限是否开启
function judgeIosPermissionRecord() {
  var result = false;
  var avaudiosession = plus.ios.import("AVAudioSession");
  var avaudio = avaudiosession.sharedInstance();
  var permissionStatus = avaudio.recordPermission();
  console.log("permissionStatus:" + permissionStatus);
  if (permissionStatus == 1684369017 || permissionStatus == 1970168948) {
    console.log("麦克风权限没有开启");
  } else {
    result = true;
    console.log("麦克风权限已经开启");
  }
  plus.ios.deleteObject(avaudiosession);
  return result;
}

// 判断相机权限是否开启
function judgeIosPermissionCamera() {
  var result = false;
  var AVCaptureDevice = plus.ios.import("AVCaptureDevice");
  var authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide');
  console.log("authStatus:" + authStatus);
  if (authStatus == 3) {
    result = true;
    console.log("相机权限已经开启");
  } else {
    console.log("相机权限没有开启");
  }
  plus.ios.deleteObject(AVCaptureDevice);
  return result;
}

// 判断相册权限是否开启
function judgeIosPermissionPhotoLibrary() {
  var result = false;
  var PHPhotoLibrary = plus.ios.import("PHPhotoLibrary");
  var authStatus = PHPhotoLibrary.authorizationStatus();
  console.log("authStatus:" + authStatus);
  if (authStatus == 3) {
    result = true;
    console.log("相册权限已经开启");
  } else {
    console.log("相册权限没有开启");
  }
  plus.ios.deleteObject(PHPhotoLibrary);
  return result;
}

// 判断通讯录权限是否开启
function judgeIosPermissionContact() {
  var result = false;
  var CNContactStore = plus.ios.import("CNContactStore");
  var cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0);
  if (cnAuthStatus == 3) {
    result = true;
    console.log("通讯录权限已经开启");
  } else {
    console.log("通讯录权限没有开启");
  }
  plus.ios.deleteObject(CNContactStore);
  return result;
}

// 判断日历权限是否开启
function judgeIosPermissionCalendar() {
  var result = false;
  var EKEventStore = plus.ios.import("EKEventStore");
  var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(0);
  if (ekAuthStatus == 3) {
    result = true;
    console.log("日历权限已经开启");
  } else {
    console.log("日历权限没有开启");
  }
  plus.ios.deleteObject(EKEventStore);
  return result;
}

// 判断备忘录权限是否开启
function judgeIosPermissionMemo() {
  var result = false;
  var EKEventStore = plus.ios.import("EKEventStore");
  var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(1);
  if (ekAuthStatus == 3) {
    result = true;
    console.log("备忘录权限已经开启");
  } else {
    console.log("备忘录权限没有开启");
  }
  plus.ios.deleteObject(EKEventStore);
  return result;
}

// Android权限查询
function requestAndroidPermission(permissionID) {
  return new Promise(function (resolve, reject) {
    plus.android.requestPermissions(
    [permissionID], // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
    function (resultObj) {
      var result = 0;
      for (var i = 0; i < resultObj.granted.length; i++) {
        var grantedPermission = resultObj.granted[i];
        console.log('已获取的权限：' + grantedPermission);
        result = 1;
      }
      for (var i = 0; i < resultObj.deniedPresent.length; i++) {
        var deniedPresentPermission = resultObj.deniedPresent[i];
        console.log('拒绝本次申请的权限：' + deniedPresentPermission);
        result = 0;
      }
      for (var i = 0; i < resultObj.deniedAlways.length; i++) {
        var deniedAlwaysPermission = resultObj.deniedAlways[i];
        console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
        result = -1;
      }
      resolve(result);
      // 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
      // if (result != 1) {
      // gotoAppPermissionSetting()
      // }
    },
    function (error) {
      console.log('申请权限错误：' + error.code + " = " + error.message);
      resolve({
        code: error.code,
        message: error.message });

    });

  });
}

// 使用一个方法，根据参数判断权限
function judgeIosPermission(permissionID) {
  if (permissionID == "location") {
    return judgeIosPermissionLocation();
  } else if (permissionID == "camera") {
    return judgeIosPermissionCamera();
  } else if (permissionID == "photoLibrary") {
    return judgeIosPermissionPhotoLibrary();
  } else if (permissionID == "record") {
    return judgeIosPermissionRecord();
  } else if (permissionID == "push") {
    return judgeIosPermissionPush();
  } else if (permissionID == "contact") {
    return judgeIosPermissionContact();
  } else if (permissionID == "calendar") {
    return judgeIosPermissionCalendar();
  } else if (permissionID == "memo") {
    return judgeIosPermissionMemo();
  }
  return false;
}

// 跳转到**应用**的权限页面
function gotoAppPermissionSetting() {
  if (isIos) {
    var UIApplication = plus.ios.import("UIApplication");
    var application2 = UIApplication.sharedApplication();
    var NSURL2 = plus.ios.import("NSURL");
    // var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
    var setting2 = NSURL2.URLWithString("app-settings:");
    application2.openURL(setting2);

    plus.ios.deleteObject(setting2);
    plus.ios.deleteObject(NSURL2);
    plus.ios.deleteObject(application2);
  } else {
    // console.log(plus.device.vendor);
    var Intent = plus.android.importClass("android.content.Intent");
    var Settings = plus.android.importClass("android.provider.Settings");
    var Uri = plus.android.importClass("android.net.Uri");
    var mainActivity = plus.android.runtimeMainActivity();
    var intent = new Intent();
    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
    intent.setData(uri);
    mainActivity.startActivity(intent);
  }
}

// 检查系统的设备服务是否开启
// var checkSystemEnableLocation = async function () {
function checkSystemEnableLocation() {
  if (isIos) {
    var result = false;
    var cllocationManger = plus.ios.import("CLLocationManager");
    var result = cllocationManger.locationServicesEnabled();
    console.log("系统定位开启:" + result);
    plus.ios.deleteObject(cllocationManger);
    return result;
  } else {
    var context = plus.android.importClass("android.content.Context");
    var locationManager = plus.android.importClass("android.location.LocationManager");
    var main = plus.android.runtimeMainActivity();
    var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
    var result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
    console.log("系统定位开启:" + result);
    return result;
  }
}

module.exports = {
  judgeIosPermission: judgeIosPermission,
  requestAndroidPermission: requestAndroidPermission,
  checkSystemEnableLocation: checkSystemEnableLocation,
  gotoAppPermissionSetting: gotoAppPermissionSetting };

/***/ }),

/***/ 12:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 146:
/*!******************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/common/js/addNvueFont.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.addAlongfont = addAlongfont;exports.addNumberFont = addNumberFont; /**
                                                                                                                                                       * nvue页面导入字体包
                                                                                                                                                       * 字体包生成方式: 在iconfont下载ttf文件, 进入https://transfonter.org/, 
                                                                                                                                                       * 上传字体->选中family support和base64 encode->导出,然后在css文件中将对应的base64数据拷贝即可
                                                                                                                                                       */



function addAlongfont() {






}
function addNumberFont() {






}

/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!********************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/store/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 17));
var _index = _interopRequireDefault(__webpack_require__(/*! ./modules/index.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    hasLogin: false },

  mutations: {
    setLoginStatus: function setLoginStatus(state, hasLogin) {
      state.hasLogin = hasLogin;
    } },

  actions: {},
  modules: {
    index: _index.default } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 17:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 18:
/*!****************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/store/modules/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  namespaced: true,
  state: {},

  mutations: {} };exports.default = _default;

/***/ }),

/***/ 181:
/*!*******************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/common/js/clipboard-al.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * 复制文本 兼容H5
 * @version 1.0.0
 **/



var thorui = {
  getClipboardData: function getClipboardData(data, callback) {

    uni.setClipboardData({
      data: data,
      success: function success(res) {
        uni.getClipboardData({
          success: function success(res) {
            "function" == typeof callback && callback(true);
          },
          fail: function fail(res) {
            "function" == typeof callback && callback(false);
          } });

      },
      fail: function fail(res) {
        "function" == typeof callback && callback(false);
      } });






















  } };


module.exports = {
  getClipboardData: thorui.getClipboardData };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 190:
/*!*************************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/common/js/qqmap-wx-jssdk.min.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var ERROR_CONF = {
  KEY_ERR: 311,
  KEY_ERR_MSG: 'key格式错误',
  PARAM_ERR: 310,
  PARAM_ERR_MSG: '请求参数信息有误',
  SYSTEM_ERR: 600,
  SYSTEM_ERR_MSG: '系统错误',
  WX_ERR_CODE: 1000,
  WX_OK_CODE: 200 };

var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var EARTH_RADIUS = 6378136.49;
var Utils = {
  location2query: function location2query(data) {
    if (typeof data == 'string') {
      return data;
    }
    var query = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (!!query) {
        query += ';';
      }
      if (d.location) {
        query = query + d.location.lat + ',' + d.location.lng;
      }
      if (d.latitude && d.longitude) {
        query = query + d.latitude + ',' + d.longitude;
      }
    }
    return query;
  },
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },
  getEndLocation: function getEndLocation(location) {
    var to = location.split(';');
    var endLocation = [];
    for (var i = 0; i < to.length; i++) {
      endLocation.push({
        lat: parseFloat(to[i].split(',')[0]),
        lng: parseFloat(to[i].split(',')[1]) });

    }
    return endLocation;
  },
  getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
    var radLatTo = this.rad(latTo);
    var a = radLatFrom - radLatTo;
    var b = this.rad(lngFrom) - this.rad(lngTo);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) *
    Math.pow(Math.sin(b / 2), 2)));
    distance = distance * EARTH_RADIUS;
    distance = Math.round(distance * 10000) / 10000;
    return parseFloat(distance.toFixed(0));
  },
  getWXLocation: function getWXLocation(success, fail, complete) {
    wx.getLocation({
      type: 'gcj02',
      success: success,
      fail: fail,
      complete: complete });

  },
  getLocationParam: function getLocationParam(location) {
    if (typeof location == 'string') {
      var locationArr = location.split(',');
      if (locationArr.length === 2) {
        location = {
          latitude: location.split(',')[0],
          longitude: location.split(',')[1] };

      } else {
        location = {};
      }
    }
    return location;
  },
  polyfillParam: function polyfillParam(param) {
    param.success = param.success || function () {};
    param.fail = param.fail || function () {};
    param.complete = param.complete || function () {};
  },
  checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
    if (!param[key]) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return true;
    }
    return false;
  },
  checkKeyword: function checkKeyword(param) {
    return !this.checkParamKeyEmpty(param, 'keyword');
  },
  checkLocation: function checkLocation(param) {
    var location = this.getLocationParam(param.location);
    if (!location || !location.latitude || !location.longitude) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return false;
    }
    return true;
  },
  buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
    return {
      status: errCode,
      message: errMsg };

  },
  handleData: function handleData(param, data, feature) {
    if (feature === 'search') {
      var searchResult = data.data;
      var searchSimplify = [];
      for (var i = 0; i < searchResult.length; i++) {
        searchSimplify.push({
          id: searchResult[i].id || null,
          title: searchResult[i].title || null,
          latitude: searchResult[i].location && searchResult[i].location.lat || null,
          longitude: searchResult[i].location && searchResult[i].location.lng || null,
          address: searchResult[i].address || null,
          category: searchResult[i].category || null,
          tel: searchResult[i].tel || null,
          adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
          city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
          district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
          province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });

      }
      param.success(data, {
        searchResult: searchResult,
        searchSimplify: searchSimplify });

    } else if (feature === 'suggest') {
      var suggestResult = data.data;
      var suggestSimplify = [];
      for (var i = 0; i < suggestResult.length; i++) {
        suggestSimplify.push({
          adcode: suggestResult[i].adcode || null,
          address: suggestResult[i].address || null,
          category: suggestResult[i].category || null,
          city: suggestResult[i].city || null,
          district: suggestResult[i].district || null,
          id: suggestResult[i].id || null,
          latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
          longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
          province: suggestResult[i].province || null,
          title: suggestResult[i].title || null,
          type: suggestResult[i].type || null });

      }
      param.success(data, {
        suggestResult: suggestResult,
        suggestSimplify: suggestSimplify });

    } else if (feature === 'reverseGeocoder') {
      var reverseGeocoderResult = data.result;
      var reverseGeocoderSimplify = {
        address: reverseGeocoderResult.address || null,
        latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
        longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
        adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
        city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
        district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
        nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
        province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
        street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
        street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number ||
        null,
        recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend ||
        null,
        rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };

      if (reverseGeocoderResult.pois) {
        var pois = reverseGeocoderResult.pois;
        var poisSimplify = [];
        for (var i = 0; i < pois.length; i++) {
          poisSimplify.push({
            id: pois[i].id || null,
            title: pois[i].title || null,
            latitude: pois[i].location && pois[i].location.lat || null,
            longitude: pois[i].location && pois[i].location.lng || null,
            address: pois[i].address || null,
            category: pois[i].category || null,
            adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
            city: pois[i].ad_info && pois[i].ad_info.city || null,
            district: pois[i].ad_info && pois[i].ad_info.district || null,
            province: pois[i].ad_info && pois[i].ad_info.province || null });

        }
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify,
          pois: pois,
          poisSimplify: poisSimplify });

      } else {
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify });

      }
    } else if (feature === 'geocoder') {
      var geocoderResult = data.result;
      var geocoderSimplify = {
        title: geocoderResult.title || null,
        latitude: geocoderResult.location && geocoderResult.location.lat || null,
        longitude: geocoderResult.location && geocoderResult.location.lng || null,
        adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
        province: geocoderResult.address_components && geocoderResult.address_components.province || null,
        city: geocoderResult.address_components && geocoderResult.address_components.city || null,
        district: geocoderResult.address_components && geocoderResult.address_components.district || null,
        street: geocoderResult.address_components && geocoderResult.address_components.street || null,
        street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
        level: geocoderResult.level || null };

      param.success(data, {
        geocoderResult: geocoderResult,
        geocoderSimplify: geocoderSimplify });

    } else if (feature === 'getCityList') {
      var provinceResult = data.result[0];
      var cityResult = data.result[1];
      var districtResult = data.result[2];
      param.success(data, {
        provinceResult: provinceResult,
        cityResult: cityResult,
        districtResult: districtResult });

    } else if (feature === 'getDistrictByCityId') {
      var districtByCity = data.result[0];
      param.success(data, districtByCity);
    } else if (feature === 'calculateDistance') {
      var calculateDistanceResult = data.result.elements;
      var distance = [];
      for (var i = 0; i < calculateDistanceResult.length; i++) {
        distance.push(calculateDistanceResult[i].distance);
      }
      param.success(data, {
        calculateDistanceResult: calculateDistanceResult,
        distance: distance });

    } else {
      param.success(data);
    }
  },
  buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {
    var that = this;
    options.header = {
      "content-type": "application/json" };

    options.method = 'GET';
    options.success = function (res) {
      var data = res.data;
      if (data.status === 0) {
        that.handleData(param, data, feature);
      } else {
        param.fail(data);
      }
    };
    options.fail = function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    options.complete = function (res) {
      var statusCode = +res.statusCode;
      switch (statusCode) {
        case ERROR_CONF.WX_ERR_CODE:
          {
            param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            break;
          }
        case ERROR_CONF.WX_OK_CODE:
          {
            var data = res.data;
            if (data.status === 0) {
              param.complete(data);
            } else {
              param.complete(that.buildErrorConfig(data.status, data.message));
            }
            break;
          }
        default:
          {
            param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
          }}

    };
    return options;
  },
  locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
    var that = this;
    locationfail = locationfail || function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    locationcomplete = locationcomplete || function (res) {
      if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
      }
    };
    if (!param.location) {
      that.getWXLocation(locationsuccess, locationfail, locationcomplete);
    } else if (that.checkLocation(param)) {
      var location = Utils.getLocationParam(param.location);
      locationsuccess(location);
    }
  } };var

QQMapWX = /*#__PURE__*/function () {"use strict";
  function QQMapWX(options) {_classCallCheck(this, QQMapWX);
    if (!options.key) {
      throw Error('key值不能为空');
    }
    this.key = options.key;
  }_createClass(QQMapWX, [{ key: "search", value: function search(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (!Utils.checkKeyword(options)) {
        return;
      }
      var requestParam = {
        keyword: options.keyword,
        orderby: options.orderby || '_distance',
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        output: 'json',
        key: that.key };

      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      var distance = options.distance || "1000";
      var auto_extend = options.auto_extend || 1;
      var region = null;
      var rectangle = null;
      if (options.region) {
        region = options.region;
      }
      if (options.rectangle) {
        rectangle = options.rectangle;
      }
      var locationsuccess = function locationsuccess(result) {
        if (region && !rectangle) {
          requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude +
          ")";
        } else if (rectangle && !region) {
          requestParam.boundary = "rectangle(" + rectangle + ")";
        } else {
          requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend +
          ")";
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SEARCH,
          data: requestParam },
        'search'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "getSuggestion", value: function getSuggestion(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (!Utils.checkKeyword(options)) {
        return;
      }
      var requestParam = {
        keyword: options.keyword,
        region: options.region || '全国',
        region_fix: options.region_fix || 0,
        policy: options.policy || 0,
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        get_subpois: options.get_subpois || 0,
        output: 'json',
        key: that.key };

      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      if (options.location) {
        var locationsuccess = function locationsuccess(result) {
          requestParam.location = result.latitude + ',' + result.longitude;
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_SUGGESTION,
            data: requestParam },
          "suggest"));
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SUGGESTION,
          data: requestParam },
        "suggest"));
      }
    } }, { key: "reverseGeocoder", value: function reverseGeocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        coord_type: options.coord_type || 5,
        get_poi: options.get_poi || 0,
        output: 'json',
        key: that.key };

      if (options.poi_options) {
        requestParam.poi_options = options.poi_options;
      }
      var locationsuccess = function locationsuccess(result) {
        requestParam.location = result.latitude + ',' + result.longitude;
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_GET_GEOCODER,
          data: requestParam },
        'reverseGeocoder'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "geocoder", value: function geocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (Utils.checkParamKeyEmpty(options, 'address')) {
        return;
      }
      var requestParam = {
        address: options.address,
        output: 'json',
        key: that.key };

      if (options.region) {
        requestParam.region = options.region;
      }
      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_GET_GEOCODER,
        data: requestParam },
      'geocoder'));
    } }, { key: "getCityList", value: function getCityList(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        output: 'json',
        key: that.key };

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_CITY_LIST,
        data: requestParam },
      'getCityList'));
    } }, { key: "getDistrictByCityId", value: function getDistrictByCityId(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (Utils.checkParamKeyEmpty(options, 'id')) {
        return;
      }
      var requestParam = {
        id: options.id || '',
        output: 'json',
        key: that.key };

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_AREA_LIST,
        data: requestParam },
      'getDistrictByCityId'));
    } }, { key: "calculateDistance", value: function calculateDistance(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }
      var requestParam = {
        mode: options.mode || 'walking',
        to: Utils.location2query(options.to),
        output: 'json',
        key: that.key };

      if (options.from) {
        options.location = options.from;
      }
      if (requestParam.mode == 'straight') {
        var locationsuccess = function locationsuccess(result) {
          var locationTo = Utils.getEndLocation(requestParam.to);
          var data = {
            message: "query ok",
            result: {
              elements: [] },

            status: 0 };

          for (var i = 0; i < locationTo.length; i++) {
            data.result.elements.push({
              distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
              duration: 0,
              from: {
                lat: result.latitude,
                lng: result.longitude },

              to: {
                lat: locationTo[i].lat,
                lng: locationTo[i].lng } });


          }
          var calculateResult = data.result.elements;
          var distanceResult = [];
          for (var i = 0; i < calculateResult.length; i++) {
            distanceResult.push(calculateResult[i].distance);
          }
          return options.success(data, {
            calculateResult: calculateResult,
            distanceResult: distanceResult });

        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        var locationsuccess = function locationsuccess(result) {
          requestParam.from = result.latitude + ',' + result.longitude;
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_DISTANCE,
            data: requestParam },
          'calculateDistance'));
        };
        Utils.locationProcess(options, locationsuccess);
      }
    } }]);return QQMapWX;}();
;
module.exports = QQMapWX;

/***/ }),

/***/ 199:
/*!********************************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/components/lwj-record/js/lwj-record.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var lwjFun = {
  formatTime: formatTime,
  deleteOneFile: deleteOneFile,
  deleteListMethods: deleteListMethods,
  findRecordPath: findRecordPath,
  showToast: showToast,
  isRepeat: isRepeat };var _default =

lwjFun;
/**
         * @param {Object} time
         * 根据传入的录音的时间，返回分秒格式的字符串mm:ss
         */exports.default = _default;
function formatTime(time) {
  // 当time为0说明还未开始录音或者因为某些原因需要重新录制
  if (time == 0) return "00:00";
  // 得到当前已经录制了几分几秒
  var m = Math.floor(time / 60);
  var s = time % 60;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  return m + ":" + s;
}
/**
   * @param {Object} path
   * 删除一个文件，path是文件路径
   */
function deleteOneFile(path) {
  uni.removeSavedFile({
    filePath: path,
    success: function success(res) {
      console.log("success");
      console.log(res);
    },
    fail: function fail(err) {
      console.log("删除失败");
      console.log(err);
    } });

}

/**
   * @param {Object} originalList
   * @param {Object} chooseList
   * originalLis为原始数组，组件中是指recordPathList
   * chooseList为原始数组中需要删除的部分组成的数组，这里是指data中的chooseList，记录的是要从
   * recordPathList中要删除的name值
   * 这个方法用于删除recordPathList列表，以及删除对应的录音文件
   */
function deleteListMethods(originalList, chooseList) {
  var tempList = [];
  // oriIndex里面是originalList中每个数组元素的下标，这里的数组元素是对象
  for (var oriIndex in originalList) {
    // chooseIndex是chooseList中每个数组元素的下标，就是要删除的name
    for (var chooseIndex in chooseList) {
      // 如果删除列表中的name和originalList中的name相同，说明要删除
      if (originalList[oriIndex].name == chooseList[chooseIndex]) {
        // 删除文件
        deleteOneFile(originalList[oriIndex].voicePath);
      } else {
        // 这一步是保留，将保留的内容添加到临时数组中，再返回，实现recordPathList数组列表的更新
        tempList.push(originalList[oriIndex]);
      }
    }
  }
  return tempList;
}
/**
   * @param {Object} newName
   * @param {Object} arrayList
   * newName是用户输入的名字
   * arrayList是指这里的recordPathList
   * 函数功能：用于判断用户输入的名字是否之前已经输入过了
   * 因为26行的key绑定是recordPathList数组中存的每个对象的name值
   */
function isRepeat(newName, arrayList) {
  for (var index in arrayList) {
    if (arrayList[index].name == newName) {
      return true;
    }
  }
}
/**
   * @param {Object} name
   * 传过来的name是当前需要播放的录音的name
   * 通过name值从recordPathList中找到对应的下标
   * 要是没找到，则返回null
   */
function findRecordPath(name, recordPathList) {
  for (var i = 0, length = recordPathList.length; i < length; i++) {
    if (recordPathList[i].name == name) {
      return recordPathList[i].voicePath;
    }
  }
  return null;
}
/**
   * @param {Object} title
   * @param {Object} position
   */
function showToast(title) {var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "bottom";
  uni.showToast({
    mask: true,
    title: title,
    position: position,
    duration: 2000 });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 232:
/*!******************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/common/js/canvasUrils.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.roundRectColor = roundRectColor;exports.roundRectBorderColor = roundRectBorderColor;exports.circleImg = circleImg;exports.drawText = drawText;exports.drawTextWrap = drawTextWrap;exports.roundRectImg = roundRectImg;exports.drawCircle = drawCircle;exports.lineThrough = lineThrough;exports.drawLine = drawLine;
function drawLine(ctx, x, y, lineLength, lineWidth, color, vertical) {
  ctx.save();

  ctx.beginPath(0);
  ctx.setStrokeStyle(color);
  ctx.setLineJoin('round'); //交点设置成圆角
  ctx.setLineWidth(lineWidth);
  ctx.moveTo(x, y);
  if (vertical) {
    ctx.lineTo(x, y + lineLength);
  } else {
    ctx.lineTo(x + lineLength, y);
  }
  ctx.stroke();
  ctx.restore();
}
function roundRectColor(ctx, x, y, w, h, r, color) {//绘制圆角矩形（纯色填充）
  ctx.save();
  ctx.beginPath(0);
  ctx.setFillStyle(color);
  ctx.setLineJoin('round'); //交点设置成圆角
  ctx.setLineWidth(0);
  //从右下角顺时针绘制，弧度从0到1/2PI  
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
  //矩形下边线  
  ctx.lineTo(x + r, y + h);
  //左下角圆弧，弧度从1/2PI到PI  
  ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
  //矩形左边线  
  ctx.lineTo(x, y + r);
  //左上角圆弧，弧度从PI到3/2PI  
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2);
  //上边线  
  ctx.lineTo(x + w - r, y);
  //右上角圆弧  
  ctx.arc(x + w - r, y + r, r, Math.PI * 3 / 2, Math.PI * 2);
  //右边线  
  ctx.lineTo(x + w, y + h - r);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
function roundRectBorderColor(ctx, x, y, w, h, r, color, strokeolor) {//绘制圆角矩形（纯色填充）
  // ctx.save();
  // ctx.setFillStyle(color); 
  // ctx.setStrokeStyle(strokeolor)
  // ctx.setLineJoin('round');  //交点设置成圆角
  // ctx.setLineWidth(r);
  // ctx.strokeRect(x + r/2, y + r/2, w - r , h - r );
  // ctx.fillRect(x + r, y + r, w - r * 2, h - r * 2);
  // ctx.stroke();
  // ctx.closePath();
  // ctx.restore();
  ctx.save();
  ctx.beginPath(0);
  ctx.setFillStyle(color);
  ctx.setStrokeStyle(strokeolor);
  ctx.setLineJoin('round'); //交点设置成圆角
  ctx.setLineWidth(0);
  // ctx.strokeRect(x + r/2, y + r/2, w - r , h - r );
  // ctx.stroke();
  // ctx.closePath();
  //从右下角顺时针绘制，弧度从0到1/2PI  
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);

  //矩形下边线  
  ctx.lineTo(x + r, y + h);

  //左下角圆弧，弧度从1/2PI到PI  
  ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);

  //矩形左边线  
  ctx.lineTo(x, y + r);

  //左上角圆弧，弧度从PI到3/2PI  
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2);

  //上边线  
  ctx.lineTo(x + w - r, y);

  //右上角圆弧  
  ctx.arc(x + w - r, y + r, r, Math.PI * 3 / 2, Math.PI * 2);

  //右边线  
  ctx.lineTo(x + w, y + h - r);
  ctx.closePath();
  ctx.stroke();
  //ctx.fill();
  //ctx.fillRect(x + r, y + r, w - r * 2, h - r * 2);

  ctx.restore();
}
function roundRectImg(ctx, img, x, y, w, h, r) {//绘制圆角矩形（纯色填充）
  ctx.save();
  // const pattern = ctx.createPattern(img, 'no-repeat');
  // ctx.setFillStyle(pattern);
  // ctx.setLineJoin('round');  //交点设置成圆角
  // ctx.setLineWidth(r);
  // ctx.strokeRect(x + r/2, y + r/2, w - r , h - r );
  // ctx.fillRect(x + r, y + r, w - r * 2, h - r * 2);
  // ctx.stroke();
  // ctx.closePath();
  // ctx.drawImage(img, x, y, w, h);
  ctx.beginPath();
  // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
  ctx.setFillStyle('#ffffff');
  // ctx.setStrokeStyle('transparent')
  // 左上角
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);

  // border-top
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.lineTo(x + w, y + r);
  // 右上角
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

  // border-right
  ctx.lineTo(x + w, y + h - r);
  ctx.lineTo(x + w - r, y + h);
  // 右下角
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

  // border-bottom
  ctx.lineTo(x + r, y + h);
  ctx.lineTo(x, y + h - r);
  // 左下角
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);

  // border-left
  ctx.lineTo(x, y + r);
  ctx.lineTo(x + r, y);

  // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
  ctx.fill();
  // ctx.stroke()
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, x, y, w, h);
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}
//绘制一条横线
function lineThrough(ctx, x, y, width, lineWidth, color) {
  ctx.restore();
  ctx.save();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.strokeWidth = lineWidth;
  ctx.strokeStyle = '#88909C';
  ctx.setFillStyle('#ffffff');
  ctx.fill(); //保证图片无bug填充
  ctx.stroke();
  ctx.restore();
}

function circleImg(ctx, img, x, y, r, borderWidth, borderColor) {
  ctx.save();
  ctx.beginPath();
  var d = 2 * r;
  var cx = x + r;
  var cy = y + r;
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.setFillStyle('transparent');
  ctx.fill(); //保证图片无bug填充
  ctx.clip();
  ctx.drawImage(img, x, y, d, d);
  ctx.restore();
}
function drawCircle(ctx, x, y, r, color) {
  ctx.save();
  ctx.setLineWidth(0);
  ctx.setFillStyle(color);
  ctx.setFillStyle('#ffffff');
  var cx = x;
  var cy = y;
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}
function drawText(ctx, str, x, y, fontSize, color, maxWidth) {var align = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "left";
  try {
    ctx.save();
    ctx.setFontSize(fontSize); //设置标题字体大小
    ctx.setFillStyle(color); //设置标题文本颜色
    var _strLastIndex = 0; //每次开始截取的字符串的索引
    var _strlineW = 0;
    ctx.setTextAlign(align);
    for (var i = 0; i < str.length; i++) {
      _strlineW += ctx.measureText(str[i]).width;
      if (_strlineW > maxWidth) {
        ctx.fillText(str.substring(_strLastIndex, i), x, y);
        _strlineW = 0;
        _strLastIndex = i;
      } else if (i == str.length - 1) {
        ctx.fillText(str.substring(_strLastIndex, i + 1), x, y);
        _strlineW = 0;
      }
    }
    ctx.restore();
  } catch (e) {
    console.log('出现异常', e);
  }
}

function drawTextWrap(ctx, str, x, y, fontSize, color, maxWidth) {var maxLines = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;var align = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "left";
  ctx.save();
  ctx.setFontSize(fontSize); //设置标题字体大小
  ctx.setFillStyle(color); //设置标题文本颜色
  var _strLastIndex = 0; //每次开始截取的字符串的索引
  var _strlineW = 0;
  var currLine = 0;
  console.log('maxLen', maxWidth, str);
  ctx.setTextAlign(align);
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    if (charCode > 0 && charCode <= 128) {// 英文
      _strlineW += 0.5;
    } else {
      _strlineW += 1;
    }
    console.log('------lineW', _strlineW);
    if (_strlineW > maxWidth) {
      // 超出行数限制不再显示
      if (maxLines > 0 && maxLines - 1 == currLine) {
        ctx.fillText(str.substring(_strLastIndex, i) + '...', x, y + currLine * (fontSize + 3));
        return;
      }
      ctx.fillText(str.substring(_strLastIndex, i), x, y + currLine * (fontSize + 3));

      _strlineW = 0;
      _strLastIndex = i;
      currLine++;
      console.log(y + currLine * fontSize);
    } else if (i == str.length - 1) {
      console.log(y + currLine * fontSize);
      ctx.fillText(str.substring(_strLastIndex, str.length), x, y + currLine * fontSize);
      _strlineW = 0;
    }
  }
  ctx.restore();
}

/***/ }),

/***/ 255:
/*!*********************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/libs/amap-wx.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 264:
/*!*************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/common/js/city.json ***!
  \*************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451, 1452, 1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475, 1476, 1477, 1478, 1479, 1480, 1481, 1482, 1483, 1484, 1485, 1486, 1487, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1515, 1516, 1517, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 1530, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1547, 1548, 1549, 1550, 1551, 1552, 1553, 1554, 1555, 1556, 1557, 1558, 1559, 1560, 1561, 1562, 1563, 1564, 1565, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1629, 1630, 1631, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758, 1759, 1760, 1761, 1762, 1763, 1764, 1765, 1766, 1767, 1768, 1769, 1770, 1771, 1772, 1773, 1774, 1775, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1806, 1807, 1808, 1809, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 1850, 1851, 1852, 1853, 1854, 1855, 1856, 1857, 1858, 1859, 1860, 1861, 1862, 1863, 1864, 1865, 1866, 1867, 1868, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2137, 2138, 2139, 2140, 2141, 2142, 2143, 2144, 2145, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2158, 2159, 2160, 2161, 2162, 2163, 2164, 2165, 2166, 2167, 2168, 2169, 2170, 2171, 2172, 2173, 2174, 2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2192, 2193, 2194, 2195, 2196, 2197, 2198, 2199, 2200, 2201, 2202, 2203, 2204, 2205, 2206, 2207, 2208, 2209, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2223, 2224, 2225, 2226, 2227, 2228, 2229, 2230, 2231, 2232, 2233, 2234, 2235, 2236, 2237, 2238, 2239, 2240, 2241, 2242, 2243, 2244, 2245, 2246, 2247, 2248, 2249, 2250, 2251, 2252, 2253, 2254, 2255, 2256, 2257, 2258, 2259, 2260, 2261, 2262, 2263, 2264, 2265, 2266, 2267, 2268, 2269, 2270, 2271, 2272, 2273, 2274, 2275, 2276, 2277, 2278, 2279, 2280, 2281, 2282, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2295, 2296, 2297, 2298, 2299, 2300, 2301, 2302, 2303, 2304, 2305, 2306, 2307, 2308, 2309, 2310, 2311, 2312, 2313, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2338, 2339, 2340, 2341, 2342, 2343, 2344, 2345, 2346, 2347, 2348, 2349, 2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2384, 2385, 2386, 2387, 2388, 2389, 2390, 2391, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2399, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2433, 2434, 2435, 2436, 2437, 2438, 2439, 2440, 2441, 2442, 2443, 2444, 2445, 2446, 2447, 2448, 2449, 2450, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 2458, 2459, 2460, 2461, 2462, 2463, 2464, 2465, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2485, 2486, 2487, 2488, 2489, 2490, 2491, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512, 2513, 2514, 2515, 2516, 2517, 2518, 2519, 2520, 2521, 2522, 2523, 2524, 2525, 2526, 2527, 2528, 2529, 2530, 2531, 2532, 2533, 2534, 2535, 2536, 2537, 2538, 2539, 2540, 2541, 2542, 2543, 2544, 2545, 2546, 2547, 2548, 2549, 2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567, 2568, 2569, 2570, 2571, 2572, 2573, 2574, 2575, 2576, 2577, 2578, 2579, 2580, 2581, 2582, 2583, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2593, 2594, 2595, 2596, 2597, 2598, 2599, 2600, 2601, 2602, 2603, 2604, 2605, 2606, 2607, 2608, 2609, 2610, 2611, 2612, 2613, 2614, 2615, 2616, 2617, 2618, 2619, 2620, 2621, 2622, 2623, 2624, 2625, 2626, 2627, 2628, 2629, 2630, 2631, 2632, 2633, 2634, 2635, 2636, 2637, 2638, 2639, 2640, 2641, 2642, 2643, 2644, 2645, 2646, 2647, 2648, 2649, 2650, 2651, 2652, 2653, 2654, 2655, 2656, 2657, 2658, 2659, 2660, 2661, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2672, 2673, 2674, 2675, 2676, 2677, 2678, 2679, 2680, 2681, 2682, 2683, 2684, 2685, 2686, 2687, 2688, 2689, 2690, 2691, 2692, 2693, 2694, 2695, 2696, 2697, 2698, 2699, 2700, 2701, 2702, 2703, 2704, 2705, 2706, 2707, 2708, 2709, 2710, 2711, 2712, 2713, 2714, 2715, 2716, 2717, 2718, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2727, 2728, 2729, 2730, 2731, 2732, 2733, 2734, 2735, 2736, 2737, 2738, 2739, 2740, 2741, 2742, 2743, 2744, 2745, 2746, 2747, 2748, 2749, 2750, 2751, 2752, 2753, 2754, 2755, 2756, 2757, 2758, 2759, 2760, 2761, 2762, 2763, 2764, 2765, 2766, 2767, 2768, 2769, 2770, 2771, 2772, 2773, 2774, 2775, 2776, 2777, 2778, 2779, 2780, 2781, 2782, 2783, 2784, 2785, 2786, 2787, 2788, 2789, 2790, 2791, 2792, 2793, 2794, 2795, 2796, 2797, 2798, 2799, 2800, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2809, 2810, 2811, 2812, 2813, 2814, 2815, 2816, 2817, 2818, 2819, 2820, 2821, 2822, 2823, 2824, 2825, 2826, 2827, 2828, 2829, 2830, 2831, 2832, 2833, 2834, 2835, 2836, 2837, 2838, 2839, 2840, 2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2850, 2851, 2852, 2853, 2854, 2855, 2856, 2857, 2858, 2859, 2860, 2861, 2862, 2863, 2864, 2865, 2866, 2867, 2868, 2869, 2870, 2871, 2872, 2873, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 2884, 2885, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895, 2896, 2897, 2898, 2899, 2900, 2901, 2902, 2903, 2904, 2905, 2906, 2907, 2908, 2909, 2910, 2911, 2912, 2913, 2914, 2915, 2916, 2917, 2918, 2919, 2920, 2921, 2922, 2923, 2924, 2925, 2926, 2927, 2928, 2929, 2930, 2931, 2932, 2933, 2934, 2935, 2936, 2937, 2938, 2939, 2940, 2941, 2942, 2943, 2944, 2945, 2946, 2947, 2948, 2949, 2950, 2951, 2952, 2953, 2954, 2955, 2956, 2957, 2958, 2959, 2960, 2961, 2962, 2963, 2964, 2965, 2966, 2967, 2968, 2969, 2970, 2971, 2972, 2973, 2974, 2975, 2976, 2977, 2978, 2979, 2980, 2981, 2982, 2983, 2984, 2985, 2986, 2987, 2988, 2989, 2990, 2991, 2992, 2993, 2994, 2995, 2996, 2997, 2998, 2999, 3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014, 3015, 3016, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3024, 3025, 3026, 3027, 3028, 3029, 3030, 3031, 3032, 3033, 3034, 3035, 3036, 3037, 3038, 3039, 3040, 3041, 3042, 3043, 3044, 3045, 3046, 3047, 3048, 3049, 3050, 3051, 3052, 3053, 3054, 3055, 3056, 3057, 3058, 3059, 3060, 3061, 3062, 3063, 3064, 3065, 3066, 3067, 3068, 3069, 3070, 3071, 3072, 3073, 3074, 3075, 3076, 3077, 3078, 3079, 3080, 3081, 3082, 3083, 3084, 3085, 3086, 3087, 3088, 3089, 3090, 3091, 3092, 3093, 3094, 3095, 3096, 3097, 3098, 3099, 3100, 3101, 3102, 3103, 3104, 3105, 3106, 3107, 3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3121, 3122, 3123, 3124, 3125, 3126, 3127, 3128, 3129, 3130, 3131, 3132, 3133, 3134, 3135, 3136, 3137, 3138, 3139, 3140, 3141, 3142, 3143, 3144, 3145, 3146, 3147, 3148, 3149, 3150, 3151, 3152, 3153, 3154, 3155, 3156, 3157, 3158, 3159, 3160, 3161, 3162, 3163, 3164, 3165, 3166, 3167, 3168, 3169, 3170, 3171, 3172, 3173, 3174, 3175, 3176, 3177, 3178, 3179, 3180, 3181, 3182, 3183, 3184, 3185, 3186, 3187, 3188, 3189, 3190, 3191, 3192, 3193, 3194, 3195, 3196, 3197, 3198, 3199, 3200, 3201, 3202, 3203, 3204, 3205, 3206, 3207, 3208, 3209, 3210, 3211, 3212, 3213, 3214, 3215, 3216, 3217, 3218, 3219, 3220, 3221, 3222, 3223, 3224, 3225, 3226, 3227, 3228, 3229, 3230, 3231, 3232, 3233, 3234, 3235, 3236, 3237, 3238, 3239, 3240, 3241, 3242, 3243, 3244, 3245, 3246, 3247, 3248, 3249, 3250, 3251, 3252, 3253, 3254, 3255, 3256, 3257, 3258, 3259, 3260, 3261, 3262, 3263, 3264, 3265, 3266, 3267, 3268, 3269, 3270, 3271, 3272, 3273, 3274, 3275, 3276, 3277, 3278, 3279, 3280, 3281, 3282, 3283, 3284, 3285, 3286, 3287, 3288, 3289, 3290, 3291, 3292, 3293, 3294, 3295, 3296, 3297, 3298, 3299, 3300, 3301, 3302, 3303, 3304, 3305, 3306, 3307, 3308, 3309, 3310, 3311, 3312, 3313, 3314, 3315, 3316, 3317, 3318, 3319, 3320, 3321, 3322, 3323, 3324, 3325, 3326, 3327, 3328, 3329, 3330, 3331, 3332, 3333, 3334, 3335, 3336, 3337, 3338, 3339, 3340, 3341, 3342, 3343, 3344, 3345, 3346, 3347, 3348, 3349, 3350, 3351, 3352, 3353, 3354, 3355, 3356, 3357, 3358, 3359, 3360, 3361, 3362, 3363, 3364, 3365, 3366, 3367, 3368, 3369, 3370, 3371, 3372, 3373, 3374, 3375, 3376, 3377, 3378, 3379, 3380, 3381, 3382, 3383, 3384, 3385, 3386, 3387, 3388, 3389, 3390, 3391, 3392, 3393, 3394, 3395, 3396, 3397, 3398, 3399, 3400, 3401, 3402, 3403, 3404, 3405, 3406, 3407, 3408, 3409, 3410, 3411, 3412, 3413, 3414, 3415, 3416, 3417, 3418, 3419, 3420, 3421, 3422, 3423, 3424, 3425, 3426, 3427, 3428, 3429, 3430, 3431, 3432, 3433, 3434, 3435, 3436, 3437, 3438, 3439, 3440, 3441, 3442, 3443, 3444, 3445, 3446, 3447, 3448, 3449, 3450, 3451, 3452, 3453, 3454, 3455, 3456, 3457, 3458, 3459, 3460, 3461, 3462, 3463, 3464, 3465, 3466, 3467, 3468, 3469, 3470, 3471, 3472, 3473, 3474, 3475, 3476, 3477, 3478, 3479, 3480, 3481, 3482, 3483, 3484, 3485, 3486, 3487, 3488, 3489, 3490, 3491, 3492, 3493, 3494, 3495, 3496, 3497, 3498, 3499, 3500, 3501, 3502, 3503, 3504, 3505, 3506, 3507, 3508, 3509, 3510, 3511, 3512, 3513, 3514, 3515, 3516, 3517, 3518, 3519, 3520, 3521, 3522, 3523, 3524, 3525, 3526, 3527, 3528, 3529, 3530, 3531, 3532, default */
/***/ (function(module) {

module.exports = [{"中文名":"中华人民共和国","adcode":"100000","citycode":""},{"中文名":"北京市","adcode":"110000","citycode":"010"},{"中文名":"北京市市辖区","adcode":"110100","citycode":"010"},{"中文名":"东城区","adcode":"110101","citycode":"010"},{"中文名":"西城区","adcode":"110102","citycode":"010"},{"中文名":"朝阳区","adcode":"110105","citycode":"010"},{"中文名":"丰台区","adcode":"110106","citycode":"010"},{"中文名":"石景山区","adcode":"110107","citycode":"010"},{"中文名":"海淀区","adcode":"110108","citycode":"010"},{"中文名":"门头沟区","adcode":"110109","citycode":"010"},{"中文名":"房山区","adcode":"110111","citycode":"010"},{"中文名":"通州区","adcode":"110112","citycode":"010"},{"中文名":"顺义区","adcode":"110113","citycode":"010"},{"中文名":"昌平区","adcode":"110114","citycode":"010"},{"中文名":"大兴区","adcode":"110115","citycode":"010"},{"中文名":"怀柔区","adcode":"110116","citycode":"010"},{"中文名":"平谷区","adcode":"110117","citycode":"010"},{"中文名":"密云区","adcode":"110118","citycode":"010"},{"中文名":"延庆区","adcode":"110119","citycode":"010"},{"中文名":"天津市","adcode":"120000","citycode":"022"},{"中文名":"天津市市辖区","adcode":"120100","citycode":"022"},{"中文名":"和平区","adcode":"120101","citycode":"022"},{"中文名":"河东区","adcode":"120102","citycode":"022"},{"中文名":"河西区","adcode":"120103","citycode":"022"},{"中文名":"南开区","adcode":"120104","citycode":"022"},{"中文名":"河北区","adcode":"120105","citycode":"022"},{"中文名":"红桥区","adcode":"120106","citycode":"022"},{"中文名":"东丽区","adcode":"120110","citycode":"022"},{"中文名":"西青区","adcode":"120111","citycode":"022"},{"中文名":"津南区","adcode":"120112","citycode":"022"},{"中文名":"北辰区","adcode":"120113","citycode":"022"},{"中文名":"武清区","adcode":"120114","citycode":"022"},{"中文名":"宝坻区","adcode":"120115","citycode":"022"},{"中文名":"滨海新区","adcode":"120116","citycode":"022"},{"中文名":"宁河区","adcode":"120117","citycode":"022"},{"中文名":"静海区","adcode":"120118","citycode":"022"},{"中文名":"蓟州区","adcode":"120119","citycode":"022"},{"中文名":"河北省","adcode":"130000","citycode":""},{"中文名":"石家庄市","adcode":"130100","citycode":"0311"},{"中文名":"石家庄市市辖区","adcode":"130101","citycode":"0311"},{"中文名":"长安区","adcode":"130102","citycode":"0311"},{"中文名":"桥西区","adcode":"130104","citycode":"0311"},{"中文名":"新华区","adcode":"130105","citycode":"0311"},{"中文名":"井陉矿区","adcode":"130107","citycode":"0311"},{"中文名":"裕华区","adcode":"130108","citycode":"0311"},{"中文名":"藁城区","adcode":"130109","citycode":"0311"},{"中文名":"鹿泉区","adcode":"130110","citycode":"0311"},{"中文名":"栾城区","adcode":"130111","citycode":"0311"},{"中文名":"井陉县","adcode":"130121","citycode":"0311"},{"中文名":"正定县","adcode":"130123","citycode":"0311"},{"中文名":"行唐县","adcode":"130125","citycode":"0311"},{"中文名":"灵寿县","adcode":"130126","citycode":"0311"},{"中文名":"高邑县","adcode":"130127","citycode":"0311"},{"中文名":"深泽县","adcode":"130128","citycode":"0311"},{"中文名":"赞皇县","adcode":"130129","citycode":"0311"},{"中文名":"无极县","adcode":"130130","citycode":"0311"},{"中文名":"平山县","adcode":"130131","citycode":"0311"},{"中文名":"元氏县","adcode":"130132","citycode":"0311"},{"中文名":"赵县","adcode":"130133","citycode":"0311"},{"中文名":"辛集市","adcode":"130181","citycode":"0311"},{"中文名":"晋州市","adcode":"130183","citycode":"0311"},{"中文名":"新乐市","adcode":"130184","citycode":"0311"},{"中文名":"唐山市","adcode":"130200","citycode":"0315"},{"中文名":"唐山市市辖区","adcode":"130201","citycode":"0315"},{"中文名":"路南区","adcode":"130202","citycode":"0315"},{"中文名":"路北区","adcode":"130203","citycode":"0315"},{"中文名":"古冶区","adcode":"130204","citycode":"0315"},{"中文名":"开平区","adcode":"130205","citycode":"0315"},{"中文名":"丰南区","adcode":"130207","citycode":"0315"},{"中文名":"丰润区","adcode":"130208","citycode":"0315"},{"中文名":"曹妃甸区","adcode":"130209","citycode":"0315"},{"中文名":"滦州市","adcode":"130284","citycode":"0315"},{"中文名":"滦南县","adcode":"130224","citycode":"0315"},{"中文名":"乐亭县","adcode":"130225","citycode":"0315"},{"中文名":"迁西县","adcode":"130227","citycode":"0315"},{"中文名":"玉田县","adcode":"130229","citycode":"0315"},{"中文名":"遵化市","adcode":"130281","citycode":"0315"},{"中文名":"迁安市","adcode":"130283","citycode":"0315"},{"中文名":"秦皇岛市","adcode":"130300","citycode":"0335"},{"中文名":"秦皇岛市市辖区","adcode":"130301","citycode":"0335"},{"中文名":"海港区","adcode":"130302","citycode":"0335"},{"中文名":"山海关区","adcode":"130303","citycode":"0335"},{"中文名":"北戴河区","adcode":"130304","citycode":"0335"},{"中文名":"抚宁区","adcode":"130306","citycode":"0335"},{"中文名":"青龙满族自治县","adcode":"130321","citycode":"0335"},{"中文名":"昌黎县","adcode":"130322","citycode":"0335"},{"中文名":"卢龙县","adcode":"130324","citycode":"0335"},{"中文名":"邯郸市","adcode":"130400","citycode":"0310"},{"中文名":"邯郸市市辖区","adcode":"130401","citycode":"0310"},{"中文名":"邯山区","adcode":"130402","citycode":"0310"},{"中文名":"丛台区","adcode":"130403","citycode":"0310"},{"中文名":"复兴区","adcode":"130404","citycode":"0310"},{"中文名":"峰峰矿区","adcode":"130406","citycode":"0310"},{"中文名":"肥乡区","adcode":"130407","citycode":"0310"},{"中文名":"永年区","adcode":"130408","citycode":"0310"},{"中文名":"临漳县","adcode":"130423","citycode":"0310"},{"中文名":"成安县","adcode":"130424","citycode":"0310"},{"中文名":"大名县","adcode":"130425","citycode":"0310"},{"中文名":"涉县","adcode":"130426","citycode":"0310"},{"中文名":"磁县","adcode":"130427","citycode":"0310"},{"中文名":"邱县","adcode":"130430","citycode":"0310"},{"中文名":"鸡泽县","adcode":"130431","citycode":"0310"},{"中文名":"广平县","adcode":"130432","citycode":"0310"},{"中文名":"馆陶县","adcode":"130433","citycode":"0310"},{"中文名":"魏县","adcode":"130434","citycode":"0310"},{"中文名":"曲周县","adcode":"130435","citycode":"0310"},{"中文名":"武安市","adcode":"130481","citycode":"0310"},{"中文名":"邢台市","adcode":"130500","citycode":"0319"},{"中文名":"邢台市市辖区","adcode":"130501","citycode":"0319"},{"中文名":"桥东区","adcode":"130502","citycode":"0319"},{"中文名":"桥西区","adcode":"130503","citycode":"0319"},{"中文名":"邢台县","adcode":"130521","citycode":"0319"},{"中文名":"临城县","adcode":"130522","citycode":"0319"},{"中文名":"内丘县","adcode":"130523","citycode":"0319"},{"中文名":"柏乡县","adcode":"130524","citycode":"0319"},{"中文名":"隆尧县","adcode":"130525","citycode":"0319"},{"中文名":"任县","adcode":"130526","citycode":"0319"},{"中文名":"南和县","adcode":"130527","citycode":"0319"},{"中文名":"宁晋县","adcode":"130528","citycode":"0319"},{"中文名":"巨鹿县","adcode":"130529","citycode":"0319"},{"中文名":"新河县","adcode":"130530","citycode":"0319"},{"中文名":"广宗县","adcode":"130531","citycode":"0319"},{"中文名":"平乡县","adcode":"130532","citycode":"0319"},{"中文名":"威县","adcode":"130533","citycode":"0319"},{"中文名":"清河县","adcode":"130534","citycode":"0319"},{"中文名":"临西县","adcode":"130535","citycode":"0319"},{"中文名":"南宫市","adcode":"130581","citycode":"0319"},{"中文名":"沙河市","adcode":"130582","citycode":"0319"},{"中文名":"保定市","adcode":"130600","citycode":"0312"},{"中文名":"保定市市辖区","adcode":"130601","citycode":"0312"},{"中文名":"竞秀区","adcode":"130602","citycode":"0312"},{"中文名":"莲池区","adcode":"130606","citycode":"0312"},{"中文名":"满城区","adcode":"130607","citycode":"0312"},{"中文名":"清苑区","adcode":"130608","citycode":"0312"},{"中文名":"徐水区","adcode":"130609","citycode":"0312"},{"中文名":"涞水县","adcode":"130623","citycode":"0312"},{"中文名":"阜平县","adcode":"130624","citycode":"0312"},{"中文名":"定兴县","adcode":"130626","citycode":"0312"},{"中文名":"唐县","adcode":"130627","citycode":"0312"},{"中文名":"高阳县","adcode":"130628","citycode":"0312"},{"中文名":"容城县","adcode":"130629","citycode":"0312"},{"中文名":"涞源县","adcode":"130630","citycode":"0312"},{"中文名":"望都县","adcode":"130631","citycode":"0312"},{"中文名":"安新县","adcode":"130632","citycode":"0312"},{"中文名":"易县","adcode":"130633","citycode":"0312"},{"中文名":"曲阳县","adcode":"130634","citycode":"0312"},{"中文名":"蠡县","adcode":"130635","citycode":"0312"},{"中文名":"顺平县","adcode":"130636","citycode":"0312"},{"中文名":"博野县","adcode":"130637","citycode":"0312"},{"中文名":"雄县","adcode":"130638","citycode":"0312"},{"中文名":"涿州市","adcode":"130681","citycode":"0312"},{"中文名":"定州市","adcode":"130682","citycode":"0312"},{"中文名":"安国市","adcode":"130683","citycode":"0312"},{"中文名":"高碑店市","adcode":"130684","citycode":"0312"},{"中文名":"张家口市","adcode":"130700","citycode":"0313"},{"中文名":"张家口市市辖区","adcode":"130701","citycode":"0313"},{"中文名":"桥东区","adcode":"130702","citycode":"0313"},{"中文名":"桥西区","adcode":"130703","citycode":"0313"},{"中文名":"宣化区","adcode":"130705","citycode":"0313"},{"中文名":"下花园区","adcode":"130706","citycode":"0313"},{"中文名":"万全区","adcode":"130708","citycode":"0313"},{"中文名":"崇礼区","adcode":"130709","citycode":"0313"},{"中文名":"张北县","adcode":"130722","citycode":"0313"},{"中文名":"康保县","adcode":"130723","citycode":"0313"},{"中文名":"沽源县","adcode":"130724","citycode":"0313"},{"中文名":"尚义县","adcode":"130725","citycode":"0313"},{"中文名":"蔚县","adcode":"130726","citycode":"0313"},{"中文名":"阳原县","adcode":"130727","citycode":"0313"},{"中文名":"怀安县","adcode":"130728","citycode":"0313"},{"中文名":"怀来县","adcode":"130730","citycode":"0313"},{"中文名":"涿鹿县","adcode":"130731","citycode":"0313"},{"中文名":"赤城县","adcode":"130732","citycode":"0313"},{"中文名":"承德市","adcode":"130800","citycode":"0314"},{"中文名":"承德市市辖区","adcode":"130801","citycode":"0314"},{"中文名":"双桥区","adcode":"130802","citycode":"0314"},{"中文名":"双滦区","adcode":"130803","citycode":"0314"},{"中文名":"鹰手营子矿区","adcode":"130804","citycode":"0314"},{"中文名":"承德县","adcode":"130821","citycode":"0314"},{"中文名":"兴隆县","adcode":"130822","citycode":"0314"},{"中文名":"滦平县","adcode":"130824","citycode":"0314"},{"中文名":"隆化县","adcode":"130825","citycode":"0314"},{"中文名":"丰宁满族自治县","adcode":"130826","citycode":"0314"},{"中文名":"宽城满族自治县","adcode":"130827","citycode":"0314"},{"中文名":"围场满族蒙古族自治县","adcode":"130828","citycode":"0314"},{"中文名":"平泉市","adcode":"130881","citycode":"0314"},{"中文名":"沧州市","adcode":"130900","citycode":"0317"},{"中文名":"沧州市市辖区","adcode":"130901","citycode":"0317"},{"中文名":"新华区","adcode":"130902","citycode":"0317"},{"中文名":"运河区","adcode":"130903","citycode":"0317"},{"中文名":"沧县","adcode":"130921","citycode":"0317"},{"中文名":"青县","adcode":"130922","citycode":"0317"},{"中文名":"东光县","adcode":"130923","citycode":"0317"},{"中文名":"海兴县","adcode":"130924","citycode":"0317"},{"中文名":"盐山县","adcode":"130925","citycode":"0317"},{"中文名":"肃宁县","adcode":"130926","citycode":"0317"},{"中文名":"南皮县","adcode":"130927","citycode":"0317"},{"中文名":"吴桥县","adcode":"130928","citycode":"0317"},{"中文名":"献县","adcode":"130929","citycode":"0317"},{"中文名":"孟村回族自治县","adcode":"130930","citycode":"0317"},{"中文名":"泊头市","adcode":"130981","citycode":"0317"},{"中文名":"任丘市","adcode":"130982","citycode":"0317"},{"中文名":"黄骅市","adcode":"130983","citycode":"0317"},{"中文名":"河间市","adcode":"130984","citycode":"0317"},{"中文名":"廊坊市","adcode":"131000","citycode":"0316"},{"中文名":"廊坊市市辖区","adcode":"131001","citycode":"0316"},{"中文名":"安次区","adcode":"131002","citycode":"0316"},{"中文名":"广阳区","adcode":"131003","citycode":"0316"},{"中文名":"固安县","adcode":"131022","citycode":"0316"},{"中文名":"永清县","adcode":"131023","citycode":"0316"},{"中文名":"香河县","adcode":"131024","citycode":"0316"},{"中文名":"大城县","adcode":"131025","citycode":"0316"},{"中文名":"文安县","adcode":"131026","citycode":"0316"},{"中文名":"大厂回族自治县","adcode":"131028","citycode":"0316"},{"中文名":"霸州市","adcode":"131081","citycode":"0316"},{"中文名":"三河市","adcode":"131082","citycode":"0316"},{"中文名":"衡水市","adcode":"131100","citycode":"0318"},{"中文名":"衡水市市辖区","adcode":"131101","citycode":"0318"},{"中文名":"桃城区","adcode":"131102","citycode":"0318"},{"中文名":"冀州区","adcode":"131103","citycode":"0318"},{"中文名":"枣强县","adcode":"131121","citycode":"0318"},{"中文名":"武邑县","adcode":"131122","citycode":"0318"},{"中文名":"武强县","adcode":"131123","citycode":"0318"},{"中文名":"饶阳县","adcode":"131124","citycode":"0318"},{"中文名":"安平县","adcode":"131125","citycode":"0318"},{"中文名":"故城县","adcode":"131126","citycode":"0318"},{"中文名":"景县","adcode":"131127","citycode":"0318"},{"中文名":"阜城县","adcode":"131128","citycode":"0318"},{"中文名":"深州市","adcode":"131182","citycode":"0318"},{"中文名":"山西省","adcode":"140000","citycode":""},{"中文名":"太原市","adcode":"140100","citycode":"0351"},{"中文名":"太原市市辖区","adcode":"140101","citycode":"0351"},{"中文名":"小店区","adcode":"140105","citycode":"0351"},{"中文名":"迎泽区","adcode":"140106","citycode":"0351"},{"中文名":"杏花岭区","adcode":"140107","citycode":"0351"},{"中文名":"尖草坪区","adcode":"140108","citycode":"0351"},{"中文名":"万柏林区","adcode":"140109","citycode":"0351"},{"中文名":"晋源区","adcode":"140110","citycode":"0351"},{"中文名":"清徐县","adcode":"140121","citycode":"0351"},{"中文名":"阳曲县","adcode":"140122","citycode":"0351"},{"中文名":"娄烦县","adcode":"140123","citycode":"0351"},{"中文名":"古交市","adcode":"140181","citycode":"0351"},{"中文名":"大同市","adcode":"140200","citycode":"0352"},{"中文名":"大同市市辖区","adcode":"140201","citycode":"0352"},{"中文名":"平城区","adcode":"140213","citycode":"0352"},{"中文名":"云冈区","adcode":"140214","citycode":"0352"},{"中文名":"新荣区","adcode":"140212","citycode":"0352"},{"中文名":"阳高县","adcode":"140221","citycode":"0352"},{"中文名":"天镇县","adcode":"140222","citycode":"0352"},{"中文名":"广灵县","adcode":"140223","citycode":"0352"},{"中文名":"灵丘县","adcode":"140224","citycode":"0352"},{"中文名":"浑源县","adcode":"140225","citycode":"0352"},{"中文名":"左云县","adcode":"140226","citycode":"0352"},{"中文名":"云州区","adcode":"140215","citycode":"0352"},{"中文名":"阳泉市","adcode":"140300","citycode":"0353"},{"中文名":"阳泉市市辖区","adcode":"140301","citycode":"0353"},{"中文名":"城区","adcode":"140302","citycode":"0353"},{"中文名":"矿区","adcode":"140303","citycode":"0353"},{"中文名":"郊区","adcode":"140311","citycode":"0353"},{"中文名":"平定县","adcode":"140321","citycode":"0353"},{"中文名":"盂县","adcode":"140322","citycode":"0353"},{"中文名":"长治市","adcode":"140400","citycode":"0355"},{"中文名":"长治市市辖区","adcode":"140401","citycode":"0355"},{"中文名":"潞州区","adcode":"140403","citycode":"0355"},{"中文名":"上党区","adcode":"140404","citycode":"0355"},{"中文名":"襄垣县","adcode":"140423","citycode":"0355"},{"中文名":"屯留区","adcode":"140405","citycode":"0355"},{"中文名":"平顺县","adcode":"140425","citycode":"0355"},{"中文名":"黎城县","adcode":"140426","citycode":"0355"},{"中文名":"壶关县","adcode":"140427","citycode":"0355"},{"中文名":"长子县","adcode":"140428","citycode":"0355"},{"中文名":"武乡县","adcode":"140429","citycode":"0355"},{"中文名":"沁县","adcode":"140430","citycode":"0355"},{"中文名":"沁源县","adcode":"140431","citycode":"0355"},{"中文名":"潞城区","adcode":"140406","citycode":"0355"},{"中文名":"晋城市","adcode":"140500","citycode":"0356"},{"中文名":"晋城市市辖区","adcode":"140501","citycode":"0356"},{"中文名":"城区","adcode":"140502","citycode":"0356"},{"中文名":"沁水县","adcode":"140521","citycode":"0356"},{"中文名":"阳城县","adcode":"140522","citycode":"0356"},{"中文名":"陵川县","adcode":"140524","citycode":"0356"},{"中文名":"泽州县","adcode":"140525","citycode":"0356"},{"中文名":"高平市","adcode":"140581","citycode":"0356"},{"中文名":"朔州市","adcode":"140600","citycode":"0349"},{"中文名":"朔州市市辖区","adcode":"140601","citycode":"0349"},{"中文名":"朔城区","adcode":"140602","citycode":"0349"},{"中文名":"平鲁区","adcode":"140603","citycode":"0349"},{"中文名":"山阴县","adcode":"140621","citycode":"0349"},{"中文名":"应县","adcode":"140622","citycode":"0349"},{"中文名":"右玉县","adcode":"140623","citycode":"0349"},{"中文名":"怀仁市","adcode":"140681","citycode":"0349"},{"中文名":"晋中市","adcode":"140700","citycode":"0354"},{"中文名":"晋中市市辖区","adcode":"140701","citycode":"0354"},{"中文名":"榆次区","adcode":"140702","citycode":"0354"},{"中文名":"榆社县","adcode":"140721","citycode":"0354"},{"中文名":"左权县","adcode":"140722","citycode":"0354"},{"中文名":"和顺县","adcode":"140723","citycode":"0354"},{"中文名":"昔阳县","adcode":"140724","citycode":"0354"},{"中文名":"寿阳县","adcode":"140725","citycode":"0354"},{"中文名":"太谷区","adcode":"140703","citycode":"0354"},{"中文名":"祁县","adcode":"140727","citycode":"0354"},{"中文名":"平遥县","adcode":"140728","citycode":"0354"},{"中文名":"灵石县","adcode":"140729","citycode":"0354"},{"中文名":"介休市","adcode":"140781","citycode":"0354"},{"中文名":"运城市","adcode":"140800","citycode":"0359"},{"中文名":"运城市市辖区","adcode":"140801","citycode":"0359"},{"中文名":"盐湖区","adcode":"140802","citycode":"0359"},{"中文名":"临猗县","adcode":"140821","citycode":"0359"},{"中文名":"万荣县","adcode":"140822","citycode":"0359"},{"中文名":"闻喜县","adcode":"140823","citycode":"0359"},{"中文名":"稷山县","adcode":"140824","citycode":"0359"},{"中文名":"新绛县","adcode":"140825","citycode":"0359"},{"中文名":"绛县","adcode":"140826","citycode":"0359"},{"中文名":"垣曲县","adcode":"140827","citycode":"0359"},{"中文名":"夏县","adcode":"140828","citycode":"0359"},{"中文名":"平陆县","adcode":"140829","citycode":"0359"},{"中文名":"芮城县","adcode":"140830","citycode":"0359"},{"中文名":"永济市","adcode":"140881","citycode":"0359"},{"中文名":"河津市","adcode":"140882","citycode":"0359"},{"中文名":"忻州市","adcode":"140900","citycode":"0350"},{"中文名":"忻州市市辖区","adcode":"140901","citycode":"0350"},{"中文名":"忻府区","adcode":"140902","citycode":"0350"},{"中文名":"定襄县","adcode":"140921","citycode":"0350"},{"中文名":"五台县","adcode":"140922","citycode":"0350"},{"中文名":"代县","adcode":"140923","citycode":"0350"},{"中文名":"繁峙县","adcode":"140924","citycode":"0350"},{"中文名":"宁武县","adcode":"140925","citycode":"0350"},{"中文名":"静乐县","adcode":"140926","citycode":"0350"},{"中文名":"神池县","adcode":"140927","citycode":"0350"},{"中文名":"五寨县","adcode":"140928","citycode":"0350"},{"中文名":"岢岚县","adcode":"140929","citycode":"0350"},{"中文名":"河曲县","adcode":"140930","citycode":"0350"},{"中文名":"保德县","adcode":"140931","citycode":"0350"},{"中文名":"偏关县","adcode":"140932","citycode":"0350"},{"中文名":"原平市","adcode":"140981","citycode":"0350"},{"中文名":"临汾市","adcode":"141000","citycode":"0357"},{"中文名":"临汾市市辖区","adcode":"141001","citycode":"0357"},{"中文名":"尧都区","adcode":"141002","citycode":"0357"},{"中文名":"曲沃县","adcode":"141021","citycode":"0357"},{"中文名":"翼城县","adcode":"141022","citycode":"0357"},{"中文名":"襄汾县","adcode":"141023","citycode":"0357"},{"中文名":"洪洞县","adcode":"141024","citycode":"0357"},{"中文名":"古县","adcode":"141025","citycode":"0357"},{"中文名":"安泽县","adcode":"141026","citycode":"0357"},{"中文名":"浮山县","adcode":"141027","citycode":"0357"},{"中文名":"吉县","adcode":"141028","citycode":"0357"},{"中文名":"乡宁县","adcode":"141029","citycode":"0357"},{"中文名":"大宁县","adcode":"141030","citycode":"0357"},{"中文名":"隰县","adcode":"141031","citycode":"0357"},{"中文名":"永和县","adcode":"141032","citycode":"0357"},{"中文名":"蒲县","adcode":"141033","citycode":"0357"},{"中文名":"汾西县","adcode":"141034","citycode":"0357"},{"中文名":"侯马市","adcode":"141081","citycode":"0357"},{"中文名":"霍州市","adcode":"141082","citycode":"0357"},{"中文名":"吕梁市","adcode":"141100","citycode":"0358"},{"中文名":"吕梁市市辖区","adcode":"141101","citycode":"0358"},{"中文名":"离石区","adcode":"141102","citycode":"0358"},{"中文名":"文水县","adcode":"141121","citycode":"0358"},{"中文名":"交城县","adcode":"141122","citycode":"0358"},{"中文名":"兴县","adcode":"141123","citycode":"0358"},{"中文名":"临县","adcode":"141124","citycode":"0358"},{"中文名":"柳林县","adcode":"141125","citycode":"0358"},{"中文名":"石楼县","adcode":"141126","citycode":"0358"},{"中文名":"岚县","adcode":"141127","citycode":"0358"},{"中文名":"方山县","adcode":"141128","citycode":"0358"},{"中文名":"中阳县","adcode":"141129","citycode":"0358"},{"中文名":"交口县","adcode":"141130","citycode":"0358"},{"中文名":"孝义市","adcode":"141181","citycode":"0358"},{"中文名":"汾阳市","adcode":"141182","citycode":"0358"},{"中文名":"内蒙古自治区","adcode":"150000","citycode":""},{"中文名":"呼和浩特市","adcode":"150100","citycode":"0471"},{"中文名":"呼和浩特市市辖区","adcode":"150101","citycode":"0471"},{"中文名":"新城区","adcode":"150102","citycode":"0471"},{"中文名":"回民区","adcode":"150103","citycode":"0471"},{"中文名":"玉泉区","adcode":"150104","citycode":"0471"},{"中文名":"赛罕区","adcode":"150105","citycode":"0471"},{"中文名":"土默特左旗","adcode":"150121","citycode":"0471"},{"中文名":"托克托县","adcode":"150122","citycode":"0471"},{"中文名":"和林格尔县","adcode":"150123","citycode":"0471"},{"中文名":"清水河县","adcode":"150124","citycode":"0471"},{"中文名":"武川县","adcode":"150125","citycode":"0471"},{"中文名":"包头市","adcode":"150200","citycode":"0472"},{"中文名":"包头市市辖区","adcode":"150201","citycode":"0472"},{"中文名":"东河区","adcode":"150202","citycode":"0472"},{"中文名":"昆都仑区","adcode":"150203","citycode":"0472"},{"中文名":"青山区","adcode":"150204","citycode":"0472"},{"中文名":"石拐区","adcode":"150205","citycode":"0472"},{"中文名":"白云鄂博矿区","adcode":"150206","citycode":"0472"},{"中文名":"九原区","adcode":"150207","citycode":"0472"},{"中文名":"土默特右旗","adcode":"150221","citycode":"0472"},{"中文名":"固阳县","adcode":"150222","citycode":"0472"},{"中文名":"达尔罕茂明安联合旗","adcode":"150223","citycode":"0472"},{"中文名":"乌海市","adcode":"150300","citycode":"0473"},{"中文名":"乌海市市辖区","adcode":"150301","citycode":"0473"},{"中文名":"海勃湾区","adcode":"150302","citycode":"0473"},{"中文名":"海南区","adcode":"150303","citycode":"0473"},{"中文名":"乌达区","adcode":"150304","citycode":"0473"},{"中文名":"赤峰市","adcode":"150400","citycode":"0476"},{"中文名":"赤峰市市辖区","adcode":"150401","citycode":"0476"},{"中文名":"红山区","adcode":"150402","citycode":"0476"},{"中文名":"元宝山区","adcode":"150403","citycode":"0476"},{"中文名":"松山区","adcode":"150404","citycode":"0476"},{"中文名":"阿鲁科尔沁旗","adcode":"150421","citycode":"0476"},{"中文名":"巴林左旗","adcode":"150422","citycode":"0476"},{"中文名":"巴林右旗","adcode":"150423","citycode":"0476"},{"中文名":"林西县","adcode":"150424","citycode":"0476"},{"中文名":"克什克腾旗","adcode":"150425","citycode":"0476"},{"中文名":"翁牛特旗","adcode":"150426","citycode":"0476"},{"中文名":"喀喇沁旗","adcode":"150428","citycode":"0476"},{"中文名":"宁城县","adcode":"150429","citycode":"0476"},{"中文名":"敖汉旗","adcode":"150430","citycode":"0476"},{"中文名":"通辽市","adcode":"150500","citycode":"0475"},{"中文名":"通辽市市辖区","adcode":"150501","citycode":"0475"},{"中文名":"科尔沁区","adcode":"150502","citycode":"0475"},{"中文名":"科尔沁左翼中旗","adcode":"150521","citycode":"0475"},{"中文名":"科尔沁左翼后旗","adcode":"150522","citycode":"0475"},{"中文名":"开鲁县","adcode":"150523","citycode":"0475"},{"中文名":"库伦旗","adcode":"150524","citycode":"0475"},{"中文名":"奈曼旗","adcode":"150525","citycode":"0475"},{"中文名":"扎鲁特旗","adcode":"150526","citycode":"0475"},{"中文名":"霍林郭勒市","adcode":"150581","citycode":"0475"},{"中文名":"鄂尔多斯市","adcode":"150600","citycode":"0477"},{"中文名":"鄂尔多斯市市辖区","adcode":"150601","citycode":"0477"},{"中文名":"东胜区","adcode":"150602","citycode":"0477"},{"中文名":"康巴什区","adcode":"150603","citycode":"0477"},{"中文名":"达拉特旗","adcode":"150621","citycode":"0477"},{"中文名":"准格尔旗","adcode":"150622","citycode":"0477"},{"中文名":"鄂托克前旗","adcode":"150623","citycode":"0477"},{"中文名":"鄂托克旗","adcode":"150624","citycode":"0477"},{"中文名":"杭锦旗","adcode":"150625","citycode":"0477"},{"中文名":"乌审旗","adcode":"150626","citycode":"0477"},{"中文名":"伊金霍洛旗","adcode":"150627","citycode":"0477"},{"中文名":"呼伦贝尔市","adcode":"150700","citycode":"0470"},{"中文名":"呼伦贝尔市市辖区","adcode":"150701","citycode":"0470"},{"中文名":"海拉尔区","adcode":"150702","citycode":"0470"},{"中文名":"扎赉诺尔区","adcode":"150703","citycode":"0470"},{"中文名":"阿荣旗","adcode":"150721","citycode":"0470"},{"中文名":"莫力达瓦达斡尔族自治旗","adcode":"150722","citycode":"0470"},{"中文名":"鄂伦春自治旗","adcode":"150723","citycode":"0470"},{"中文名":"鄂温克族自治旗","adcode":"150724","citycode":"0470"},{"中文名":"陈巴尔虎旗","adcode":"150725","citycode":"0470"},{"中文名":"新巴尔虎左旗","adcode":"150726","citycode":"0470"},{"中文名":"新巴尔虎右旗","adcode":"150727","citycode":"0470"},{"中文名":"满洲里市","adcode":"150781","citycode":"0470"},{"中文名":"牙克石市","adcode":"150782","citycode":"0470"},{"中文名":"扎兰屯市","adcode":"150783","citycode":"0470"},{"中文名":"额尔古纳市","adcode":"150784","citycode":"0470"},{"中文名":"根河市","adcode":"150785","citycode":"0470"},{"中文名":"巴彦淖尔市","adcode":"150800","citycode":"0478"},{"中文名":"巴彦淖尔市市辖区","adcode":"150801","citycode":"0478"},{"中文名":"临河区","adcode":"150802","citycode":"0478"},{"中文名":"五原县","adcode":"150821","citycode":"0478"},{"中文名":"磴口县","adcode":"150822","citycode":"0478"},{"中文名":"乌拉特前旗","adcode":"150823","citycode":"0478"},{"中文名":"乌拉特中旗","adcode":"150824","citycode":"0478"},{"中文名":"乌拉特后旗","adcode":"150825","citycode":"0478"},{"中文名":"杭锦后旗","adcode":"150826","citycode":"0478"},{"中文名":"乌兰察布市","adcode":"150900","citycode":"0474"},{"中文名":"乌兰察布市市辖区","adcode":"150901","citycode":"0474"},{"中文名":"集宁区","adcode":"150902","citycode":"0474"},{"中文名":"卓资县","adcode":"150921","citycode":"0474"},{"中文名":"化德县","adcode":"150922","citycode":"0474"},{"中文名":"商都县","adcode":"150923","citycode":"0474"},{"中文名":"兴和县","adcode":"150924","citycode":"0474"},{"中文名":"凉城县","adcode":"150925","citycode":"0474"},{"中文名":"察哈尔右翼前旗","adcode":"150926","citycode":"0474"},{"中文名":"察哈尔右翼中旗","adcode":"150927","citycode":"0474"},{"中文名":"察哈尔右翼后旗","adcode":"150928","citycode":"0474"},{"中文名":"四子王旗","adcode":"150929","citycode":"0474"},{"中文名":"丰镇市","adcode":"150981","citycode":"0474"},{"中文名":"兴安盟","adcode":"152200","citycode":"0482"},{"中文名":"乌兰浩特市","adcode":"152201","citycode":"0482"},{"中文名":"阿尔山市","adcode":"152202","citycode":"0482"},{"中文名":"科尔沁右翼前旗","adcode":"152221","citycode":"0482"},{"中文名":"科尔沁右翼中旗","adcode":"152222","citycode":"0482"},{"中文名":"扎赉特旗","adcode":"152223","citycode":"0482"},{"中文名":"突泉县","adcode":"152224","citycode":"0482"},{"中文名":"锡林郭勒盟","adcode":"152500","citycode":"0479"},{"中文名":"二连浩特市","adcode":"152501","citycode":"0479"},{"中文名":"锡林浩特市","adcode":"152502","citycode":"0479"},{"中文名":"阿巴嘎旗","adcode":"152522","citycode":"0479"},{"中文名":"苏尼特左旗","adcode":"152523","citycode":"0479"},{"中文名":"苏尼特右旗","adcode":"152524","citycode":"0479"},{"中文名":"东乌珠穆沁旗","adcode":"152525","citycode":"0479"},{"中文名":"西乌珠穆沁旗","adcode":"152526","citycode":"0479"},{"中文名":"太仆寺旗","adcode":"152527","citycode":"0479"},{"中文名":"镶黄旗","adcode":"152528","citycode":"0479"},{"中文名":"正镶白旗","adcode":"152529","citycode":"0479"},{"中文名":"正蓝旗","adcode":"152530","citycode":"0479"},{"中文名":"多伦县","adcode":"152531","citycode":"0479"},{"中文名":"阿拉善盟","adcode":"152900","citycode":"0483"},{"中文名":"阿拉善左旗","adcode":"152921","citycode":"0483"},{"中文名":"阿拉善右旗","adcode":"152922","citycode":"0483"},{"中文名":"额济纳旗","adcode":"152923","citycode":"0483"},{"中文名":"辽宁省","adcode":"210000","citycode":""},{"中文名":"沈阳市","adcode":"210100","citycode":"024"},{"中文名":"沈阳市市辖区","adcode":"210101","citycode":"024"},{"中文名":"和平区","adcode":"210102","citycode":"024"},{"中文名":"沈河区","adcode":"210103","citycode":"024"},{"中文名":"大东区","adcode":"210104","citycode":"024"},{"中文名":"皇姑区","adcode":"210105","citycode":"024"},{"中文名":"铁西区","adcode":"210106","citycode":"024"},{"中文名":"苏家屯区","adcode":"210111","citycode":"024"},{"中文名":"浑南区","adcode":"210112","citycode":"024"},{"中文名":"沈北新区","adcode":"210113","citycode":"024"},{"中文名":"于洪区","adcode":"210114","citycode":"024"},{"中文名":"辽中区","adcode":"210115","citycode":"024"},{"中文名":"康平县","adcode":"210123","citycode":"024"},{"中文名":"法库县","adcode":"210124","citycode":"024"},{"中文名":"新民市","adcode":"210181","citycode":"024"},{"中文名":"大连市","adcode":"210200","citycode":"0411"},{"中文名":"大连市市辖区","adcode":"210201","citycode":"0411"},{"中文名":"中山区","adcode":"210202","citycode":"0411"},{"中文名":"西岗区","adcode":"210203","citycode":"0411"},{"中文名":"沙河口区","adcode":"210204","citycode":"0411"},{"中文名":"甘井子区","adcode":"210211","citycode":"0411"},{"中文名":"旅顺口区","adcode":"210212","citycode":"0411"},{"中文名":"金州区","adcode":"210213","citycode":"0411"},{"中文名":"普兰店区","adcode":"210214","citycode":"0411"},{"中文名":"长海县","adcode":"210224","citycode":"0411"},{"中文名":"瓦房店市","adcode":"210281","citycode":"0411"},{"中文名":"庄河市","adcode":"210283","citycode":"0411"},{"中文名":"鞍山市","adcode":"210300","citycode":"0412"},{"中文名":"鞍山市市辖区","adcode":"210301","citycode":"0412"},{"中文名":"铁东区","adcode":"210302","citycode":"0412"},{"中文名":"铁西区","adcode":"210303","citycode":"0412"},{"中文名":"立山区","adcode":"210304","citycode":"0412"},{"中文名":"千山区","adcode":"210311","citycode":"0412"},{"中文名":"台安县","adcode":"210321","citycode":"0412"},{"中文名":"岫岩满族自治县","adcode":"210323","citycode":"0412"},{"中文名":"海城市","adcode":"210381","citycode":"0412"},{"中文名":"抚顺市","adcode":"210400","citycode":"0413"},{"中文名":"抚顺市市辖区","adcode":"210401","citycode":"0413"},{"中文名":"新抚区","adcode":"210402","citycode":"0413"},{"中文名":"东洲区","adcode":"210403","citycode":"0413"},{"中文名":"望花区","adcode":"210404","citycode":"0413"},{"中文名":"顺城区","adcode":"210411","citycode":"0413"},{"中文名":"抚顺县","adcode":"210421","citycode":"0413"},{"中文名":"新宾满族自治县","adcode":"210422","citycode":"0413"},{"中文名":"清原满族自治县","adcode":"210423","citycode":"0413"},{"中文名":"本溪市","adcode":"210500","citycode":"0414"},{"中文名":"本溪市市辖区","adcode":"210501","citycode":"0414"},{"中文名":"平山区","adcode":"210502","citycode":"0414"},{"中文名":"溪湖区","adcode":"210503","citycode":"0414"},{"中文名":"明山区","adcode":"210504","citycode":"0414"},{"中文名":"南芬区","adcode":"210505","citycode":"0414"},{"中文名":"本溪满族自治县","adcode":"210521","citycode":"0414"},{"中文名":"桓仁满族自治县","adcode":"210522","citycode":"0414"},{"中文名":"丹东市","adcode":"210600","citycode":"0415"},{"中文名":"丹东市市辖区","adcode":"210601","citycode":"0415"},{"中文名":"元宝区","adcode":"210602","citycode":"0415"},{"中文名":"振兴区","adcode":"210603","citycode":"0415"},{"中文名":"振安区","adcode":"210604","citycode":"0415"},{"中文名":"宽甸满族自治县","adcode":"210624","citycode":"0415"},{"中文名":"东港市","adcode":"210681","citycode":"0415"},{"中文名":"凤城市","adcode":"210682","citycode":"0415"},{"中文名":"锦州市","adcode":"210700","citycode":"0416"},{"中文名":"锦州市市辖区","adcode":"210701","citycode":"0416"},{"中文名":"古塔区","adcode":"210702","citycode":"0416"},{"中文名":"凌河区","adcode":"210703","citycode":"0416"},{"中文名":"太和区","adcode":"210711","citycode":"0416"},{"中文名":"黑山县","adcode":"210726","citycode":"0416"},{"中文名":"义县","adcode":"210727","citycode":"0416"},{"中文名":"凌海市","adcode":"210781","citycode":"0416"},{"中文名":"北镇市","adcode":"210782","citycode":"0416"},{"中文名":"营口市","adcode":"210800","citycode":"0417"},{"中文名":"营口市市辖区","adcode":"210801","citycode":"0417"},{"中文名":"站前区","adcode":"210802","citycode":"0417"},{"中文名":"西市区","adcode":"210803","citycode":"0417"},{"中文名":"鲅鱼圈区","adcode":"210804","citycode":"0417"},{"中文名":"老边区","adcode":"210811","citycode":"0417"},{"中文名":"盖州市","adcode":"210881","citycode":"0417"},{"中文名":"大石桥市","adcode":"210882","citycode":"0417"},{"中文名":"阜新市","adcode":"210900","citycode":"0418"},{"中文名":"阜新市市辖区","adcode":"210901","citycode":"0418"},{"中文名":"海州区","adcode":"210902","citycode":"0418"},{"中文名":"新邱区","adcode":"210903","citycode":"0418"},{"中文名":"太平区","adcode":"210904","citycode":"0418"},{"中文名":"清河门区","adcode":"210905","citycode":"0418"},{"中文名":"细河区","adcode":"210911","citycode":"0418"},{"中文名":"阜新蒙古族自治县","adcode":"210921","citycode":"0418"},{"中文名":"彰武县","adcode":"210922","citycode":"0418"},{"中文名":"辽阳市","adcode":"211000","citycode":"0419"},{"中文名":"辽阳市市辖区","adcode":"211001","citycode":"0419"},{"中文名":"白塔区","adcode":"211002","citycode":"0419"},{"中文名":"文圣区","adcode":"211003","citycode":"0419"},{"中文名":"宏伟区","adcode":"211004","citycode":"0419"},{"中文名":"弓长岭区","adcode":"211005","citycode":"0419"},{"中文名":"太子河区","adcode":"211011","citycode":"0419"},{"中文名":"辽阳县","adcode":"211021","citycode":"0419"},{"中文名":"灯塔市","adcode":"211081","citycode":"0419"},{"中文名":"盘锦市","adcode":"211100","citycode":"0427"},{"中文名":"盘锦市市辖区","adcode":"211101","citycode":"0427"},{"中文名":"双台子区","adcode":"211102","citycode":"0427"},{"中文名":"兴隆台区","adcode":"211103","citycode":"0427"},{"中文名":"大洼区","adcode":"211104","citycode":"0427"},{"中文名":"盘山县","adcode":"211122","citycode":"0427"},{"中文名":"铁岭市","adcode":"211200","citycode":"0410"},{"中文名":"铁岭市市辖区","adcode":"211201","citycode":"0410"},{"中文名":"银州区","adcode":"211202","citycode":"0410"},{"中文名":"清河区","adcode":"211204","citycode":"0410"},{"中文名":"铁岭县","adcode":"211221","citycode":"0410"},{"中文名":"西丰县","adcode":"211223","citycode":"0410"},{"中文名":"昌图县","adcode":"211224","citycode":"0410"},{"中文名":"调兵山市","adcode":"211281","citycode":"0410"},{"中文名":"开原市","adcode":"211282","citycode":"0410"},{"中文名":"朝阳市","adcode":"211300","citycode":"0421"},{"中文名":"朝阳市市辖区","adcode":"211301","citycode":"0421"},{"中文名":"双塔区","adcode":"211302","citycode":"0421"},{"中文名":"龙城区","adcode":"211303","citycode":"0421"},{"中文名":"朝阳县","adcode":"211321","citycode":"0421"},{"中文名":"建平县","adcode":"211322","citycode":"0421"},{"中文名":"喀喇沁左翼蒙古族自治县","adcode":"211324","citycode":"0421"},{"中文名":"北票市","adcode":"211381","citycode":"0421"},{"中文名":"凌源市","adcode":"211382","citycode":"0421"},{"中文名":"葫芦岛市","adcode":"211400","citycode":"0429"},{"中文名":"葫芦岛市市辖区","adcode":"211401","citycode":"0429"},{"中文名":"连山区","adcode":"211402","citycode":"0429"},{"中文名":"龙港区","adcode":"211403","citycode":"0429"},{"中文名":"南票区","adcode":"211404","citycode":"0429"},{"中文名":"绥中县","adcode":"211421","citycode":"0429"},{"中文名":"建昌县","adcode":"211422","citycode":"0429"},{"中文名":"兴城市","adcode":"211481","citycode":"0429"},{"中文名":"吉林省","adcode":"220000","citycode":""},{"中文名":"长春市","adcode":"220100","citycode":"0431"},{"中文名":"长春市市辖区","adcode":"220101","citycode":"0431"},{"中文名":"南关区","adcode":"220102","citycode":"0431"},{"中文名":"宽城区","adcode":"220103","citycode":"0431"},{"中文名":"朝阳区","adcode":"220104","citycode":"0431"},{"中文名":"二道区","adcode":"220105","citycode":"0431"},{"中文名":"绿园区","adcode":"220106","citycode":"0431"},{"中文名":"双阳区","adcode":"220112","citycode":"0431"},{"中文名":"九台区","adcode":"220113","citycode":"0431"},{"中文名":"农安县","adcode":"220122","citycode":"0431"},{"中文名":"榆树市","adcode":"220182","citycode":"0431"},{"中文名":"德惠市","adcode":"220183","citycode":"0431"},{"中文名":"吉林市","adcode":"220200","citycode":"0432"},{"中文名":"吉林市市辖区","adcode":"220201","citycode":"0432"},{"中文名":"昌邑区","adcode":"220202","citycode":"0432"},{"中文名":"龙潭区","adcode":"220203","citycode":"0432"},{"中文名":"船营区","adcode":"220204","citycode":"0432"},{"中文名":"丰满区","adcode":"220211","citycode":"0432"},{"中文名":"永吉县","adcode":"220221","citycode":"0432"},{"中文名":"蛟河市","adcode":"220281","citycode":"0432"},{"中文名":"桦甸市","adcode":"220282","citycode":"0432"},{"中文名":"舒兰市","adcode":"220283","citycode":"0432"},{"中文名":"磐石市","adcode":"220284","citycode":"0432"},{"中文名":"四平市","adcode":"220300","citycode":"0434"},{"中文名":"四平市市辖区","adcode":"220301","citycode":"0434"},{"中文名":"铁西区","adcode":"220302","citycode":"0434"},{"中文名":"铁东区","adcode":"220303","citycode":"0434"},{"中文名":"梨树县","adcode":"220322","citycode":"0434"},{"中文名":"伊通满族自治县","adcode":"220323","citycode":"0434"},{"中文名":"公主岭市","adcode":"220381","citycode":"0434"},{"中文名":"双辽市","adcode":"220382","citycode":"0434"},{"中文名":"辽源市","adcode":"220400","citycode":"0437"},{"中文名":"辽源市市辖区","adcode":"220401","citycode":"0437"},{"中文名":"龙山区","adcode":"220402","citycode":"0437"},{"中文名":"西安区","adcode":"220403","citycode":"0437"},{"中文名":"东丰县","adcode":"220421","citycode":"0437"},{"中文名":"东辽县","adcode":"220422","citycode":"0437"},{"中文名":"通化市","adcode":"220500","citycode":"0435"},{"中文名":"通化市市辖区","adcode":"220501","citycode":"0435"},{"中文名":"东昌区","adcode":"220502","citycode":"0435"},{"中文名":"二道江区","adcode":"220503","citycode":"0435"},{"中文名":"通化县","adcode":"220521","citycode":"0435"},{"中文名":"辉南县","adcode":"220523","citycode":"0435"},{"中文名":"柳河县","adcode":"220524","citycode":"0435"},{"中文名":"梅河口市","adcode":"220581","citycode":"0435"},{"中文名":"集安市","adcode":"220582","citycode":"0435"},{"中文名":"白山市","adcode":"220600","citycode":"0439"},{"中文名":"白山市市辖区","adcode":"220601","citycode":"0439"},{"中文名":"浑江区","adcode":"220602","citycode":"0439"},{"中文名":"江源区","adcode":"220605","citycode":"0439"},{"中文名":"抚松县","adcode":"220621","citycode":"0439"},{"中文名":"靖宇县","adcode":"220622","citycode":"0439"},{"中文名":"长白朝鲜族自治县","adcode":"220623","citycode":"0439"},{"中文名":"临江市","adcode":"220681","citycode":"0439"},{"中文名":"松原市","adcode":"220700","citycode":"0438"},{"中文名":"松原市市辖区","adcode":"220701","citycode":"0438"},{"中文名":"宁江区","adcode":"220702","citycode":"0438"},{"中文名":"前郭尔罗斯蒙古族自治县","adcode":"220721","citycode":"0438"},{"中文名":"长岭县","adcode":"220722","citycode":"0438"},{"中文名":"乾安县","adcode":"220723","citycode":"0438"},{"中文名":"扶余市","adcode":"220781","citycode":"0438"},{"中文名":"白城市","adcode":"220800","citycode":"0436"},{"中文名":"白城市市辖区","adcode":"220801","citycode":"0436"},{"中文名":"洮北区","adcode":"220802","citycode":"0436"},{"中文名":"镇赉县","adcode":"220821","citycode":"0436"},{"中文名":"通榆县","adcode":"220822","citycode":"0436"},{"中文名":"洮南市","adcode":"220881","citycode":"0436"},{"中文名":"大安市","adcode":"220882","citycode":"0436"},{"中文名":"延边朝鲜族自治州","adcode":"222400","citycode":"1433"},{"中文名":"延吉市","adcode":"222401","citycode":"1433"},{"中文名":"图们市","adcode":"222402","citycode":"1433"},{"中文名":"敦化市","adcode":"222403","citycode":"1433"},{"中文名":"珲春市","adcode":"222404","citycode":"1433"},{"中文名":"龙井市","adcode":"222405","citycode":"1433"},{"中文名":"和龙市","adcode":"222406","citycode":"1433"},{"中文名":"汪清县","adcode":"222424","citycode":"1433"},{"中文名":"安图县","adcode":"222426","citycode":"1433"},{"中文名":"黑龙江省","adcode":"230000","citycode":""},{"中文名":"哈尔滨市","adcode":"230100","citycode":"0451"},{"中文名":"哈尔滨市市辖区","adcode":"230101","citycode":"0451"},{"中文名":"道里区","adcode":"230102","citycode":"0451"},{"中文名":"南岗区","adcode":"230103","citycode":"0451"},{"中文名":"道外区","adcode":"230104","citycode":"0451"},{"中文名":"平房区","adcode":"230108","citycode":"0451"},{"中文名":"松北区","adcode":"230109","citycode":"0451"},{"中文名":"香坊区","adcode":"230110","citycode":"0451"},{"中文名":"呼兰区","adcode":"230111","citycode":"0451"},{"中文名":"阿城区","adcode":"230112","citycode":"0451"},{"中文名":"双城区","adcode":"230113","citycode":"0451"},{"中文名":"依兰县","adcode":"230123","citycode":"0451"},{"中文名":"方正县","adcode":"230124","citycode":"0451"},{"中文名":"宾县","adcode":"230125","citycode":"0451"},{"中文名":"巴彦县","adcode":"230126","citycode":"0451"},{"中文名":"木兰县","adcode":"230127","citycode":"0451"},{"中文名":"通河县","adcode":"230128","citycode":"0451"},{"中文名":"延寿县","adcode":"230129","citycode":"0451"},{"中文名":"尚志市","adcode":"230183","citycode":"0451"},{"中文名":"五常市","adcode":"230184","citycode":"0451"},{"中文名":"齐齐哈尔市","adcode":"230200","citycode":"0452"},{"中文名":"齐齐哈尔市市辖区","adcode":"230201","citycode":"0452"},{"中文名":"龙沙区","adcode":"230202","citycode":"0452"},{"中文名":"建华区","adcode":"230203","citycode":"0452"},{"中文名":"铁锋区","adcode":"230204","citycode":"0452"},{"中文名":"昂昂溪区","adcode":"230205","citycode":"0452"},{"中文名":"富拉尔基区","adcode":"230206","citycode":"0452"},{"中文名":"碾子山区","adcode":"230207","citycode":"0452"},{"中文名":"梅里斯达斡尔族区","adcode":"230208","citycode":"0452"},{"中文名":"龙江县","adcode":"230221","citycode":"0452"},{"中文名":"依安县","adcode":"230223","citycode":"0452"},{"中文名":"泰来县","adcode":"230224","citycode":"0452"},{"中文名":"甘南县","adcode":"230225","citycode":"0452"},{"中文名":"富裕县","adcode":"230227","citycode":"0452"},{"中文名":"克山县","adcode":"230229","citycode":"0452"},{"中文名":"克东县","adcode":"230230","citycode":"0452"},{"中文名":"拜泉县","adcode":"230231","citycode":"0452"},{"中文名":"讷河市","adcode":"230281","citycode":"0452"},{"中文名":"鸡西市","adcode":"230300","citycode":"0467"},{"中文名":"鸡西市市辖区","adcode":"230301","citycode":"0467"},{"中文名":"鸡冠区","adcode":"230302","citycode":"0467"},{"中文名":"恒山区","adcode":"230303","citycode":"0467"},{"中文名":"滴道区","adcode":"230304","citycode":"0467"},{"中文名":"梨树区","adcode":"230305","citycode":"0467"},{"中文名":"城子河区","adcode":"230306","citycode":"0467"},{"中文名":"麻山区","adcode":"230307","citycode":"0467"},{"中文名":"鸡东县","adcode":"230321","citycode":"0467"},{"中文名":"虎林市","adcode":"230381","citycode":"0467"},{"中文名":"密山市","adcode":"230382","citycode":"0467"},{"中文名":"鹤岗市","adcode":"230400","citycode":"0468"},{"中文名":"鹤岗市市辖区","adcode":"230401","citycode":"0468"},{"中文名":"向阳区","adcode":"230402","citycode":"0468"},{"中文名":"工农区","adcode":"230403","citycode":"0468"},{"中文名":"南山区","adcode":"230404","citycode":"0468"},{"中文名":"兴安区","adcode":"230405","citycode":"0468"},{"中文名":"东山区","adcode":"230406","citycode":"0468"},{"中文名":"兴山区","adcode":"230407","citycode":"0468"},{"中文名":"萝北县","adcode":"230421","citycode":"0468"},{"中文名":"绥滨县","adcode":"230422","citycode":"0468"},{"中文名":"双鸭山市","adcode":"230500","citycode":"0469"},{"中文名":"双鸭山市市辖区","adcode":"230501","citycode":"0469"},{"中文名":"尖山区","adcode":"230502","citycode":"0469"},{"中文名":"岭东区","adcode":"230503","citycode":"0469"},{"中文名":"四方台区","adcode":"230505","citycode":"0469"},{"中文名":"宝山区","adcode":"230506","citycode":"0469"},{"中文名":"集贤县","adcode":"230521","citycode":"0469"},{"中文名":"友谊县","adcode":"230522","citycode":"0469"},{"中文名":"宝清县","adcode":"230523","citycode":"0469"},{"中文名":"饶河县","adcode":"230524","citycode":"0469"},{"中文名":"大庆市","adcode":"230600","citycode":"0459"},{"中文名":"大庆市市辖区","adcode":"230601","citycode":"0459"},{"中文名":"萨尔图区","adcode":"230602","citycode":"0459"},{"中文名":"龙凤区","adcode":"230603","citycode":"0459"},{"中文名":"让胡路区","adcode":"230604","citycode":"0459"},{"中文名":"红岗区","adcode":"230605","citycode":"0459"},{"中文名":"大同区","adcode":"230606","citycode":"0459"},{"中文名":"肇州县","adcode":"230621","citycode":"0459"},{"中文名":"肇源县","adcode":"230622","citycode":"0459"},{"中文名":"林甸县","adcode":"230623","citycode":"0459"},{"中文名":"杜尔伯特蒙古族自治县","adcode":"230624","citycode":"0459"},{"中文名":"伊春市","adcode":"230700","citycode":"0458"},{"中文名":"伊春市市辖区","adcode":"230701","citycode":"0458"},{"中文名":"汤旺河区","adcode":"230712","citycode":"0458"},{"中文名":"伊美区","adcode":"230717","citycode":"0458"},{"中文名":"乌翠区","adcode":"230718","citycode":"0458"},{"中文名":"友好区","adcode":"230719","citycode":"0458"},{"中文名":"嘉荫县","adcode":"230722","citycode":"0458"},{"中文名":"汤旺县","adcode":"230723","citycode":"0458"},{"中文名":"丰林县","adcode":"230724","citycode":"0458"},{"中文名":"大箐山县","adcode":"230725","citycode":"0458"},{"中文名":"南岔县","adcode":"230726","citycode":"0458"},{"中文名":"金林区","adcode":"230751","citycode":"0458"},{"中文名":"铁力市","adcode":"230781","citycode":"0458"},{"中文名":"佳木斯市","adcode":"230800","citycode":"0454"},{"中文名":"佳木斯市市辖区","adcode":"230801","citycode":"0454"},{"中文名":"向阳区","adcode":"230803","citycode":"0454"},{"中文名":"前进区","adcode":"230804","citycode":"0454"},{"中文名":"东风区","adcode":"230805","citycode":"0454"},{"中文名":"郊区","adcode":"230811","citycode":"0454"},{"中文名":"桦南县","adcode":"230822","citycode":"0454"},{"中文名":"桦川县","adcode":"230826","citycode":"0454"},{"中文名":"汤原县","adcode":"230828","citycode":"0454"},{"中文名":"同江市","adcode":"230881","citycode":"0454"},{"中文名":"富锦市","adcode":"230882","citycode":"0454"},{"中文名":"抚远市","adcode":"230883","citycode":"0454"},{"中文名":"七台河市","adcode":"230900","citycode":"0464"},{"中文名":"七台河市市辖区","adcode":"230901","citycode":"0464"},{"中文名":"新兴区","adcode":"230902","citycode":"0464"},{"中文名":"桃山区","adcode":"230903","citycode":"0464"},{"中文名":"茄子河区","adcode":"230904","citycode":"0464"},{"中文名":"勃利县","adcode":"230921","citycode":"0464"},{"中文名":"牡丹江市","adcode":"231000","citycode":"0453"},{"中文名":"牡丹江市市辖区","adcode":"231001","citycode":"0453"},{"中文名":"东安区","adcode":"231002","citycode":"0453"},{"中文名":"阳明区","adcode":"231003","citycode":"0453"},{"中文名":"爱民区","adcode":"231004","citycode":"0453"},{"中文名":"西安区","adcode":"231005","citycode":"0453"},{"中文名":"林口县","adcode":"231025","citycode":"0453"},{"中文名":"绥芬河市","adcode":"231081","citycode":"0453"},{"中文名":"海林市","adcode":"231083","citycode":"0453"},{"中文名":"宁安市","adcode":"231084","citycode":"0453"},{"中文名":"穆棱市","adcode":"231085","citycode":"0453"},{"中文名":"东宁市","adcode":"231086","citycode":"0453"},{"中文名":"黑河市","adcode":"231100","citycode":"0456"},{"中文名":"黑河市市辖区","adcode":"231101","citycode":"0456"},{"中文名":"爱辉区","adcode":"231102","citycode":"0456"},{"中文名":"嫩江市","adcode":"231183","citycode":"0456"},{"中文名":"逊克县","adcode":"231123","citycode":"0456"},{"中文名":"孙吴县","adcode":"231124","citycode":"0456"},{"中文名":"北安市","adcode":"231181","citycode":"0456"},{"中文名":"五大连池市","adcode":"231182","citycode":"0456"},{"中文名":"绥化市","adcode":"231200","citycode":"0455"},{"中文名":"绥化市市辖区","adcode":"231201","citycode":"0455"},{"中文名":"北林区","adcode":"231202","citycode":"0455"},{"中文名":"望奎县","adcode":"231221","citycode":"0455"},{"中文名":"兰西县","adcode":"231222","citycode":"0455"},{"中文名":"青冈县","adcode":"231223","citycode":"0455"},{"中文名":"庆安县","adcode":"231224","citycode":"0455"},{"中文名":"明水县","adcode":"231225","citycode":"0455"},{"中文名":"绥棱县","adcode":"231226","citycode":"0455"},{"中文名":"安达市","adcode":"231281","citycode":"0455"},{"中文名":"肇东市","adcode":"231282","citycode":"0455"},{"中文名":"海伦市","adcode":"231283","citycode":"0455"},{"中文名":"大兴安岭地区","adcode":"232700","citycode":"0457"},{"中文名":"加格达奇区","adcode":"232718","citycode":"0457"},{"中文名":"呼玛县","adcode":"232721","citycode":"0457"},{"中文名":"塔河县","adcode":"232722","citycode":"0457"},{"中文名":"漠河市","adcode":"232701","citycode":"0457"},{"中文名":"上海市","adcode":"310000","citycode":"021"},{"中文名":"上海市市辖区","adcode":"310100","citycode":"021"},{"中文名":"黄浦区","adcode":"310101","citycode":"021"},{"中文名":"徐汇区","adcode":"310104","citycode":"021"},{"中文名":"长宁区","adcode":"310105","citycode":"021"},{"中文名":"静安区","adcode":"310106","citycode":"021"},{"中文名":"普陀区","adcode":"310107","citycode":"021"},{"中文名":"虹口区","adcode":"310109","citycode":"021"},{"中文名":"杨浦区","adcode":"310110","citycode":"021"},{"中文名":"闵行区","adcode":"310112","citycode":"021"},{"中文名":"宝山区","adcode":"310113","citycode":"021"},{"中文名":"嘉定区","adcode":"310114","citycode":"021"},{"中文名":"浦东新区","adcode":"310115","citycode":"021"},{"中文名":"金山区","adcode":"310116","citycode":"021"},{"中文名":"松江区","adcode":"310117","citycode":"021"},{"中文名":"青浦区","adcode":"310118","citycode":"021"},{"中文名":"奉贤区","adcode":"310120","citycode":"021"},{"中文名":"崇明区","adcode":"310151","citycode":"021"},{"中文名":"江苏省","adcode":"320000","citycode":""},{"中文名":"南京市","adcode":"320100","citycode":"025"},{"中文名":"南京市市辖区","adcode":"320101","citycode":"025"},{"中文名":"玄武区","adcode":"320102","citycode":"025"},{"中文名":"秦淮区","adcode":"320104","citycode":"025"},{"中文名":"建邺区","adcode":"320105","citycode":"025"},{"中文名":"鼓楼区","adcode":"320106","citycode":"025"},{"中文名":"浦口区","adcode":"320111","citycode":"025"},{"中文名":"栖霞区","adcode":"320113","citycode":"025"},{"中文名":"雨花台区","adcode":"320114","citycode":"025"},{"中文名":"江宁区","adcode":"320115","citycode":"025"},{"中文名":"六合区","adcode":"320116","citycode":"025"},{"中文名":"溧水区","adcode":"320117","citycode":"025"},{"中文名":"高淳区","adcode":"320118","citycode":"025"},{"中文名":"无锡市","adcode":"320200","citycode":"0510"},{"中文名":"无锡市市辖区","adcode":"320201","citycode":"0510"},{"中文名":"锡山区","adcode":"320205","citycode":"0510"},{"中文名":"惠山区","adcode":"320206","citycode":"0510"},{"中文名":"滨湖区","adcode":"320211","citycode":"0510"},{"中文名":"梁溪区","adcode":"320213","citycode":"0510"},{"中文名":"新吴区","adcode":"320214","citycode":"0510"},{"中文名":"江阴市","adcode":"320281","citycode":"0510"},{"中文名":"宜兴市","adcode":"320282","citycode":"0510"},{"中文名":"徐州市","adcode":"320300","citycode":"0516"},{"中文名":"徐州市市辖区","adcode":"320301","citycode":"0516"},{"中文名":"鼓楼区","adcode":"320302","citycode":"0516"},{"中文名":"云龙区","adcode":"320303","citycode":"0516"},{"中文名":"贾汪区","adcode":"320305","citycode":"0516"},{"中文名":"泉山区","adcode":"320311","citycode":"0516"},{"中文名":"铜山区","adcode":"320312","citycode":"0516"},{"中文名":"丰县","adcode":"320321","citycode":"0516"},{"中文名":"沛县","adcode":"320322","citycode":"0516"},{"中文名":"睢宁县","adcode":"320324","citycode":"0516"},{"中文名":"新沂市","adcode":"320381","citycode":"0516"},{"中文名":"邳州市","adcode":"320382","citycode":"0516"},{"中文名":"常州市","adcode":"320400","citycode":"0519"},{"中文名":"常州市市辖区","adcode":"320401","citycode":"0519"},{"中文名":"天宁区","adcode":"320402","citycode":"0519"},{"中文名":"钟楼区","adcode":"320404","citycode":"0519"},{"中文名":"新北区","adcode":"320411","citycode":"0519"},{"中文名":"武进区","adcode":"320412","citycode":"0519"},{"中文名":"金坛区","adcode":"320413","citycode":"0519"},{"中文名":"溧阳市","adcode":"320481","citycode":"0519"},{"中文名":"苏州市","adcode":"320500","citycode":"0512"},{"中文名":"苏州市市辖区","adcode":"320501","citycode":"0512"},{"中文名":"虎丘区","adcode":"320505","citycode":"0512"},{"中文名":"吴中区","adcode":"320506","citycode":"0512"},{"中文名":"相城区","adcode":"320507","citycode":"0512"},{"中文名":"姑苏区","adcode":"320508","citycode":"0512"},{"中文名":"吴江区","adcode":"320509","citycode":"0512"},{"中文名":"苏州工业园区","adcode":"320571","citycode":"0512"},{"中文名":"常熟市","adcode":"320581","citycode":"0512"},{"中文名":"张家港市","adcode":"320582","citycode":"0512"},{"中文名":"昆山市","adcode":"320583","citycode":"0512"},{"中文名":"太仓市","adcode":"320585","citycode":"0512"},{"中文名":"南通市","adcode":"320600","citycode":"0513"},{"中文名":"南通市市辖区","adcode":"320601","citycode":"0513"},{"中文名":"崇川区","adcode":"320602","citycode":"0513"},{"中文名":"港闸区","adcode":"320611","citycode":"0513"},{"中文名":"通州区","adcode":"320612","citycode":"0513"},{"中文名":"海安市","adcode":"320685","citycode":"0513"},{"中文名":"如东县","adcode":"320623","citycode":"0513"},{"中文名":"启东市","adcode":"320681","citycode":"0513"},{"中文名":"如皋市","adcode":"320682","citycode":"0513"},{"中文名":"海门市","adcode":"320684","citycode":"0513"},{"中文名":"连云港市","adcode":"320700","citycode":"0518"},{"中文名":"连云港市市辖区","adcode":"320701","citycode":"0518"},{"中文名":"连云区","adcode":"320703","citycode":"0518"},{"中文名":"海州区","adcode":"320706","citycode":"0518"},{"中文名":"赣榆区","adcode":"320707","citycode":"0518"},{"中文名":"东海县","adcode":"320722","citycode":"0518"},{"中文名":"灌云县","adcode":"320723","citycode":"0518"},{"中文名":"灌南县","adcode":"320724","citycode":"0518"},{"中文名":"淮安市","adcode":"320800","citycode":"0517"},{"中文名":"淮安市市辖区","adcode":"320801","citycode":"0517"},{"中文名":"淮安区","adcode":"320803","citycode":"0517"},{"中文名":"淮阴区","adcode":"320804","citycode":"0517"},{"中文名":"清江浦区","adcode":"320812","citycode":"0517"},{"中文名":"洪泽区","adcode":"320813","citycode":"0517"},{"中文名":"涟水县","adcode":"320826","citycode":"0517"},{"中文名":"盱眙县","adcode":"320830","citycode":"0517"},{"中文名":"金湖县","adcode":"320831","citycode":"0517"},{"中文名":"盐城市","adcode":"320900","citycode":"0515"},{"中文名":"盐城市市辖区","adcode":"320901","citycode":"0515"},{"中文名":"亭湖区","adcode":"320902","citycode":"0515"},{"中文名":"盐都区","adcode":"320903","citycode":"0515"},{"中文名":"大丰区","adcode":"320904","citycode":"0515"},{"中文名":"响水县","adcode":"320921","citycode":"0515"},{"中文名":"滨海县","adcode":"320922","citycode":"0515"},{"中文名":"阜宁县","adcode":"320923","citycode":"0515"},{"中文名":"射阳县","adcode":"320924","citycode":"0515"},{"中文名":"建湖县","adcode":"320925","citycode":"0515"},{"中文名":"东台市","adcode":"320981","citycode":"0515"},{"中文名":"扬州市","adcode":"321000","citycode":"0514"},{"中文名":"扬州市市辖区","adcode":"321001","citycode":"0514"},{"中文名":"广陵区","adcode":"321002","citycode":"0514"},{"中文名":"邗江区","adcode":"321003","citycode":"0514"},{"中文名":"江都区","adcode":"321012","citycode":"0514"},{"中文名":"宝应县","adcode":"321023","citycode":"0514"},{"中文名":"仪征市","adcode":"321081","citycode":"0514"},{"中文名":"高邮市","adcode":"321084","citycode":"0514"},{"中文名":"镇江市","adcode":"321100","citycode":"0511"},{"中文名":"镇江市市辖区","adcode":"321101","citycode":"0511"},{"中文名":"京口区","adcode":"321102","citycode":"0511"},{"中文名":"润州区","adcode":"321111","citycode":"0511"},{"中文名":"丹徒区","adcode":"321112","citycode":"0511"},{"中文名":"丹阳市","adcode":"321181","citycode":"0511"},{"中文名":"扬中市","adcode":"321182","citycode":"0511"},{"中文名":"句容市","adcode":"321183","citycode":"0511"},{"中文名":"泰州市","adcode":"321200","citycode":"0523"},{"中文名":"泰州市市辖区","adcode":"321201","citycode":"0523"},{"中文名":"海陵区","adcode":"321202","citycode":"0523"},{"中文名":"高港区","adcode":"321203","citycode":"0523"},{"中文名":"姜堰区","adcode":"321204","citycode":"0523"},{"中文名":"兴化市","adcode":"321281","citycode":"0523"},{"中文名":"靖江市","adcode":"321282","citycode":"0523"},{"中文名":"泰兴市","adcode":"321283","citycode":"0523"},{"中文名":"宿迁市","adcode":"321300","citycode":"0527"},{"中文名":"宿迁市市辖区","adcode":"321301","citycode":"0527"},{"中文名":"宿城区","adcode":"321302","citycode":"0527"},{"中文名":"宿豫区","adcode":"321311","citycode":"0527"},{"中文名":"沭阳县","adcode":"321322","citycode":"0527"},{"中文名":"泗阳县","adcode":"321323","citycode":"0527"},{"中文名":"泗洪县","adcode":"321324","citycode":"0527"},{"中文名":"浙江省","adcode":"330000","citycode":""},{"中文名":"杭州市","adcode":"330100","citycode":"0571"},{"中文名":"杭州市市辖区","adcode":"330101","citycode":"0571"},{"中文名":"上城区","adcode":"330102","citycode":"0571"},{"中文名":"下城区","adcode":"330103","citycode":"0571"},{"中文名":"江干区","adcode":"330104","citycode":"0571"},{"中文名":"拱墅区","adcode":"330105","citycode":"0571"},{"中文名":"西湖区","adcode":"330106","citycode":"0571"},{"中文名":"滨江区","adcode":"330108","citycode":"0571"},{"中文名":"萧山区","adcode":"330109","citycode":"0571"},{"中文名":"余杭区","adcode":"330110","citycode":"0571"},{"中文名":"富阳区","adcode":"330111","citycode":"0571"},{"中文名":"临安区","adcode":"330112","citycode":"0571"},{"中文名":"桐庐县","adcode":"330122","citycode":"0571"},{"中文名":"淳安县","adcode":"330127","citycode":"0571"},{"中文名":"建德市","adcode":"330182","citycode":"0571"},{"中文名":"宁波市","adcode":"330200","citycode":"0574"},{"中文名":"宁波市市辖区","adcode":"330201","citycode":"0574"},{"中文名":"海曙区","adcode":"330203","citycode":"0574"},{"中文名":"江北区","adcode":"330205","citycode":"0574"},{"中文名":"北仑区","adcode":"330206","citycode":"0574"},{"中文名":"镇海区","adcode":"330211","citycode":"0574"},{"中文名":"鄞州区","adcode":"330212","citycode":"0574"},{"中文名":"奉化区","adcode":"330213","citycode":"0574"},{"中文名":"象山县","adcode":"330225","citycode":"0574"},{"中文名":"宁海县","adcode":"330226","citycode":"0574"},{"中文名":"余姚市","adcode":"330281","citycode":"0574"},{"中文名":"慈溪市","adcode":"330282","citycode":"0574"},{"中文名":"温州市","adcode":"330300","citycode":"0577"},{"中文名":"温州市市辖区","adcode":"330301","citycode":"0577"},{"中文名":"鹿城区","adcode":"330302","citycode":"0577"},{"中文名":"龙湾区","adcode":"330303","citycode":"0577"},{"中文名":"瓯海区","adcode":"330304","citycode":"0577"},{"中文名":"洞头区","adcode":"330305","citycode":"0577"},{"中文名":"永嘉县","adcode":"330324","citycode":"0577"},{"中文名":"平阳县","adcode":"330326","citycode":"0577"},{"中文名":"苍南县","adcode":"330327","citycode":"0577"},{"中文名":"文成县","adcode":"330328","citycode":"0577"},{"中文名":"泰顺县","adcode":"330329","citycode":"0577"},{"中文名":"瑞安市","adcode":"330381","citycode":"0577"},{"中文名":"乐清市","adcode":"330382","citycode":"0577"},{"中文名":"龙港市","adcode":"330383","citycode":"0577"},{"中文名":"嘉兴市","adcode":"330400","citycode":"0573"},{"中文名":"嘉兴市市辖区","adcode":"330401","citycode":"0573"},{"中文名":"南湖区","adcode":"330402","citycode":"0573"},{"中文名":"秀洲区","adcode":"330411","citycode":"0573"},{"中文名":"嘉善县","adcode":"330421","citycode":"0573"},{"中文名":"海盐县","adcode":"330424","citycode":"0573"},{"中文名":"海宁市","adcode":"330481","citycode":"0573"},{"中文名":"平湖市","adcode":"330482","citycode":"0573"},{"中文名":"桐乡市","adcode":"330483","citycode":"0573"},{"中文名":"湖州市","adcode":"330500","citycode":"0572"},{"中文名":"湖州市市辖区","adcode":"330501","citycode":"0572"},{"中文名":"吴兴区","adcode":"330502","citycode":"0572"},{"中文名":"南浔区","adcode":"330503","citycode":"0572"},{"中文名":"德清县","adcode":"330521","citycode":"0572"},{"中文名":"长兴县","adcode":"330522","citycode":"0572"},{"中文名":"安吉县","adcode":"330523","citycode":"0572"},{"中文名":"绍兴市","adcode":"330600","citycode":"0575"},{"中文名":"绍兴市市辖区","adcode":"330601","citycode":"0575"},{"中文名":"越城区","adcode":"330602","citycode":"0575"},{"中文名":"柯桥区","adcode":"330603","citycode":"0575"},{"中文名":"上虞区","adcode":"330604","citycode":"0575"},{"中文名":"新昌县","adcode":"330624","citycode":"0575"},{"中文名":"诸暨市","adcode":"330681","citycode":"0575"},{"中文名":"嵊州市","adcode":"330683","citycode":"0575"},{"中文名":"金华市","adcode":"330700","citycode":"0579"},{"中文名":"金华市市辖区","adcode":"330701","citycode":"0579"},{"中文名":"婺城区","adcode":"330702","citycode":"0579"},{"中文名":"金东区","adcode":"330703","citycode":"0579"},{"中文名":"武义县","adcode":"330723","citycode":"0579"},{"中文名":"浦江县","adcode":"330726","citycode":"0579"},{"中文名":"磐安县","adcode":"330727","citycode":"0579"},{"中文名":"兰溪市","adcode":"330781","citycode":"0579"},{"中文名":"义乌市","adcode":"330782","citycode":"0579"},{"中文名":"东阳市","adcode":"330783","citycode":"0579"},{"中文名":"永康市","adcode":"330784","citycode":"0579"},{"中文名":"衢州市","adcode":"330800","citycode":"0570"},{"中文名":"衢州市市辖区","adcode":"330801","citycode":"0570"},{"中文名":"柯城区","adcode":"330802","citycode":"0570"},{"中文名":"衢江区","adcode":"330803","citycode":"0570"},{"中文名":"常山县","adcode":"330822","citycode":"0570"},{"中文名":"开化县","adcode":"330824","citycode":"0570"},{"中文名":"龙游县","adcode":"330825","citycode":"0570"},{"中文名":"江山市","adcode":"330881","citycode":"0570"},{"中文名":"舟山市","adcode":"330900","citycode":"0580"},{"中文名":"舟山市市辖区","adcode":"330901","citycode":"0580"},{"中文名":"定海区","adcode":"330902","citycode":"0580"},{"中文名":"普陀区","adcode":"330903","citycode":"0580"},{"中文名":"岱山县","adcode":"330921","citycode":"0580"},{"中文名":"嵊泗县","adcode":"330922","citycode":"0580"},{"中文名":"台州市","adcode":"331000","citycode":"0576"},{"中文名":"台州市市辖区","adcode":"331001","citycode":"0576"},{"中文名":"椒江区","adcode":"331002","citycode":"0576"},{"中文名":"黄岩区","adcode":"331003","citycode":"0576"},{"中文名":"路桥区","adcode":"331004","citycode":"0576"},{"中文名":"三门县","adcode":"331022","citycode":"0576"},{"中文名":"天台县","adcode":"331023","citycode":"0576"},{"中文名":"仙居县","adcode":"331024","citycode":"0576"},{"中文名":"温岭市","adcode":"331081","citycode":"0576"},{"中文名":"临海市","adcode":"331082","citycode":"0576"},{"中文名":"玉环市","adcode":"331083","citycode":"0576"},{"中文名":"丽水市","adcode":"331100","citycode":"0578"},{"中文名":"丽水市市辖区","adcode":"331101","citycode":"0578"},{"中文名":"莲都区","adcode":"331102","citycode":"0578"},{"中文名":"青田县","adcode":"331121","citycode":"0578"},{"中文名":"缙云县","adcode":"331122","citycode":"0578"},{"中文名":"遂昌县","adcode":"331123","citycode":"0578"},{"中文名":"松阳县","adcode":"331124","citycode":"0578"},{"中文名":"云和县","adcode":"331125","citycode":"0578"},{"中文名":"庆元县","adcode":"331126","citycode":"0578"},{"中文名":"景宁畲族自治县","adcode":"331127","citycode":"0578"},{"中文名":"龙泉市","adcode":"331181","citycode":"0578"},{"中文名":"安徽省","adcode":"340000","citycode":""},{"中文名":"合肥市","adcode":"340100","citycode":"0551"},{"中文名":"合肥市市辖区","adcode":"340101","citycode":"0551"},{"中文名":"瑶海区","adcode":"340102","citycode":"0551"},{"中文名":"庐阳区","adcode":"340103","citycode":"0551"},{"中文名":"蜀山区","adcode":"340104","citycode":"0551"},{"中文名":"包河区","adcode":"340111","citycode":"0551"},{"中文名":"长丰县","adcode":"340121","citycode":"0551"},{"中文名":"肥东县","adcode":"340122","citycode":"0551"},{"中文名":"肥西县","adcode":"340123","citycode":"0551"},{"中文名":"庐江县","adcode":"340124","citycode":"0551"},{"中文名":"巢湖市","adcode":"340181","citycode":"0551"},{"中文名":"芜湖市","adcode":"340200","citycode":"0553"},{"中文名":"芜湖市市辖区","adcode":"340201","citycode":"0553"},{"中文名":"镜湖区","adcode":"340202","citycode":"0553"},{"中文名":"弋江区","adcode":"340203","citycode":"0553"},{"中文名":"鸠江区","adcode":"340207","citycode":"0553"},{"中文名":"三山区","adcode":"340208","citycode":"0553"},{"中文名":"芜湖县","adcode":"340221","citycode":"0553"},{"中文名":"繁昌县","adcode":"340222","citycode":"0553"},{"中文名":"南陵县","adcode":"340223","citycode":"0553"},{"中文名":"无为市","adcode":"340281","citycode":"0553"},{"中文名":"蚌埠市","adcode":"340300","citycode":"0552"},{"中文名":"蚌埠市市辖区","adcode":"340301","citycode":"0552"},{"中文名":"龙子湖区","adcode":"340302","citycode":"0552"},{"中文名":"蚌山区","adcode":"340303","citycode":"0552"},{"中文名":"禹会区","adcode":"340304","citycode":"0552"},{"中文名":"淮上区","adcode":"340311","citycode":"0552"},{"中文名":"怀远县","adcode":"340321","citycode":"0552"},{"中文名":"五河县","adcode":"340322","citycode":"0552"},{"中文名":"固镇县","adcode":"340323","citycode":"0552"},{"中文名":"淮南市","adcode":"340400","citycode":"0554"},{"中文名":"淮南市市辖区","adcode":"340401","citycode":"0554"},{"中文名":"大通区","adcode":"340402","citycode":"0554"},{"中文名":"田家庵区","adcode":"340403","citycode":"0554"},{"中文名":"谢家集区","adcode":"340404","citycode":"0554"},{"中文名":"八公山区","adcode":"340405","citycode":"0554"},{"中文名":"潘集区","adcode":"340406","citycode":"0554"},{"中文名":"凤台县","adcode":"340421","citycode":"0554"},{"中文名":"寿县","adcode":"340422","citycode":"0554"},{"中文名":"马鞍山市","adcode":"340500","citycode":"0555"},{"中文名":"马鞍山市市辖区","adcode":"340501","citycode":"0555"},{"中文名":"花山区","adcode":"340503","citycode":"0555"},{"中文名":"雨山区","adcode":"340504","citycode":"0555"},{"中文名":"博望区","adcode":"340506","citycode":"0555"},{"中文名":"当涂县","adcode":"340521","citycode":"0555"},{"中文名":"含山县","adcode":"340522","citycode":"0555"},{"中文名":"和县","adcode":"340523","citycode":"0555"},{"中文名":"淮北市","adcode":"340600","citycode":"0561"},{"中文名":"淮北市市辖区","adcode":"340601","citycode":"0561"},{"中文名":"杜集区","adcode":"340602","citycode":"0561"},{"中文名":"相山区","adcode":"340603","citycode":"0561"},{"中文名":"烈山区","adcode":"340604","citycode":"0561"},{"中文名":"濉溪县","adcode":"340621","citycode":"0561"},{"中文名":"铜陵市","adcode":"340700","citycode":"0562"},{"中文名":"铜陵市市辖区","adcode":"340701","citycode":"0562"},{"中文名":"铜官区","adcode":"340705","citycode":"0562"},{"中文名":"义安区","adcode":"340706","citycode":"0562"},{"中文名":"郊区","adcode":"340711","citycode":"0562"},{"中文名":"枞阳县","adcode":"340722","citycode":"0562"},{"中文名":"安庆市","adcode":"340800","citycode":"0556"},{"中文名":"安庆市市辖区","adcode":"340801","citycode":"0556"},{"中文名":"迎江区","adcode":"340802","citycode":"0556"},{"中文名":"大观区","adcode":"340803","citycode":"0556"},{"中文名":"宜秀区","adcode":"340811","citycode":"0556"},{"中文名":"怀宁县","adcode":"340822","citycode":"0556"},{"中文名":"潜山市","adcode":"340882","citycode":"0556"},{"中文名":"太湖县","adcode":"340825","citycode":"0556"},{"中文名":"宿松县","adcode":"340826","citycode":"0556"},{"中文名":"望江县","adcode":"340827","citycode":"0556"},{"中文名":"岳西县","adcode":"340828","citycode":"0556"},{"中文名":"桐城市","adcode":"340881","citycode":"0556"},{"中文名":"黄山市","adcode":"341000","citycode":"0559"},{"中文名":"黄山市市辖区","adcode":"341001","citycode":"0559"},{"中文名":"屯溪区","adcode":"341002","citycode":"0559"},{"中文名":"黄山区","adcode":"341003","citycode":"0559"},{"中文名":"徽州区","adcode":"341004","citycode":"0559"},{"中文名":"歙县","adcode":"341021","citycode":"0559"},{"中文名":"休宁县","adcode":"341022","citycode":"0559"},{"中文名":"黟县","adcode":"341023","citycode":"0559"},{"中文名":"祁门县","adcode":"341024","citycode":"0559"},{"中文名":"滁州市","adcode":"341100","citycode":"0550"},{"中文名":"滁州市市辖区","adcode":"341101","citycode":"0550"},{"中文名":"琅琊区","adcode":"341102","citycode":"0550"},{"中文名":"南谯区","adcode":"341103","citycode":"0550"},{"中文名":"来安县","adcode":"341122","citycode":"0550"},{"中文名":"全椒县","adcode":"341124","citycode":"0550"},{"中文名":"定远县","adcode":"341125","citycode":"0550"},{"中文名":"凤阳县","adcode":"341126","citycode":"0550"},{"中文名":"天长市","adcode":"341181","citycode":"0550"},{"中文名":"明光市","adcode":"341182","citycode":"0550"},{"中文名":"阜阳市","adcode":"341200","citycode":"1558"},{"中文名":"阜阳市市辖区","adcode":"341201","citycode":"1558"},{"中文名":"颍州区","adcode":"341202","citycode":"1558"},{"中文名":"颍东区","adcode":"341203","citycode":"1558"},{"中文名":"颍泉区","adcode":"341204","citycode":"1558"},{"中文名":"临泉县","adcode":"341221","citycode":"1558"},{"中文名":"太和县","adcode":"341222","citycode":"1558"},{"中文名":"阜南县","adcode":"341225","citycode":"1558"},{"中文名":"颍上县","adcode":"341226","citycode":"1558"},{"中文名":"界首市","adcode":"341282","citycode":"1558"},{"中文名":"宿州市","adcode":"341300","citycode":"0557"},{"中文名":"宿州市市辖区","adcode":"341301","citycode":"0557"},{"中文名":"埇桥区","adcode":"341302","citycode":"0557"},{"中文名":"砀山县","adcode":"341321","citycode":"0557"},{"中文名":"萧县","adcode":"341322","citycode":"0557"},{"中文名":"灵璧县","adcode":"341323","citycode":"0557"},{"中文名":"泗县","adcode":"341324","citycode":"0557"},{"中文名":"六安市","adcode":"341500","citycode":"0564"},{"中文名":"六安市市辖区","adcode":"341501","citycode":"0564"},{"中文名":"金安区","adcode":"341502","citycode":"0564"},{"中文名":"裕安区","adcode":"341503","citycode":"0564"},{"中文名":"叶集区","adcode":"341504","citycode":"0564"},{"中文名":"霍邱县","adcode":"341522","citycode":"0564"},{"中文名":"舒城县","adcode":"341523","citycode":"0564"},{"中文名":"金寨县","adcode":"341524","citycode":"0564"},{"中文名":"霍山县","adcode":"341525","citycode":"0564"},{"中文名":"亳州市","adcode":"341600","citycode":"0558"},{"中文名":"亳州市市辖区","adcode":"341601","citycode":"0558"},{"中文名":"谯城区","adcode":"341602","citycode":"0558"},{"中文名":"涡阳县","adcode":"341621","citycode":"0558"},{"中文名":"蒙城县","adcode":"341622","citycode":"0558"},{"中文名":"利辛县","adcode":"341623","citycode":"0558"},{"中文名":"池州市","adcode":"341700","citycode":"0566"},{"中文名":"池州市市辖区","adcode":"341701","citycode":"0566"},{"中文名":"贵池区","adcode":"341702","citycode":"0566"},{"中文名":"东至县","adcode":"341721","citycode":"0566"},{"中文名":"石台县","adcode":"341722","citycode":"0566"},{"中文名":"青阳县","adcode":"341723","citycode":"0566"},{"中文名":"宣城市","adcode":"341800","citycode":"0563"},{"中文名":"宣城市市辖区","adcode":"341801","citycode":"0563"},{"中文名":"宣州区","adcode":"341802","citycode":"0563"},{"中文名":"郎溪县","adcode":"341821","citycode":"0563"},{"中文名":"广德市","adcode":"341822","citycode":"0563"},{"中文名":"泾县","adcode":"341823","citycode":"0563"},{"中文名":"绩溪县","adcode":"341824","citycode":"0563"},{"中文名":"旌德县","adcode":"341825","citycode":"0563"},{"中文名":"宁国市","adcode":"341881","citycode":"0563"},{"中文名":"福建省","adcode":"350000","citycode":""},{"中文名":"福州市","adcode":"350100","citycode":"0591"},{"中文名":"福州市市辖区","adcode":"350101","citycode":"0591"},{"中文名":"鼓楼区","adcode":"350102","citycode":"0591"},{"中文名":"台江区","adcode":"350103","citycode":"0591"},{"中文名":"仓山区","adcode":"350104","citycode":"0591"},{"中文名":"马尾区","adcode":"350105","citycode":"0591"},{"中文名":"晋安区","adcode":"350111","citycode":"0591"},{"中文名":"长乐区","adcode":"350112","citycode":"0591"},{"中文名":"闽侯县","adcode":"350121","citycode":"0591"},{"中文名":"连江县","adcode":"350122","citycode":"0591"},{"中文名":"罗源县","adcode":"350123","citycode":"0591"},{"中文名":"闽清县","adcode":"350124","citycode":"0591"},{"中文名":"永泰县","adcode":"350125","citycode":"0591"},{"中文名":"平潭县","adcode":"350128","citycode":"0591"},{"中文名":"福清市","adcode":"350181","citycode":"0591"},{"中文名":"厦门市","adcode":"350200","citycode":"0592"},{"中文名":"厦门市市辖区","adcode":"350201","citycode":"0592"},{"中文名":"思明区","adcode":"350203","citycode":"0592"},{"中文名":"海沧区","adcode":"350205","citycode":"0592"},{"中文名":"湖里区","adcode":"350206","citycode":"0592"},{"中文名":"集美区","adcode":"350211","citycode":"0592"},{"中文名":"同安区","adcode":"350212","citycode":"0592"},{"中文名":"翔安区","adcode":"350213","citycode":"0592"},{"中文名":"莆田市","adcode":"350300","citycode":"0594"},{"中文名":"莆田市市辖区","adcode":"350301","citycode":"0594"},{"中文名":"城厢区","adcode":"350302","citycode":"0594"},{"中文名":"涵江区","adcode":"350303","citycode":"0594"},{"中文名":"荔城区","adcode":"350304","citycode":"0594"},{"中文名":"秀屿区","adcode":"350305","citycode":"0594"},{"中文名":"仙游县","adcode":"350322","citycode":"0594"},{"中文名":"三明市","adcode":"350400","citycode":"0598"},{"中文名":"三明市市辖区","adcode":"350401","citycode":"0598"},{"中文名":"梅列区","adcode":"350402","citycode":"0598"},{"中文名":"三元区","adcode":"350403","citycode":"0598"},{"中文名":"明溪县","adcode":"350421","citycode":"0598"},{"中文名":"清流县","adcode":"350423","citycode":"0598"},{"中文名":"宁化县","adcode":"350424","citycode":"0598"},{"中文名":"大田县","adcode":"350425","citycode":"0598"},{"中文名":"尤溪县","adcode":"350426","citycode":"0598"},{"中文名":"沙县","adcode":"350427","citycode":"0598"},{"中文名":"将乐县","adcode":"350428","citycode":"0598"},{"中文名":"泰宁县","adcode":"350429","citycode":"0598"},{"中文名":"建宁县","adcode":"350430","citycode":"0598"},{"中文名":"永安市","adcode":"350481","citycode":"0598"},{"中文名":"泉州市","adcode":"350500","citycode":"0595"},{"中文名":"泉州市市辖区","adcode":"350501","citycode":"0595"},{"中文名":"鲤城区","adcode":"350502","citycode":"0595"},{"中文名":"丰泽区","adcode":"350503","citycode":"0595"},{"中文名":"洛江区","adcode":"350504","citycode":"0595"},{"中文名":"泉港区","adcode":"350505","citycode":"0595"},{"中文名":"惠安县","adcode":"350521","citycode":"0595"},{"中文名":"安溪县","adcode":"350524","citycode":"0595"},{"中文名":"永春县","adcode":"350525","citycode":"0595"},{"中文名":"德化县","adcode":"350526","citycode":"0595"},{"中文名":"金门县","adcode":"350527","citycode":"0595"},{"中文名":"石狮市","adcode":"350581","citycode":"0595"},{"中文名":"晋江市","adcode":"350582","citycode":"0595"},{"中文名":"南安市","adcode":"350583","citycode":"0595"},{"中文名":"漳州市","adcode":"350600","citycode":"0596"},{"中文名":"漳州市市辖区","adcode":"350601","citycode":"0596"},{"中文名":"芗城区","adcode":"350602","citycode":"0596"},{"中文名":"龙文区","adcode":"350603","citycode":"0596"},{"中文名":"云霄县","adcode":"350622","citycode":"0596"},{"中文名":"漳浦县","adcode":"350623","citycode":"0596"},{"中文名":"诏安县","adcode":"350624","citycode":"0596"},{"中文名":"长泰县","adcode":"350625","citycode":"0596"},{"中文名":"东山县","adcode":"350626","citycode":"0596"},{"中文名":"南靖县","adcode":"350627","citycode":"0596"},{"中文名":"平和县","adcode":"350628","citycode":"0596"},{"中文名":"华安县","adcode":"350629","citycode":"0596"},{"中文名":"龙海市","adcode":"350681","citycode":"0596"},{"中文名":"南平市","adcode":"350700","citycode":"0599"},{"中文名":"南平市市辖区","adcode":"350701","citycode":"0599"},{"中文名":"延平区","adcode":"350702","citycode":"0599"},{"中文名":"建阳区","adcode":"350703","citycode":"0599"},{"中文名":"顺昌县","adcode":"350721","citycode":"0599"},{"中文名":"浦城县","adcode":"350722","citycode":"0599"},{"中文名":"光泽县","adcode":"350723","citycode":"0599"},{"中文名":"松溪县","adcode":"350724","citycode":"0599"},{"中文名":"政和县","adcode":"350725","citycode":"0599"},{"中文名":"邵武市","adcode":"350781","citycode":"0599"},{"中文名":"武夷山市","adcode":"350782","citycode":"0599"},{"中文名":"建瓯市","adcode":"350783","citycode":"0599"},{"中文名":"龙岩市","adcode":"350800","citycode":"0597"},{"中文名":"龙岩市市辖区","adcode":"350801","citycode":"0597"},{"中文名":"新罗区","adcode":"350802","citycode":"0597"},{"中文名":"永定区","adcode":"350803","citycode":"0597"},{"中文名":"长汀县","adcode":"350821","citycode":"0597"},{"中文名":"上杭县","adcode":"350823","citycode":"0597"},{"中文名":"武平县","adcode":"350824","citycode":"0597"},{"中文名":"连城县","adcode":"350825","citycode":"0597"},{"中文名":"漳平市","adcode":"350881","citycode":"0597"},{"中文名":"宁德市","adcode":"350900","citycode":"0593"},{"中文名":"宁德市市辖区","adcode":"350901","citycode":"0593"},{"中文名":"蕉城区","adcode":"350902","citycode":"0593"},{"中文名":"霞浦县","adcode":"350921","citycode":"0593"},{"中文名":"古田县","adcode":"350922","citycode":"0593"},{"中文名":"屏南县","adcode":"350923","citycode":"0593"},{"中文名":"寿宁县","adcode":"350924","citycode":"0593"},{"中文名":"周宁县","adcode":"350925","citycode":"0593"},{"中文名":"柘荣县","adcode":"350926","citycode":"0593"},{"中文名":"福安市","adcode":"350981","citycode":"0593"},{"中文名":"福鼎市","adcode":"350982","citycode":"0593"},{"中文名":"江西省","adcode":"360000","citycode":""},{"中文名":"南昌市","adcode":"360100","citycode":"0791"},{"中文名":"南昌市市辖区","adcode":"360101","citycode":"0791"},{"中文名":"东湖区","adcode":"360102","citycode":"0791"},{"中文名":"西湖区","adcode":"360103","citycode":"0791"},{"中文名":"青云谱区","adcode":"360104","citycode":"0791"},{"中文名":"青山湖区","adcode":"360111","citycode":"0791"},{"中文名":"红谷滩区","adcode":"360113","citycode":"0791"},{"中文名":"新建区","adcode":"360112","citycode":"0791"},{"中文名":"南昌县","adcode":"360121","citycode":"0791"},{"中文名":"安义县","adcode":"360123","citycode":"0791"},{"中文名":"进贤县","adcode":"360124","citycode":"0791"},{"中文名":"景德镇市","adcode":"360200","citycode":"0798"},{"中文名":"景德镇市市辖区","adcode":"360201","citycode":"0798"},{"中文名":"昌江区","adcode":"360202","citycode":"0798"},{"中文名":"珠山区","adcode":"360203","citycode":"0798"},{"中文名":"浮梁县","adcode":"360222","citycode":"0798"},{"中文名":"乐平市","adcode":"360281","citycode":"0798"},{"中文名":"萍乡市","adcode":"360300","citycode":"0799"},{"中文名":"萍乡市市辖区","adcode":"360301","citycode":"0799"},{"中文名":"安源区","adcode":"360302","citycode":"0799"},{"中文名":"湘东区","adcode":"360313","citycode":"0799"},{"中文名":"莲花县","adcode":"360321","citycode":"0799"},{"中文名":"上栗县","adcode":"360322","citycode":"0799"},{"中文名":"芦溪县","adcode":"360323","citycode":"0799"},{"中文名":"九江市","adcode":"360400","citycode":"0792"},{"中文名":"九江市市辖区","adcode":"360401","citycode":"0792"},{"中文名":"濂溪区","adcode":"360402","citycode":"0792"},{"中文名":"浔阳区","adcode":"360403","citycode":"0792"},{"中文名":"柴桑区","adcode":"360404","citycode":"0792"},{"中文名":"武宁县","adcode":"360423","citycode":"0792"},{"中文名":"修水县","adcode":"360424","citycode":"0792"},{"中文名":"永修县","adcode":"360425","citycode":"0792"},{"中文名":"德安县","adcode":"360426","citycode":"0792"},{"中文名":"都昌县","adcode":"360428","citycode":"0792"},{"中文名":"湖口县","adcode":"360429","citycode":"0792"},{"中文名":"彭泽县","adcode":"360430","citycode":"0792"},{"中文名":"瑞昌市","adcode":"360481","citycode":"0792"},{"中文名":"共青城市","adcode":"360482","citycode":"0792"},{"中文名":"庐山市","adcode":"360483","citycode":"0792"},{"中文名":"新余市","adcode":"360500","citycode":"0790"},{"中文名":"新余市市辖区","adcode":"360501","citycode":"0790"},{"中文名":"渝水区","adcode":"360502","citycode":"0790"},{"中文名":"分宜县","adcode":"360521","citycode":"0790"},{"中文名":"鹰潭市","adcode":"360600","citycode":"0701"},{"中文名":"鹰潭市市辖区","adcode":"360601","citycode":"0701"},{"中文名":"月湖区","adcode":"360602","citycode":"0701"},{"中文名":"余江区","adcode":"360603","citycode":"0701"},{"中文名":"贵溪市","adcode":"360681","citycode":"0701"},{"中文名":"赣州市","adcode":"360700","citycode":"0797"},{"中文名":"赣州市市辖区","adcode":"360701","citycode":"0797"},{"中文名":"章贡区","adcode":"360702","citycode":"0797"},{"中文名":"南康区","adcode":"360703","citycode":"0797"},{"中文名":"赣县区","adcode":"360704","citycode":"0797"},{"中文名":"信丰县","adcode":"360722","citycode":"0797"},{"中文名":"大余县","adcode":"360723","citycode":"0797"},{"中文名":"上犹县","adcode":"360724","citycode":"0797"},{"中文名":"崇义县","adcode":"360725","citycode":"0797"},{"中文名":"安远县","adcode":"360726","citycode":"0797"},{"中文名":"龙南县","adcode":"360727","citycode":"0797"},{"中文名":"定南县","adcode":"360728","citycode":"0797"},{"中文名":"全南县","adcode":"360729","citycode":"0797"},{"中文名":"宁都县","adcode":"360730","citycode":"0797"},{"中文名":"于都县","adcode":"360731","citycode":"0797"},{"中文名":"兴国县","adcode":"360732","citycode":"0797"},{"中文名":"会昌县","adcode":"360733","citycode":"0797"},{"中文名":"寻乌县","adcode":"360734","citycode":"0797"},{"中文名":"石城县","adcode":"360735","citycode":"0797"},{"中文名":"瑞金市","adcode":"360781","citycode":"0797"},{"中文名":"吉安市","adcode":"360800","citycode":"0796"},{"中文名":"吉安市市辖区","adcode":"360801","citycode":"0796"},{"中文名":"吉州区","adcode":"360802","citycode":"0796"},{"中文名":"青原区","adcode":"360803","citycode":"0796"},{"中文名":"吉安县","adcode":"360821","citycode":"0796"},{"中文名":"吉水县","adcode":"360822","citycode":"0796"},{"中文名":"峡江县","adcode":"360823","citycode":"0796"},{"中文名":"新干县","adcode":"360824","citycode":"0796"},{"中文名":"永丰县","adcode":"360825","citycode":"0796"},{"中文名":"泰和县","adcode":"360826","citycode":"0796"},{"中文名":"遂川县","adcode":"360827","citycode":"0796"},{"中文名":"万安县","adcode":"360828","citycode":"0796"},{"中文名":"安福县","adcode":"360829","citycode":"0796"},{"中文名":"永新县","adcode":"360830","citycode":"0796"},{"中文名":"井冈山市","adcode":"360881","citycode":"0796"},{"中文名":"宜春市","adcode":"360900","citycode":"0795"},{"中文名":"宜春市市辖区","adcode":"360901","citycode":"0795"},{"中文名":"袁州区","adcode":"360902","citycode":"0795"},{"中文名":"奉新县","adcode":"360921","citycode":"0795"},{"中文名":"万载县","adcode":"360922","citycode":"0795"},{"中文名":"上高县","adcode":"360923","citycode":"0795"},{"中文名":"宜丰县","adcode":"360924","citycode":"0795"},{"中文名":"靖安县","adcode":"360925","citycode":"0795"},{"中文名":"铜鼓县","adcode":"360926","citycode":"0795"},{"中文名":"丰城市","adcode":"360981","citycode":"0795"},{"中文名":"樟树市","adcode":"360982","citycode":"0795"},{"中文名":"高安市","adcode":"360983","citycode":"0795"},{"中文名":"抚州市","adcode":"361000","citycode":"0794"},{"中文名":"抚州市市辖区","adcode":"361001","citycode":"0794"},{"中文名":"临川区","adcode":"361002","citycode":"0794"},{"中文名":"东乡区","adcode":"361003","citycode":"0794"},{"中文名":"南城县","adcode":"361021","citycode":"0794"},{"中文名":"黎川县","adcode":"361022","citycode":"0794"},{"中文名":"南丰县","adcode":"361023","citycode":"0794"},{"中文名":"崇仁县","adcode":"361024","citycode":"0794"},{"中文名":"乐安县","adcode":"361025","citycode":"0794"},{"中文名":"宜黄县","adcode":"361026","citycode":"0794"},{"中文名":"金溪县","adcode":"361027","citycode":"0794"},{"中文名":"资溪县","adcode":"361028","citycode":"0794"},{"中文名":"广昌县","adcode":"361030","citycode":"0794"},{"中文名":"上饶市","adcode":"361100","citycode":"0793"},{"中文名":"上饶市市辖区","adcode":"361101","citycode":"0793"},{"中文名":"信州区","adcode":"361102","citycode":"0793"},{"中文名":"广丰区","adcode":"361103","citycode":"0793"},{"中文名":"广信区","adcode":"361104","citycode":"0793"},{"中文名":"玉山县","adcode":"361123","citycode":"0793"},{"中文名":"铅山县","adcode":"361124","citycode":"0793"},{"中文名":"横峰县","adcode":"361125","citycode":"0793"},{"中文名":"弋阳县","adcode":"361126","citycode":"0793"},{"中文名":"余干县","adcode":"361127","citycode":"0793"},{"中文名":"鄱阳县","adcode":"361128","citycode":"0793"},{"中文名":"万年县","adcode":"361129","citycode":"0793"},{"中文名":"婺源县","adcode":"361130","citycode":"0793"},{"中文名":"德兴市","adcode":"361181","citycode":"0793"},{"中文名":"山东省","adcode":"370000","citycode":""},{"中文名":"济南市","adcode":"370100","citycode":"0531"},{"中文名":"济南市市辖区","adcode":"370101","citycode":"0531"},{"中文名":"历下区","adcode":"370102","citycode":"0531"},{"中文名":"市中区","adcode":"370103","citycode":"0531"},{"中文名":"槐荫区","adcode":"370104","citycode":"0531"},{"中文名":"天桥区","adcode":"370105","citycode":"0531"},{"中文名":"历城区","adcode":"370112","citycode":"0531"},{"中文名":"长清区","adcode":"370113","citycode":"0531"},{"中文名":"章丘区","adcode":"370114","citycode":"0531"},{"中文名":"平阴县","adcode":"370124","citycode":"0531"},{"中文名":"济阳区","adcode":"370115","citycode":"0531"},{"中文名":"商河县","adcode":"370126","citycode":"0531"},{"中文名":"青岛市","adcode":"370200","citycode":"0532"},{"中文名":"青岛市市辖区","adcode":"370201","citycode":"0532"},{"中文名":"市南区","adcode":"370202","citycode":"0532"},{"中文名":"市北区","adcode":"370203","citycode":"0532"},{"中文名":"黄岛区","adcode":"370211","citycode":"0532"},{"中文名":"崂山区","adcode":"370212","citycode":"0532"},{"中文名":"李沧区","adcode":"370213","citycode":"0532"},{"中文名":"城阳区","adcode":"370214","citycode":"0532"},{"中文名":"即墨区","adcode":"370215","citycode":"0532"},{"中文名":"胶州市","adcode":"370281","citycode":"0532"},{"中文名":"平度市","adcode":"370283","citycode":"0532"},{"中文名":"莱西市","adcode":"370285","citycode":"0532"},{"中文名":"淄博市","adcode":"370300","citycode":"0533"},{"中文名":"淄博市市辖区","adcode":"370301","citycode":"0533"},{"中文名":"淄川区","adcode":"370302","citycode":"0533"},{"中文名":"张店区","adcode":"370303","citycode":"0533"},{"中文名":"博山区","adcode":"370304","citycode":"0533"},{"中文名":"临淄区","adcode":"370305","citycode":"0533"},{"中文名":"周村区","adcode":"370306","citycode":"0533"},{"中文名":"桓台县","adcode":"370321","citycode":"0533"},{"中文名":"高青县","adcode":"370322","citycode":"0533"},{"中文名":"沂源县","adcode":"370323","citycode":"0533"},{"中文名":"枣庄市","adcode":"370400","citycode":"0632"},{"中文名":"枣庄市市辖区","adcode":"370401","citycode":"0632"},{"中文名":"市中区","adcode":"370402","citycode":"0632"},{"中文名":"薛城区","adcode":"370403","citycode":"0632"},{"中文名":"峄城区","adcode":"370404","citycode":"0632"},{"中文名":"台儿庄区","adcode":"370405","citycode":"0632"},{"中文名":"山亭区","adcode":"370406","citycode":"0632"},{"中文名":"滕州市","adcode":"370481","citycode":"0632"},{"中文名":"东营市","adcode":"370500","citycode":"0546"},{"中文名":"东营市市辖区","adcode":"370501","citycode":"0546"},{"中文名":"东营区","adcode":"370502","citycode":"0546"},{"中文名":"河口区","adcode":"370503","citycode":"0546"},{"中文名":"垦利区","adcode":"370505","citycode":"0546"},{"中文名":"利津县","adcode":"370522","citycode":"0546"},{"中文名":"广饶县","adcode":"370523","citycode":"0546"},{"中文名":"烟台市","adcode":"370600","citycode":"0535"},{"中文名":"烟台市市辖区","adcode":"370601","citycode":"0535"},{"中文名":"芝罘区","adcode":"370602","citycode":"0535"},{"中文名":"福山区","adcode":"370611","citycode":"0535"},{"中文名":"牟平区","adcode":"370612","citycode":"0535"},{"中文名":"莱山区","adcode":"370613","citycode":"0535"},{"中文名":"长岛县","adcode":"370634","citycode":"0535"},{"中文名":"龙口市","adcode":"370681","citycode":"0535"},{"中文名":"莱阳市","adcode":"370682","citycode":"0535"},{"中文名":"莱州市","adcode":"370683","citycode":"0535"},{"中文名":"蓬莱市","adcode":"370684","citycode":"0535"},{"中文名":"招远市","adcode":"370685","citycode":"0535"},{"中文名":"栖霞市","adcode":"370686","citycode":"0535"},{"中文名":"海阳市","adcode":"370687","citycode":"0535"},{"中文名":"潍坊市","adcode":"370700","citycode":"0536"},{"中文名":"潍坊市市辖区","adcode":"370701","citycode":"0536"},{"中文名":"潍城区","adcode":"370702","citycode":"0536"},{"中文名":"寒亭区","adcode":"370703","citycode":"0536"},{"中文名":"坊子区","adcode":"370704","citycode":"0536"},{"中文名":"奎文区","adcode":"370705","citycode":"0536"},{"中文名":"临朐县","adcode":"370724","citycode":"0536"},{"中文名":"昌乐县","adcode":"370725","citycode":"0536"},{"中文名":"青州市","adcode":"370781","citycode":"0536"},{"中文名":"诸城市","adcode":"370782","citycode":"0536"},{"中文名":"寿光市","adcode":"370783","citycode":"0536"},{"中文名":"安丘市","adcode":"370784","citycode":"0536"},{"中文名":"高密市","adcode":"370785","citycode":"0536"},{"中文名":"昌邑市","adcode":"370786","citycode":"0536"},{"中文名":"济宁市","adcode":"370800","citycode":"0537"},{"中文名":"济宁市市辖区","adcode":"370801","citycode":"0537"},{"中文名":"任城区","adcode":"370811","citycode":"0537"},{"中文名":"兖州区","adcode":"370812","citycode":"0537"},{"中文名":"微山县","adcode":"370826","citycode":"0537"},{"中文名":"鱼台县","adcode":"370827","citycode":"0537"},{"中文名":"金乡县","adcode":"370828","citycode":"0537"},{"中文名":"嘉祥县","adcode":"370829","citycode":"0537"},{"中文名":"汶上县","adcode":"370830","citycode":"0537"},{"中文名":"泗水县","adcode":"370831","citycode":"0537"},{"中文名":"梁山县","adcode":"370832","citycode":"0537"},{"中文名":"曲阜市","adcode":"370881","citycode":"0537"},{"中文名":"邹城市","adcode":"370883","citycode":"0537"},{"中文名":"泰安市","adcode":"370900","citycode":"0538"},{"中文名":"泰安市市辖区","adcode":"370901","citycode":"0538"},{"中文名":"泰山区","adcode":"370902","citycode":"0538"},{"中文名":"岱岳区","adcode":"370911","citycode":"0538"},{"中文名":"宁阳县","adcode":"370921","citycode":"0538"},{"中文名":"东平县","adcode":"370923","citycode":"0538"},{"中文名":"新泰市","adcode":"370982","citycode":"0538"},{"中文名":"肥城市","adcode":"370983","citycode":"0538"},{"中文名":"威海市","adcode":"371000","citycode":"0631"},{"中文名":"威海市市辖区","adcode":"371001","citycode":"0631"},{"中文名":"环翠区","adcode":"371002","citycode":"0631"},{"中文名":"文登区","adcode":"371003","citycode":"0631"},{"中文名":"荣成市","adcode":"371082","citycode":"0631"},{"中文名":"乳山市","adcode":"371083","citycode":"0631"},{"中文名":"日照市","adcode":"371100","citycode":"0633"},{"中文名":"日照市市辖区","adcode":"371101","citycode":"0633"},{"中文名":"东港区","adcode":"371102","citycode":"0633"},{"中文名":"岚山区","adcode":"371103","citycode":"0633"},{"中文名":"五莲县","adcode":"371121","citycode":"0633"},{"中文名":"莒县","adcode":"371122","citycode":"0633"},{"中文名":"莱芜区","adcode":"370116","citycode":"0531"},{"中文名":"钢城区","adcode":"370117","citycode":"0531"},{"中文名":"临沂市","adcode":"371300","citycode":"0539"},{"中文名":"临沂市市辖区","adcode":"371301","citycode":"0539"},{"中文名":"兰山区","adcode":"371302","citycode":"0539"},{"中文名":"罗庄区","adcode":"371311","citycode":"0539"},{"中文名":"河东区","adcode":"371312","citycode":"0539"},{"中文名":"沂南县","adcode":"371321","citycode":"0539"},{"中文名":"郯城县","adcode":"371322","citycode":"0539"},{"中文名":"沂水县","adcode":"371323","citycode":"0539"},{"中文名":"兰陵县","adcode":"371324","citycode":"0539"},{"中文名":"费县","adcode":"371325","citycode":"0539"},{"中文名":"平邑县","adcode":"371326","citycode":"0539"},{"中文名":"莒南县","adcode":"371327","citycode":"0539"},{"中文名":"蒙阴县","adcode":"371328","citycode":"0539"},{"中文名":"临沭县","adcode":"371329","citycode":"0539"},{"中文名":"德州市","adcode":"371400","citycode":"0534"},{"中文名":"德州市市辖区","adcode":"371401","citycode":"0534"},{"中文名":"德城区","adcode":"371402","citycode":"0534"},{"中文名":"陵城区","adcode":"371403","citycode":"0534"},{"中文名":"宁津县","adcode":"371422","citycode":"0534"},{"中文名":"庆云县","adcode":"371423","citycode":"0534"},{"中文名":"临邑县","adcode":"371424","citycode":"0534"},{"中文名":"齐河县","adcode":"371425","citycode":"0534"},{"中文名":"平原县","adcode":"371426","citycode":"0534"},{"中文名":"夏津县","adcode":"371427","citycode":"0534"},{"中文名":"武城县","adcode":"371428","citycode":"0534"},{"中文名":"乐陵市","adcode":"371481","citycode":"0534"},{"中文名":"禹城市","adcode":"371482","citycode":"0534"},{"中文名":"聊城市","adcode":"371500","citycode":"0635"},{"中文名":"聊城市市辖区","adcode":"371501","citycode":"0635"},{"中文名":"东昌府区","adcode":"371502","citycode":"0635"},{"中文名":"阳谷县","adcode":"371521","citycode":"0635"},{"中文名":"莘县","adcode":"371522","citycode":"0635"},{"中文名":"茌平区","adcode":"371503","citycode":"0635"},{"中文名":"东阿县","adcode":"371524","citycode":"0635"},{"中文名":"冠县","adcode":"371525","citycode":"0635"},{"中文名":"高唐县","adcode":"371526","citycode":"0635"},{"中文名":"临清市","adcode":"371581","citycode":"0635"},{"中文名":"滨州市","adcode":"371600","citycode":"0543"},{"中文名":"滨州市市辖区","adcode":"371601","citycode":"0543"},{"中文名":"滨城区","adcode":"371602","citycode":"0543"},{"中文名":"沾化区","adcode":"371603","citycode":"0543"},{"中文名":"惠民县","adcode":"371621","citycode":"0543"},{"中文名":"阳信县","adcode":"371622","citycode":"0543"},{"中文名":"无棣县","adcode":"371623","citycode":"0543"},{"中文名":"博兴县","adcode":"371625","citycode":"0543"},{"中文名":"邹平市","adcode":"371681","citycode":"0543"},{"中文名":"菏泽市","adcode":"371700","citycode":"0530"},{"中文名":"菏泽市市辖区","adcode":"371701","citycode":"0530"},{"中文名":"牡丹区","adcode":"371702","citycode":"0530"},{"中文名":"定陶区","adcode":"371703","citycode":"0530"},{"中文名":"曹县","adcode":"371721","citycode":"0530"},{"中文名":"单县","adcode":"371722","citycode":"0530"},{"中文名":"成武县","adcode":"371723","citycode":"0530"},{"中文名":"巨野县","adcode":"371724","citycode":"0530"},{"中文名":"郓城县","adcode":"371725","citycode":"0530"},{"中文名":"鄄城县","adcode":"371726","citycode":"0530"},{"中文名":"东明县","adcode":"371728","citycode":"0530"},{"中文名":"河南省","adcode":"410000","citycode":""},{"中文名":"郑州市","adcode":"410100","citycode":"0371"},{"中文名":"郑州市市辖区","adcode":"410101","citycode":"0371"},{"中文名":"中原区","adcode":"410102","citycode":"0371"},{"中文名":"二七区","adcode":"410103","citycode":"0371"},{"中文名":"管城回族区","adcode":"410104","citycode":"0371"},{"中文名":"金水区","adcode":"410105","citycode":"0371"},{"中文名":"上街区","adcode":"410106","citycode":"0371"},{"中文名":"惠济区","adcode":"410108","citycode":"0371"},{"中文名":"中牟县","adcode":"410122","citycode":"0371"},{"中文名":"巩义市","adcode":"410181","citycode":"0371"},{"中文名":"荥阳市","adcode":"410182","citycode":"0371"},{"中文名":"新密市","adcode":"410183","citycode":"0371"},{"中文名":"新郑市","adcode":"410184","citycode":"0371"},{"中文名":"登封市","adcode":"410185","citycode":"0371"},{"中文名":"开封市","adcode":"410200","citycode":"0378"},{"中文名":"开封市市辖区","adcode":"410201","citycode":"0378"},{"中文名":"龙亭区","adcode":"410202","citycode":"0378"},{"中文名":"顺河回族区","adcode":"410203","citycode":"0378"},{"中文名":"鼓楼区","adcode":"410204","citycode":"0378"},{"中文名":"禹王台区","adcode":"410205","citycode":"0378"},{"中文名":"祥符区","adcode":"410212","citycode":"0378"},{"中文名":"杞县","adcode":"410221","citycode":"0378"},{"中文名":"通许县","adcode":"410222","citycode":"0378"},{"中文名":"尉氏县","adcode":"410223","citycode":"0378"},{"中文名":"兰考县","adcode":"410225","citycode":"0378"},{"中文名":"洛阳市","adcode":"410300","citycode":"0379"},{"中文名":"洛阳市市辖区","adcode":"410301","citycode":"0379"},{"中文名":"老城区","adcode":"410302","citycode":"0379"},{"中文名":"西工区","adcode":"410303","citycode":"0379"},{"中文名":"瀍河回族区","adcode":"410304","citycode":"0379"},{"中文名":"涧西区","adcode":"410305","citycode":"0379"},{"中文名":"吉利区","adcode":"410306","citycode":"0379"},{"中文名":"洛龙区","adcode":"410311","citycode":"0379"},{"中文名":"孟津县","adcode":"410322","citycode":"0379"},{"中文名":"新安县","adcode":"410323","citycode":"0379"},{"中文名":"栾川县","adcode":"410324","citycode":"0379"},{"中文名":"嵩县","adcode":"410325","citycode":"0379"},{"中文名":"汝阳县","adcode":"410326","citycode":"0379"},{"中文名":"宜阳县","adcode":"410327","citycode":"0379"},{"中文名":"洛宁县","adcode":"410328","citycode":"0379"},{"中文名":"伊川县","adcode":"410329","citycode":"0379"},{"中文名":"偃师市","adcode":"410381","citycode":"0379"},{"中文名":"平顶山市","adcode":"410400","citycode":"0375"},{"中文名":"平顶山市市辖区","adcode":"410401","citycode":"0375"},{"中文名":"新华区","adcode":"410402","citycode":"0375"},{"中文名":"卫东区","adcode":"410403","citycode":"0375"},{"中文名":"石龙区","adcode":"410404","citycode":"0375"},{"中文名":"湛河区","adcode":"410411","citycode":"0375"},{"中文名":"宝丰县","adcode":"410421","citycode":"0375"},{"中文名":"叶县","adcode":"410422","citycode":"0375"},{"中文名":"鲁山县","adcode":"410423","citycode":"0375"},{"中文名":"郏县","adcode":"410425","citycode":"0375"},{"中文名":"舞钢市","adcode":"410481","citycode":"0375"},{"中文名":"汝州市","adcode":"410482","citycode":"0375"},{"中文名":"安阳市","adcode":"410500","citycode":"0372"},{"中文名":"安阳市市辖区","adcode":"410501","citycode":"0372"},{"中文名":"文峰区","adcode":"410502","citycode":"0372"},{"中文名":"北关区","adcode":"410503","citycode":"0372"},{"中文名":"殷都区","adcode":"410505","citycode":"0372"},{"中文名":"龙安区","adcode":"410506","citycode":"0372"},{"中文名":"安阳县","adcode":"410522","citycode":"0372"},{"中文名":"汤阴县","adcode":"410523","citycode":"0372"},{"中文名":"滑县","adcode":"410526","citycode":"0372"},{"中文名":"内黄县","adcode":"410527","citycode":"0372"},{"中文名":"林州市","adcode":"410581","citycode":"0372"},{"中文名":"鹤壁市","adcode":"410600","citycode":"0392"},{"中文名":"鹤壁市市辖区","adcode":"410601","citycode":"0392"},{"中文名":"鹤山区","adcode":"410602","citycode":"0392"},{"中文名":"山城区","adcode":"410603","citycode":"0392"},{"中文名":"淇滨区","adcode":"410611","citycode":"0392"},{"中文名":"浚县","adcode":"410621","citycode":"0392"},{"中文名":"淇县","adcode":"410622","citycode":"0392"},{"中文名":"新乡市","adcode":"410700","citycode":"0373"},{"中文名":"新乡市市辖区","adcode":"410701","citycode":"0373"},{"中文名":"红旗区","adcode":"410702","citycode":"0373"},{"中文名":"卫滨区","adcode":"410703","citycode":"0373"},{"中文名":"凤泉区","adcode":"410704","citycode":"0373"},{"中文名":"牧野区","adcode":"410711","citycode":"0373"},{"中文名":"新乡县","adcode":"410721","citycode":"0373"},{"中文名":"获嘉县","adcode":"410724","citycode":"0373"},{"中文名":"原阳县","adcode":"410725","citycode":"0373"},{"中文名":"延津县","adcode":"410726","citycode":"0373"},{"中文名":"封丘县","adcode":"410727","citycode":"0373"},{"中文名":"长垣市","adcode":"410783","citycode":"0373"},{"中文名":"卫辉市","adcode":"410781","citycode":"0373"},{"中文名":"辉县市","adcode":"410782","citycode":"0373"},{"中文名":"焦作市","adcode":"410800","citycode":"0391"},{"中文名":"焦作市市辖区","adcode":"410801","citycode":"0391"},{"中文名":"解放区","adcode":"410802","citycode":"0391"},{"中文名":"中站区","adcode":"410803","citycode":"0391"},{"中文名":"马村区","adcode":"410804","citycode":"0391"},{"中文名":"山阳区","adcode":"410811","citycode":"0391"},{"中文名":"修武县","adcode":"410821","citycode":"0391"},{"中文名":"博爱县","adcode":"410822","citycode":"0391"},{"中文名":"武陟县","adcode":"410823","citycode":"0391"},{"中文名":"温县","adcode":"410825","citycode":"0391"},{"中文名":"沁阳市","adcode":"410882","citycode":"0391"},{"中文名":"孟州市","adcode":"410883","citycode":"0391"},{"中文名":"濮阳市","adcode":"410900","citycode":"0393"},{"中文名":"濮阳市市辖区","adcode":"410901","citycode":"0393"},{"中文名":"华龙区","adcode":"410902","citycode":"0393"},{"中文名":"清丰县","adcode":"410922","citycode":"0393"},{"中文名":"南乐县","adcode":"410923","citycode":"0393"},{"中文名":"范县","adcode":"410926","citycode":"0393"},{"中文名":"台前县","adcode":"410927","citycode":"0393"},{"中文名":"濮阳县","adcode":"410928","citycode":"0393"},{"中文名":"许昌市","adcode":"411000","citycode":"0374"},{"中文名":"许昌市市辖区","adcode":"411001","citycode":"0374"},{"中文名":"魏都区","adcode":"411002","citycode":"0374"},{"中文名":"建安区","adcode":"411003","citycode":"0374"},{"中文名":"鄢陵县","adcode":"411024","citycode":"0374"},{"中文名":"襄城县","adcode":"411025","citycode":"0374"},{"中文名":"禹州市","adcode":"411081","citycode":"0374"},{"中文名":"长葛市","adcode":"411082","citycode":"0374"},{"中文名":"漯河市","adcode":"411100","citycode":"0395"},{"中文名":"漯河市市辖区","adcode":"411101","citycode":"0395"},{"中文名":"源汇区","adcode":"411102","citycode":"0395"},{"中文名":"郾城区","adcode":"411103","citycode":"0395"},{"中文名":"召陵区","adcode":"411104","citycode":"0395"},{"中文名":"舞阳县","adcode":"411121","citycode":"0395"},{"中文名":"临颍县","adcode":"411122","citycode":"0395"},{"中文名":"三门峡市","adcode":"411200","citycode":"0398"},{"中文名":"三门峡市市辖区","adcode":"411201","citycode":"0398"},{"中文名":"湖滨区","adcode":"411202","citycode":"0398"},{"中文名":"陕州区","adcode":"411203","citycode":"0398"},{"中文名":"渑池县","adcode":"411221","citycode":"0398"},{"中文名":"卢氏县","adcode":"411224","citycode":"0398"},{"中文名":"义马市","adcode":"411281","citycode":"0398"},{"中文名":"灵宝市","adcode":"411282","citycode":"0398"},{"中文名":"南阳市","adcode":"411300","citycode":"0377"},{"中文名":"南阳市市辖区","adcode":"411301","citycode":"0377"},{"中文名":"宛城区","adcode":"411302","citycode":"0377"},{"中文名":"卧龙区","adcode":"411303","citycode":"0377"},{"中文名":"南召县","adcode":"411321","citycode":"0377"},{"中文名":"方城县","adcode":"411322","citycode":"0377"},{"中文名":"西峡县","adcode":"411323","citycode":"0377"},{"中文名":"镇平县","adcode":"411324","citycode":"0377"},{"中文名":"内乡县","adcode":"411325","citycode":"0377"},{"中文名":"淅川县","adcode":"411326","citycode":"0377"},{"中文名":"社旗县","adcode":"411327","citycode":"0377"},{"中文名":"唐河县","adcode":"411328","citycode":"0377"},{"中文名":"新野县","adcode":"411329","citycode":"0377"},{"中文名":"桐柏县","adcode":"411330","citycode":"0377"},{"中文名":"邓州市","adcode":"411381","citycode":"0377"},{"中文名":"商丘市","adcode":"411400","citycode":"0370"},{"中文名":"商丘市市辖区","adcode":"411401","citycode":"0370"},{"中文名":"梁园区","adcode":"411402","citycode":"0370"},{"中文名":"睢阳区","adcode":"411403","citycode":"0370"},{"中文名":"民权县","adcode":"411421","citycode":"0370"},{"中文名":"睢县","adcode":"411422","citycode":"0370"},{"中文名":"宁陵县","adcode":"411423","citycode":"0370"},{"中文名":"柘城县","adcode":"411424","citycode":"0370"},{"中文名":"虞城县","adcode":"411425","citycode":"0370"},{"中文名":"夏邑县","adcode":"411426","citycode":"0370"},{"中文名":"永城市","adcode":"411481","citycode":"0370"},{"中文名":"信阳市","adcode":"411500","citycode":"0376"},{"中文名":"信阳市市辖区","adcode":"411501","citycode":"0376"},{"中文名":"浉河区","adcode":"411502","citycode":"0376"},{"中文名":"平桥区","adcode":"411503","citycode":"0376"},{"中文名":"罗山县","adcode":"411521","citycode":"0376"},{"中文名":"光山县","adcode":"411522","citycode":"0376"},{"中文名":"新县","adcode":"411523","citycode":"0376"},{"中文名":"商城县","adcode":"411524","citycode":"0376"},{"中文名":"固始县","adcode":"411525","citycode":"0376"},{"中文名":"潢川县","adcode":"411526","citycode":"0376"},{"中文名":"淮滨县","adcode":"411527","citycode":"0376"},{"中文名":"息县","adcode":"411528","citycode":"0376"},{"中文名":"周口市","adcode":"411600","citycode":"0394"},{"中文名":"周口市市辖区","adcode":"411601","citycode":"0394"},{"中文名":"川汇区","adcode":"411602","citycode":"0394"},{"中文名":"扶沟县","adcode":"411621","citycode":"0394"},{"中文名":"西华县","adcode":"411622","citycode":"0394"},{"中文名":"商水县","adcode":"411623","citycode":"0394"},{"中文名":"沈丘县","adcode":"411624","citycode":"0394"},{"中文名":"郸城县","adcode":"411625","citycode":"0394"},{"中文名":"淮阳区","adcode":"411603","citycode":"0394"},{"中文名":"太康县","adcode":"411627","citycode":"0394"},{"中文名":"鹿邑县","adcode":"411628","citycode":"0394"},{"中文名":"项城市","adcode":"411681","citycode":"0394"},{"中文名":"驻马店市","adcode":"411700","citycode":"0396"},{"中文名":"驻马店市市辖区","adcode":"411701","citycode":"0396"},{"中文名":"驿城区","adcode":"411702","citycode":"0396"},{"中文名":"西平县","adcode":"411721","citycode":"0396"},{"中文名":"上蔡县","adcode":"411722","citycode":"0396"},{"中文名":"平舆县","adcode":"411723","citycode":"0396"},{"中文名":"正阳县","adcode":"411724","citycode":"0396"},{"中文名":"确山县","adcode":"411725","citycode":"0396"},{"中文名":"泌阳县","adcode":"411726","citycode":"0396"},{"中文名":"汝南县","adcode":"411727","citycode":"0396"},{"中文名":"遂平县","adcode":"411728","citycode":"0396"},{"中文名":"新蔡县","adcode":"411729","citycode":"0396"},{"中文名":"济源市","adcode":"419001","citycode":"1391"},{"中文名":"湖北省","adcode":"420000","citycode":""},{"中文名":"武汉市","adcode":"420100","citycode":"027"},{"中文名":"武汉市市辖区","adcode":"420101","citycode":"027"},{"中文名":"江岸区","adcode":"420102","citycode":"027"},{"中文名":"江汉区","adcode":"420103","citycode":"027"},{"中文名":"硚口区","adcode":"420104","citycode":"027"},{"中文名":"汉阳区","adcode":"420105","citycode":"027"},{"中文名":"武昌区","adcode":"420106","citycode":"027"},{"中文名":"青山区","adcode":"420107","citycode":"027"},{"中文名":"洪山区","adcode":"420111","citycode":"027"},{"中文名":"东西湖区","adcode":"420112","citycode":"027"},{"中文名":"汉南区","adcode":"420113","citycode":"027"},{"中文名":"蔡甸区","adcode":"420114","citycode":"027"},{"中文名":"江夏区","adcode":"420115","citycode":"027"},{"中文名":"黄陂区","adcode":"420116","citycode":"027"},{"中文名":"新洲区","adcode":"420117","citycode":"027"},{"中文名":"黄石市","adcode":"420200","citycode":"0714"},{"中文名":"黄石市市辖区","adcode":"420201","citycode":"0714"},{"中文名":"黄石港区","adcode":"420202","citycode":"0714"},{"中文名":"西塞山区","adcode":"420203","citycode":"0714"},{"中文名":"下陆区","adcode":"420204","citycode":"0714"},{"中文名":"铁山区","adcode":"420205","citycode":"0714"},{"中文名":"阳新县","adcode":"420222","citycode":"0714"},{"中文名":"大冶市","adcode":"420281","citycode":"0714"},{"中文名":"十堰市","adcode":"420300","citycode":"0719"},{"中文名":"十堰市市辖区","adcode":"420301","citycode":"0719"},{"中文名":"茅箭区","adcode":"420302","citycode":"0719"},{"中文名":"张湾区","adcode":"420303","citycode":"0719"},{"中文名":"郧阳区","adcode":"420304","citycode":"0719"},{"中文名":"郧西县","adcode":"420322","citycode":"0719"},{"中文名":"竹山县","adcode":"420323","citycode":"0719"},{"中文名":"竹溪县","adcode":"420324","citycode":"0719"},{"中文名":"房县","adcode":"420325","citycode":"0719"},{"中文名":"丹江口市","adcode":"420381","citycode":"0719"},{"中文名":"宜昌市","adcode":"420500","citycode":"0717"},{"中文名":"宜昌市市辖区","adcode":"420501","citycode":"0717"},{"中文名":"西陵区","adcode":"420502","citycode":"0717"},{"中文名":"伍家岗区","adcode":"420503","citycode":"0717"},{"中文名":"点军区","adcode":"420504","citycode":"0717"},{"中文名":"猇亭区","adcode":"420505","citycode":"0717"},{"中文名":"夷陵区","adcode":"420506","citycode":"0717"},{"中文名":"远安县","adcode":"420525","citycode":"0717"},{"中文名":"兴山县","adcode":"420526","citycode":"0717"},{"中文名":"秭归县","adcode":"420527","citycode":"0717"},{"中文名":"长阳土家族自治县","adcode":"420528","citycode":"0717"},{"中文名":"五峰土家族自治县","adcode":"420529","citycode":"0717"},{"中文名":"宜都市","adcode":"420581","citycode":"0717"},{"中文名":"当阳市","adcode":"420582","citycode":"0717"},{"中文名":"枝江市","adcode":"420583","citycode":"0717"},{"中文名":"襄阳市","adcode":"420600","citycode":"0710"},{"中文名":"襄阳市市辖区","adcode":"420601","citycode":"0710"},{"中文名":"襄城区","adcode":"420602","citycode":"0710"},{"中文名":"樊城区","adcode":"420606","citycode":"0710"},{"中文名":"襄州区","adcode":"420607","citycode":"0710"},{"中文名":"南漳县","adcode":"420624","citycode":"0710"},{"中文名":"谷城县","adcode":"420625","citycode":"0710"},{"中文名":"保康县","adcode":"420626","citycode":"0710"},{"中文名":"老河口市","adcode":"420682","citycode":"0710"},{"中文名":"枣阳市","adcode":"420683","citycode":"0710"},{"中文名":"宜城市","adcode":"420684","citycode":"0710"},{"中文名":"鄂州市","adcode":"420700","citycode":"0711"},{"中文名":"鄂州市市辖区","adcode":"420701","citycode":"0711"},{"中文名":"梁子湖区","adcode":"420702","citycode":"0711"},{"中文名":"华容区","adcode":"420703","citycode":"0711"},{"中文名":"鄂城区","adcode":"420704","citycode":"0711"},{"中文名":"荆门市","adcode":"420800","citycode":"0724"},{"中文名":"荆门市市辖区","adcode":"420801","citycode":"0724"},{"中文名":"东宝区","adcode":"420802","citycode":"0724"},{"中文名":"掇刀区","adcode":"420804","citycode":"0724"},{"中文名":"京山市","adcode":"420882","citycode":"0724"},{"中文名":"沙洋县","adcode":"420822","citycode":"0724"},{"中文名":"钟祥市","adcode":"420881","citycode":"0724"},{"中文名":"孝感市","adcode":"420900","citycode":"0712"},{"中文名":"孝感市市辖区","adcode":"420901","citycode":"0712"},{"中文名":"孝南区","adcode":"420902","citycode":"0712"},{"中文名":"孝昌县","adcode":"420921","citycode":"0712"},{"中文名":"大悟县","adcode":"420922","citycode":"0712"},{"中文名":"云梦县","adcode":"420923","citycode":"0712"},{"中文名":"应城市","adcode":"420981","citycode":"0712"},{"中文名":"安陆市","adcode":"420982","citycode":"0712"},{"中文名":"汉川市","adcode":"420984","citycode":"0712"},{"中文名":"荆州市","adcode":"421000","citycode":"0716"},{"中文名":"荆州市市辖区","adcode":"421001","citycode":"0716"},{"中文名":"沙市区","adcode":"421002","citycode":"0716"},{"中文名":"荆州区","adcode":"421003","citycode":"0716"},{"中文名":"公安县","adcode":"421022","citycode":"0716"},{"中文名":"监利县","adcode":"421023","citycode":"0716"},{"中文名":"江陵县","adcode":"421024","citycode":"0716"},{"中文名":"石首市","adcode":"421081","citycode":"0716"},{"中文名":"洪湖市","adcode":"421083","citycode":"0716"},{"中文名":"松滋市","adcode":"421087","citycode":"0716"},{"中文名":"黄冈市","adcode":"421100","citycode":"0713"},{"中文名":"黄冈市市辖区","adcode":"421101","citycode":"0713"},{"中文名":"黄州区","adcode":"421102","citycode":"0713"},{"中文名":"团风县","adcode":"421121","citycode":"0713"},{"中文名":"红安县","adcode":"421122","citycode":"0713"},{"中文名":"罗田县","adcode":"421123","citycode":"0713"},{"中文名":"英山县","adcode":"421124","citycode":"0713"},{"中文名":"浠水县","adcode":"421125","citycode":"0713"},{"中文名":"蕲春县","adcode":"421126","citycode":"0713"},{"中文名":"黄梅县","adcode":"421127","citycode":"0713"},{"中文名":"麻城市","adcode":"421181","citycode":"0713"},{"中文名":"武穴市","adcode":"421182","citycode":"0713"},{"中文名":"咸宁市","adcode":"421200","citycode":"0715"},{"中文名":"咸宁市市辖区","adcode":"421201","citycode":"0715"},{"中文名":"咸安区","adcode":"421202","citycode":"0715"},{"中文名":"嘉鱼县","adcode":"421221","citycode":"0715"},{"中文名":"通城县","adcode":"421222","citycode":"0715"},{"中文名":"崇阳县","adcode":"421223","citycode":"0715"},{"中文名":"通山县","adcode":"421224","citycode":"0715"},{"中文名":"赤壁市","adcode":"421281","citycode":"0715"},{"中文名":"随州市","adcode":"421300","citycode":"0722"},{"中文名":"随州市市辖区","adcode":"421301","citycode":"0722"},{"中文名":"曾都区","adcode":"421303","citycode":"0722"},{"中文名":"随县","adcode":"421321","citycode":"0722"},{"中文名":"广水市","adcode":"421381","citycode":"0722"},{"中文名":"恩施土家族苗族自治州","adcode":"422800","citycode":"0718"},{"中文名":"恩施市","adcode":"422801","citycode":"0718"},{"中文名":"利川市","adcode":"422802","citycode":"0718"},{"中文名":"建始县","adcode":"422822","citycode":"0718"},{"中文名":"巴东县","adcode":"422823","citycode":"0718"},{"中文名":"宣恩县","adcode":"422825","citycode":"0718"},{"中文名":"咸丰县","adcode":"422826","citycode":"0718"},{"中文名":"来凤县","adcode":"422827","citycode":"0718"},{"中文名":"鹤峰县","adcode":"422828","citycode":"0718"},{"中文名":"仙桃市","adcode":"429004","citycode":"0728"},{"中文名":"潜江市","adcode":"429005","citycode":"2728"},{"中文名":"天门市","adcode":"429006","citycode":"1728"},{"中文名":"神农架林区","adcode":"429021","citycode":"1719"},{"中文名":"湖南省","adcode":"430000","citycode":""},{"中文名":"长沙市","adcode":"430100","citycode":"0731"},{"中文名":"长沙市市辖区","adcode":"430101","citycode":"0731"},{"中文名":"芙蓉区","adcode":"430102","citycode":"0731"},{"中文名":"天心区","adcode":"430103","citycode":"0731"},{"中文名":"岳麓区","adcode":"430104","citycode":"0731"},{"中文名":"开福区","adcode":"430105","citycode":"0731"},{"中文名":"雨花区","adcode":"430111","citycode":"0731"},{"中文名":"望城区","adcode":"430112","citycode":"0731"},{"中文名":"长沙县","adcode":"430121","citycode":"0731"},{"中文名":"浏阳市","adcode":"430181","citycode":"0731"},{"中文名":"宁乡市","adcode":"430182","citycode":"0731"},{"中文名":"株洲市","adcode":"430200","citycode":"0733"},{"中文名":"株洲市市辖区","adcode":"430201","citycode":"0733"},{"中文名":"荷塘区","adcode":"430202","citycode":"0733"},{"中文名":"芦淞区","adcode":"430203","citycode":"0733"},{"中文名":"石峰区","adcode":"430204","citycode":"0733"},{"中文名":"天元区","adcode":"430211","citycode":"0733"},{"中文名":"渌口区","adcode":"430212","citycode":"0733"},{"中文名":"攸县","adcode":"430223","citycode":"0733"},{"中文名":"茶陵县","adcode":"430224","citycode":"0733"},{"中文名":"炎陵县","adcode":"430225","citycode":"0733"},{"中文名":"醴陵市","adcode":"430281","citycode":"0733"},{"中文名":"湘潭市","adcode":"430300","citycode":"0732"},{"中文名":"湘潭市市辖区","adcode":"430301","citycode":"0732"},{"中文名":"雨湖区","adcode":"430302","citycode":"0732"},{"中文名":"岳塘区","adcode":"430304","citycode":"0732"},{"中文名":"湘潭县","adcode":"430321","citycode":"0732"},{"中文名":"湘乡市","adcode":"430381","citycode":"0732"},{"中文名":"韶山市","adcode":"430382","citycode":"0732"},{"中文名":"衡阳市","adcode":"430400","citycode":"0734"},{"中文名":"衡阳市市辖区","adcode":"430401","citycode":"0734"},{"中文名":"珠晖区","adcode":"430405","citycode":"0734"},{"中文名":"雁峰区","adcode":"430406","citycode":"0734"},{"中文名":"石鼓区","adcode":"430407","citycode":"0734"},{"中文名":"蒸湘区","adcode":"430408","citycode":"0734"},{"中文名":"南岳区","adcode":"430412","citycode":"0734"},{"中文名":"衡阳县","adcode":"430421","citycode":"0734"},{"中文名":"衡南县","adcode":"430422","citycode":"0734"},{"中文名":"衡山县","adcode":"430423","citycode":"0734"},{"中文名":"衡东县","adcode":"430424","citycode":"0734"},{"中文名":"祁东县","adcode":"430426","citycode":"0734"},{"中文名":"耒阳市","adcode":"430481","citycode":"0734"},{"中文名":"常宁市","adcode":"430482","citycode":"0734"},{"中文名":"邵阳市","adcode":"430500","citycode":"0739"},{"中文名":"邵阳市市辖区","adcode":"430501","citycode":"0739"},{"中文名":"双清区","adcode":"430502","citycode":"0739"},{"中文名":"大祥区","adcode":"430503","citycode":"0739"},{"中文名":"北塔区","adcode":"430511","citycode":"0739"},{"中文名":"邵东市","adcode":"430582","citycode":"0739"},{"中文名":"新邵县","adcode":"430522","citycode":"0739"},{"中文名":"邵阳县","adcode":"430523","citycode":"0739"},{"中文名":"隆回县","adcode":"430524","citycode":"0739"},{"中文名":"洞口县","adcode":"430525","citycode":"0739"},{"中文名":"绥宁县","adcode":"430527","citycode":"0739"},{"中文名":"新宁县","adcode":"430528","citycode":"0739"},{"中文名":"城步苗族自治县","adcode":"430529","citycode":"0739"},{"中文名":"武冈市","adcode":"430581","citycode":"0739"},{"中文名":"岳阳市","adcode":"430600","citycode":"0730"},{"中文名":"岳阳市市辖区","adcode":"430601","citycode":"0730"},{"中文名":"岳阳楼区","adcode":"430602","citycode":"0730"},{"中文名":"云溪区","adcode":"430603","citycode":"0730"},{"中文名":"君山区","adcode":"430611","citycode":"0730"},{"中文名":"岳阳县","adcode":"430621","citycode":"0730"},{"中文名":"华容县","adcode":"430623","citycode":"0730"},{"中文名":"湘阴县","adcode":"430624","citycode":"0730"},{"中文名":"平江县","adcode":"430626","citycode":"0730"},{"中文名":"汨罗市","adcode":"430681","citycode":"0730"},{"中文名":"临湘市","adcode":"430682","citycode":"0730"},{"中文名":"常德市","adcode":"430700","citycode":"0736"},{"中文名":"常德市市辖区","adcode":"430701","citycode":"0736"},{"中文名":"武陵区","adcode":"430702","citycode":"0736"},{"中文名":"鼎城区","adcode":"430703","citycode":"0736"},{"中文名":"安乡县","adcode":"430721","citycode":"0736"},{"中文名":"汉寿县","adcode":"430722","citycode":"0736"},{"中文名":"澧县","adcode":"430723","citycode":"0736"},{"中文名":"临澧县","adcode":"430724","citycode":"0736"},{"中文名":"桃源县","adcode":"430725","citycode":"0736"},{"中文名":"石门县","adcode":"430726","citycode":"0736"},{"中文名":"津市市","adcode":"430781","citycode":"0736"},{"中文名":"张家界市","adcode":"430800","citycode":"0744"},{"中文名":"张家界市市辖区","adcode":"430801","citycode":"0744"},{"中文名":"永定区","adcode":"430802","citycode":"0744"},{"中文名":"武陵源区","adcode":"430811","citycode":"0744"},{"中文名":"慈利县","adcode":"430821","citycode":"0744"},{"中文名":"桑植县","adcode":"430822","citycode":"0744"},{"中文名":"益阳市","adcode":"430900","citycode":"0737"},{"中文名":"益阳市市辖区","adcode":"430901","citycode":"0737"},{"中文名":"资阳区","adcode":"430902","citycode":"0737"},{"中文名":"赫山区","adcode":"430903","citycode":"0737"},{"中文名":"南县","adcode":"430921","citycode":"0737"},{"中文名":"桃江县","adcode":"430922","citycode":"0737"},{"中文名":"安化县","adcode":"430923","citycode":"0737"},{"中文名":"沅江市","adcode":"430981","citycode":"0737"},{"中文名":"郴州市","adcode":"431000","citycode":"0735"},{"中文名":"郴州市市辖区","adcode":"431001","citycode":"0735"},{"中文名":"北湖区","adcode":"431002","citycode":"0735"},{"中文名":"苏仙区","adcode":"431003","citycode":"0735"},{"中文名":"桂阳县","adcode":"431021","citycode":"0735"},{"中文名":"宜章县","adcode":"431022","citycode":"0735"},{"中文名":"永兴县","adcode":"431023","citycode":"0735"},{"中文名":"嘉禾县","adcode":"431024","citycode":"0735"},{"中文名":"临武县","adcode":"431025","citycode":"0735"},{"中文名":"汝城县","adcode":"431026","citycode":"0735"},{"中文名":"桂东县","adcode":"431027","citycode":"0735"},{"中文名":"安仁县","adcode":"431028","citycode":"0735"},{"中文名":"资兴市","adcode":"431081","citycode":"0735"},{"中文名":"永州市","adcode":"431100","citycode":"0746"},{"中文名":"永州市市辖区","adcode":"431101","citycode":"0746"},{"中文名":"零陵区","adcode":"431102","citycode":"0746"},{"中文名":"冷水滩区","adcode":"431103","citycode":"0746"},{"中文名":"祁阳县","adcode":"431121","citycode":"0746"},{"中文名":"东安县","adcode":"431122","citycode":"0746"},{"中文名":"双牌县","adcode":"431123","citycode":"0746"},{"中文名":"道县","adcode":"431124","citycode":"0746"},{"中文名":"江永县","adcode":"431125","citycode":"0746"},{"中文名":"宁远县","adcode":"431126","citycode":"0746"},{"中文名":"蓝山县","adcode":"431127","citycode":"0746"},{"中文名":"新田县","adcode":"431128","citycode":"0746"},{"中文名":"江华瑶族自治县","adcode":"431129","citycode":"0746"},{"中文名":"怀化市","adcode":"431200","citycode":"0745"},{"中文名":"怀化市市辖区","adcode":"431201","citycode":"0745"},{"中文名":"鹤城区","adcode":"431202","citycode":"0745"},{"中文名":"中方县","adcode":"431221","citycode":"0745"},{"中文名":"沅陵县","adcode":"431222","citycode":"0745"},{"中文名":"辰溪县","adcode":"431223","citycode":"0745"},{"中文名":"溆浦县","adcode":"431224","citycode":"0745"},{"中文名":"会同县","adcode":"431225","citycode":"0745"},{"中文名":"麻阳苗族自治县","adcode":"431226","citycode":"0745"},{"中文名":"新晃侗族自治县","adcode":"431227","citycode":"0745"},{"中文名":"芷江侗族自治县","adcode":"431228","citycode":"0745"},{"中文名":"靖州苗族侗族自治县","adcode":"431229","citycode":"0745"},{"中文名":"通道侗族自治县","adcode":"431230","citycode":"0745"},{"中文名":"洪江市","adcode":"431281","citycode":"0745"},{"中文名":"娄底市","adcode":"431300","citycode":"0738"},{"中文名":"娄底市市辖区","adcode":"431301","citycode":"0738"},{"中文名":"娄星区","adcode":"431302","citycode":"0738"},{"中文名":"双峰县","adcode":"431321","citycode":"0738"},{"中文名":"新化县","adcode":"431322","citycode":"0738"},{"中文名":"冷水江市","adcode":"431381","citycode":"0738"},{"中文名":"涟源市","adcode":"431382","citycode":"0738"},{"中文名":"湘西土家族苗族自治州","adcode":"433100","citycode":"0743"},{"中文名":"吉首市","adcode":"433101","citycode":"0743"},{"中文名":"泸溪县","adcode":"433122","citycode":"0743"},{"中文名":"凤凰县","adcode":"433123","citycode":"0743"},{"中文名":"花垣县","adcode":"433124","citycode":"0743"},{"中文名":"保靖县","adcode":"433125","citycode":"0743"},{"中文名":"古丈县","adcode":"433126","citycode":"0743"},{"中文名":"永顺县","adcode":"433127","citycode":"0743"},{"中文名":"龙山县","adcode":"433130","citycode":"0743"},{"中文名":"广东省","adcode":"440000","citycode":""},{"中文名":"广州市","adcode":"440100","citycode":"020"},{"中文名":"广州市市辖区","adcode":"440101","citycode":"020"},{"中文名":"荔湾区","adcode":"440103","citycode":"020"},{"中文名":"越秀区","adcode":"440104","citycode":"020"},{"中文名":"海珠区","adcode":"440105","citycode":"020"},{"中文名":"天河区","adcode":"440106","citycode":"020"},{"中文名":"白云区","adcode":"440111","citycode":"020"},{"中文名":"黄埔区","adcode":"440112","citycode":"020"},{"中文名":"番禺区","adcode":"440113","citycode":"020"},{"中文名":"花都区","adcode":"440114","citycode":"020"},{"中文名":"南沙区","adcode":"440115","citycode":"020"},{"中文名":"从化区","adcode":"440117","citycode":"020"},{"中文名":"增城区","adcode":"440118","citycode":"020"},{"中文名":"韶关市","adcode":"440200","citycode":"0751"},{"中文名":"韶关市市辖区","adcode":"440201","citycode":"0751"},{"中文名":"武江区","adcode":"440203","citycode":"0751"},{"中文名":"浈江区","adcode":"440204","citycode":"0751"},{"中文名":"曲江区","adcode":"440205","citycode":"0751"},{"中文名":"始兴县","adcode":"440222","citycode":"0751"},{"中文名":"仁化县","adcode":"440224","citycode":"0751"},{"中文名":"翁源县","adcode":"440229","citycode":"0751"},{"中文名":"乳源瑶族自治县","adcode":"440232","citycode":"0751"},{"中文名":"新丰县","adcode":"440233","citycode":"0751"},{"中文名":"乐昌市","adcode":"440281","citycode":"0751"},{"中文名":"南雄市","adcode":"440282","citycode":"0751"},{"中文名":"深圳市","adcode":"440300","citycode":"0755"},{"中文名":"深圳市市辖区","adcode":"440301","citycode":"0755"},{"中文名":"罗湖区","adcode":"440303","citycode":"0755"},{"中文名":"福田区","adcode":"440304","citycode":"0755"},{"中文名":"南山区","adcode":"440305","citycode":"0755"},{"中文名":"宝安区","adcode":"440306","citycode":"0755"},{"中文名":"龙岗区","adcode":"440307","citycode":"0755"},{"中文名":"盐田区","adcode":"440308","citycode":"0755"},{"中文名":"龙华区","adcode":"440309","citycode":"0755"},{"中文名":"坪山区","adcode":"440310","citycode":"0755"},{"中文名":"光明区","adcode":"440311","citycode":"0755"},{"中文名":"珠海市","adcode":"440400","citycode":"0756"},{"中文名":"珠海市市辖区","adcode":"440401","citycode":"0756"},{"中文名":"香洲区","adcode":"440402","citycode":"0756"},{"中文名":"斗门区","adcode":"440403","citycode":"0756"},{"中文名":"金湾区","adcode":"440404","citycode":"0756"},{"中文名":"汕头市","adcode":"440500","citycode":"0754"},{"中文名":"汕头市市辖区","adcode":"440501","citycode":"0754"},{"中文名":"龙湖区","adcode":"440507","citycode":"0754"},{"中文名":"金平区","adcode":"440511","citycode":"0754"},{"中文名":"濠江区","adcode":"440512","citycode":"0754"},{"中文名":"潮阳区","adcode":"440513","citycode":"0754"},{"中文名":"潮南区","adcode":"440514","citycode":"0754"},{"中文名":"澄海区","adcode":"440515","citycode":"0754"},{"中文名":"南澳县","adcode":"440523","citycode":"0754"},{"中文名":"佛山市","adcode":"440600","citycode":"0757"},{"中文名":"佛山市市辖区","adcode":"440601","citycode":"0757"},{"中文名":"禅城区","adcode":"440604","citycode":"0757"},{"中文名":"南海区","adcode":"440605","citycode":"0757"},{"中文名":"顺德区","adcode":"440606","citycode":"0757"},{"中文名":"三水区","adcode":"440607","citycode":"0757"},{"中文名":"高明区","adcode":"440608","citycode":"0757"},{"中文名":"江门市","adcode":"440700","citycode":"0750"},{"中文名":"江门市市辖区","adcode":"440701","citycode":"0750"},{"中文名":"蓬江区","adcode":"440703","citycode":"0750"},{"中文名":"江海区","adcode":"440704","citycode":"0750"},{"中文名":"新会区","adcode":"440705","citycode":"0750"},{"中文名":"台山市","adcode":"440781","citycode":"0750"},{"中文名":"开平市","adcode":"440783","citycode":"0750"},{"中文名":"鹤山市","adcode":"440784","citycode":"0750"},{"中文名":"恩平市","adcode":"440785","citycode":"0750"},{"中文名":"湛江市","adcode":"440800","citycode":"0759"},{"中文名":"湛江市市辖区","adcode":"440801","citycode":"0759"},{"中文名":"赤坎区","adcode":"440802","citycode":"0759"},{"中文名":"霞山区","adcode":"440803","citycode":"0759"},{"中文名":"坡头区","adcode":"440804","citycode":"0759"},{"中文名":"麻章区","adcode":"440811","citycode":"0759"},{"中文名":"遂溪县","adcode":"440823","citycode":"0759"},{"中文名":"徐闻县","adcode":"440825","citycode":"0759"},{"中文名":"廉江市","adcode":"440881","citycode":"0759"},{"中文名":"雷州市","adcode":"440882","citycode":"0759"},{"中文名":"吴川市","adcode":"440883","citycode":"0759"},{"中文名":"茂名市","adcode":"440900","citycode":"0668"},{"中文名":"茂名市市辖区","adcode":"440901","citycode":"0668"},{"中文名":"茂南区","adcode":"440902","citycode":"0668"},{"中文名":"电白区","adcode":"440904","citycode":"0668"},{"中文名":"高州市","adcode":"440981","citycode":"0668"},{"中文名":"化州市","adcode":"440982","citycode":"0668"},{"中文名":"信宜市","adcode":"440983","citycode":"0668"},{"中文名":"肇庆市","adcode":"441200","citycode":"0758"},{"中文名":"肇庆市市辖区","adcode":"441201","citycode":"0758"},{"中文名":"端州区","adcode":"441202","citycode":"0758"},{"中文名":"鼎湖区","adcode":"441203","citycode":"0758"},{"中文名":"高要区","adcode":"441204","citycode":"0758"},{"中文名":"广宁县","adcode":"441223","citycode":"0758"},{"中文名":"怀集县","adcode":"441224","citycode":"0758"},{"中文名":"封开县","adcode":"441225","citycode":"0758"},{"中文名":"德庆县","adcode":"441226","citycode":"0758"},{"中文名":"四会市","adcode":"441284","citycode":"0758"},{"中文名":"惠州市","adcode":"441300","citycode":"0752"},{"中文名":"惠州市市辖区","adcode":"441301","citycode":"0752"},{"中文名":"惠城区","adcode":"441302","citycode":"0752"},{"中文名":"惠阳区","adcode":"441303","citycode":"0752"},{"中文名":"博罗县","adcode":"441322","citycode":"0752"},{"中文名":"惠东县","adcode":"441323","citycode":"0752"},{"中文名":"龙门县","adcode":"441324","citycode":"0752"},{"中文名":"梅州市","adcode":"441400","citycode":"0753"},{"中文名":"梅州市市辖区","adcode":"441401","citycode":"0753"},{"中文名":"梅江区","adcode":"441402","citycode":"0753"},{"中文名":"梅县区","adcode":"441403","citycode":"0753"},{"中文名":"大埔县","adcode":"441422","citycode":"0753"},{"中文名":"丰顺县","adcode":"441423","citycode":"0753"},{"中文名":"五华县","adcode":"441424","citycode":"0753"},{"中文名":"平远县","adcode":"441426","citycode":"0753"},{"中文名":"蕉岭县","adcode":"441427","citycode":"0753"},{"中文名":"兴宁市","adcode":"441481","citycode":"0753"},{"中文名":"汕尾市","adcode":"441500","citycode":"0660"},{"中文名":"汕尾市市辖区","adcode":"441501","citycode":"0660"},{"中文名":"城区","adcode":"441502","citycode":"0660"},{"中文名":"海丰县","adcode":"441521","citycode":"0660"},{"中文名":"陆河县","adcode":"441523","citycode":"0660"},{"中文名":"陆丰市","adcode":"441581","citycode":"0660"},{"中文名":"河源市","adcode":"441600","citycode":"0762"},{"中文名":"河源市市辖区","adcode":"441601","citycode":"0762"},{"中文名":"源城区","adcode":"441602","citycode":"0762"},{"中文名":"紫金县","adcode":"441621","citycode":"0762"},{"中文名":"龙川县","adcode":"441622","citycode":"0762"},{"中文名":"连平县","adcode":"441623","citycode":"0762"},{"中文名":"和平县","adcode":"441624","citycode":"0762"},{"中文名":"东源县","adcode":"441625","citycode":"0762"},{"中文名":"阳江市","adcode":"441700","citycode":"0662"},{"中文名":"阳江市市辖区","adcode":"441701","citycode":"0662"},{"中文名":"江城区","adcode":"441702","citycode":"0662"},{"中文名":"阳东区","adcode":"441704","citycode":"0662"},{"中文名":"阳西县","adcode":"441721","citycode":"0662"},{"中文名":"阳春市","adcode":"441781","citycode":"0662"},{"中文名":"清远市","adcode":"441800","citycode":"0763"},{"中文名":"清远市市辖区","adcode":"441801","citycode":"0763"},{"中文名":"清城区","adcode":"441802","citycode":"0763"},{"中文名":"清新区","adcode":"441803","citycode":"0763"},{"中文名":"佛冈县","adcode":"441821","citycode":"0763"},{"中文名":"阳山县","adcode":"441823","citycode":"0763"},{"中文名":"连山壮族瑶族自治县","adcode":"441825","citycode":"0763"},{"中文名":"连南瑶族自治县","adcode":"441826","citycode":"0763"},{"中文名":"英德市","adcode":"441881","citycode":"0763"},{"中文名":"连州市","adcode":"441882","citycode":"0763"},{"中文名":"东莞市","adcode":"441900","citycode":"0769"},{"中文名":"中山市","adcode":"442000","citycode":"0760"},{"中文名":"东沙群岛","adcode":"442101","citycode":""},{"中文名":"潮州市","adcode":"445100","citycode":"0768"},{"中文名":"潮州市市辖区","adcode":"445101","citycode":"0768"},{"中文名":"湘桥区","adcode":"445102","citycode":"0768"},{"中文名":"潮安区","adcode":"445103","citycode":"0768"},{"中文名":"饶平县","adcode":"445122","citycode":"0768"},{"中文名":"揭阳市","adcode":"445200","citycode":"0663"},{"中文名":"揭阳市市辖区","adcode":"445201","citycode":"0663"},{"中文名":"榕城区","adcode":"445202","citycode":"0663"},{"中文名":"揭东区","adcode":"445203","citycode":"0663"},{"中文名":"揭西县","adcode":"445222","citycode":"0663"},{"中文名":"惠来县","adcode":"445224","citycode":"0663"},{"中文名":"普宁市","adcode":"445281","citycode":"0663"},{"中文名":"云浮市","adcode":"445300","citycode":"0766"},{"中文名":"云浮市市辖区","adcode":"445301","citycode":"0766"},{"中文名":"云城区","adcode":"445302","citycode":"0766"},{"中文名":"云安区","adcode":"445303","citycode":"0766"},{"中文名":"新兴县","adcode":"445321","citycode":"0766"},{"中文名":"郁南县","adcode":"445322","citycode":"0766"},{"中文名":"罗定市","adcode":"445381","citycode":"0766"},{"中文名":"广西壮族自治区","adcode":"450000","citycode":""},{"中文名":"南宁市","adcode":"450100","citycode":"0771"},{"中文名":"南宁市市辖区","adcode":"450101","citycode":"0771"},{"中文名":"兴宁区","adcode":"450102","citycode":"0771"},{"中文名":"青秀区","adcode":"450103","citycode":"0771"},{"中文名":"江南区","adcode":"450105","citycode":"0771"},{"中文名":"西乡塘区","adcode":"450107","citycode":"0771"},{"中文名":"良庆区","adcode":"450108","citycode":"0771"},{"中文名":"邕宁区","adcode":"450109","citycode":"0771"},{"中文名":"武鸣区","adcode":"450110","citycode":"0771"},{"中文名":"隆安县","adcode":"450123","citycode":"0771"},{"中文名":"马山县","adcode":"450124","citycode":"0771"},{"中文名":"上林县","adcode":"450125","citycode":"0771"},{"中文名":"宾阳县","adcode":"450126","citycode":"0771"},{"中文名":"横县","adcode":"450127","citycode":"0771"},{"中文名":"柳州市","adcode":"450200","citycode":"0772"},{"中文名":"柳州市市辖区","adcode":"450201","citycode":"0772"},{"中文名":"城中区","adcode":"450202","citycode":"0772"},{"中文名":"鱼峰区","adcode":"450203","citycode":"0772"},{"中文名":"柳南区","adcode":"450204","citycode":"0772"},{"中文名":"柳北区","adcode":"450205","citycode":"0772"},{"中文名":"柳江区","adcode":"450206","citycode":"0772"},{"中文名":"柳城县","adcode":"450222","citycode":"0772"},{"中文名":"鹿寨县","adcode":"450223","citycode":"0772"},{"中文名":"融安县","adcode":"450224","citycode":"0772"},{"中文名":"融水苗族自治县","adcode":"450225","citycode":"0772"},{"中文名":"三江侗族自治县","adcode":"450226","citycode":"0772"},{"中文名":"桂林市","adcode":"450300","citycode":"0773"},{"中文名":"桂林市市辖区","adcode":"450301","citycode":"0773"},{"中文名":"秀峰区","adcode":"450302","citycode":"0773"},{"中文名":"叠彩区","adcode":"450303","citycode":"0773"},{"中文名":"象山区","adcode":"450304","citycode":"0773"},{"中文名":"七星区","adcode":"450305","citycode":"0773"},{"中文名":"雁山区","adcode":"450311","citycode":"0773"},{"中文名":"临桂区","adcode":"450312","citycode":"0773"},{"中文名":"阳朔县","adcode":"450321","citycode":"0773"},{"中文名":"灵川县","adcode":"450323","citycode":"0773"},{"中文名":"全州县","adcode":"450324","citycode":"0773"},{"中文名":"兴安县","adcode":"450325","citycode":"0773"},{"中文名":"永福县","adcode":"450326","citycode":"0773"},{"中文名":"灌阳县","adcode":"450327","citycode":"0773"},{"中文名":"龙胜各族自治县","adcode":"450328","citycode":"0773"},{"中文名":"资源县","adcode":"450329","citycode":"0773"},{"中文名":"平乐县","adcode":"450330","citycode":"0773"},{"中文名":"荔浦市","adcode":"450381","citycode":"0773"},{"中文名":"恭城瑶族自治县","adcode":"450332","citycode":"0773"},{"中文名":"梧州市","adcode":"450400","citycode":"0774"},{"中文名":"梧州市市辖区","adcode":"450401","citycode":"0774"},{"中文名":"万秀区","adcode":"450403","citycode":"0774"},{"中文名":"长洲区","adcode":"450405","citycode":"0774"},{"中文名":"龙圩区","adcode":"450406","citycode":"0774"},{"中文名":"苍梧县","adcode":"450421","citycode":"0774"},{"中文名":"藤县","adcode":"450422","citycode":"0774"},{"中文名":"蒙山县","adcode":"450423","citycode":"0774"},{"中文名":"岑溪市","adcode":"450481","citycode":"0774"},{"中文名":"北海市","adcode":"450500","citycode":"0779"},{"中文名":"北海市市辖区","adcode":"450501","citycode":"0779"},{"中文名":"海城区","adcode":"450502","citycode":"0779"},{"中文名":"银海区","adcode":"450503","citycode":"0779"},{"中文名":"铁山港区","adcode":"450512","citycode":"0779"},{"中文名":"合浦县","adcode":"450521","citycode":"0779"},{"中文名":"防城港市","adcode":"450600","citycode":"0770"},{"中文名":"防城港市市辖区","adcode":"450601","citycode":"0770"},{"中文名":"港口区","adcode":"450602","citycode":"0770"},{"中文名":"防城区","adcode":"450603","citycode":"0770"},{"中文名":"上思县","adcode":"450621","citycode":"0770"},{"中文名":"东兴市","adcode":"450681","citycode":"0770"},{"中文名":"钦州市","adcode":"450700","citycode":"0777"},{"中文名":"钦州市市辖区","adcode":"450701","citycode":"0777"},{"中文名":"钦南区","adcode":"450702","citycode":"0777"},{"中文名":"钦北区","adcode":"450703","citycode":"0777"},{"中文名":"灵山县","adcode":"450721","citycode":"0777"},{"中文名":"浦北县","adcode":"450722","citycode":"0777"},{"中文名":"贵港市","adcode":"450800","citycode":"1755"},{"中文名":"贵港市市辖区","adcode":"450801","citycode":"1755"},{"中文名":"港北区","adcode":"450802","citycode":"1755"},{"中文名":"港南区","adcode":"450803","citycode":"1755"},{"中文名":"覃塘区","adcode":"450804","citycode":"1755"},{"中文名":"平南县","adcode":"450821","citycode":"1755"},{"中文名":"桂平市","adcode":"450881","citycode":"1755"},{"中文名":"玉林市","adcode":"450900","citycode":"0775"},{"中文名":"玉林市市辖区","adcode":"450901","citycode":"0775"},{"中文名":"玉州区","adcode":"450902","citycode":"0775"},{"中文名":"福绵区","adcode":"450903","citycode":"0775"},{"中文名":"容县","adcode":"450921","citycode":"0775"},{"中文名":"陆川县","adcode":"450922","citycode":"0775"},{"中文名":"博白县","adcode":"450923","citycode":"0775"},{"中文名":"兴业县","adcode":"450924","citycode":"0775"},{"中文名":"北流市","adcode":"450981","citycode":"0775"},{"中文名":"百色市","adcode":"451000","citycode":"0776"},{"中文名":"百色市市辖区","adcode":"451001","citycode":"0776"},{"中文名":"右江区","adcode":"451002","citycode":"0776"},{"中文名":"田阳区","adcode":"451003","citycode":"0776"},{"中文名":"田东县","adcode":"451022","citycode":"0776"},{"中文名":"平果市","adcode":"451082","citycode":"0776"},{"中文名":"德保县","adcode":"451024","citycode":"0776"},{"中文名":"那坡县","adcode":"451026","citycode":"0776"},{"中文名":"凌云县","adcode":"451027","citycode":"0776"},{"中文名":"乐业县","adcode":"451028","citycode":"0776"},{"中文名":"田林县","adcode":"451029","citycode":"0776"},{"中文名":"西林县","adcode":"451030","citycode":"0776"},{"中文名":"隆林各族自治县","adcode":"451031","citycode":"0776"},{"中文名":"靖西市","adcode":"451081","citycode":"0776"},{"中文名":"贺州市","adcode":"451100","citycode":"1774"},{"中文名":"贺州市市辖区","adcode":"451101","citycode":"1774"},{"中文名":"八步区","adcode":"451102","citycode":"1774"},{"中文名":"平桂区","adcode":"451103","citycode":"1774"},{"中文名":"昭平县","adcode":"451121","citycode":"1774"},{"中文名":"钟山县","adcode":"451122","citycode":"1774"},{"中文名":"富川瑶族自治县","adcode":"451123","citycode":"1774"},{"中文名":"河池市","adcode":"451200","citycode":"0778"},{"中文名":"河池市市辖区","adcode":"451201","citycode":"0778"},{"中文名":"金城江区","adcode":"451202","citycode":"0778"},{"中文名":"宜州区","adcode":"451203","citycode":"0778"},{"中文名":"南丹县","adcode":"451221","citycode":"0778"},{"中文名":"天峨县","adcode":"451222","citycode":"0778"},{"中文名":"凤山县","adcode":"451223","citycode":"0778"},{"中文名":"东兰县","adcode":"451224","citycode":"0778"},{"中文名":"罗城仫佬族自治县","adcode":"451225","citycode":"0778"},{"中文名":"环江毛南族自治县","adcode":"451226","citycode":"0778"},{"中文名":"巴马瑶族自治县","adcode":"451227","citycode":"0778"},{"中文名":"都安瑶族自治县","adcode":"451228","citycode":"0778"},{"中文名":"大化瑶族自治县","adcode":"451229","citycode":"0778"},{"中文名":"来宾市","adcode":"451300","citycode":"1772"},{"中文名":"来宾市市辖区","adcode":"451301","citycode":"1772"},{"中文名":"兴宾区","adcode":"451302","citycode":"1772"},{"中文名":"忻城县","adcode":"451321","citycode":"1772"},{"中文名":"象州县","adcode":"451322","citycode":"1772"},{"中文名":"武宣县","adcode":"451323","citycode":"1772"},{"中文名":"金秀瑶族自治县","adcode":"451324","citycode":"1772"},{"中文名":"合山市","adcode":"451381","citycode":"1772"},{"中文名":"崇左市","adcode":"451400","citycode":"1771"},{"中文名":"崇左市市辖区","adcode":"451401","citycode":"1771"},{"中文名":"江州区","adcode":"451402","citycode":"1771"},{"中文名":"扶绥县","adcode":"451421","citycode":"1771"},{"中文名":"宁明县","adcode":"451422","citycode":"1771"},{"中文名":"龙州县","adcode":"451423","citycode":"1771"},{"中文名":"大新县","adcode":"451424","citycode":"1771"},{"中文名":"天等县","adcode":"451425","citycode":"1771"},{"中文名":"凭祥市","adcode":"451481","citycode":"1771"},{"中文名":"海南省","adcode":"460000","citycode":""},{"中文名":"海口市","adcode":"460100","citycode":"0898"},{"中文名":"海口市市辖区","adcode":"460101","citycode":"0898"},{"中文名":"秀英区","adcode":"460105","citycode":"0898"},{"中文名":"龙华区","adcode":"460106","citycode":"0898"},{"中文名":"琼山区","adcode":"460107","citycode":"0898"},{"中文名":"美兰区","adcode":"460108","citycode":"0898"},{"中文名":"三亚市","adcode":"460200","citycode":"0899"},{"中文名":"三亚市市辖区","adcode":"460201","citycode":"0899"},{"中文名":"海棠区","adcode":"460202","citycode":"0899"},{"中文名":"吉阳区","adcode":"460203","citycode":"0899"},{"中文名":"天涯区","adcode":"460204","citycode":"0899"},{"中文名":"崖州区","adcode":"460205","citycode":"0899"},{"中文名":"三沙市","adcode":"460300","citycode":"2898"},{"中文名":"三沙市市辖区","adcode":"460301","citycode":"2898"},{"中文名":"西沙群岛","adcode":"460321","citycode":"1895"},{"中文名":"南沙群岛","adcode":"460322","citycode":"1891"},{"中文名":"中沙群岛的岛礁及其海域","adcode":"460323","citycode":"2801"},{"中文名":"儋州市","adcode":"460400","citycode":"0805"},{"中文名":"五指山市","adcode":"469001","citycode":"1897"},{"中文名":"琼海市","adcode":"469002","citycode":"1894"},{"中文名":"文昌市","adcode":"469005","citycode":"1893"},{"中文名":"万宁市","adcode":"469006","citycode":"1898"},{"中文名":"东方市","adcode":"469007","citycode":"0807"},{"中文名":"定安县","adcode":"469021","citycode":"0806"},{"中文名":"屯昌县","adcode":"469022","citycode":"1892"},{"中文名":"澄迈县","adcode":"469023","citycode":"0804"},{"中文名":"临高县","adcode":"469024","citycode":"1896"},{"中文名":"白沙黎族自治县","adcode":"469025","citycode":"0802"},{"中文名":"昌江黎族自治县","adcode":"469026","citycode":"0803"},{"中文名":"乐东黎族自治县","adcode":"469027","citycode":"2802"},{"中文名":"陵水黎族自治县","adcode":"469028","citycode":"0809"},{"中文名":"保亭黎族苗族自治县","adcode":"469029","citycode":"0801"},{"中文名":"琼中黎族苗族自治县","adcode":"469030","citycode":"1899"},{"中文名":"重庆市","adcode":"500000","citycode":"023"},{"中文名":"重庆市市辖区","adcode":"500100","citycode":"023"},{"中文名":"万州区","adcode":"500101","citycode":"023"},{"中文名":"涪陵区","adcode":"500102","citycode":"023"},{"中文名":"渝中区","adcode":"500103","citycode":"023"},{"中文名":"大渡口区","adcode":"500104","citycode":"023"},{"中文名":"江北区","adcode":"500105","citycode":"023"},{"中文名":"沙坪坝区","adcode":"500106","citycode":"023"},{"中文名":"九龙坡区","adcode":"500107","citycode":"023"},{"中文名":"南岸区","adcode":"500108","citycode":"023"},{"中文名":"北碚区","adcode":"500109","citycode":"023"},{"中文名":"綦江区","adcode":"500110","citycode":"023"},{"中文名":"大足区","adcode":"500111","citycode":"023"},{"中文名":"渝北区","adcode":"500112","citycode":"023"},{"中文名":"巴南区","adcode":"500113","citycode":"023"},{"中文名":"黔江区","adcode":"500114","citycode":"023"},{"中文名":"长寿区","adcode":"500115","citycode":"023"},{"中文名":"江津区","adcode":"500116","citycode":"023"},{"中文名":"合川区","adcode":"500117","citycode":"023"},{"中文名":"永川区","adcode":"500118","citycode":"023"},{"中文名":"南川区","adcode":"500119","citycode":"023"},{"中文名":"璧山区","adcode":"500120","citycode":"023"},{"中文名":"铜梁区","adcode":"500151","citycode":"023"},{"中文名":"潼南区","adcode":"500152","citycode":"023"},{"中文名":"荣昌区","adcode":"500153","citycode":"023"},{"中文名":"开州区","adcode":"500154","citycode":"023"},{"中文名":"梁平区","adcode":"500155","citycode":"023"},{"中文名":"武隆区","adcode":"500156","citycode":"023"},{"中文名":"重庆市郊县","adcode":"500200","citycode":"023"},{"中文名":"城口县","adcode":"500229","citycode":"023"},{"中文名":"丰都县","adcode":"500230","citycode":"023"},{"中文名":"垫江县","adcode":"500231","citycode":"023"},{"中文名":"忠县","adcode":"500233","citycode":"023"},{"中文名":"云阳县","adcode":"500235","citycode":"023"},{"中文名":"奉节县","adcode":"500236","citycode":"023"},{"中文名":"巫山县","adcode":"500237","citycode":"023"},{"中文名":"巫溪县","adcode":"500238","citycode":"023"},{"中文名":"石柱土家族自治县","adcode":"500240","citycode":"023"},{"中文名":"秀山土家族苗族自治县","adcode":"500241","citycode":"023"},{"中文名":"酉阳土家族苗族自治县","adcode":"500242","citycode":"023"},{"中文名":"彭水苗族土家族自治县","adcode":"500243","citycode":"023"},{"中文名":"四川省","adcode":"510000","citycode":""},{"中文名":"成都市","adcode":"510100","citycode":"028"},{"中文名":"成都市市辖区","adcode":"510101","citycode":"028"},{"中文名":"锦江区","adcode":"510104","citycode":"028"},{"中文名":"青羊区","adcode":"510105","citycode":"028"},{"中文名":"金牛区","adcode":"510106","citycode":"028"},{"中文名":"武侯区","adcode":"510107","citycode":"028"},{"中文名":"成华区","adcode":"510108","citycode":"028"},{"中文名":"龙泉驿区","adcode":"510112","citycode":"028"},{"中文名":"青白江区","adcode":"510113","citycode":"028"},{"中文名":"新都区","adcode":"510114","citycode":"028"},{"中文名":"温江区","adcode":"510115","citycode":"028"},{"中文名":"双流区","adcode":"510116","citycode":"028"},{"中文名":"郫都区","adcode":"510117","citycode":"028"},{"中文名":"金堂县","adcode":"510121","citycode":"028"},{"中文名":"大邑县","adcode":"510129","citycode":"028"},{"中文名":"蒲江县","adcode":"510131","citycode":"028"},{"中文名":"新津县","adcode":"510132","citycode":"028"},{"中文名":"都江堰市","adcode":"510181","citycode":"028"},{"中文名":"彭州市","adcode":"510182","citycode":"028"},{"中文名":"邛崃市","adcode":"510183","citycode":"028"},{"中文名":"崇州市","adcode":"510184","citycode":"028"},{"中文名":"简阳市","adcode":"510185","citycode":"028"},{"中文名":"自贡市","adcode":"510300","citycode":"0813"},{"中文名":"自贡市市辖区","adcode":"510301","citycode":"0813"},{"中文名":"自流井区","adcode":"510302","citycode":"0813"},{"中文名":"贡井区","adcode":"510303","citycode":"0813"},{"中文名":"大安区","adcode":"510304","citycode":"0813"},{"中文名":"沿滩区","adcode":"510311","citycode":"0813"},{"中文名":"荣县","adcode":"510321","citycode":"0813"},{"中文名":"富顺县","adcode":"510322","citycode":"0813"},{"中文名":"攀枝花市","adcode":"510400","citycode":"0812"},{"中文名":"攀枝花市市辖区","adcode":"510401","citycode":"0812"},{"中文名":"东区","adcode":"510402","citycode":"0812"},{"中文名":"西区","adcode":"510403","citycode":"0812"},{"中文名":"仁和区","adcode":"510411","citycode":"0812"},{"中文名":"米易县","adcode":"510421","citycode":"0812"},{"中文名":"盐边县","adcode":"510422","citycode":"0812"},{"中文名":"泸州市","adcode":"510500","citycode":"0830"},{"中文名":"泸州市市辖区","adcode":"510501","citycode":"0830"},{"中文名":"江阳区","adcode":"510502","citycode":"0830"},{"中文名":"纳溪区","adcode":"510503","citycode":"0830"},{"中文名":"龙马潭区","adcode":"510504","citycode":"0830"},{"中文名":"泸县","adcode":"510521","citycode":"0830"},{"中文名":"合江县","adcode":"510522","citycode":"0830"},{"中文名":"叙永县","adcode":"510524","citycode":"0830"},{"中文名":"古蔺县","adcode":"510525","citycode":"0830"},{"中文名":"德阳市","adcode":"510600","citycode":"0838"},{"中文名":"德阳市市辖区","adcode":"510601","citycode":"0838"},{"中文名":"旌阳区","adcode":"510603","citycode":"0838"},{"中文名":"中江县","adcode":"510623","citycode":"0838"},{"中文名":"罗江区","adcode":"510604","citycode":"0838"},{"中文名":"广汉市","adcode":"510681","citycode":"0838"},{"中文名":"什邡市","adcode":"510682","citycode":"0838"},{"中文名":"绵竹市","adcode":"510683","citycode":"0838"},{"中文名":"绵阳市","adcode":"510700","citycode":"0816"},{"中文名":"绵阳市市辖区","adcode":"510701","citycode":"0816"},{"中文名":"涪城区","adcode":"510703","citycode":"0816"},{"中文名":"游仙区","adcode":"510704","citycode":"0816"},{"中文名":"安州区","adcode":"510705","citycode":"0816"},{"中文名":"三台县","adcode":"510722","citycode":"0816"},{"中文名":"盐亭县","adcode":"510723","citycode":"0816"},{"中文名":"梓潼县","adcode":"510725","citycode":"0816"},{"中文名":"北川羌族自治县","adcode":"510726","citycode":"0816"},{"中文名":"平武县","adcode":"510727","citycode":"0816"},{"中文名":"江油市","adcode":"510781","citycode":"0816"},{"中文名":"广元市","adcode":"510800","citycode":"0839"},{"中文名":"广元市市辖区","adcode":"510801","citycode":"0839"},{"中文名":"利州区","adcode":"510802","citycode":"0839"},{"中文名":"昭化区","adcode":"510811","citycode":"0839"},{"中文名":"朝天区","adcode":"510812","citycode":"0839"},{"中文名":"旺苍县","adcode":"510821","citycode":"0839"},{"中文名":"青川县","adcode":"510822","citycode":"0839"},{"中文名":"剑阁县","adcode":"510823","citycode":"0839"},{"中文名":"苍溪县","adcode":"510824","citycode":"0839"},{"中文名":"遂宁市","adcode":"510900","citycode":"0825"},{"中文名":"遂宁市市辖区","adcode":"510901","citycode":"0825"},{"中文名":"船山区","adcode":"510903","citycode":"0825"},{"中文名":"安居区","adcode":"510904","citycode":"0825"},{"中文名":"蓬溪县","adcode":"510921","citycode":"0825"},{"中文名":"射洪市","adcode":"510981","citycode":"0825"},{"中文名":"大英县","adcode":"510923","citycode":"0825"},{"中文名":"内江市","adcode":"511000","citycode":"1832"},{"中文名":"内江市市辖区","adcode":"511001","citycode":"1832"},{"中文名":"市中区","adcode":"511002","citycode":"1832"},{"中文名":"东兴区","adcode":"511011","citycode":"1832"},{"中文名":"威远县","adcode":"511024","citycode":"1832"},{"中文名":"资中县","adcode":"511025","citycode":"1832"},{"中文名":"隆昌市","adcode":"511083","citycode":"1832"},{"中文名":"乐山市","adcode":"511100","citycode":"0833"},{"中文名":"乐山市市辖区","adcode":"511101","citycode":"0833"},{"中文名":"市中区","adcode":"511102","citycode":"0833"},{"中文名":"沙湾区","adcode":"511111","citycode":"0833"},{"中文名":"五通桥区","adcode":"511112","citycode":"0833"},{"中文名":"金口河区","adcode":"511113","citycode":"0833"},{"中文名":"犍为县","adcode":"511123","citycode":"0833"},{"中文名":"井研县","adcode":"511124","citycode":"0833"},{"中文名":"夹江县","adcode":"511126","citycode":"0833"},{"中文名":"沐川县","adcode":"511129","citycode":"0833"},{"中文名":"峨边彝族自治县","adcode":"511132","citycode":"0833"},{"中文名":"马边彝族自治县","adcode":"511133","citycode":"0833"},{"中文名":"峨眉山市","adcode":"511181","citycode":"0833"},{"中文名":"南充市","adcode":"511300","citycode":"0817"},{"中文名":"南充市市辖区","adcode":"511301","citycode":"0817"},{"中文名":"顺庆区","adcode":"511302","citycode":"0817"},{"中文名":"高坪区","adcode":"511303","citycode":"0817"},{"中文名":"嘉陵区","adcode":"511304","citycode":"0817"},{"中文名":"南部县","adcode":"511321","citycode":"0817"},{"中文名":"营山县","adcode":"511322","citycode":"0817"},{"中文名":"蓬安县","adcode":"511323","citycode":"0817"},{"中文名":"仪陇县","adcode":"511324","citycode":"0817"},{"中文名":"西充县","adcode":"511325","citycode":"0817"},{"中文名":"阆中市","adcode":"511381","citycode":"0817"},{"中文名":"眉山市","adcode":"511400","citycode":"1833"},{"中文名":"眉山市市辖区","adcode":"511401","citycode":"1833"},{"中文名":"东坡区","adcode":"511402","citycode":"1833"},{"中文名":"彭山区","adcode":"511403","citycode":"1833"},{"中文名":"仁寿县","adcode":"511421","citycode":"1833"},{"中文名":"洪雅县","adcode":"511423","citycode":"1833"},{"中文名":"丹棱县","adcode":"511424","citycode":"1833"},{"中文名":"青神县","adcode":"511425","citycode":"1833"},{"中文名":"宜宾市","adcode":"511500","citycode":"0831"},{"中文名":"宜宾市市辖区","adcode":"511501","citycode":"0831"},{"中文名":"翠屏区","adcode":"511502","citycode":"0831"},{"中文名":"南溪区","adcode":"511503","citycode":"0831"},{"中文名":"叙州区","adcode":"511504","citycode":"0831"},{"中文名":"江安县","adcode":"511523","citycode":"0831"},{"中文名":"长宁县","adcode":"511524","citycode":"0831"},{"中文名":"高县","adcode":"511525","citycode":"0831"},{"中文名":"珙县","adcode":"511526","citycode":"0831"},{"中文名":"筠连县","adcode":"511527","citycode":"0831"},{"中文名":"兴文县","adcode":"511528","citycode":"0831"},{"中文名":"屏山县","adcode":"511529","citycode":"0831"},{"中文名":"广安市","adcode":"511600","citycode":"0826"},{"中文名":"广安市市辖区","adcode":"511601","citycode":"0826"},{"中文名":"广安区","adcode":"511602","citycode":"0826"},{"中文名":"前锋区","adcode":"511603","citycode":"0826"},{"中文名":"岳池县","adcode":"511621","citycode":"0826"},{"中文名":"武胜县","adcode":"511622","citycode":"0826"},{"中文名":"邻水县","adcode":"511623","citycode":"0826"},{"中文名":"华蓥市","adcode":"511681","citycode":"0826"},{"中文名":"达州市","adcode":"511700","citycode":"0818"},{"中文名":"达州市市辖区","adcode":"511701","citycode":"0818"},{"中文名":"通川区","adcode":"511702","citycode":"0818"},{"中文名":"达川区","adcode":"511703","citycode":"0818"},{"中文名":"宣汉县","adcode":"511722","citycode":"0818"},{"中文名":"开江县","adcode":"511723","citycode":"0818"},{"中文名":"大竹县","adcode":"511724","citycode":"0818"},{"中文名":"渠县","adcode":"511725","citycode":"0818"},{"中文名":"万源市","adcode":"511781","citycode":"0818"},{"中文名":"雅安市","adcode":"511800","citycode":"0835"},{"中文名":"雅安市市辖区","adcode":"511801","citycode":"0835"},{"中文名":"雨城区","adcode":"511802","citycode":"0835"},{"中文名":"名山区","adcode":"511803","citycode":"0835"},{"中文名":"荥经县","adcode":"511822","citycode":"0835"},{"中文名":"汉源县","adcode":"511823","citycode":"0835"},{"中文名":"石棉县","adcode":"511824","citycode":"0835"},{"中文名":"天全县","adcode":"511825","citycode":"0835"},{"中文名":"芦山县","adcode":"511826","citycode":"0835"},{"中文名":"宝兴县","adcode":"511827","citycode":"0835"},{"中文名":"巴中市","adcode":"511900","citycode":"0827"},{"中文名":"巴中市市辖区","adcode":"511901","citycode":"0827"},{"中文名":"巴州区","adcode":"511902","citycode":"0827"},{"中文名":"恩阳区","adcode":"511903","citycode":"0827"},{"中文名":"通江县","adcode":"511921","citycode":"0827"},{"中文名":"南江县","adcode":"511922","citycode":"0827"},{"中文名":"平昌县","adcode":"511923","citycode":"0827"},{"中文名":"资阳市","adcode":"512000","citycode":"0832"},{"中文名":"资阳市市辖区","adcode":"512001","citycode":"0832"},{"中文名":"雁江区","adcode":"512002","citycode":"0832"},{"中文名":"安岳县","adcode":"512021","citycode":"0832"},{"中文名":"乐至县","adcode":"512022","citycode":"0832"},{"中文名":"阿坝藏族羌族自治州","adcode":"513200","citycode":"0837"},{"中文名":"马尔康市","adcode":"513201","citycode":"0837"},{"中文名":"汶川县","adcode":"513221","citycode":"0837"},{"中文名":"理县","adcode":"513222","citycode":"0837"},{"中文名":"茂县","adcode":"513223","citycode":"0837"},{"中文名":"松潘县","adcode":"513224","citycode":"0837"},{"中文名":"九寨沟县","adcode":"513225","citycode":"0837"},{"中文名":"金川县","adcode":"513226","citycode":"0837"},{"中文名":"小金县","adcode":"513227","citycode":"0837"},{"中文名":"黑水县","adcode":"513228","citycode":"0837"},{"中文名":"壤塘县","adcode":"513230","citycode":"0837"},{"中文名":"阿坝县","adcode":"513231","citycode":"0837"},{"中文名":"若尔盖县","adcode":"513232","citycode":"0837"},{"中文名":"红原县","adcode":"513233","citycode":"0837"},{"中文名":"甘孜藏族自治州","adcode":"513300","citycode":"0836"},{"中文名":"康定市","adcode":"513301","citycode":"0836"},{"中文名":"泸定县","adcode":"513322","citycode":"0836"},{"中文名":"丹巴县","adcode":"513323","citycode":"0836"},{"中文名":"九龙县","adcode":"513324","citycode":"0836"},{"中文名":"雅江县","adcode":"513325","citycode":"0836"},{"中文名":"道孚县","adcode":"513326","citycode":"0836"},{"中文名":"炉霍县","adcode":"513327","citycode":"0836"},{"中文名":"甘孜县","adcode":"513328","citycode":"0836"},{"中文名":"新龙县","adcode":"513329","citycode":"0836"},{"中文名":"德格县","adcode":"513330","citycode":"0836"},{"中文名":"白玉县","adcode":"513331","citycode":"0836"},{"中文名":"石渠县","adcode":"513332","citycode":"0836"},{"中文名":"色达县","adcode":"513333","citycode":"0836"},{"中文名":"理塘县","adcode":"513334","citycode":"0836"},{"中文名":"巴塘县","adcode":"513335","citycode":"0836"},{"中文名":"乡城县","adcode":"513336","citycode":"0836"},{"中文名":"稻城县","adcode":"513337","citycode":"0836"},{"中文名":"得荣县","adcode":"513338","citycode":"0836"},{"中文名":"凉山彝族自治州","adcode":"513400","citycode":"0834"},{"中文名":"西昌市","adcode":"513401","citycode":"0834"},{"中文名":"木里藏族自治县","adcode":"513422","citycode":"0834"},{"中文名":"盐源县","adcode":"513423","citycode":"0834"},{"中文名":"德昌县","adcode":"513424","citycode":"0834"},{"中文名":"会理县","adcode":"513425","citycode":"0834"},{"中文名":"会东县","adcode":"513426","citycode":"0834"},{"中文名":"宁南县","adcode":"513427","citycode":"0834"},{"中文名":"普格县","adcode":"513428","citycode":"0834"},{"中文名":"布拖县","adcode":"513429","citycode":"0834"},{"中文名":"金阳县","adcode":"513430","citycode":"0834"},{"中文名":"昭觉县","adcode":"513431","citycode":"0834"},{"中文名":"喜德县","adcode":"513432","citycode":"0834"},{"中文名":"冕宁县","adcode":"513433","citycode":"0834"},{"中文名":"越西县","adcode":"513434","citycode":"0834"},{"中文名":"甘洛县","adcode":"513435","citycode":"0834"},{"中文名":"美姑县","adcode":"513436","citycode":"0834"},{"中文名":"雷波县","adcode":"513437","citycode":"0834"},{"中文名":"贵州省","adcode":"520000","citycode":""},{"中文名":"贵阳市","adcode":"520100","citycode":"0851"},{"中文名":"贵阳市市辖区","adcode":"520101","citycode":"0851"},{"中文名":"南明区","adcode":"520102","citycode":"0851"},{"中文名":"云岩区","adcode":"520103","citycode":"0851"},{"中文名":"花溪区","adcode":"520111","citycode":"0851"},{"中文名":"乌当区","adcode":"520112","citycode":"0851"},{"中文名":"白云区","adcode":"520113","citycode":"0851"},{"中文名":"观山湖区","adcode":"520115","citycode":"0851"},{"中文名":"开阳县","adcode":"520121","citycode":"0851"},{"中文名":"息烽县","adcode":"520122","citycode":"0851"},{"中文名":"修文县","adcode":"520123","citycode":"0851"},{"中文名":"清镇市","adcode":"520181","citycode":"0851"},{"中文名":"六盘水市","adcode":"520200","citycode":"0858"},{"中文名":"钟山区","adcode":"520201","citycode":"0858"},{"中文名":"六枝特区","adcode":"520203","citycode":"0858"},{"中文名":"水城县","adcode":"520221","citycode":"0858"},{"中文名":"盘州市","adcode":"520281","citycode":"0858"},{"中文名":"遵义市","adcode":"520300","citycode":"0852"},{"中文名":"遵义市市辖区","adcode":"520301","citycode":"0852"},{"中文名":"红花岗区","adcode":"520302","citycode":"0852"},{"中文名":"汇川区","adcode":"520303","citycode":"0852"},{"中文名":"播州区","adcode":"520304","citycode":"0852"},{"中文名":"桐梓县","adcode":"520322","citycode":"0852"},{"中文名":"绥阳县","adcode":"520323","citycode":"0852"},{"中文名":"正安县","adcode":"520324","citycode":"0852"},{"中文名":"道真仡佬族苗族自治县","adcode":"520325","citycode":"0852"},{"中文名":"务川仡佬族苗族自治县","adcode":"520326","citycode":"0852"},{"中文名":"凤冈县","adcode":"520327","citycode":"0852"},{"中文名":"湄潭县","adcode":"520328","citycode":"0852"},{"中文名":"余庆县","adcode":"520329","citycode":"0852"},{"中文名":"习水县","adcode":"520330","citycode":"0852"},{"中文名":"赤水市","adcode":"520381","citycode":"0852"},{"中文名":"仁怀市","adcode":"520382","citycode":"0852"},{"中文名":"安顺市","adcode":"520400","citycode":"0853"},{"中文名":"安顺市市辖区","adcode":"520401","citycode":"0853"},{"中文名":"西秀区","adcode":"520402","citycode":"0853"},{"中文名":"平坝区","adcode":"520403","citycode":"0853"},{"中文名":"普定县","adcode":"520422","citycode":"0853"},{"中文名":"镇宁布依族苗族自治县","adcode":"520423","citycode":"0853"},{"中文名":"关岭布依族苗族自治县","adcode":"520424","citycode":"0853"},{"中文名":"紫云苗族布依族自治县","adcode":"520425","citycode":"0853"},{"中文名":"毕节市","adcode":"520500","citycode":"0857"},{"中文名":"七星关区","adcode":"520502","citycode":"0857"},{"中文名":"大方县","adcode":"520521","citycode":"0857"},{"中文名":"黔西县","adcode":"520522","citycode":"0857"},{"中文名":"金沙县","adcode":"520523","citycode":"0857"},{"中文名":"织金县","adcode":"520524","citycode":"0857"},{"中文名":"纳雍县","adcode":"520525","citycode":"0857"},{"中文名":"威宁彝族回族苗族自治县","adcode":"520526","citycode":"0857"},{"中文名":"赫章县","adcode":"520527","citycode":"0857"},{"中文名":"铜仁市","adcode":"520600","citycode":"0856"},{"中文名":"碧江区","adcode":"520602","citycode":"0856"},{"中文名":"万山区","adcode":"520603","citycode":"0856"},{"中文名":"江口县","adcode":"520621","citycode":"0856"},{"中文名":"玉屏侗族自治县","adcode":"520622","citycode":"0856"},{"中文名":"石阡县","adcode":"520623","citycode":"0856"},{"中文名":"思南县","adcode":"520624","citycode":"0856"},{"中文名":"印江土家族苗族自治县","adcode":"520625","citycode":"0856"},{"中文名":"德江县","adcode":"520626","citycode":"0856"},{"中文名":"沿河土家族自治县","adcode":"520627","citycode":"0856"},{"中文名":"松桃苗族自治县","adcode":"520628","citycode":"0856"},{"中文名":"黔西南布依族苗族自治州","adcode":"522300","citycode":"0859"},{"中文名":"兴义市","adcode":"522301","citycode":"0859"},{"中文名":"兴仁市","adcode":"522302","citycode":"0859"},{"中文名":"普安县","adcode":"522323","citycode":"0859"},{"中文名":"晴隆县","adcode":"522324","citycode":"0859"},{"中文名":"贞丰县","adcode":"522325","citycode":"0859"},{"中文名":"望谟县","adcode":"522326","citycode":"0859"},{"中文名":"册亨县","adcode":"522327","citycode":"0859"},{"中文名":"安龙县","adcode":"522328","citycode":"0859"},{"中文名":"黔东南苗族侗族自治州","adcode":"522600","citycode":"0855"},{"中文名":"凯里市","adcode":"522601","citycode":"0855"},{"中文名":"黄平县","adcode":"522622","citycode":"0855"},{"中文名":"施秉县","adcode":"522623","citycode":"0855"},{"中文名":"三穗县","adcode":"522624","citycode":"0855"},{"中文名":"镇远县","adcode":"522625","citycode":"0855"},{"中文名":"岑巩县","adcode":"522626","citycode":"0855"},{"中文名":"天柱县","adcode":"522627","citycode":"0855"},{"中文名":"锦屏县","adcode":"522628","citycode":"0855"},{"中文名":"剑河县","adcode":"522629","citycode":"0855"},{"中文名":"台江县","adcode":"522630","citycode":"0855"},{"中文名":"黎平县","adcode":"522631","citycode":"0855"},{"中文名":"榕江县","adcode":"522632","citycode":"0855"},{"中文名":"从江县","adcode":"522633","citycode":"0855"},{"中文名":"雷山县","adcode":"522634","citycode":"0855"},{"中文名":"麻江县","adcode":"522635","citycode":"0855"},{"中文名":"丹寨县","adcode":"522636","citycode":"0855"},{"中文名":"黔南布依族苗族自治州","adcode":"522700","citycode":"0854"},{"中文名":"都匀市","adcode":"522701","citycode":"0854"},{"中文名":"福泉市","adcode":"522702","citycode":"0854"},{"中文名":"荔波县","adcode":"522722","citycode":"0854"},{"中文名":"贵定县","adcode":"522723","citycode":"0854"},{"中文名":"瓮安县","adcode":"522725","citycode":"0854"},{"中文名":"独山县","adcode":"522726","citycode":"0854"},{"中文名":"平塘县","adcode":"522727","citycode":"0854"},{"中文名":"罗甸县","adcode":"522728","citycode":"0854"},{"中文名":"长顺县","adcode":"522729","citycode":"0854"},{"中文名":"龙里县","adcode":"522730","citycode":"0854"},{"中文名":"惠水县","adcode":"522731","citycode":"0854"},{"中文名":"三都水族自治县","adcode":"522732","citycode":"0854"},{"中文名":"云南省","adcode":"530000","citycode":""},{"中文名":"昆明市","adcode":"530100","citycode":"0871"},{"中文名":"昆明市市辖区","adcode":"530101","citycode":"0871"},{"中文名":"五华区","adcode":"530102","citycode":"0871"},{"中文名":"盘龙区","adcode":"530103","citycode":"0871"},{"中文名":"官渡区","adcode":"530111","citycode":"0871"},{"中文名":"西山区","adcode":"530112","citycode":"0871"},{"中文名":"东川区","adcode":"530113","citycode":"0871"},{"中文名":"呈贡区","adcode":"530114","citycode":"0871"},{"中文名":"晋宁区","adcode":"530115","citycode":"0871"},{"中文名":"富民县","adcode":"530124","citycode":"0871"},{"中文名":"宜良县","adcode":"530125","citycode":"0871"},{"中文名":"石林彝族自治县","adcode":"530126","citycode":"0871"},{"中文名":"嵩明县","adcode":"530127","citycode":"0871"},{"中文名":"禄劝彝族苗族自治县","adcode":"530128","citycode":"0871"},{"中文名":"寻甸回族彝族自治县","adcode":"530129","citycode":"0871"},{"中文名":"安宁市","adcode":"530181","citycode":"0871"},{"中文名":"曲靖市","adcode":"530300","citycode":"0874"},{"中文名":"曲靖市市辖区","adcode":"530301","citycode":"0874"},{"中文名":"麒麟区","adcode":"530302","citycode":"0874"},{"中文名":"沾益区","adcode":"530303","citycode":"0874"},{"中文名":"马龙区","adcode":"530304","citycode":"0874"},{"中文名":"陆良县","adcode":"530322","citycode":"0874"},{"中文名":"师宗县","adcode":"530323","citycode":"0874"},{"中文名":"罗平县","adcode":"530324","citycode":"0874"},{"中文名":"富源县","adcode":"530325","citycode":"0874"},{"中文名":"会泽县","adcode":"530326","citycode":"0874"},{"中文名":"宣威市","adcode":"530381","citycode":"0874"},{"中文名":"玉溪市","adcode":"530400","citycode":"0877"},{"中文名":"玉溪市市辖区","adcode":"530401","citycode":"0877"},{"中文名":"红塔区","adcode":"530402","citycode":"0877"},{"中文名":"江川区","adcode":"530403","citycode":"0877"},{"中文名":"澄江市","adcode":"530481","citycode":"0877"},{"中文名":"通海县","adcode":"530423","citycode":"0877"},{"中文名":"华宁县","adcode":"530424","citycode":"0877"},{"中文名":"易门县","adcode":"530425","citycode":"0877"},{"中文名":"峨山彝族自治县","adcode":"530426","citycode":"0877"},{"中文名":"新平彝族傣族自治县","adcode":"530427","citycode":"0877"},{"中文名":"元江哈尼族彝族傣族自治县","adcode":"530428","citycode":"0877"},{"中文名":"保山市","adcode":"530500","citycode":"0875"},{"中文名":"保山市市辖区","adcode":"530501","citycode":"0875"},{"中文名":"隆阳区","adcode":"530502","citycode":"0875"},{"中文名":"施甸县","adcode":"530521","citycode":"0875"},{"中文名":"龙陵县","adcode":"530523","citycode":"0875"},{"中文名":"昌宁县","adcode":"530524","citycode":"0875"},{"中文名":"腾冲市","adcode":"530581","citycode":"0875"},{"中文名":"昭通市","adcode":"530600","citycode":"0870"},{"中文名":"昭通市市辖区","adcode":"530601","citycode":"0870"},{"中文名":"昭阳区","adcode":"530602","citycode":"0870"},{"中文名":"鲁甸县","adcode":"530621","citycode":"0870"},{"中文名":"巧家县","adcode":"530622","citycode":"0870"},{"中文名":"盐津县","adcode":"530623","citycode":"0870"},{"中文名":"大关县","adcode":"530624","citycode":"0870"},{"中文名":"永善县","adcode":"530625","citycode":"0870"},{"中文名":"绥江县","adcode":"530626","citycode":"0870"},{"中文名":"镇雄县","adcode":"530627","citycode":"0870"},{"中文名":"彝良县","adcode":"530628","citycode":"0870"},{"中文名":"威信县","adcode":"530629","citycode":"0870"},{"中文名":"水富市","adcode":"530681","citycode":"0870"},{"中文名":"丽江市","adcode":"530700","citycode":"0888"},{"中文名":"丽江市市辖区","adcode":"530701","citycode":"0888"},{"中文名":"古城区","adcode":"530702","citycode":"0888"},{"中文名":"玉龙纳西族自治县","adcode":"530721","citycode":"0888"},{"中文名":"永胜县","adcode":"530722","citycode":"0888"},{"中文名":"华坪县","adcode":"530723","citycode":"0888"},{"中文名":"宁蒗彝族自治县","adcode":"530724","citycode":"0888"},{"中文名":"普洱市","adcode":"530800","citycode":"0879"},{"中文名":"普洱市市辖区","adcode":"530801","citycode":"0879"},{"中文名":"思茅区","adcode":"530802","citycode":"0879"},{"中文名":"宁洱哈尼族彝族自治县","adcode":"530821","citycode":"0879"},{"中文名":"墨江哈尼族自治县","adcode":"530822","citycode":"0879"},{"中文名":"景东彝族自治县","adcode":"530823","citycode":"0879"},{"中文名":"景谷傣族彝族自治县","adcode":"530824","citycode":"0879"},{"中文名":"镇沅彝族哈尼族拉祜族自治县","adcode":"530825","citycode":"0879"},{"中文名":"江城哈尼族彝族自治县","adcode":"530826","citycode":"0879"},{"中文名":"孟连傣族拉祜族佤族自治县","adcode":"530827","citycode":"0879"},{"中文名":"澜沧拉祜族自治县","adcode":"530828","citycode":"0879"},{"中文名":"西盟佤族自治县","adcode":"530829","citycode":"0879"},{"中文名":"临沧市","adcode":"530900","citycode":"0883"},{"中文名":"临沧市市辖区","adcode":"530901","citycode":"0883"},{"中文名":"临翔区","adcode":"530902","citycode":"0883"},{"中文名":"凤庆县","adcode":"530921","citycode":"0883"},{"中文名":"云县","adcode":"530922","citycode":"0883"},{"中文名":"永德县","adcode":"530923","citycode":"0883"},{"中文名":"镇康县","adcode":"530924","citycode":"0883"},{"中文名":"双江拉祜族佤族布朗族傣族自治县","adcode":"530925","citycode":"0883"},{"中文名":"耿马傣族佤族自治县","adcode":"530926","citycode":"0883"},{"中文名":"沧源佤族自治县","adcode":"530927","citycode":"0883"},{"中文名":"楚雄彝族自治州","adcode":"532300","citycode":"0878"},{"中文名":"楚雄市","adcode":"532301","citycode":"0878"},{"中文名":"双柏县","adcode":"532322","citycode":"0878"},{"中文名":"牟定县","adcode":"532323","citycode":"0878"},{"中文名":"南华县","adcode":"532324","citycode":"0878"},{"中文名":"姚安县","adcode":"532325","citycode":"0878"},{"中文名":"大姚县","adcode":"532326","citycode":"0878"},{"中文名":"永仁县","adcode":"532327","citycode":"0878"},{"中文名":"元谋县","adcode":"532328","citycode":"0878"},{"中文名":"武定县","adcode":"532329","citycode":"0878"},{"中文名":"禄丰县","adcode":"532331","citycode":"0878"},{"中文名":"红河哈尼族彝族自治州","adcode":"532500","citycode":"0873"},{"中文名":"个旧市","adcode":"532501","citycode":"0873"},{"中文名":"开远市","adcode":"532502","citycode":"0873"},{"中文名":"蒙自市","adcode":"532503","citycode":"0873"},{"中文名":"弥勒市","adcode":"532504","citycode":"0873"},{"中文名":"屏边苗族自治县","adcode":"532523","citycode":"0873"},{"中文名":"建水县","adcode":"532524","citycode":"0873"},{"中文名":"石屏县","adcode":"532525","citycode":"0873"},{"中文名":"泸西县","adcode":"532527","citycode":"0873"},{"中文名":"元阳县","adcode":"532528","citycode":"0873"},{"中文名":"红河县","adcode":"532529","citycode":"0873"},{"中文名":"金平苗族瑶族傣族自治县","adcode":"532530","citycode":"0873"},{"中文名":"绿春县","adcode":"532531","citycode":"0873"},{"中文名":"河口瑶族自治县","adcode":"532532","citycode":"0873"},{"中文名":"文山壮族苗族自治州","adcode":"532600","citycode":"0876"},{"中文名":"文山市","adcode":"532601","citycode":"0876"},{"中文名":"砚山县","adcode":"532622","citycode":"0876"},{"中文名":"西畴县","adcode":"532623","citycode":"0876"},{"中文名":"麻栗坡县","adcode":"532624","citycode":"0876"},{"中文名":"马关县","adcode":"532625","citycode":"0876"},{"中文名":"丘北县","adcode":"532626","citycode":"0876"},{"中文名":"广南县","adcode":"532627","citycode":"0876"},{"中文名":"富宁县","adcode":"532628","citycode":"0876"},{"中文名":"西双版纳傣族自治州","adcode":"532800","citycode":"0691"},{"中文名":"景洪市","adcode":"532801","citycode":"0691"},{"中文名":"勐海县","adcode":"532822","citycode":"0691"},{"中文名":"勐腊县","adcode":"532823","citycode":"0691"},{"中文名":"大理白族自治州","adcode":"532900","citycode":"0872"},{"中文名":"大理市","adcode":"532901","citycode":"0872"},{"中文名":"漾濞彝族自治县","adcode":"532922","citycode":"0872"},{"中文名":"祥云县","adcode":"532923","citycode":"0872"},{"中文名":"宾川县","adcode":"532924","citycode":"0872"},{"中文名":"弥渡县","adcode":"532925","citycode":"0872"},{"中文名":"南涧彝族自治县","adcode":"532926","citycode":"0872"},{"中文名":"巍山彝族回族自治县","adcode":"532927","citycode":"0872"},{"中文名":"永平县","adcode":"532928","citycode":"0872"},{"中文名":"云龙县","adcode":"532929","citycode":"0872"},{"中文名":"洱源县","adcode":"532930","citycode":"0872"},{"中文名":"剑川县","adcode":"532931","citycode":"0872"},{"中文名":"鹤庆县","adcode":"532932","citycode":"0872"},{"中文名":"德宏傣族景颇族自治州","adcode":"533100","citycode":"0692"},{"中文名":"瑞丽市","adcode":"533102","citycode":"0692"},{"中文名":"芒市","adcode":"533103","citycode":"0692"},{"中文名":"梁河县","adcode":"533122","citycode":"0692"},{"中文名":"盈江县","adcode":"533123","citycode":"0692"},{"中文名":"陇川县","adcode":"533124","citycode":"0692"},{"中文名":"怒江傈僳族自治州","adcode":"533300","citycode":"0886"},{"中文名":"泸水市","adcode":"533301","citycode":"0886"},{"中文名":"福贡县","adcode":"533323","citycode":"0886"},{"中文名":"贡山独龙族怒族自治县","adcode":"533324","citycode":"0886"},{"中文名":"兰坪白族普米族自治县","adcode":"533325","citycode":"0886"},{"中文名":"迪庆藏族自治州","adcode":"533400","citycode":"0887"},{"中文名":"香格里拉市","adcode":"533401","citycode":"0887"},{"中文名":"德钦县","adcode":"533422","citycode":"0887"},{"中文名":"维西傈僳族自治县","adcode":"533423","citycode":"0887"},{"中文名":"西藏自治区","adcode":"540000","citycode":""},{"中文名":"拉萨市","adcode":"540100","citycode":"0891"},{"中文名":"拉萨市市辖区","adcode":"540101","citycode":"0891"},{"中文名":"城关区","adcode":"540102","citycode":"0891"},{"中文名":"堆龙德庆区","adcode":"540103","citycode":"0891"},{"中文名":"达孜区","adcode":"540104","citycode":"0891"},{"中文名":"林周县","adcode":"540121","citycode":"0891"},{"中文名":"当雄县","adcode":"540122","citycode":"0891"},{"中文名":"尼木县","adcode":"540123","citycode":"0891"},{"中文名":"曲水县","adcode":"540124","citycode":"0891"},{"中文名":"墨竹工卡县","adcode":"540127","citycode":"0891"},{"中文名":"日喀则市","adcode":"540200","citycode":"0892"},{"中文名":"桑珠孜区","adcode":"540202","citycode":"0892"},{"中文名":"南木林县","adcode":"540221","citycode":"0892"},{"中文名":"江孜县","adcode":"540222","citycode":"0892"},{"中文名":"定日县","adcode":"540223","citycode":"0892"},{"中文名":"萨迦县","adcode":"540224","citycode":"0892"},{"中文名":"拉孜县","adcode":"540225","citycode":"0892"},{"中文名":"昂仁县","adcode":"540226","citycode":"0892"},{"中文名":"谢通门县","adcode":"540227","citycode":"0892"},{"中文名":"白朗县","adcode":"540228","citycode":"0892"},{"中文名":"仁布县","adcode":"540229","citycode":"0892"},{"中文名":"康马县","adcode":"540230","citycode":"0892"},{"中文名":"定结县","adcode":"540231","citycode":"0892"},{"中文名":"仲巴县","adcode":"540232","citycode":"0892"},{"中文名":"亚东县","adcode":"540233","citycode":"0892"},{"中文名":"吉隆县","adcode":"540234","citycode":"0892"},{"中文名":"聂拉木县","adcode":"540235","citycode":"0892"},{"中文名":"萨嘎县","adcode":"540236","citycode":"0892"},{"中文名":"岗巴县","adcode":"540237","citycode":"0892"},{"中文名":"昌都市","adcode":"540300","citycode":"0895"},{"中文名":"卡若区","adcode":"540302","citycode":"0895"},{"中文名":"江达县","adcode":"540321","citycode":"0895"},{"中文名":"贡觉县","adcode":"540322","citycode":"0895"},{"中文名":"类乌齐县","adcode":"540323","citycode":"0895"},{"中文名":"丁青县","adcode":"540324","citycode":"0895"},{"中文名":"察雅县","adcode":"540325","citycode":"0895"},{"中文名":"八宿县","adcode":"540326","citycode":"0895"},{"中文名":"左贡县","adcode":"540327","citycode":"0895"},{"中文名":"芒康县","adcode":"540328","citycode":"0895"},{"中文名":"洛隆县","adcode":"540329","citycode":"0895"},{"中文名":"边坝县","adcode":"540330","citycode":"0895"},{"中文名":"林芝市","adcode":"540400","citycode":"0894"},{"中文名":"巴宜区","adcode":"540402","citycode":"0894"},{"中文名":"工布江达县","adcode":"540421","citycode":"0894"},{"中文名":"米林县","adcode":"540422","citycode":"0894"},{"中文名":"墨脱县","adcode":"540423","citycode":"0894"},{"中文名":"波密县","adcode":"540424","citycode":"0894"},{"中文名":"察隅县","adcode":"540425","citycode":"0894"},{"中文名":"朗县","adcode":"540426","citycode":"0894"},{"中文名":"山南市","adcode":"540500","citycode":"0893"},{"中文名":"乃东区","adcode":"540502","citycode":"0893"},{"中文名":"扎囊县","adcode":"540521","citycode":"0893"},{"中文名":"贡嘎县","adcode":"540522","citycode":"0893"},{"中文名":"桑日县","adcode":"540523","citycode":"0893"},{"中文名":"琼结县","adcode":"540524","citycode":"0893"},{"中文名":"曲松县","adcode":"540525","citycode":"0893"},{"中文名":"措美县","adcode":"540526","citycode":"0893"},{"中文名":"洛扎县","adcode":"540527","citycode":"0893"},{"中文名":"加查县","adcode":"540528","citycode":"0893"},{"中文名":"隆子县","adcode":"540529","citycode":"0893"},{"中文名":"错那县","adcode":"540530","citycode":"0893"},{"中文名":"浪卡子县","adcode":"540531","citycode":"0893"},{"中文名":"那曲市","adcode":"540600","citycode":"0896"},{"中文名":"色尼区","adcode":"540602","citycode":"0896"},{"中文名":"嘉黎县","adcode":"540621","citycode":"0896"},{"中文名":"比如县","adcode":"540622","citycode":"0896"},{"中文名":"聂荣县","adcode":"540623","citycode":"0896"},{"中文名":"安多县","adcode":"540624","citycode":"0896"},{"中文名":"申扎县","adcode":"540625","citycode":"0896"},{"中文名":"索县","adcode":"540626","citycode":"0896"},{"中文名":"班戈县","adcode":"540627","citycode":"0896"},{"中文名":"巴青县","adcode":"540628","citycode":"0896"},{"中文名":"尼玛县","adcode":"540629","citycode":"0896"},{"中文名":"双湖县","adcode":"540630","citycode":"0896"},{"中文名":"阿里地区","adcode":"542500","citycode":"0897"},{"中文名":"普兰县","adcode":"542521","citycode":"0897"},{"中文名":"札达县","adcode":"542522","citycode":"0897"},{"中文名":"噶尔县","adcode":"542523","citycode":"0897"},{"中文名":"日土县","adcode":"542524","citycode":"0897"},{"中文名":"革吉县","adcode":"542525","citycode":"0897"},{"中文名":"改则县","adcode":"542526","citycode":"0897"},{"中文名":"措勤县","adcode":"542527","citycode":"0897"},{"中文名":"陕西省","adcode":"610000","citycode":""},{"中文名":"西安市","adcode":"610100","citycode":"029"},{"中文名":"西安市市辖区","adcode":"610101","citycode":"029"},{"中文名":"新城区","adcode":"610102","citycode":"029"},{"中文名":"碑林区","adcode":"610103","citycode":"029"},{"中文名":"莲湖区","adcode":"610104","citycode":"029"},{"中文名":"灞桥区","adcode":"610111","citycode":"029"},{"中文名":"未央区","adcode":"610112","citycode":"029"},{"中文名":"雁塔区","adcode":"610113","citycode":"029"},{"中文名":"阎良区","adcode":"610114","citycode":"029"},{"中文名":"临潼区","adcode":"610115","citycode":"029"},{"中文名":"长安区","adcode":"610116","citycode":"029"},{"中文名":"高陵区","adcode":"610117","citycode":"029"},{"中文名":"鄠邑区","adcode":"610118","citycode":"029"},{"中文名":"蓝田县","adcode":"610122","citycode":"029"},{"中文名":"周至县","adcode":"610124","citycode":"029"},{"中文名":"铜川市","adcode":"610200","citycode":"0919"},{"中文名":"铜川市市辖区","adcode":"610201","citycode":"0919"},{"中文名":"王益区","adcode":"610202","citycode":"0919"},{"中文名":"印台区","adcode":"610203","citycode":"0919"},{"中文名":"耀州区","adcode":"610204","citycode":"0919"},{"中文名":"宜君县","adcode":"610222","citycode":"0919"},{"中文名":"宝鸡市","adcode":"610300","citycode":"0917"},{"中文名":"宝鸡市市辖区","adcode":"610301","citycode":"0917"},{"中文名":"渭滨区","adcode":"610302","citycode":"0917"},{"中文名":"金台区","adcode":"610303","citycode":"0917"},{"中文名":"陈仓区","adcode":"610304","citycode":"0917"},{"中文名":"凤翔县","adcode":"610322","citycode":"0917"},{"中文名":"岐山县","adcode":"610323","citycode":"0917"},{"中文名":"扶风县","adcode":"610324","citycode":"0917"},{"中文名":"眉县","adcode":"610326","citycode":"0917"},{"中文名":"陇县","adcode":"610327","citycode":"0917"},{"中文名":"千阳县","adcode":"610328","citycode":"0917"},{"中文名":"麟游县","adcode":"610329","citycode":"0917"},{"中文名":"凤县","adcode":"610330","citycode":"0917"},{"中文名":"太白县","adcode":"610331","citycode":"0917"},{"中文名":"咸阳市","adcode":"610400","citycode":"0910"},{"中文名":"咸阳市市辖区","adcode":"610401","citycode":"0910"},{"中文名":"秦都区","adcode":"610402","citycode":"0910"},{"中文名":"杨陵区","adcode":"610403","citycode":"0910"},{"中文名":"渭城区","adcode":"610404","citycode":"0910"},{"中文名":"三原县","adcode":"610422","citycode":"0910"},{"中文名":"泾阳县","adcode":"610423","citycode":"0910"},{"中文名":"乾县","adcode":"610424","citycode":"0910"},{"中文名":"礼泉县","adcode":"610425","citycode":"0910"},{"中文名":"永寿县","adcode":"610426","citycode":"0910"},{"中文名":"彬州市","adcode":"610482","citycode":"0910"},{"中文名":"长武县","adcode":"610428","citycode":"0910"},{"中文名":"旬邑县","adcode":"610429","citycode":"0910"},{"中文名":"淳化县","adcode":"610430","citycode":"0910"},{"中文名":"武功县","adcode":"610431","citycode":"0910"},{"中文名":"兴平市","adcode":"610481","citycode":"0910"},{"中文名":"渭南市","adcode":"610500","citycode":"0913"},{"中文名":"渭南市市辖区","adcode":"610501","citycode":"0913"},{"中文名":"临渭区","adcode":"610502","citycode":"0913"},{"中文名":"华州区","adcode":"610503","citycode":"0913"},{"中文名":"潼关县","adcode":"610522","citycode":"0913"},{"中文名":"大荔县","adcode":"610523","citycode":"0913"},{"中文名":"合阳县","adcode":"610524","citycode":"0913"},{"中文名":"澄城县","adcode":"610525","citycode":"0913"},{"中文名":"蒲城县","adcode":"610526","citycode":"0913"},{"中文名":"白水县","adcode":"610527","citycode":"0913"},{"中文名":"富平县","adcode":"610528","citycode":"0913"},{"中文名":"韩城市","adcode":"610581","citycode":"0913"},{"中文名":"华阴市","adcode":"610582","citycode":"0913"},{"中文名":"延安市","adcode":"610600","citycode":"0911"},{"中文名":"延安市市辖区","adcode":"610601","citycode":"0911"},{"中文名":"宝塔区","adcode":"610602","citycode":"0911"},{"中文名":"安塞区","adcode":"610603","citycode":"0911"},{"中文名":"延长县","adcode":"610621","citycode":"0911"},{"中文名":"延川县","adcode":"610622","citycode":"0911"},{"中文名":"子长市","adcode":"610681","citycode":"0911"},{"中文名":"志丹县","adcode":"610625","citycode":"0911"},{"中文名":"吴起县","adcode":"610626","citycode":"0911"},{"中文名":"甘泉县","adcode":"610627","citycode":"0911"},{"中文名":"富县","adcode":"610628","citycode":"0911"},{"中文名":"洛川县","adcode":"610629","citycode":"0911"},{"中文名":"宜川县","adcode":"610630","citycode":"0911"},{"中文名":"黄龙县","adcode":"610631","citycode":"0911"},{"中文名":"黄陵县","adcode":"610632","citycode":"0911"},{"中文名":"汉中市","adcode":"610700","citycode":"0916"},{"中文名":"汉中市市辖区","adcode":"610701","citycode":"0916"},{"中文名":"汉台区","adcode":"610702","citycode":"0916"},{"中文名":"南郑区","adcode":"610703","citycode":"0916"},{"中文名":"城固县","adcode":"610722","citycode":"0916"},{"中文名":"洋县","adcode":"610723","citycode":"0916"},{"中文名":"西乡县","adcode":"610724","citycode":"0916"},{"中文名":"勉县","adcode":"610725","citycode":"0916"},{"中文名":"宁强县","adcode":"610726","citycode":"0916"},{"中文名":"略阳县","adcode":"610727","citycode":"0916"},{"中文名":"镇巴县","adcode":"610728","citycode":"0916"},{"中文名":"留坝县","adcode":"610729","citycode":"0916"},{"中文名":"佛坪县","adcode":"610730","citycode":"0916"},{"中文名":"榆林市","adcode":"610800","citycode":"0912"},{"中文名":"榆林市市辖区","adcode":"610801","citycode":"0912"},{"中文名":"榆阳区","adcode":"610802","citycode":"0912"},{"中文名":"横山区","adcode":"610803","citycode":"0912"},{"中文名":"府谷县","adcode":"610822","citycode":"0912"},{"中文名":"靖边县","adcode":"610824","citycode":"0912"},{"中文名":"定边县","adcode":"610825","citycode":"0912"},{"中文名":"绥德县","adcode":"610826","citycode":"0912"},{"中文名":"米脂县","adcode":"610827","citycode":"0912"},{"中文名":"佳县","adcode":"610828","citycode":"0912"},{"中文名":"吴堡县","adcode":"610829","citycode":"0912"},{"中文名":"清涧县","adcode":"610830","citycode":"0912"},{"中文名":"子洲县","adcode":"610831","citycode":"0912"},{"中文名":"神木市","adcode":"610881","citycode":"0912"},{"中文名":"安康市","adcode":"610900","citycode":"0915"},{"中文名":"安康市市辖区","adcode":"610901","citycode":"0915"},{"中文名":"汉滨区","adcode":"610902","citycode":"0915"},{"中文名":"汉阴县","adcode":"610921","citycode":"0915"},{"中文名":"石泉县","adcode":"610922","citycode":"0915"},{"中文名":"宁陕县","adcode":"610923","citycode":"0915"},{"中文名":"紫阳县","adcode":"610924","citycode":"0915"},{"中文名":"岚皋县","adcode":"610925","citycode":"0915"},{"中文名":"平利县","adcode":"610926","citycode":"0915"},{"中文名":"镇坪县","adcode":"610927","citycode":"0915"},{"中文名":"旬阳县","adcode":"610928","citycode":"0915"},{"中文名":"白河县","adcode":"610929","citycode":"0915"},{"中文名":"商洛市","adcode":"611000","citycode":"0914"},{"中文名":"商洛市市辖区","adcode":"611001","citycode":"0914"},{"中文名":"商州区","adcode":"611002","citycode":"0914"},{"中文名":"洛南县","adcode":"611021","citycode":"0914"},{"中文名":"丹凤县","adcode":"611022","citycode":"0914"},{"中文名":"商南县","adcode":"611023","citycode":"0914"},{"中文名":"山阳县","adcode":"611024","citycode":"0914"},{"中文名":"镇安县","adcode":"611025","citycode":"0914"},{"中文名":"柞水县","adcode":"611026","citycode":"0914"},{"中文名":"甘肃省","adcode":"620000","citycode":""},{"中文名":"兰州市","adcode":"620100","citycode":"0931"},{"中文名":"兰州市市辖区","adcode":"620101","citycode":"0931"},{"中文名":"城关区","adcode":"620102","citycode":"0931"},{"中文名":"七里河区","adcode":"620103","citycode":"0931"},{"中文名":"西固区","adcode":"620104","citycode":"0931"},{"中文名":"安宁区","adcode":"620105","citycode":"0931"},{"中文名":"红古区","adcode":"620111","citycode":"0931"},{"中文名":"永登县","adcode":"620121","citycode":"0931"},{"中文名":"皋兰县","adcode":"620122","citycode":"0931"},{"中文名":"榆中县","adcode":"620123","citycode":"0931"},{"中文名":"嘉峪关市","adcode":"620200","citycode":"1937"},{"中文名":"嘉峪关市市辖区","adcode":"620201","citycode":"1937"},{"中文名":"金昌市","adcode":"620300","citycode":"0935"},{"中文名":"金昌市市辖区","adcode":"620301","citycode":"0935"},{"中文名":"金川区","adcode":"620302","citycode":"0935"},{"中文名":"永昌县","adcode":"620321","citycode":"0935"},{"中文名":"白银市","adcode":"620400","citycode":"0943"},{"中文名":"白银市市辖区","adcode":"620401","citycode":"0943"},{"中文名":"白银区","adcode":"620402","citycode":"0943"},{"中文名":"平川区","adcode":"620403","citycode":"0943"},{"中文名":"靖远县","adcode":"620421","citycode":"0943"},{"中文名":"会宁县","adcode":"620422","citycode":"0943"},{"中文名":"景泰县","adcode":"620423","citycode":"0943"},{"中文名":"天水市","adcode":"620500","citycode":"0938"},{"中文名":"天水市市辖区","adcode":"620501","citycode":"0938"},{"中文名":"秦州区","adcode":"620502","citycode":"0938"},{"中文名":"麦积区","adcode":"620503","citycode":"0938"},{"中文名":"清水县","adcode":"620521","citycode":"0938"},{"中文名":"秦安县","adcode":"620522","citycode":"0938"},{"中文名":"甘谷县","adcode":"620523","citycode":"0938"},{"中文名":"武山县","adcode":"620524","citycode":"0938"},{"中文名":"张家川回族自治县","adcode":"620525","citycode":"0938"},{"中文名":"武威市","adcode":"620600","citycode":"1935"},{"中文名":"武威市市辖区","adcode":"620601","citycode":"1935"},{"中文名":"凉州区","adcode":"620602","citycode":"1935"},{"中文名":"民勤县","adcode":"620621","citycode":"1935"},{"中文名":"古浪县","adcode":"620622","citycode":"1935"},{"中文名":"天祝藏族自治县","adcode":"620623","citycode":"1935"},{"中文名":"张掖市","adcode":"620700","citycode":"0936"},{"中文名":"张掖市市辖区","adcode":"620701","citycode":"0936"},{"中文名":"甘州区","adcode":"620702","citycode":"0936"},{"中文名":"肃南裕固族自治县","adcode":"620721","citycode":"0936"},{"中文名":"民乐县","adcode":"620722","citycode":"0936"},{"中文名":"临泽县","adcode":"620723","citycode":"0936"},{"中文名":"高台县","adcode":"620724","citycode":"0936"},{"中文名":"山丹县","adcode":"620725","citycode":"0936"},{"中文名":"平凉市","adcode":"620800","citycode":"0933"},{"中文名":"平凉市市辖区","adcode":"620801","citycode":"0933"},{"中文名":"崆峒区","adcode":"620802","citycode":"0933"},{"中文名":"泾川县","adcode":"620821","citycode":"0933"},{"中文名":"灵台县","adcode":"620822","citycode":"0933"},{"中文名":"崇信县","adcode":"620823","citycode":"0933"},{"中文名":"华亭市","adcode":"620881","citycode":"0933"},{"中文名":"庄浪县","adcode":"620825","citycode":"0933"},{"中文名":"静宁县","adcode":"620826","citycode":"0933"},{"中文名":"酒泉市","adcode":"620900","citycode":"0937"},{"中文名":"酒泉市市辖区","adcode":"620901","citycode":"0937"},{"中文名":"肃州区","adcode":"620902","citycode":"0937"},{"中文名":"金塔县","adcode":"620921","citycode":"0937"},{"中文名":"瓜州县","adcode":"620922","citycode":"0937"},{"中文名":"肃北蒙古族自治县","adcode":"620923","citycode":"0937"},{"中文名":"阿克塞哈萨克族自治县","adcode":"620924","citycode":"0937"},{"中文名":"玉门市","adcode":"620981","citycode":"0937"},{"中文名":"敦煌市","adcode":"620982","citycode":"0937"},{"中文名":"庆阳市","adcode":"621000","citycode":"0934"},{"中文名":"庆阳市市辖区","adcode":"621001","citycode":"0934"},{"中文名":"西峰区","adcode":"621002","citycode":"0934"},{"中文名":"庆城县","adcode":"621021","citycode":"0934"},{"中文名":"环县","adcode":"621022","citycode":"0934"},{"中文名":"华池县","adcode":"621023","citycode":"0934"},{"中文名":"合水县","adcode":"621024","citycode":"0934"},{"中文名":"正宁县","adcode":"621025","citycode":"0934"},{"中文名":"宁县","adcode":"621026","citycode":"0934"},{"中文名":"镇原县","adcode":"621027","citycode":"0934"},{"中文名":"定西市","adcode":"621100","citycode":"0932"},{"中文名":"定西市市辖区","adcode":"621101","citycode":"0932"},{"中文名":"安定区","adcode":"621102","citycode":"0932"},{"中文名":"通渭县","adcode":"621121","citycode":"0932"},{"中文名":"陇西县","adcode":"621122","citycode":"0932"},{"中文名":"渭源县","adcode":"621123","citycode":"0932"},{"中文名":"临洮县","adcode":"621124","citycode":"0932"},{"中文名":"漳县","adcode":"621125","citycode":"0932"},{"中文名":"岷县","adcode":"621126","citycode":"0932"},{"中文名":"陇南市","adcode":"621200","citycode":"2935"},{"中文名":"陇南市市辖区","adcode":"621201","citycode":"2935"},{"中文名":"武都区","adcode":"621202","citycode":"2935"},{"中文名":"成县","adcode":"621221","citycode":"2935"},{"中文名":"文县","adcode":"621222","citycode":"2935"},{"中文名":"宕昌县","adcode":"621223","citycode":"2935"},{"中文名":"康县","adcode":"621224","citycode":"2935"},{"中文名":"西和县","adcode":"621225","citycode":"2935"},{"中文名":"礼县","adcode":"621226","citycode":"2935"},{"中文名":"徽县","adcode":"621227","citycode":"2935"},{"中文名":"两当县","adcode":"621228","citycode":"2935"},{"中文名":"临夏回族自治州","adcode":"622900","citycode":"0930"},{"中文名":"临夏市","adcode":"622901","citycode":"0930"},{"中文名":"临夏县","adcode":"622921","citycode":"0930"},{"中文名":"康乐县","adcode":"622922","citycode":"0930"},{"中文名":"永靖县","adcode":"622923","citycode":"0930"},{"中文名":"广河县","adcode":"622924","citycode":"0930"},{"中文名":"和政县","adcode":"622925","citycode":"0930"},{"中文名":"东乡族自治县","adcode":"622926","citycode":"0930"},{"中文名":"积石山保安族东乡族撒拉族自治县","adcode":"622927","citycode":"0930"},{"中文名":"甘南藏族自治州","adcode":"623000","citycode":"0941"},{"中文名":"合作市","adcode":"623001","citycode":"0941"},{"中文名":"临潭县","adcode":"623021","citycode":"0941"},{"中文名":"卓尼县","adcode":"623022","citycode":"0941"},{"中文名":"舟曲县","adcode":"623023","citycode":"0941"},{"中文名":"迭部县","adcode":"623024","citycode":"0941"},{"中文名":"玛曲县","adcode":"623025","citycode":"0941"},{"中文名":"碌曲县","adcode":"623026","citycode":"0941"},{"中文名":"夏河县","adcode":"623027","citycode":"0941"},{"中文名":"青海省","adcode":"630000","citycode":""},{"中文名":"西宁市","adcode":"630100","citycode":"0971"},{"中文名":"西宁市市辖区","adcode":"630101","citycode":"0971"},{"中文名":"城东区","adcode":"630102","citycode":"0971"},{"中文名":"城中区","adcode":"630103","citycode":"0971"},{"中文名":"城西区","adcode":"630104","citycode":"0971"},{"中文名":"城北区","adcode":"630105","citycode":"0971"},{"中文名":"大通回族土族自治县","adcode":"630121","citycode":"0971"},{"中文名":"湟中区","adcode":"630106","citycode":"0971"},{"中文名":"湟源县","adcode":"630123","citycode":"0971"},{"中文名":"海东市","adcode":"630200","citycode":"0972"},{"中文名":"乐都区","adcode":"630202","citycode":"0972"},{"中文名":"平安区","adcode":"630203","citycode":"0972"},{"中文名":"民和回族土族自治县","adcode":"630222","citycode":"0972"},{"中文名":"互助土族自治县","adcode":"630223","citycode":"0972"},{"中文名":"化隆回族自治县","adcode":"630224","citycode":"0972"},{"中文名":"循化撒拉族自治县","adcode":"630225","citycode":"0972"},{"中文名":"海北藏族自治州","adcode":"632200","citycode":"0970"},{"中文名":"门源回族自治县","adcode":"632221","citycode":"0970"},{"中文名":"祁连县","adcode":"632222","citycode":"0970"},{"中文名":"海晏县","adcode":"632223","citycode":"0970"},{"中文名":"刚察县","adcode":"632224","citycode":"0970"},{"中文名":"黄南藏族自治州","adcode":"632300","citycode":"0973"},{"中文名":"同仁县","adcode":"632321","citycode":"0973"},{"中文名":"尖扎县","adcode":"632322","citycode":"0973"},{"中文名":"泽库县","adcode":"632323","citycode":"0973"},{"中文名":"河南蒙古族自治县","adcode":"632324","citycode":"0973"},{"中文名":"海南藏族自治州","adcode":"632500","citycode":"0974"},{"中文名":"共和县","adcode":"632521","citycode":"0974"},{"中文名":"同德县","adcode":"632522","citycode":"0974"},{"中文名":"贵德县","adcode":"632523","citycode":"0974"},{"中文名":"兴海县","adcode":"632524","citycode":"0974"},{"中文名":"贵南县","adcode":"632525","citycode":"0974"},{"中文名":"果洛藏族自治州","adcode":"632600","citycode":"0975"},{"中文名":"玛沁县","adcode":"632621","citycode":"0975"},{"中文名":"班玛县","adcode":"632622","citycode":"0975"},{"中文名":"甘德县","adcode":"632623","citycode":"0975"},{"中文名":"达日县","adcode":"632624","citycode":"0975"},{"中文名":"久治县","adcode":"632625","citycode":"0975"},{"中文名":"玛多县","adcode":"632626","citycode":"0975"},{"中文名":"玉树藏族自治州","adcode":"632700","citycode":"0976"},{"中文名":"玉树市","adcode":"632701","citycode":"0976"},{"中文名":"杂多县","adcode":"632722","citycode":"0976"},{"中文名":"称多县","adcode":"632723","citycode":"0976"},{"中文名":"治多县","adcode":"632724","citycode":"0976"},{"中文名":"囊谦县","adcode":"632725","citycode":"0976"},{"中文名":"曲麻莱县","adcode":"632726","citycode":"0976"},{"中文名":"海西蒙古族藏族自治州","adcode":"632800","citycode":"0977"},{"中文名":"格尔木市","adcode":"632801","citycode":"0977"},{"中文名":"德令哈市","adcode":"632802","citycode":"0977"},{"中文名":"茫崖市","adcode":"632803","citycode":"0977"},{"中文名":"乌兰县","adcode":"632821","citycode":"0977"},{"中文名":"都兰县","adcode":"632822","citycode":"0977"},{"中文名":"天峻县","adcode":"632823","citycode":"0977"},{"中文名":"海西蒙古族藏族自治州直辖","adcode":"632825","citycode":"0977"},{"中文名":"宁夏回族自治区","adcode":"640000","citycode":""},{"中文名":"银川市","adcode":"640100","citycode":"0951"},{"中文名":"银川市市辖区","adcode":"640101","citycode":"0951"},{"中文名":"兴庆区","adcode":"640104","citycode":"0951"},{"中文名":"西夏区","adcode":"640105","citycode":"0951"},{"中文名":"金凤区","adcode":"640106","citycode":"0951"},{"中文名":"永宁县","adcode":"640121","citycode":"0951"},{"中文名":"贺兰县","adcode":"640122","citycode":"0951"},{"中文名":"灵武市","adcode":"640181","citycode":"0951"},{"中文名":"石嘴山市","adcode":"640200","citycode":"0952"},{"中文名":"石嘴山市市辖区","adcode":"640201","citycode":"0952"},{"中文名":"大武口区","adcode":"640202","citycode":"0952"},{"中文名":"惠农区","adcode":"640205","citycode":"0952"},{"中文名":"平罗县","adcode":"640221","citycode":"0952"},{"中文名":"吴忠市","adcode":"640300","citycode":"0953"},{"中文名":"吴忠市市辖区","adcode":"640301","citycode":"0953"},{"中文名":"利通区","adcode":"640302","citycode":"0953"},{"中文名":"红寺堡区","adcode":"640303","citycode":"0953"},{"中文名":"盐池县","adcode":"640323","citycode":"0953"},{"中文名":"同心县","adcode":"640324","citycode":"0953"},{"中文名":"青铜峡市","adcode":"640381","citycode":"0953"},{"中文名":"固原市","adcode":"640400","citycode":"0954"},{"中文名":"固原市市辖区","adcode":"640401","citycode":"0954"},{"中文名":"原州区","adcode":"640402","citycode":"0954"},{"中文名":"西吉县","adcode":"640422","citycode":"0954"},{"中文名":"隆德县","adcode":"640423","citycode":"0954"},{"中文名":"泾源县","adcode":"640424","citycode":"0954"},{"中文名":"彭阳县","adcode":"640425","citycode":"0954"},{"中文名":"中卫市","adcode":"640500","citycode":"1953"},{"中文名":"中卫市市辖区","adcode":"640501","citycode":"1953"},{"中文名":"沙坡头区","adcode":"640502","citycode":"1953"},{"中文名":"中宁县","adcode":"640521","citycode":"1953"},{"中文名":"海原县","adcode":"640522","citycode":"1953"},{"中文名":"新疆维吾尔自治区","adcode":"650000","citycode":""},{"中文名":"乌鲁木齐市","adcode":"650100","citycode":"0991"},{"中文名":"乌鲁木齐市市辖区","adcode":"650101","citycode":"0991"},{"中文名":"天山区","adcode":"650102","citycode":"0991"},{"中文名":"沙依巴克区","adcode":"650103","citycode":"0991"},{"中文名":"新市区","adcode":"650104","citycode":"0991"},{"中文名":"水磨沟区","adcode":"650105","citycode":"0991"},{"中文名":"头屯河区","adcode":"650106","citycode":"0991"},{"中文名":"达坂城区","adcode":"650107","citycode":"0991"},{"中文名":"米东区","adcode":"650109","citycode":"0991"},{"中文名":"乌鲁木齐县","adcode":"650121","citycode":"0991"},{"中文名":"克拉玛依市","adcode":"650200","citycode":"0990"},{"中文名":"克拉玛依市市辖区","adcode":"650201","citycode":"0990"},{"中文名":"独山子区","adcode":"650202","citycode":"0990"},{"中文名":"克拉玛依区","adcode":"650203","citycode":"0990"},{"中文名":"白碱滩区","adcode":"650204","citycode":"0990"},{"中文名":"乌尔禾区","adcode":"650205","citycode":"0990"},{"中文名":"吐鲁番市","adcode":"650400","citycode":"0995"},{"中文名":"高昌区","adcode":"650402","citycode":"0995"},{"中文名":"鄯善县","adcode":"650421","citycode":"0995"},{"中文名":"托克逊县","adcode":"650422","citycode":"0995"},{"中文名":"胡杨河市","adcode":"659010","citycode":"0992"},{"中文名":"哈密市","adcode":"650500","citycode":"0902"},{"中文名":"伊州区","adcode":"650502","citycode":"0902"},{"中文名":"巴里坤哈萨克自治县","adcode":"650521","citycode":"0902"},{"中文名":"伊吾县","adcode":"650522","citycode":"0902"},{"中文名":"昌吉回族自治州","adcode":"652300","citycode":"0994"},{"中文名":"昌吉市","adcode":"652301","citycode":"0994"},{"中文名":"阜康市","adcode":"652302","citycode":"0994"},{"中文名":"呼图壁县","adcode":"652323","citycode":"0994"},{"中文名":"玛纳斯县","adcode":"652324","citycode":"0994"},{"中文名":"奇台县","adcode":"652325","citycode":"0994"},{"中文名":"吉木萨尔县","adcode":"652327","citycode":"0994"},{"中文名":"木垒哈萨克自治县","adcode":"652328","citycode":"0994"},{"中文名":"博尔塔拉蒙古自治州","adcode":"652700","citycode":"0909"},{"中文名":"博乐市","adcode":"652701","citycode":"0909"},{"中文名":"阿拉山口市","adcode":"652702","citycode":"0909"},{"中文名":"精河县","adcode":"652722","citycode":"0909"},{"中文名":"温泉县","adcode":"652723","citycode":"0909"},{"中文名":"巴音郭楞蒙古自治州","adcode":"652800","citycode":"0996"},{"中文名":"库尔勒市","adcode":"652801","citycode":"0996"},{"中文名":"轮台县","adcode":"652822","citycode":"0996"},{"中文名":"尉犁县","adcode":"652823","citycode":"0996"},{"中文名":"若羌县","adcode":"652824","citycode":"0996"},{"中文名":"且末县","adcode":"652825","citycode":"0996"},{"中文名":"焉耆回族自治县","adcode":"652826","citycode":"0996"},{"中文名":"和静县","adcode":"652827","citycode":"0996"},{"中文名":"和硕县","adcode":"652828","citycode":"0996"},{"中文名":"博湖县","adcode":"652829","citycode":"0996"},{"中文名":"阿克苏地区","adcode":"652900","citycode":"0997"},{"中文名":"阿克苏市","adcode":"652901","citycode":"0997"},{"中文名":"温宿县","adcode":"652922","citycode":"0997"},{"中文名":"库车市","adcode":"652902","citycode":"0997"},{"中文名":"沙雅县","adcode":"652924","citycode":"0997"},{"中文名":"新和县","adcode":"652925","citycode":"0997"},{"中文名":"拜城县","adcode":"652926","citycode":"0997"},{"中文名":"乌什县","adcode":"652927","citycode":"0997"},{"中文名":"阿瓦提县","adcode":"652928","citycode":"0997"},{"中文名":"柯坪县","adcode":"652929","citycode":"0997"},{"中文名":"克孜勒苏柯尔克孜自治州","adcode":"653000","citycode":"0908"},{"中文名":"阿图什市","adcode":"653001","citycode":"0908"},{"中文名":"阿克陶县","adcode":"653022","citycode":"0908"},{"中文名":"阿合奇县","adcode":"653023","citycode":"0908"},{"中文名":"乌恰县","adcode":"653024","citycode":"0908"},{"中文名":"喀什地区","adcode":"653100","citycode":"0998"},{"中文名":"喀什市","adcode":"653101","citycode":"0998"},{"中文名":"疏附县","adcode":"653121","citycode":"0998"},{"中文名":"疏勒县","adcode":"653122","citycode":"0998"},{"中文名":"英吉沙县","adcode":"653123","citycode":"0998"},{"中文名":"泽普县","adcode":"653124","citycode":"0998"},{"中文名":"莎车县","adcode":"653125","citycode":"0998"},{"中文名":"叶城县","adcode":"653126","citycode":"0998"},{"中文名":"麦盖提县","adcode":"653127","citycode":"0998"},{"中文名":"岳普湖县","adcode":"653128","citycode":"0998"},{"中文名":"伽师县","adcode":"653129","citycode":"0998"},{"中文名":"巴楚县","adcode":"653130","citycode":"0998"},{"中文名":"塔什库尔干塔吉克自治县","adcode":"653131","citycode":"0998"},{"中文名":"和田地区","adcode":"653200","citycode":"0903"},{"中文名":"和田市","adcode":"653201","citycode":"0903"},{"中文名":"和田县","adcode":"653221","citycode":"0903"},{"中文名":"墨玉县","adcode":"653222","citycode":"0903"},{"中文名":"皮山县","adcode":"653223","citycode":"0903"},{"中文名":"洛浦县","adcode":"653224","citycode":"0903"},{"中文名":"策勒县","adcode":"653225","citycode":"0903"},{"中文名":"于田县","adcode":"653226","citycode":"0903"},{"中文名":"民丰县","adcode":"653227","citycode":"0903"},{"中文名":"伊犁哈萨克自治州","adcode":"654000","citycode":"0999"},{"中文名":"伊宁市","adcode":"654002","citycode":"0999"},{"中文名":"奎屯市","adcode":"654003","citycode":"0999"},{"中文名":"霍尔果斯市","adcode":"654004","citycode":"0999"},{"中文名":"伊宁县","adcode":"654021","citycode":"0999"},{"中文名":"察布查尔锡伯自治县","adcode":"654022","citycode":"0999"},{"中文名":"霍城县","adcode":"654023","citycode":"0999"},{"中文名":"巩留县","adcode":"654024","citycode":"0999"},{"中文名":"新源县","adcode":"654025","citycode":"0999"},{"中文名":"昭苏县","adcode":"654026","citycode":"0999"},{"中文名":"特克斯县","adcode":"654027","citycode":"0999"},{"中文名":"尼勒克县","adcode":"654028","citycode":"0999"},{"中文名":"塔城地区","adcode":"654200","citycode":"0901"},{"中文名":"塔城市","adcode":"654201","citycode":"0901"},{"中文名":"乌苏市","adcode":"654202","citycode":"0901"},{"中文名":"额敏县","adcode":"654221","citycode":"0901"},{"中文名":"沙湾县","adcode":"654223","citycode":"0901"},{"中文名":"托里县","adcode":"654224","citycode":"0901"},{"中文名":"裕民县","adcode":"654225","citycode":"0901"},{"中文名":"和布克赛尔蒙古自治县","adcode":"654226","citycode":"0901"},{"中文名":"阿勒泰地区","adcode":"654300","citycode":"0906"},{"中文名":"阿勒泰市","adcode":"654301","citycode":"0906"},{"中文名":"布尔津县","adcode":"654321","citycode":"0906"},{"中文名":"富蕴县","adcode":"654322","citycode":"0906"},{"中文名":"福海县","adcode":"654323","citycode":"0906"},{"中文名":"哈巴河县","adcode":"654324","citycode":"0906"},{"中文名":"青河县","adcode":"654325","citycode":"0906"},{"中文名":"吉木乃县","adcode":"654326","citycode":"0906"},{"中文名":"石河子市","adcode":"659001","citycode":"0993"},{"中文名":"阿拉尔市","adcode":"659002","citycode":"1997"},{"中文名":"图木舒克市","adcode":"659003","citycode":"1998"},{"中文名":"五家渠市","adcode":"659004","citycode":"1994"},{"中文名":"北屯市","adcode":"659005","citycode":"1906"},{"中文名":"铁门关市","adcode":"659006","citycode":"1996"},{"中文名":"双河市","adcode":"659007","citycode":"1909"},{"中文名":"可克达拉市","adcode":"659008","citycode":"1999"},{"中文名":"昆玉市","adcode":"659009","citycode":"1903"},{"中文名":"台湾省","adcode":"710000","citycode":"1886"},{"中文名":"香港特别行政区","adcode":"810000","citycode":"1852"},{"中文名":"中西区","adcode":"810001","citycode":"1852"},{"中文名":"湾仔区","adcode":"810002","citycode":"1852"},{"中文名":"东区","adcode":"810003","citycode":"1852"},{"中文名":"南区","adcode":"810004","citycode":"1852"},{"中文名":"油尖旺区","adcode":"810005","citycode":"1852"},{"中文名":"深水埗区","adcode":"810006","citycode":"1852"},{"中文名":"九龙城区","adcode":"810007","citycode":"1852"},{"中文名":"黄大仙区","adcode":"810008","citycode":"1852"},{"中文名":"观塘区","adcode":"810009","citycode":"1852"},{"中文名":"荃湾区","adcode":"810010","citycode":"1852"},{"中文名":"屯门区","adcode":"810011","citycode":"1852"},{"中文名":"元朗区","adcode":"810012","citycode":"1852"},{"中文名":"北区","adcode":"810013","citycode":"1852"},{"中文名":"大埔区","adcode":"810014","citycode":"1852"},{"中文名":"西贡区","adcode":"810015","citycode":"1852"},{"中文名":"沙田区","adcode":"810016","citycode":"1852"},{"中文名":"葵青区","adcode":"810017","citycode":"1852"},{"中文名":"离岛区","adcode":"810018","citycode":"1852"},{"中文名":"澳门特别行政区","adcode":"820000","citycode":"1853"},{"中文名":"花地玛堂区","adcode":"820001","citycode":"1853"},{"中文名":"花王堂区","adcode":"820002","citycode":"1853"},{"中文名":"望德堂区","adcode":"820003","citycode":"1853"},{"中文名":"大堂区","adcode":"820004","citycode":"1853"},{"中文名":"风顺堂区","adcode":"820005","citycode":"1853"},{"中文名":"嘉模堂区","adcode":"820006","citycode":"1853"},{"中文名":"路凼填海区","adcode":"820007","citycode":"1853"},{"中文名":"圣方济各堂区","adcode":"820008","citycode":"1853"},{"中文名":"外国","adcode":"900000","citycode":"1900"}];

/***/ }),

/***/ 273:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function n(e, t) {return e(t = { exports: {} }, t.exports), t.exports;}var r = n(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),r = {},o = r.lib = {},s = o.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = o.WordArray = s.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,r = this.sigBytes,o = e.sigBytes;if (this.clamp(), r % 4) for (var s = 0; s < o; s++) {var i = n[s >>> 2] >>> 24 - s % 4 * 8 & 255;t[r + s >>> 2] |= i << 24 - (r + s) % 4 * 8;} else for (s = 0; s < o; s += 4) {t[r + s >>> 2] = n[s >>> 2];}return this.sigBytes += o, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = s.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, r = [], o = function o(t) {t = t;var n = 987654321,r = 4294967295;return function () {var o = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;return o /= 4294967296, (o += .5) * (e.random() > .5 ? 1 : -1);};}, s = 0; s < t; s += 4) {var a = o(4294967296 * (n || e.random()));n = 987654071 * a(), r.push(4294967296 * a() | 0);}return new i.init(r, t);} }),a = r.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {var s = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;r.push((s >>> 4).toString(16)), r.push((15 & s).toString(16));}return r.join("");}, parse: function parse(e) {for (var t = e.length, n = [], r = 0; r < t; r += 2) {n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {var s = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;r.push(String.fromCharCode(s));}return r.join("");}, parse: function parse(e) {for (var t = e.length, n = [], r = 0; r < t; r++) {n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;}return new i.init(n, t);} },l = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },f = o.BufferedBlockAlgorithm = s.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,r = n.words,o = n.sigBytes,s = this.blockSize,a = o / (4 * s),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * s,u = e.min(4 * c, o);if (c) {for (var l = 0; l < c; l += s) {this._doProcessBlock(r, l);}var f = r.splice(0, c);n.sigBytes -= u;}return new i.init(f, u);}, clone: function clone() {var e = s.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),p = (o.Hasher = f.extend({ cfg: s.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {f.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new p.HMAC.init(e, n).finalize(t);};} }), r.algo = {});return r;}(Math), n);}),o = (n(function (e, t) {var n;e.exports = (n = r, function (e) {var t = n,r = t.lib,o = r.WordArray,s = r.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = s.extend({ _doReset: function _doReset() {this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var r = t + n,o = e[r];e[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);}var s = this._hash.words,i = e[t + 0],c = e[t + 1],h = e[t + 2],d = e[t + 3],y = e[t + 4],v = e[t + 5],g = e[t + 6],_ = e[t + 7],m = e[t + 8],b = e[t + 9],w = e[t + 10],E = e[t + 11],T = e[t + 12],O = e[t + 13],S = e[t + 14],k = e[t + 15],A = s[0],P = s[1],I = s[2],N = s[3];A = u(A, P, I, N, i, 7, a[0]), N = u(N, A, P, I, c, 12, a[1]), I = u(I, N, A, P, h, 17, a[2]), P = u(P, I, N, A, d, 22, a[3]), A = u(A, P, I, N, y, 7, a[4]), N = u(N, A, P, I, v, 12, a[5]), I = u(I, N, A, P, g, 17, a[6]), P = u(P, I, N, A, _, 22, a[7]), A = u(A, P, I, N, m, 7, a[8]), N = u(N, A, P, I, b, 12, a[9]), I = u(I, N, A, P, w, 17, a[10]), P = u(P, I, N, A, E, 22, a[11]), A = u(A, P, I, N, T, 7, a[12]), N = u(N, A, P, I, O, 12, a[13]), I = u(I, N, A, P, S, 17, a[14]), A = l(A, P = u(P, I, N, A, k, 22, a[15]), I, N, c, 5, a[16]), N = l(N, A, P, I, g, 9, a[17]), I = l(I, N, A, P, E, 14, a[18]), P = l(P, I, N, A, i, 20, a[19]), A = l(A, P, I, N, v, 5, a[20]), N = l(N, A, P, I, w, 9, a[21]), I = l(I, N, A, P, k, 14, a[22]), P = l(P, I, N, A, y, 20, a[23]), A = l(A, P, I, N, b, 5, a[24]), N = l(N, A, P, I, S, 9, a[25]), I = l(I, N, A, P, d, 14, a[26]), P = l(P, I, N, A, m, 20, a[27]), A = l(A, P, I, N, O, 5, a[28]), N = l(N, A, P, I, h, 9, a[29]), I = l(I, N, A, P, _, 14, a[30]), A = f(A, P = l(P, I, N, A, T, 20, a[31]), I, N, v, 4, a[32]), N = f(N, A, P, I, m, 11, a[33]), I = f(I, N, A, P, E, 16, a[34]), P = f(P, I, N, A, S, 23, a[35]), A = f(A, P, I, N, c, 4, a[36]), N = f(N, A, P, I, y, 11, a[37]), I = f(I, N, A, P, _, 16, a[38]), P = f(P, I, N, A, w, 23, a[39]), A = f(A, P, I, N, O, 4, a[40]), N = f(N, A, P, I, i, 11, a[41]), I = f(I, N, A, P, d, 16, a[42]), P = f(P, I, N, A, g, 23, a[43]), A = f(A, P, I, N, b, 4, a[44]), N = f(N, A, P, I, T, 11, a[45]), I = f(I, N, A, P, k, 16, a[46]), A = p(A, P = f(P, I, N, A, h, 23, a[47]), I, N, i, 6, a[48]), N = p(N, A, P, I, _, 10, a[49]), I = p(I, N, A, P, S, 15, a[50]), P = p(P, I, N, A, v, 21, a[51]), A = p(A, P, I, N, T, 6, a[52]), N = p(N, A, P, I, d, 10, a[53]), I = p(I, N, A, P, w, 15, a[54]), P = p(P, I, N, A, c, 21, a[55]), A = p(A, P, I, N, m, 6, a[56]), N = p(N, A, P, I, k, 10, a[57]), I = p(I, N, A, P, g, 15, a[58]), P = p(P, I, N, A, O, 21, a[59]), A = p(A, P, I, N, y, 6, a[60]), N = p(N, A, P, I, E, 10, a[61]), I = p(I, N, A, P, h, 15, a[62]), P = p(P, I, N, A, b, 21, a[63]), s[0] = s[0] + A | 0, s[1] = s[1] + P | 0, s[2] = s[2] + I | 0, s[3] = s[3] + N | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,r = 8 * this._nDataBytes,o = 8 * t.sigBytes;n[o >>> 5] |= 128 << 24 - o % 32;var s = e.floor(r / 4294967296),i = r;n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var l = c[u];c[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);}return a;}, clone: function clone() {var e = s.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, r, o, s, i) {var a = e + (t & n | ~t & r) + o + i;return (a << s | a >>> 32 - s) + t;}function l(e, t, n, r, o, s, i) {var a = e + (t & r | n & ~r) + o + i;return (a << s | a >>> 32 - s) + t;}function f(e, t, n, r, o, s, i) {var a = e + (t ^ n ^ r) + o + i;return (a << s | a >>> 32 - s) + t;}function p(e, t, n, r, o, s, i) {var a = e + (n ^ (t | ~r)) + o + i;return (a << s | a >>> 32 - s) + t;}t.MD5 = s._createHelper(c), t.HmacMD5 = s._createHmacHelper(c);}(Math), n.MD5);}), n(function (e, t) {var n, o, s;e.exports = (o = (n = r).lib.Base, s = n.enc.Utf8, void (n.algo.HMAC = o.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = s.parse(t));var n = e.blockSize,r = 4 * n;t.sigBytes > r && (t = e.finalize(t)), t.clamp();for (var o = this._oKey = t.clone(), i = this._iKey = t.clone(), a = o.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}o.sigBytes = i.sigBytes = r, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), n(function (e, t) {e.exports = r.HmacMD5;}));var s = /*#__PURE__*/function (_Error) {_inherits(s, _Error);var _super = _createSuper(s);function s(e) {var _this;_classCallCheck(this, s);_this = _super.call(this, e.message), _this.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this;}return s;}( /*#__PURE__*/_wrapNativeSuper(Error));var i = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), o(n, t).toString();}, wrappedRequest: function wrappedRequest(e) {return new Promise(function (t, n) {uni.request(Object.assign(e, { complete: function complete(e) {e || (e = {}), 0 === e.errMsg.indexOf("request:fail") && "h5" === "mp-weixin" && "development" === "development" && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=H5%E4%B8%AD%E4%BD%BF%E7%94%A8unicloud");var r = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new s({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: r }));var o = e.data;if (o.error) return n(new s({ code: o.error.code, message: o.error.message, requestId: r }));o.result = o.data, o.requestId = r, delete o.data, t(o);} }));});} };var a = { image: "image/*", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml", mp3: "audio/mp3", mp4: "video/mp4", ogg: "audio/ogg", webm: "video/webm" };function c(e) {return a[e.toLowerCase()];}var u = /*#__PURE__*/function () {function u(e) {_classCallCheck(this, u);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error("\u7F3A\u5C11\u53C2\u6570".concat(t));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId;}_createClass(u, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestAuth", value: function requestAuth(e) {return i.wrappedRequest(e);} }, { key: "request", value: function request(e, t) {var _this2 = this;return this.hasAccessToken ? t ? i.wrappedRequest(e) : i.wrappedRequest(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this2.getAccessToken();}).then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});}) : this.getAccessToken().then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = i.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),r = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, r["x-basement-token"] = this.accessToken), r["x-serverless-sign"] = i.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: r };} }, { key: "getAccessToken", value: function getAccessToken() {var _this3 = this;return this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this3.setAccessToken(e.result.accessToken), t(_this3.accessToken)) : n(new s({ code: "AUTH_FAILED", message: "获取accessToken失败" }));});});} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var _this4 = this;var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.config.useDebugFunction ? this.request(this.setupRequest(t)).then(function (t) {if (t && t.requestId) {var _n = JSON.stringify({ spaceId: _this4.config.spaceId, functionName: e.name, requestId: t.requestId });console.log("[aliyun-request]".concat(_n, "[/aliyun-request]"));}return Promise.resolve(t);}).catch(function (t) {if (t && t.requestId) {var _n2 = JSON.stringify({ spaceId: _this4.config.spaceId, functionName: e.name, requestId: t.requestId });console.log("[aliyun-request]".concat(_n2, "[/aliyun-request]"));}return Promise.reject(t);}) : this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var e = _ref.url,t = _ref.formData,n = _ref.fileName,r = _ref.name,o = _ref.filePath,i = _ref.fileType,a = _ref.contentType,c = _ref.onUploadProgress;return new Promise(function (a, u) {var l = uni.uploadFile({ url: e, formData: t, fileName: n, name: r, filePath: o, fileType: i, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? a(e) : u(new s({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {u(e);} });"function" == typeof c && l.onProgressUpdate(function (e) {c({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this5 = this;var e = _ref2.filePath,t = _ref2.cloudPath,n = _ref2.onUploadProgress,r = _ref2.config;var o = r && r.envType || this.config.envType;var i,u,l,f,p,h = t || e.split("/").pop();return (i =  false ? undefined : c(u = e.split("?")[0].split(".").pop()) ? Promise.resolve() : Promise.reject(new s({ code: "UNSUPPORTED_FILE_TYPE", message: "不支持的文件类型" }))).then(function () {return new Promise(function (t, n) {uni.getFileInfo ? uni.getFileInfo({ filePath: e, success: function success(e) {t(e.size);}, fail: function fail(e) {n(e);} }) : t(0);});}).then(function (e) {return _this5.getOSSUploadOptionsFromPath({ env: o, filename: h, size: e });}).then(function (t) {var r = t.result;l = c(u), f = r.id, p = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: f, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: "image", contentType: l };return _this5.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this5.reportOSSUpload({ id: f, contentType: l });}).then(function (t) {return new Promise(function (n, r) {t.success ? n({ success: !0, filePath: e, fileID: p }) : r(new s({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return u;}();var l = __webpack_require__(/*! uni-stat-config */ 274).default || __webpack_require__(/*! uni-stat-config */ 274),f = "__DC_STAT_UUID",p = "__DC_UUID_VALUE",h = "https://ide.dcloud.net.cn/serverless/function/invoke";var d, y;function v() {if ("n" === g()) {try {d = plus.runtime.getDCloudId();} catch (e) {d = "";}return d;}return d || (d = Date.now() + "" + Math.floor(1e7 * Math.random()), uni.setStorage({ key: f, data: d })), d;}function g() {return { "app-plus": "n", h5: "h5", "mp-weixin": "wx", "mp-alipay": "ali", "mp-baidu": "bd", "mp-toutiao": "tt", "mp-qq": "qq", "quickapp-native": "qn" }["mp-weixin"];}function _(e) {return function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}).catch(function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}setTimeout(function () {uni.getStorage({ key: f, success: function success(e) {d = e.data;}, fail: function fail() {d = p;} }), y = "qn" === g() ? "android" : uni.getSystemInfoSync().platform;}, 0);var m = { init: function init(e) {var t = new u(e);return ["uploadFile", "deleteFile"].forEach(function (e) {t[e] = _(t[e]).bind(t);}), setTimeout(function () {t.authorize();}, 0), t;} };var b;function w(e, t, n) {void 0 === n && (n = {});var r = /\?/.test(t),o = "";for (var s in n) {"" === o ? !r && (t += "?") : o += "&", o += s + "=" + encodeURIComponent(n[s]);}return /^http(s)?\:\/\//.test(t += o) ? t : "" + e + t;}!function (e) {e.local = "local", e.none = "none", e.session = "session";}(b || (b = {}));var _E,T = (_E = function E(e, t) {return (_E = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(e, t);}, function (e, t) {function n() {this.constructor = e;}_E(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());}),_O = function O() {return (_O = Object.assign || function (e) {for (var t, n = 1, r = arguments.length; n < r; n++) {for (var o in t = arguments[n]) {Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);}}return e;}).apply(this, arguments);};var S = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return T(t, e), t.prototype.post = function (e) {var t = e.url,n = e.data,r = e.headers;return new Promise(function (e, o) {uni.request({ url: w("https:", t), data: n, method: "POST", header: r, success: function success(t) {e(t);}, fail: function fail(e) {o(e);} });});}, t.prototype.upload = function (e) {return new Promise(function (t) {var n = e.url,r = e.file,o = e.data,s = e.headers;uni.uploadFile({ url: w("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, header: s, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (n.statusCode = parseInt(o.success_action_status, 10)), t(n);}, fail: function fail(e) {t(e);} });});}, t.prototype.download = function (e) {var t = e.url,n = e.headers;return new Promise(function (e, r) {uni.downloadFile({ url: w("https:", t), header: n, success: function success(t) {200 === t.statusCode && t.tempFilePath ? e({ statusCode: 200, tempFilePath: t.tempFilePath }) : e(t);}, fail: function fail(e) {r(e);} });});}, t;}(function () {}),k = { setItem: function setItem(e, t) {uni.setStorageSync(e, t);}, getItem: function getItem(e) {return uni.getStorageSync(e);}, removeItem: function removeItem(e) {uni.removeStorageSync(e);}, clear: function clear() {uni.clearStorageSync();} },A = function A(e, t) {void 0 === t && (t = {});var n = uni.connectSocket(_O({ url: e }, t));return { set onopen(e) {n.onOpen(e);}, set onmessage(e) {n.onMessage(e);}, set onclose(e) {n.onClose(e);}, set onerror(e) {n.onError(e);}, send: function send(e) {return n.send({ data: e });}, close: function close(e, t) {return n.close({ code: e, reason: t });}, get readyState() {return n.readyState;}, CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 };};var P = { genAdapter: function genAdapter() {return { root: {}, reqClass: S, wsClass: A, localStorage: k, primaryStorage: b.local };}, isMatch: function isMatch() {return "undefined" != typeof uni && !!uni.request;}, runtime: "uni_app" },I = n(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 }), t.getQuery = function (e, t) {if ("undefined" == typeof window) return !1;var n = t || window.location.search,r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),o = n.substr(n.indexOf("?") + 1).match(r);return null != o ? o[2] : "";}, t.getHash = function (e) {var t = window.location.hash.match(new RegExp("[#?&/]" + e + "=([^&#]*)"));return t ? t[1] : "";}, t.removeParam = function (e, t) {var n = t.split("?")[0],r = [],o = -1 !== t.indexOf("?") ? t.split("?")[1] : "";if ("" !== o) {for (var s = (r = o.split("&")).length - 1; s >= 0; s -= 1) {r[s].split("=")[0] === e && r.splice(s, 1);}n = n + "?" + r.join("&");}return n;}, t.createPromiseCallback = function () {var e;if (!Promise) {(e = function e() {}).promise = {};var t = function t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: t }), Object.defineProperty(e.promise, "catch", { get: t }), e;}var n = new Promise(function (t, n) {e = function e(_e, r) {return _e ? n(_e) : t(r);};});return e.promise = n, e;}, t.getWeixinCode = function () {return t.getQuery("code") || t.getHash("code");}, t.getMiniAppCode = function () {return new Promise(function (e, t) {wx.login({ success: function success(t) {e(t.code);}, fail: function fail(e) {t(e);} });});}, t.isArray = function (e) {return "[object Array]" === Object.prototype.toString.call(e);}, t.isString = function (e) {return "string" == typeof e;}, t.isUndefined = function (e) {return void 0 === e;}, t.isInstanceOf = function (e, t) {return e instanceof t;}, t.isFormData = function (e) {return "[object FormData]" === Object.prototype.toString.call(e);}, t.genSeqId = function () {return Math.random().toString(16).slice(2);}, t.getArgNames = function (e) {var t = e.toString();return t.slice(t.indexOf("(") + 1, t.indexOf(")")).match(/([^\s,]+)/g);}, t.formatUrl = function (e, t, n) {void 0 === n && (n = {});var r = /\?/.test(t),o = "";for (var s in n) {"" === o ? !r && (t += "?") : o += "&", o += s + "=" + encodeURIComponent(n[s]);}return /^http(s)?\:\/\//.test(t += o) ? t : "" + e + t;};});t(I);I.getQuery, I.getHash, I.removeParam, I.createPromiseCallback, I.getWeixinCode, I.getMiniAppCode, I.isArray, I.isString, I.isUndefined, I.isInstanceOf, I.isFormData, I.genSeqId, I.getArgNames, I.formatUrl;var N,C = "dist/index.js",R = "./dist/index.d.ts",x = { build: "npm run tsc && webpack", tsc: "tsc -p tsconfig.json", "tsc:w": "tsc -p tsconfig.json -w", test: "jest --verbose false -i", e2e: 'NODE_ENV=e2e webpack && jest --config="./jest.e2e.config.js"  --verbose false -i "e2e"', start: "webpack-dev-server --hot --open", eslint: 'eslint "./**/*.js" "./**/*.ts"', "eslint-fix": 'eslint --fix "./**/*.js" "./**/*.ts"', test_web: "npm run tsc && webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./dist --host jimmytest-088bef.tcb.qcloud.la --port 80 --disableHostCheck true --mode development --config webpack.test.js" },q = { type: "git", url: "https://github.com/TencentCloudBase/tcb-js-sdk" },U = ["tcb", "js-sdk"],j = { "@cloudbase/adapter-interface": "^0.2.0", "@cloudbase/adapter-wx_mp": "^0.2.1", "@cloudbase/database": "^0.9.8" },L = { "@babel/core": "^7.6.2", "@babel/plugin-proposal-class-properties": "^7.5.5", "@babel/plugin-proposal-object-rest-spread": "^7.6.2", "@babel/plugin-transform-runtime": "^7.6.2", "@babel/preset-env": "^7.6.2", "@babel/preset-typescript": "^7.6.0", "@babel/runtime": "^7.6.2", "@types/jest": "^23.1.4", "@types/node": "^10.14.4", "@types/superagent": "^4.1.4", axios: "^0.19.0", "babel-eslint": "^10.0.1", "babel-loader": "^8.0.6", "babel-polyfill": "^6.26.0", eslint: "^5.16.0", "eslint-config-alloy": "^1.4.2", "eslint-config-prettier": "^4.1.0", "eslint-plugin-prettier": "^3.0.1", "eslint-plugin-typescript": "^1.0.0-rc.3", express: "^4.17.1", husky: "^3.1.0", jest: "^24.7.1", "jest-puppeteer": "^4.3.0", "lint-staged": "^9.5.0", "power-assert": "^1.6.1", puppeteer: "^1.20.0", "serve-static": "^1.14.1", "ts-jest": "^23.10.4", "ts-loader": "^6.2.1", typescript: "^3.4.3", "typescript-eslint-parser": "^22.0.0", webpack: "^4.41.3", "webpack-bundle-analyzer": "^3.4.1", "webpack-cli": "^3.3.0", "webpack-dev-server": "^3.3.1", "webpack-merge": "^4.2.2", "webpack-visualizer-plugin": "^0.1.11" },D = { hooks: { "pre-commit": "lint-staged" } },F = { name: "tcb-js-sdk", version: "1.3.5", description: "js sdk for tcb", main: C, types: R, scripts: x, repository: q, keywords: U, author: "jimmyjzhang", license: "ISC", dependencies: j, devDependencies: L, husky: D, "lint-staged": { "*.{js,ts}": ["eslint --fix", "git add"] } },M = (N = Object.freeze({ __proto__: null, name: "tcb-js-sdk", version: "1.3.5", description: "js sdk for tcb", main: C, types: R, scripts: x, repository: q, keywords: U, author: "jimmyjzhang", license: "ISC", dependencies: j, devDependencies: L, husky: D, default: F })) && N.default || N,K = n(function (t, n) {var r = e && e.__importStar || function (e) {if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);}return t.default = e, t;};Object.defineProperty(n, "__esModule", { value: !0 });var o = r(M);n.SDK_VERISON = o.version, n.ACCESS_TOKEN = "access_token", n.ACCESS_TOKEN_Expire = "access_token_expire", n.REFRESH_TOKEN = "refresh_token", n.ANONYMOUS_UUID = "anonymous_uuid", n.LOGIN_TYPE_KEY = "login_type", n.protocol = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:", n.BASE_URL =  false ? undefined : "//tcb-api.tencentcloudapi.com/web";});t(K);var G;K.SDK_VERISON, K.ACCESS_TOKEN, K.ACCESS_TOKEN_Expire, K.REFRESH_TOKEN, K.ANONYMOUS_UUID, K.LOGIN_TYPE_KEY, K.protocol, K.BASE_URL;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(G || (G = {}));var H = function H() {},Y = function Y() {};var V = Object.freeze({ __proto__: null, get StorageType() {return G;}, AbstractSDKRequest: H, AbstractStorage: Y, formatUrl: function formatUrl(e, t, n) {void 0 === n && (n = {});var r = /\?/.test(t),o = "";for (var s in n) {"" === o ? !r && (t += "?") : o += "&", o += s + "=" + encodeURIComponent(n[s]);}return /^http(s)?\:\/\//.test(t += o) ? t : "" + e + t;} }),B = n(function (t, n) {var r = e && e.__extends || function () {var _e2 = function e(t, n) {return (_e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(t, n);};return function (t, n) {function r() {this.constructor = t;}_e2(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());};}(),o = e && e.__assign || function () {return (o = Object.assign || function (e) {for (var t, n = 1, r = arguments.length; n < r; n++) {for (var o in t = arguments[n]) {Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);}}return e;}).apply(this, arguments);},s = e && e.__awaiter || function (e, t, n, r) {return new (n || (n = Promise))(function (o, s) {function i(e) {try {c(r.next(e));} catch (e) {s(e);}}function a(e) {try {c(r.throw(e));} catch (e) {s(e);}}function c(e) {var t;e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(i, a);}c((r = r.apply(e, t || [])).next());});},i = e && e.__generator || function (e, t) {var n,r,o,s,i = { label: 0, sent: function sent() {if (1 & o[0]) throw o[1];return o[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {case 0:case 1:o = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, r = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {i = 0;continue;}if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < o[1]) {i.label = o[1], o = s;break;}if (o && i.label < o[2]) {i.label = o[2], i.ops.push(s);break;}o[2] && i.ops.pop(), i.trys.pop();continue;}s = t.call(e, i);} catch (e) {s = [6, e], r = 0;} finally {n = o = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}};Object.defineProperty(n, "__esModule", { value: !0 });var a = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return r(t, e), t.prototype.get = function (e) {return this._request(o(o({}, e), { method: "get" }));}, t.prototype.post = function (e) {return this._request(o(o({}, e), { method: "post" }));}, t.prototype.upload = function (e) {var t = e.data,n = e.file,r = e.name,s = new FormData();for (var i in t) {s.append(i, t[i]);}return s.append("key", r), s.append("file", n), this._request(o(o({}, e), { data: s, method: "post" }));}, t.prototype.download = function (e) {return s(this, void 0, void 0, function () {var t, n;return i(this, function (r) {return t = decodeURIComponent(new URL(e.url).pathname.split("/").pop() || ""), (n = document.createElement("a")).href = e.url, n.setAttribute("download", t), n.setAttribute("target", "_blank"), document.body.appendChild(n), n.click(), [2, new Promise(function (t) {t({ statusCode: 200, tempFilePath: e.url });})];});});}, t.prototype._request = function (e) {var t = String(e.method).toLowerCase() || "get";return new Promise(function (n) {var r = e.url,o = e.headers,s = void 0 === o ? {} : o,i = e.data,a = e.responseType,c = I.formatUrl(K.protocol, r, "get" === t ? i : {}),u = new XMLHttpRequest();for (var l in u.open(t, c), a && (u.responseType = a), s) {u.setRequestHeader(l, s[l]);}u.onreadystatechange = function () {if (4 === u.readyState) {var e = { statusCode: u.status };try {e.data = JSON.parse(u.responseText);} catch (e) {}n(e);}}, u.send("post" === t && I.isFormData(i) ? i : JSON.stringify(i || {}));});}, t;}(V.AbstractSDKRequest);n.WebRequest = a, n.genAdapter = function () {return { root: window, reqClass: a, wsClass: WebSocket, localStorage: localStorage, sessionStorage: sessionStorage };};});t(B);B.WebRequest, B.genAdapter;var W = n(function (t, n) {var r = e && e.__importStar || function (e) {if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);}return t.default = e, t;};Object.defineProperty(n, "__esModule", { value: !0 });var o,s = r(B);!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(o = n.RUNTIME || (n.RUNTIME = {})), n.useAdapters = function (e) {for (var t = 0, n = I.isArray(e) ? e : [e]; t < n.length; t++) {var r = n[t],o = r.isMatch,s = r.genAdapter,i = r.runtime;if (o()) return { adapter: s(), runtime: i };}}, n.useDefaultAdapter = function () {return { adapter: s.genAdapter(), runtime: o.WEB };}, n.Adapter = { adapter: null, runtime: void 0 };});t(W);W.RUNTIME, W.useAdapters, W.useDefaultAdapter, W.Adapter;var z = n(function (t, n) {var r = e && e.__extends || function () {var _e3 = function e(t, n) {return (_e3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(t, n);};return function (t, n) {function r() {this.constructor = t;}_e3(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());};}();Object.defineProperty(n, "__esModule", { value: !0 });var o = function () {function e(e) {switch (W.Adapter.adapter.primaryStorage || e) {case "local":this.storageClass = W.Adapter.adapter.localStorage || new s();break;case "none":this.storageClass = new s();break;default:this.storageClass = W.Adapter.adapter.sessionStorage || new s();}}return e.prototype.setStore = function (e, t, n) {try {if (!this.storageClass) return;} catch (e) {return;}var r,o = {};o.version = n || "localCachev1", o.content = t, r = JSON.stringify(o);try {this.storageClass.setItem(e, r);} catch (e) {return;}}, e.prototype.getStore = function (e, t) {try {if (!this.storageClass) return;} catch (e) {return "";}t = t || "localCachev1";var n = this.storageClass.getItem(e);return n && n.indexOf(t) >= 0 ? JSON.parse(n).content : "";}, e.prototype.removeStore = function (e) {this.storageClass.removeItem(e);}, e;}();n.Cache = o;var s = function (e) {function t() {var t = e.call(this) || this;return W.Adapter.adapter.root.tcbObject || (W.Adapter.adapter.root.tcbObject = {}), t;}return r(t, e), t.prototype.setItem = function (e, t) {W.Adapter.adapter.root.tcbObject[e] = t;}, t.prototype.getItem = function (e) {return W.Adapter.adapter.root.tcbObject[e];}, t.prototype.removeItem = function (e) {delete W.Adapter.adapter.root.tcbObject[e];}, t.prototype.clear = function () {delete W.Adapter.adapter.root.tcbObject;}, t;}(V.AbstractStorage);});t(z);z.Cache;var J = n(function (t, n) {var r = e && e.__extends || function () {var _e4 = function e(t, n) {return (_e4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(t, n);};return function (t, n) {function r() {this.constructor = t;}_e4(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());};}(),o = e && e.__spreadArrays || function () {for (var e = 0, t = 0, n = arguments.length; t < n; t++) {e += arguments[t].length;}var r = Array(e),o = 0;for (t = 0; t < n; t++) {for (var s = arguments[t], i = 0, a = s.length; i < a; i++, o++) {r[o] = s[i];}}return r;};Object.defineProperty(n, "__esModule", { value: !0 });var s = function s(e, t) {this.data = t || null, this.name = e;};n.IEvent = s;var i = function (e) {function t(t, n) {var r = e.call(this, "error", { error: t, data: n }) || this;return r.error = t, r;}return r(t, e), t;}(s);n.IErrorEvent = i;var a = function () {function e() {this._listeners = {};}return e.prototype.on = function (e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;}, e.prototype.off = function (e, t) {return function (e, t, n) {if (n && n[e]) {var r = n[e].indexOf(t);-1 !== r && n[e].splice(r, 1);}}(e, t, this._listeners), this;}, e.prototype.fire = function (e, t) {if (I.isInstanceOf(e, i)) return console.error(e.error), this;var n = I.isString(e) ? new s(e, t || {}) : e,r = n.name;if (this._listens(r)) {n.target = this;for (var a = 0, c = this._listeners[r] ? o(this._listeners[r]) : []; a < c.length; a++) {c[a].call(this, n);}}return this;}, e.prototype._listens = function (e) {return this._listeners[e] && this._listeners[e].length > 0;}, e;}();n.IEventEmitter = a;var c = new a();n.addEventListener = function (e, t) {c.on(e, t);}, n.activateEvent = function (e, t) {void 0 === t && (t = {}), c.fire(e, t);}, n.removeEventListener = function (e, t) {c.off(e, t);}, n.EVENTS = { LOGIN_STATE_CHANGED: "loginStateChanged", LOGIN_STATE_EXPIRE: "loginStateExpire", LOGIN_TYPE_CHANGE: "loginTypeChanged", ANONYMOUS_CONVERTED: "anonymousConverted", REFRESH_ACCESS_TOKEN: "refreshAccessToken" };});t(J);J.IEvent, J.IErrorEvent, J.IEventEmitter, J.addEventListener, J.activateEvent, J.removeEventListener, J.EVENTS;var X = n(function (t, n) {var r = e && e.__assign || function () {return (r = Object.assign || function (e) {for (var t, n = 1, r = arguments.length; n < r; n++) {for (var o in t = arguments[n]) {Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);}}return e;}).apply(this, arguments);},o = e && e.__awaiter || function (e, t, n, r) {return new (n || (n = Promise))(function (o, s) {function i(e) {try {c(r.next(e));} catch (e) {s(e);}}function a(e) {try {c(r.throw(e));} catch (e) {s(e);}}function c(e) {var t;e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(i, a);}c((r = r.apply(e, t || [])).next());});},s = e && e.__generator || function (e, t) {var n,r,o,s,i = { label: 0, sent: function sent() {if (1 & o[0]) throw o[1];return o[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {case 0:case 1:o = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, r = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {i = 0;continue;}if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < o[1]) {i.label = o[1], o = s;break;}if (o && i.label < o[2]) {i.label = o[2], i.ops.push(s);break;}o[2] && i.ops.pop(), i.trys.pop();continue;}s = t.call(e, i);} catch (e) {s = [6, e], r = 0;} finally {n = o = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}};Object.defineProperty(n, "__esModule", { value: !0 });var i = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously"],a = { "X-SDK-Version": K.SDK_VERISON };function c(e, t, n) {var o = e[t];e[t] = function (t) {var s = {},i = {};n.forEach(function (n) {var r = n.call(e, t),o = r.data,a = r.headers;Object.assign(s, o), Object.assign(i, a);});var a = t.data;return a && function () {if (I.isFormData(a)) for (var e in s) {a.append(e, s[e]);} else t.data = r(r({}, a), s);}(), t.headers = r(r({}, t.headers || {}), i), o.call(e, t);};}function u() {var e = I.genSeqId();return { data: { seqId: e }, headers: r(r({}, a), { "x-seqid": e }) };}var l = function () {function e(e) {void 0 === e && (e = {}), this.config = e, this.cache = new z.Cache(e.persistence), this.accessTokenKey = K.ACCESS_TOKEN + "_" + e.env, this.accessTokenExpireKey = K.ACCESS_TOKEN_Expire + "_" + e.env, this.refreshTokenKey = K.REFRESH_TOKEN + "_" + e.env, this.anonymousUuidKey = K.ANONYMOUS_UUID + "_" + e.env, this.loginTypeKey = K.LOGIN_TYPE_KEY + "_" + e.env, this._reqClass = new W.Adapter.adapter.reqClass(), c(this._reqClass, "post", [u]), c(this._reqClass, "upload", [u]), c(this._reqClass, "download", [u]);}return e.prototype.post = function (e) {return o(this, void 0, void 0, function () {return s(this, function (t) {switch (t.label) {case 0:return [4, this._reqClass.post(e)];case 1:return [2, t.sent()];}});});}, e.prototype.upload = function (e) {return o(this, void 0, void 0, function () {return s(this, function (t) {switch (t.label) {case 0:return [4, this._reqClass.upload(e)];case 1:return [2, t.sent()];}});});}, e.prototype.download = function (e) {return o(this, void 0, void 0, function () {return s(this, function (t) {switch (t.label) {case 0:return [4, this._reqClass.download(e)];case 1:return [2, t.sent()];}});});}, e.prototype.refreshAccessToken = function () {return o(this, void 0, void 0, function () {var e, t, n;return s(this, function (r) {switch (r.label) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken()), r.label = 1;case 1:return r.trys.push([1, 3,, 4]), [4, this._refreshAccessTokenPromise];case 2:return e = r.sent(), [3, 4];case 3:return n = r.sent(), t = n, [3, 4];case 4:if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t) throw t;return [2, e];}});});}, e.prototype._refreshAccessToken = function () {return o(this, void 0, void 0, function () {var e, t, n, r;return s(this, function (o) {switch (o.label) {case 0:if (this.cache.removeStore(this.accessTokenKey), this.cache.removeStore(this.accessTokenExpireKey), !(e = this.cache.getStore(this.refreshTokenKey))) throw new Error("[tcb-js-sdk] 未登录CloudBase");return t = { refresh_token: e }, this.cache.getStore(this.loginTypeKey) === $.LOGINTYPE.ANONYMOUS && (t.anonymous_uuid = this.cache.getStore(this.anonymousUuidKey)), [4, this.request("auth.getJwt", t)];case 1:if ((n = o.sent()).data.code) throw "SIGN_PARAM_INVALID" !== (r = n.data.code) && "REFRESH_TOKEN_EXPIRED" !== r && "INVALID_REFRESH_TOKEN" !== r || (J.activateEvent(J.EVENTS.LOGIN_STATE_EXPIRE), this.cache.removeStore(this.refreshTokenKey)), new Error("[tcb-js-sdk] 刷新access token失败：" + n.data.code);return n.data.access_token ? (J.activateEvent(J.EVENTS.REFRESH_ACCESS_TOKEN), this.cache.setStore(this.accessTokenKey, n.data.access_token), this.cache.setStore(this.accessTokenExpireKey, n.data.access_token_expire + Date.now()), J.activateEvent(J.EVENTS.LOGIN_TYPE_CHANGE, n.data.login_type), [2, { accessToken: n.data.access_token, accessTokenExpire: n.data.access_token_expire }]) : (n.data.refresh_token && (this.cache.removeStore(this.refreshTokenKey), this.cache.setStore(this.refreshTokenKey, n.data.refresh_token), this._refreshAccessToken()), [2]);}});});}, e.prototype.getAccessToken = function () {return o(this, void 0, void 0, function () {var e, t, n, r;return s(this, function (o) {switch (o.label) {case 0:return e = this.cache.getStore(this.accessTokenKey), t = this.cache.getStore(this.accessTokenExpireKey), n = !0, (r = this._shouldRefreshAccessTokenHook) ? [4, this._shouldRefreshAccessTokenHook(e, t)] : [3, 2];case 1:r = !o.sent(), o.label = 2;case 2:return r && (n = !1), (!e || !t || t < Date.now()) && n ? [2, this.refreshAccessToken()] : [2, { accessToken: e, accessTokenExpire: t }];}});});}, e.prototype.request = function (e, t, n) {return o(this, void 0, void 0, function () {var o, a, c, u, l, f, p, h, d, y, v, g;return s(this, function (s) {switch (s.label) {case 0:return o = "application/x-www-form-urlencoded", a = r({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t), -1 !== i.indexOf(e) ? [3, 2] : (c = a, [4, this.getAccessToken()]);case 1:c.access_token = s.sent().accessToken, s.label = 2;case 2:if ("storage.uploadFile" === e) {for (l in u = new FormData()) {u.hasOwnProperty(l) && void 0 !== u[l] && u.append(l, a[l]);}o = "multipart/form-data";} else o = "application/json;charset=UTF-8", u = a;return f = { headers: { "content-type": o } }, n && n.onUploadProgress && (f.onUploadProgress = n.onUploadProgress), p = t.parse, h = t.query, d = t.search, y = { env: this.config.env }, p && (y.parse = !0), h && (y = r(r({}, h), y)), v = I.formatUrl(K.protocol, K.BASE_URL, y), d && (v += d), [4, this.post(r({ url: v, data: u }, f))];case 3:if (g = s.sent(), 200 !== Number(g.status) && 200 !== Number(g.statusCode) || !g.data) throw new Error("network request error");return [2, g];}});});}, e.prototype.send = function (e, t) {return void 0 === t && (t = {}), o(this, void 0, void 0, function () {var n, r, o;return s(this, function (s) {switch (s.label) {case 0:return n = setTimeout(function () {console.warn("Database operation is longer than 3s. Please check query performance and your network environment.");}, 3e3), [4, this.request(e, t, { onUploadProgress: t.onUploadProgress })];case 1:return r = s.sent(), clearTimeout(n), "ACCESS_TOKEN_EXPIRED" !== r.data.code || -1 !== i.indexOf(e) ? [3, 4] : [4, this.refreshAccessToken()];case 2:return s.sent(), [4, this.request(e, t, { onUploadProgress: t.onUploadProgress })];case 3:if ((o = s.sent()).data.code) throw new Error("[" + o.data.code + "] " + o.data.message);return [2, o.data];case 4:if (r.data.code) throw new Error("[" + r.data.code + "] " + r.data.message);return [2, r.data];}});});}, e;}();n.Request = l;});t(X);X.Request;var $ = n(function (t, n) {var r,o = e && e.__awaiter || function (e, t, n, r) {return new (n || (n = Promise))(function (o, s) {function i(e) {try {c(r.next(e));} catch (e) {s(e);}}function a(e) {try {c(r.throw(e));} catch (e) {s(e);}}function c(e) {var t;e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(i, a);}c((r = r.apply(e, t || [])).next());});},s = e && e.__generator || function (e, t) {var n,r,o,s,i = { label: 0, sent: function sent() {if (1 & o[0]) throw o[1];return o[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {case 0:case 1:o = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, r = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {i = 0;continue;}if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < o[1]) {i.label = o[1], o = s;break;}if (o && i.label < o[2]) {i.label = o[2], i.ops.push(s);break;}o[2] && i.ops.pop(), i.trys.pop();continue;}s = t.call(e, i);} catch (e) {s = [6, e], r = 0;} finally {n = o = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}};Object.defineProperty(n, "__esModule", { value: !0 }), function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.CUSTOM = "CUSTOM", e.NULL = "NULL";}(r = n.LOGINTYPE || (n.LOGINTYPE = {}));var i = function () {function e(e) {this._loginType = r.NULL, this.config = e, this.onLoginTypeChanged = this.onLoginTypeChanged.bind(this), J.addEventListener(J.EVENTS.LOGIN_TYPE_CHANGE, this.onLoginTypeChanged);}return e.prototype.init = function () {this.httpRequest = new X.Request(this.config), this.cache = new z.Cache(this.config.persistence), this.accessTokenKey = K.ACCESS_TOKEN + "_" + this.config.env, this.accessTokenExpireKey = K.ACCESS_TOKEN_Expire + "_" + this.config.env, this.refreshTokenKey = K.REFRESH_TOKEN + "_" + this.config.env, this.loginTypeKey = K.LOGIN_TYPE_KEY + "_" + this.config.env;}, e.prototype.onLoginTypeChanged = function (e) {this._loginType = e.data, this.cache.setStore(this.loginTypeKey, this._loginType);}, Object.defineProperty(e.prototype, "loginType", { get: function get() {return this._loginType;}, enumerable: !0, configurable: !0 }), e.prototype.setRefreshToken = function (e) {this.cache.removeStore(this.accessTokenKey), this.cache.removeStore(this.accessTokenExpireKey), this.cache.setStore(this.refreshTokenKey, e);}, e.prototype.getRefreshTokenByWXCode = function (e, t, n) {return o(this, void 0, void 0, function () {var r;return s(this, function (o) {return "auth.getJwt", r = W.Adapter.runtime === W.RUNTIME.WX_MP ? "1" : "0", [2, this.httpRequest.send("auth.getJwt", { appid: e, loginType: t, code: n, hybridMiniapp: r }).then(function (e) {if (e.code) throw new Error("[tcb-js-sdk] 微信登录失败: " + e.code);if (e.refresh_token) return { refreshToken: e.refresh_token, accessToken: e.access_token, accessTokenExpire: e.access_token_expire };throw new Error("[tcb-js-sdk] getJwt未返回refreshToken");})];});});}, e;}();n.default = i;});t($);$.LOGINTYPE;var Q = n(function (t, n) {var r = e && e.__extends || function () {var _e5 = function e(t, n) {return (_e5 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(t, n);};return function (t, n) {function r() {this.constructor = t;}_e5(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());};}(),o = e && e.__awaiter || function (e, t, n, r) {return new (n || (n = Promise))(function (o, s) {function i(e) {try {c(r.next(e));} catch (e) {s(e);}}function a(e) {try {c(r.throw(e));} catch (e) {s(e);}}function c(e) {var t;e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(i, a);}c((r = r.apply(e, t || [])).next());});},s = e && e.__generator || function (e, t) {var n,r,o,s,i = { label: 0, sent: function sent() {if (1 & o[0]) throw o[1];return o[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {case 0:case 1:o = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, r = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {i = 0;continue;}if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < o[1]) {i.label = o[1], o = s;break;}if (o && i.label < o[2]) {i.label = o[2], i.ops.push(s);break;}o[2] && i.ops.pop(), i.trys.pop();continue;}s = t.call(e, i);} catch (e) {s = [6, e], r = 0;} finally {n = o = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}},i = e && e.__importStar || function (e) {if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);}return t.default = e, t;};Object.defineProperty(n, "__esModule", { value: !0 });var a,c,u = i(I),l = i($);!function (e) {e.snsapi_base = "snsapi_base", e.snsapi_userinfo = "snsapi_userinfo", e.snsapi_login = "snsapi_login";}(a || (a = {})), function (e) {e.redirect = "redirect", e.prompt = "prompt";}(c || (c = {}));var f = {},p = function (e) {function t(t, n, r, o, s) {var i = e.call(this, t) || this;return i.config = t, i.appid = n, i.scope = W.Adapter.runtime === W.RUNTIME.WX_MP ? "snsapi_base" : r, i.state = s || "weixin", i.loginMode = o || "redirect", i;}return r(t, e), t.prototype.signIn = function () {return o(this, void 0, void 0, function () {var e, t, n;return s(this, function (r) {switch (r.label) {case 0:f[this.config.env] || (f[this.config.env] = this._signIn()), r.label = 1;case 1:return r.trys.push([1, 3,, 4]), [4, f[this.config.env]];case 2:return e = r.sent(), [3, 4];case 3:return n = r.sent(), t = n, [3, 4];case 4:if (f[this.config.env] = null, t) throw t;return [2, e];}});});}, t.prototype._signIn = function () {return o(this, void 0, void 0, function () {var e, t, n, r, o, i;return s(this, function (s) {switch (s.label) {case 0:if (e = this.cache.getStore(this.accessTokenKey), t = this.cache.getStore(this.accessTokenExpireKey), e) {if (t && t > Date.now()) return [2, { credential: { accessToken: e, refreshToken: this.cache.getStore(this.refreshTokenKey) } }];this.cache.removeStore(this.accessTokenKey), this.cache.removeStore(this.accessTokenExpireKey);}if (!1 === Object.values(a).includes(a[this.scope])) throw new Error("错误的scope类型");return W.Adapter.runtime !== W.RUNTIME.WX_MP ? [3, 2] : [4, u.getMiniAppCode()];case 1:return n = s.sent(), [3, 4];case 2:return [4, u.getWeixinCode()];case 3:if (!(n = s.sent())) return [2, this.redirect()];s.label = 4;case 4:return r = function (e) {switch (e) {case a.snsapi_login:return "WECHAT-OPEN";default:return "WECHAT-PUBLIC";}}(this.scope), [4, this.getRefreshTokenByWXCode(this.appid, r, n)];case 5:return o = s.sent(), i = o.refreshToken, this.cache.setStore(this.refreshTokenKey, i), o.accessToken && this.cache.setStore(this.accessTokenKey, o.accessToken), o.accessTokenExpire && this.cache.setStore(this.accessTokenExpireKey, o.accessTokenExpire + Date.now()), J.activateEvent(J.EVENTS.LOGIN_STATE_CHANGED), J.activateEvent(J.EVENTS.LOGIN_TYPE_CHANGE, l.LOGINTYPE.WECHAT), [2, { credential: { refreshToken: i } }];}});});}, t.prototype.redirect = function () {var e = u.removeParam("code", location.href);e = u.removeParam("state", e), e = encodeURIComponent(e);var t = "//open.weixin.qq.com/connect/oauth2/authorize";"snsapi_login" === this.scope && (t = "//open.weixin.qq.com/connect/qrconnect"), "redirect" === c[this.loginMode] && (location.href = t + "?appid=" + this.appid + "&redirect_uri=" + e + "&response_type=code&scope=" + this.scope + "&state=" + this.state + "#wechat_redirect");}, t;}(l.default);n.default = p;});t(Q);var Z = n(function (t, n) {var r = e && e.__extends || function () {var _e6 = function e(t, n) {return (_e6 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(t, n);};return function (t, n) {function r() {this.constructor = t;}_e6(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());};}(),o = e && e.__assign || function () {return (o = Object.assign || function (e) {for (var t, n = 1, r = arguments.length; n < r; n++) {for (var o in t = arguments[n]) {Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);}}return e;}).apply(this, arguments);},s = e && e.__awaiter || function (e, t, n, r) {return new (n || (n = Promise))(function (o, s) {function i(e) {try {c(r.next(e));} catch (e) {s(e);}}function a(e) {try {c(r.throw(e));} catch (e) {s(e);}}function c(e) {var t;e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(i, a);}c((r = r.apply(e, t || [])).next());});},i = e && e.__generator || function (e, t) {var n,r,o,s,i = { label: 0, sent: function sent() {if (1 & o[0]) throw o[1];return o[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {case 0:case 1:o = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, r = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {i = 0;continue;}if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < o[1]) {i.label = o[1], o = s;break;}if (o && i.label < o[2]) {i.label = o[2], i.ops.push(s);break;}o[2] && i.ops.pop(), i.trys.pop();continue;}s = t.call(e, i);} catch (e) {s = [6, e], r = 0;} finally {n = o = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}},a = e && e.__importStar || function (e) {if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);}return t.default = e, t;};Object.defineProperty(n, "__esModule", { value: !0 });var c = a($),u = function (e) {function t(t) {var n = e.call(this, o(o({}, t), { persistence: "local" })) || this;return n._anonymousUuidKey = K.ANONYMOUS_UUID + "_" + n.config.env, n._loginTypeKey = K.LOGIN_TYPE_KEY + "_" + n.config.env, n;}return r(t, e), t.prototype.init = function () {e.prototype.init.call(this);}, t.prototype.signIn = function () {return s(this, void 0, void 0, function () {var e, t, n;return i(this, function (r) {switch (r.label) {case 0:return e = this.cache.getStore(this._anonymousUuidKey) || void 0, t = this.cache.getStore(this.refreshTokenKey) || void 0, [4, this.httpRequest.send("auth.signInAnonymously", { anonymous_uuid: e, refresh_token: t })];case 1:return (n = r.sent()).uuid && n.refresh_token ? (this._setAnonymousUUID(n.uuid), this.setRefreshToken(n.refresh_token), [4, this.httpRequest.refreshAccessToken()]) : [3, 3];case 2:return r.sent(), J.activateEvent(J.EVENTS.LOGIN_STATE_CHANGED), J.activateEvent(J.EVENTS.LOGIN_TYPE_CHANGE, c.LOGINTYPE.ANONYMOUS), [2, { credential: { refreshToken: n.refresh_token } }];case 3:throw new Error("[tcb-js-sdk] 匿名登录失败");}});});}, t.prototype.linkAndRetrieveDataWithTicket = function (e) {return s(this, void 0, void 0, function () {var t, n, r;return i(this, function (o) {switch (o.label) {case 0:return t = this.cache.getStore(this._anonymousUuidKey), n = this.cache.getStore(this.refreshTokenKey), [4, this.httpRequest.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: t, refresh_token: n, ticket: e })];case 1:return (r = o.sent()).refresh_token ? (this._clearAnonymousUUID(), this.setRefreshToken(r.refresh_token), [4, this.httpRequest.refreshAccessToken()]) : [3, 3];case 2:return o.sent(), J.activateEvent(J.EVENTS.ANONYMOUS_CONVERTED, { refresh_token: r.refresh_token }), J.activateEvent(J.EVENTS.LOGIN_TYPE_CHANGE, c.LOGINTYPE.CUSTOM), [2, { credential: { refreshToken: r.refresh_token } }];case 3:throw new Error("[tcb-js-sdk] 匿名转化失败");}});});}, t.prototype.getAllStore = function () {var e = {};return e[this.refreshTokenKey] = this.cache.getStore(this.refreshTokenKey) || "", e[this._loginTypeKey] = this.cache.getStore(this._loginTypeKey) || "", e[this.accessTokenKey] = this.cache.getStore(this.accessTokenKey) || "", e[this.accessTokenExpireKey] = this.cache.getStore(this.accessTokenExpireKey) || "", e;}, t.prototype._setAnonymousUUID = function (e) {this.cache.removeStore(this._anonymousUuidKey), this.cache.setStore(this._anonymousUuidKey, e), this.cache.setStore(this._loginTypeKey, c.LOGINTYPE.ANONYMOUS);}, t.prototype._clearAnonymousUUID = function () {this.cache.removeStore(this._anonymousUuidKey);}, t;}(c.default);n.AnonymousAuthProvider = u;});t(Z);Z.AnonymousAuthProvider;var ee = n(function (t, n) {var r = e && e.__extends || function () {var _e7 = function e(t, n) {return (_e7 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {t.hasOwnProperty(n) && (e[n] = t[n]);}})(t, n);};return function (t, n) {function r() {this.constructor = t;}_e7(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());};}(),o = e && e.__assign || function () {return (o = Object.assign || function (e) {for (var t, n = 1, r = arguments.length; n < r; n++) {for (var o in t = arguments[n]) {Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);}}return e;}).apply(this, arguments);},s = e && e.__awaiter || function (e, t, n, r) {return new (n || (n = Promise))(function (o, s) {function i(e) {try {c(r.next(e));} catch (e) {s(e);}}function a(e) {try {c(r.throw(e));} catch (e) {s(e);}}function c(e) {var t;e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(i, a);}c((r = r.apply(e, t || [])).next());});},i = e && e.__generator || function (e, t) {var n,r,o,s,i = { label: 0, sent: function sent() {if (1 & o[0]) throw o[1];return o[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {case 0:case 1:o = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, r = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {i = 0;continue;}if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < o[1]) {i.label = o[1], o = s;break;}if (o && i.label < o[2]) {i.label = o[2], i.ops.push(s);break;}o[2] && i.ops.pop(), i.trys.pop();continue;}s = t.call(e, i);} catch (e) {s = [6, e], r = 0;} finally {n = o = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}},a = e && e.__importDefault || function (e) {return e && e.__esModule ? e : { default: e };},c = e && e.__importStar || function (e) {if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);}return t.default = e, t;};Object.defineProperty(n, "__esModule", { value: !0 });var u = a(Q),l = c($),f = function (e) {function t(t) {var n = e.call(this, t) || this;return n.config = t, n;}return r(t, e), t.prototype.init = function () {e.prototype.init.call(this), this.customAuthProvider = new l.default(this.config), this.customAuthProvider.init();}, t.prototype.weixinAuthProvider = function (e) {var t = e.appid,n = e.scope,r = e.loginMode,o = e.state,s = new u.default(this.config, t, n, r, o);return s.init(), s;}, t.prototype.signInAnonymously = function () {return s(this, void 0, void 0, function () {var e = this;return i(this, function (t) {switch (t.label) {case 0:return this._anonymousAuthProvider || (this._anonymousAuthProvider = new Z.AnonymousAuthProvider(this.config), this._anonymousAuthProvider.init()), J.addEventListener(J.EVENTS.LOGIN_TYPE_CHANGE, function (t) {if (t && t.data === l.LOGINTYPE.ANONYMOUS) {var n = e._anonymousAuthProvider.getAllStore();for (var r in n) {n[r] && e.httpRequest.cache.setStore(r, n[r]);}}}), [4, this._anonymousAuthProvider.signIn()];case 1:return [2, t.sent()];}});});}, t.prototype.linkAndRetrieveDataWithTicket = function (e) {return s(this, void 0, void 0, function () {var t = this;return i(this, function (n) {switch (n.label) {case 0:return this._anonymousAuthProvider || (this._anonymousAuthProvider = new Z.AnonymousAuthProvider(this.config), this._anonymousAuthProvider.init()), J.addEventListener(J.EVENTS.ANONYMOUS_CONVERTED, function (e) {var n = e.data.refresh_token;n && t.httpRequest.cache.setStore(t.refreshTokenKey, n);}), [4, this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e)];case 1:return [2, n.sent()];}});});}, t.prototype.signOut = function () {return s(this, void 0, void 0, function () {var e, t, n, r, o, s, a;return i(this, function (i) {switch (i.label) {case 0:if (this.loginType === l.LOGINTYPE.ANONYMOUS) throw new Error("[tcb-js-sdk] 匿名用户不支持登出操作");return e = this.httpRequest, t = e.cache, n = e.refreshTokenKey, r = e.accessTokenKey, o = e.accessTokenExpireKey, "auth.logout", (s = t.getStore(n)) ? [4, this.httpRequest.send("auth.logout", { refresh_token: s })] : [2];case 1:return a = i.sent(), t.removeStore(n), t.removeStore(r), t.removeStore(o), J.activateEvent(J.EVENTS.LOGIN_STATE_CHANGED), J.activateEvent(J.EVENTS.LOGIN_TYPE_CHANGE, l.LOGINTYPE.NULL), [2, a];}});});}, t.prototype.getAccessToken = function () {return s(this, void 0, void 0, function () {var e;return i(this, function (t) {switch (t.label) {case 0:return e = {}, [4, this.httpRequest.getAccessToken()];case 1:return [2, (e.accessToken = t.sent().accessToken, e.env = this.config.env, e)];}});});}, t.prototype.onLoginStateExpire = function (e) {J.addEventListener("loginStateExpire", e);}, t.prototype.getLoginState = function () {return s(this, void 0, void 0, function () {var e, t, n, r, o;return i(this, function (s) {switch (s.label) {case 0:if (e = this.httpRequest, t = e.cache, n = e.refreshTokenKey, r = e.accessTokenKey, !(o = t.getStore(n))) return [3, 5];s.label = 1;case 1:return s.trys.push([1, 3,, 4]), [4, this.httpRequest.refreshAccessToken()];case 2:return s.sent(), [3, 4];case 3:return s.sent(), [2, null];case 4:return [2, { isAnonymous: this.loginType === l.LOGINTYPE.ANONYMOUS, credential: { refreshToken: o, accessToken: t.getStore(r) } }];case 5:return [2, null];}});});}, t.prototype.signInWithTicket = function (e) {return s(this, void 0, void 0, function () {var t, n, r, o;return i(this, function (s) {switch (s.label) {case 0:if ("string" != typeof e) throw new Error("ticket must be a string");return t = this.httpRequest, n = t.cache, r = t.refreshTokenKey, [4, this.httpRequest.send("auth.signInWithTicket", { ticket: e, refresh_token: n.getStore(r) || "" })];case 1:return (o = s.sent()).refresh_token ? (this.customAuthProvider.setRefreshToken(o.refresh_token), [4, this.httpRequest.refreshAccessToken()]) : [3, 3];case 2:return s.sent(), J.activateEvent(J.EVENTS.LOGIN_STATE_CHANGED), J.activateEvent(J.EVENTS.LOGIN_TYPE_CHANGE, l.LOGINTYPE.CUSTOM), [2, { credential: { refreshToken: o.refresh_token } }];case 3:throw new Error("[tcb-js-sdk] 自定义登录失败");}});});}, t.prototype.shouldRefreshAccessToken = function (e) {this.httpRequest._shouldRefreshAccessTokenHook = e.bind(this);}, t.prototype.getUserInfo = function () {return this.httpRequest.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : o(o({}, e.data), { requestId: e.seqId });});}, t;}(l.default);n.default = f;});t(ee);var te = n(function (t, n) {var r = e && e.__awaiter || function (e, t, n, r) {return new (n || (n = Promise))(function (o, s) {function i(e) {try {c(r.next(e));} catch (e) {s(e);}}function a(e) {try {c(r.throw(e));} catch (e) {s(e);}}function c(e) {var t;e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(i, a);}c((r = r.apply(e, t || [])).next());});},o = e && e.__generator || function (e, t) {var n,r,o,s,i = { label: 0, sent: function sent() {if (1 & o[0]) throw o[1];return o[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, r && (o = 2 & s[0] ? r.return : s[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, s[1])).done) return o;switch (r = 0, o && (s = [2 & s[0], o.value]), s[0]) {case 0:case 1:o = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, r = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {i = 0;continue;}if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < o[1]) {i.label = o[1], o = s;break;}if (o && i.label < o[2]) {i.label = o[2], i.ops.push(s);break;}o[2] && i.ops.pop(), i.trys.pop();continue;}s = t.call(e, i);} catch (e) {s = [6, e], r = 0;} finally {n = o = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}};Object.defineProperty(n, "__esModule", { value: !0 }), n.uploadFile = function (e, t) {t = t || I.createPromiseCallback();var n = new X.Request(this.config),r = e.cloudPath,o = e.filePath,s = e.onUploadProgress;return n.send("storage.getUploadMetadata", { path: r }).then(function (e) {var i = e.data,a = i.url,c = i.authorization,u = i.token,l = i.fileId,f = i.cosFileId,p = e.requestId,h = { key: r, signature: c, "x-cos-meta-fileid": f, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: h, file: o, name: r, onUploadProgress: s }).then(function (e) {201 === e.statusCode ? t(null, { fileID: l, requestId: p }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;}, n.deleteFile = function (e, t) {var n = e.fileList;if (t = t || I.createPromiseCallback(), !n || !Array.isArray(n)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };for (var r = 0, o = n; r < o.length; r++) {var s = o[r];if (!s || "string" != typeof s) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}var i = { fileid_list: n };return new X.Request(this.config).send("storage.batchDeleteFile", i).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;}, n.getTempFileURL = function (e, t) {var n = e.fileList;t = t || I.createPromiseCallback(), n && Array.isArray(n) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });for (var r = [], o = 0, s = n; o < s.length; o++) {var i = s[o];"object" == typeof i ? (i.hasOwnProperty("fileID") && i.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), r.push({ fileid: i.fileID, max_age: i.maxAge })) : "string" == typeof i ? r.push({ fileid: i }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}var a = { file_list: r };return new X.Request(this.config).send("storage.batchGetDownloadUrl", a).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;}, n.downloadFile = function (e, t) {var s = e.fileID;return r(this, void 0, void 0, function () {var e, r, i, a, c;return o(this, function (o) {switch (o.label) {case 0:return [4, n.getTempFileURL.call(this, { fileList: [{ fileID: s, maxAge: 600 }] })];case 1:return e = o.sent(), "SUCCESS" !== (r = e.fileList[0]).code ? [2, t ? t(r) : new Promise(function (e) {e(r);})] : (i = r.download_url, i = encodeURI(i), a = new X.Request(this.config), t ? [4, a.download({ url: i })] : [3, 3]);case 2:return c = o.sent(), t(c), [3, 4];case 3:return [2, a.download({ url: i })];case 4:return [2];}});});};});t(te);te.uploadFile, te.deleteFile, te.getTempFileURL, te.downloadFile;var ne = n(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 }), t.callFunction = function (e, t) {var n,r = e.name,o = e.data,s = e.query,i = e.parse,a = e.search,c = t || I.createPromiseCallback();try {n = o ? JSON.stringify(o) : "";} catch (e) {return Promise.reject(e);}if (!r) return Promise.reject(new Error("函数名不能为空"));var u = { query: s, parse: i, search: a, function_name: r, request_data: n };return new X.Request(this.config).send("functions.invokeFunction", u).then(function (e) {if (e.code) c(null, e);else {var t = e.data.response_data;if (i) c(null, { result: t, requestId: e.requestId });else try {t = JSON.parse(e.data.response_data), c(null, { result: t, requestId: e.requestId });} catch (e) {c(new Error("response data must be json"));}}return c.promise;}).catch(function (e) {c(e);}), c.promise;};});t(ne);ne.callFunction;var re = t(n(function (t) {var n = e && e.__assign || function () {return (n = Object.assign || function (e) {for (var t, n = 1, r = arguments.length; n < r; n++) {for (var o in t = arguments[n]) {Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);}}return e;}).apply(this, arguments);},r = e && e.__importDefault || function (e) {return e && e.__esModule ? e : { default: e };},o = e && e.__importStar || function (e) {if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);}return t.default = e, t;},s = r(P),i = r(ee),a = o(te),c = o(ne),u = { timeout: 15e3 },l = new (function () {function e(e) {var t = this;this.config = e || this.config, this.authObj = void 0, J.addEventListener(J.EVENTS.LOGIN_TYPE_CHANGE, function (e) {e.data === $.LOGINTYPE.ANONYMOUS && (t.config.persistence = "local");});}return e.prototype.init = function (t) {return this.config = n(n({}, u), t), W.Adapter.adapter || this._useDefaultAdapter(), new e(this.config);}, e.prototype.auth = function (e) {var t = (void 0 === e ? {} : e).persistence;return this.authObj ? this.authObj : (this.config = n(n({}, this.config), { persistence: t || W.Adapter.adapter.primaryStorage || "session" }), this.authObj = new i.default(this.config), this.authObj.init(), this.authObj);}, e.prototype.on = function (e, t) {return J.addEventListener.apply(this, [e, t]);}, e.prototype.off = function (e, t) {return J.removeEventListener.apply(this, [e, t]);}, e.prototype.callFunction = function (e, t) {return c.callFunction.apply(this, [e, t]);}, e.prototype.deleteFile = function (e, t) {return a.deleteFile.apply(this, [e, t]);}, e.prototype.getTempFileURL = function (e, t) {return a.getTempFileURL.apply(this, [e, t]);}, e.prototype.downloadFile = function (e, t) {return a.downloadFile.apply(this, [e, t]);}, e.prototype.uploadFile = function (e, t) {return a.uploadFile.apply(this, [e, t]);}, e.prototype.useAdapters = function (e) {var t = W.useAdapters(e) || {},n = t.adapter,r = t.runtime;n && (W.Adapter.adapter = n), r && (W.Adapter.runtime = r);}, e.prototype._useDefaultAdapter = function () {var e = W.useDefaultAdapter(),t = e.adapter,n = e.runtime;W.Adapter.adapter = t, W.Adapter.runtime = n;}, e;}())();l.useAdapters(s.default);try {window.tcb = l;} catch (e) {}t.exports = l;}));re.useAdapters(P);var oe = re,se = oe.init;var ie, ae;function ce(e) {ie || (ie = { PLATFORM: "mp-weixin", OS: y, APPID: l.appid }, ae = { ak: l.appid, p: "android" === y ? "a" : "i", ut: g(), uuid: v() });var t = JSON.parse(JSON.stringify(e.data || {})),n = e.name,r = this.config.spaceId,o = { tencent: "t", aliyun: "a" }[this.config.provider],s = Object.assign({}, ae, { fn: n, sid: r, pvd: o });return Object.assign(t, { clientInfo: ie, uniCloudClientInfo: encodeURIComponent(JSON.stringify(s)) }), e.data = t, e;}function ue(e) {var t = ce.call(this, e),n = { tencent: "tcb", aliyun: "aliyun" }[this.config.provider],r = ae.ak,o = this.config.spaceId,i = JSON.stringify(t.data),a = t.name,c = JSON.stringify({ body: { provider: n, appid: r, spaceId: o, functionName: a, run_params: i }, header: { token: "FG-6a0485a0-9135-11ea-b2e7-01bec80c022c" } });return new Promise(function (e, t) {uni.request({ url: h, method: "POST", data: { param: c }, complete: function complete(r) {r || (r = {});var o = r.data && r.data.body;if (!o) return void t(new s({ message: "[FUNCTIONS_EXECUTE_FAIL] Request Fail: [".concat(a, "]") }));if ("tcb" === n && o.log && "" !== o.log.trim() && console.log(o.log), 0 !== o.invokeResult && "0" !== o.invokeResult) return void t(new s({ message: o.errorMsg }));var i = o.requestId;var c = {};try {c = JSON.parse(o.result);} catch (e) {c = o.result;}e({ requestId: i, result: c });} });});}oe.init = function (e) {e.env = e.spaceId;var t = se.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = _(t[e]).bind(t);}), t;};if (["uploadFile", "deleteFile", "getTempFileURL", "downloadFile"].forEach(function (e) {t[e] = _(t[e]).bind(t);}), !1 !== e.autoSignIn) {var _e8 = t.auth();_e8.getLoginState().then(function (t) {t || _e8.signInAnonymously();});}return  true && console.log("使用腾讯云作为服务商时，调用云函数的同时会获取云函数运行日志，云函数响应会比发行慢，云函数实际响应时间应以发行为准"), t;};var le = { init: function init(e) {var t = {},n = !(!1 === e.debugFunction || "development" !== "development" || !"FG-6a0485a0-9135-11ea-b2e7-01bec80c022c");switch (e.provider) {case "tencent":t = oe.init(Object.assign(e, { useDebugFunction: n }));break;case "aliyun":n = n && ( false || "app-plus" === "mp-weixin"), t = m.init(Object.assign(e, { useDebugFunction: n }));break;default:throw new Error("未提供正确的provider参数");}return function (e) {var t = e.callFunction;e.config.useDebugFunction && "tencent" === e.config.provider && (t = ue), e.callFunction = function (e) {var _this6 = this;var n = ce.call(this, e);return new Promise(function (r, o) {t.call(_this6, n).then(function (e) {r(e);}).catch(function (t) {t && t.message && (t.message = "[".concat(e.name, "]: ").concat(t.message)), o(t);});});};var n = e.callFunction;e.callFunction = function (e) {return _(n).call(this, e);};}(t), t.init = this.init, t;} };var fe = le;try {var _e9 = {};1 === [{"provider":"aliyun","spaceName":"along","spaceId":"24a8791b-4615-4dfa-af84-73c65b54fbac","clientSecret":"dYBNdVjecAEPizwb1GD6Og==","endpoint":"https://api.bspapp.com"}].length && (_e9 = [{"provider":"aliyun","spaceName":"along","spaceId":"24a8791b-4615-4dfa-af84-73c65b54fbac","clientSecret":"dYBNdVjecAEPizwb1GD6Og==","endpoint":"https://api.bspapp.com"}][0]), fe = le.init(_e9);} catch (e) {["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile"].forEach(function (e) {fe[e] = function () {var e = [{"provider":"aliyun","spaceName":"along","spaceId":"24a8791b-4615-4dfa-af84-73c65b54fbac","clientSecret":"dYBNdVjecAEPizwb1GD6Og==","endpoint":"https://api.bspapp.com"}].length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在cloudfunctions目录右键关联服务空间";return console.error(e), Promise.reject(new s({ code: "SYS_ERR", message: e }));};});}var pe = fe;var _default = pe;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 274:
/*!********************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/pages.json?{"type":"stat"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__B73181C" };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/pages.json ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 43:
/*!***********************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/common/js/unti.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getTime = getTime;exports.getDate = getDate; /**
                                                                                                                                 * 获取时间 时+分
                                                                                                                                 */
function getTime() {
  var data = new Date();
  var hour = data.getHours();
  var minute = data.getMinutes();

  hour = hour > 9 ? hour : '0' + hour;
  minute = minute > 9 ? minute : '0' + minute;

  return "".concat(hour, ":").concat(minute);
}

/**
   * 获取时间 年+月+日
   */
function getDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  month = month > 9 ? month : '0' + month;;
  day = day > 9 ? day : '0' + day;

  return "".concat(year, "-").concat(month, "-").concat(day);
}

/***/ }),

/***/ 78:
/*!************************************************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/components/dc-isInstallApp/isInstallApp.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 判断手机上是否安装有某个app。
 * @param 
 */
function isInstallApp(urlTypes) {
  try {
    var os = plus.os.name;
    if ('iOS' == os) {
      var UIApplication = plus.ios.importClass("UIApplication");
      var NSURL = plus.ios.importClass("NSURL");
      var app = UIApplication.sharedApplication();
      var bdScheme = NSURL.URLWithString(urlTypes);
      var isInstall = app.canOpenURL(bdScheme);
      plus.ios.deleteObject(bdScheme);
      plus.ios.deleteObject(app);
      return isInstall;
    } else {

    }
  } catch (e) {
    console.error('error @isInstallApp!!');
  }
}


module.exports = {
  isInstallApp: isInstallApp };

/***/ }),

/***/ 8:
/*!********************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/utils/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.http = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var http = new _request.default();exports.http = http;

http.setConfig(function (config) {/* 设置全局配置 */
  config.baseUrl = 'http://student-app-api.zsdx.cn/api'; /* 根域名不同 */
  config.header = _objectSpread({},
  config.header, {
    'zsdx-app-type': 1,
    'zsdx-app-uuid': '',
    'zsdx-device-info': JSON.stringify({ "phone_model": "SM-G900P", "phone_platform": "android", "system_version": "Android 5.0", "language": "zh-CN" }),
    'zsdx-session-ticket': '097e8ebd973e35fa2e3032877bd619849657',
    'zsdx-version': '1.2.701' });

  return config;
});

/**
     * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
     * @param { Number } statusCode - 请求响应体statusCode（只读）
     * @return { Boolean } 如果为true,则 resolve, 否则 reject
     */
http.validateStatus = function (statusCode) {
  return statusCode === 200;
};

http.interceptor.request(function (config, cancel) {/* 请求之前拦截器 */
  config.header = _objectSpread({},
  config.header);

  /*
                  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
                    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
                  }
                  */
  return config;
});

http.interceptor.response(function (response) {/* 请求之后拦截器 */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  if (response.data.code == '2001') {//	异常处理
    //...
    console.log('异常处理');
    return;
  } else {
    return response;
  }
}, function (response) {// 请求错误做点什么
  return response;
});

/***/ }),

/***/ 9:
/*!**********************************************************************!*\
  !*** /Users/yangwenlong/Desktop/along/uniapp-study/utils/request.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 10));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var Request = /*#__PURE__*/function () {function Request() {var _this = this;_classCallCheck(this, Request);_defineProperty(this, "config",
    {
      baseUrl: '',
      header: {
        'content-type': 'application/json' },

      method: 'GET',
      dataType: 'json',

      responseType: 'text',

      custom: {} });_defineProperty(this, "interceptor",


































    {
      /**
       * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
       */
      request: function request(cb) {
        if (cb) {
          _this.requestBeforeFun = cb;
        }
      },
      /**
          * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
          * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
          */
      response: function response(cb, ecb) {
        if (cb) {
          _this.requestComFun = cb;
        }
        if (ecb) {
          _this.requestComFail = ecb;
        }
      } });}_createClass(Request, [{ key: "requestBeforeFun", value: function requestBeforeFun(


    config) {
      return config;
    } }, { key: "requestComFun", value: function requestComFun(

    response) {
      return response;
    } }, { key: "requestComFail", value: function requestComFail(

    response) {
      return response;
    }

    /**
       * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
       * @param { Number } statusCode - 请求响应体statusCode（只读）
       * @return { Boolean } 如果为true,则 resolve, 否则 reject
       */ }, { key: "validateStatus", value: function validateStatus(
    statusCode) {
      return statusCode === 200;
    }

    /**
       * @Function
       * @param {Request~setConfigCallback} f - 设置全局默认配置
       */ }, { key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    }

    /**
       * @Function
       * @param {Object} options - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this2 = this;var options,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                options.baseUrl = this.config.baseUrl;
                options.dataType = options.dataType || this.config.dataType;

                options.responseType = options.responseType || this.config.responseType;




                options.url = options.url || '';
                options.data = options.data || {};
                options.params = options.params || {};
                options.header = options.header || this.config.header;
                options.method = options.method || this.config.method;
                options.custom = _objectSpread({}, this.config.custom, {}, options.custom || {});



                options.getTask = options.getTask || this.config.getTask;return _context.abrupt("return",
                new Promise(function (resolve, reject) {
                  var next = true;
                  var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options;
                    var err = {
                      errMsg: t,
                      config: config };

                    reject(err);
                    next = false;
                  };

                  var handleRe = _objectSpread({}, _this2.requestBeforeFun(options, cancel));
                  var _config = _objectSpread({}, handleRe);
                  if (!next) return;
                  var requestTask = uni.request({
                    url: Request.mergeUrl(_config.url, _config.baseUrl, _config.params),
                    data: _config.data,
                    header: _config.header,
                    method: _config.method,



                    dataType: _config.dataType,

                    responseType: _config.responseType,




                    complete: function complete(response) {
                      response.config = handleRe;
                      if (_this2.validateStatus(response.statusCode)) {// 成功
                        response = _this2.requestComFun(response);
                        resolve(response);
                      } else {
                        response = _this2.requestComFail(response);
                        reject(response);
                      }
                    } });

                  if (handleRe.getTask) {
                    handleRe.getTask(requestTask, handleRe);
                  }
                }));case 12:case "end":return _context.stop();}}}, _callee, this);}));function request() {return _request.apply(this, arguments);}return request;}() }, { key: "get", value: function get(


    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url, _ref)













    {var _this3 = this;var filePath = _ref.filePath,name = _ref.name,header = _ref.header,_ref$formData = _ref.formData,formData = _ref$formData === void 0 ? {} : _ref$formData,_ref$custom = _ref.custom,custom = _ref$custom === void 0 ? {} : _ref$custom,_ref$params = _ref.params,params = _ref$params === void 0 ? {} : _ref$params,getTask = _ref.getTask;
      return new Promise(function (resolve, reject) {
        var next = true;
        var globalHeader = _objectSpread({}, _this3.config.header);
        delete globalHeader['content-type'];
        delete globalHeader['Content-Type'];
        var pubConfig = {
          baseUrl: _this3.config.baseUrl,
          url: url,



          filePath: filePath,
          method: 'UPLOAD',
          name: name,
          header: header || globalHeader,
          formData: formData,
          params: params,
          custom: _objectSpread({}, _this3.config.custom, {}, custom),
          getTask: getTask || _this3.config.getTask };






        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        var handleRe = _objectSpread({}, _this3.requestBeforeFun(pubConfig, cancel));
        var _config = {
          url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),



          filePath: handleRe.filePath,
          name: handleRe.name,
          header: handleRe.header,
          formData: handleRe.formData,
          complete: function complete(response) {
            response.config = handleRe;
            if (typeof response.data === 'string') {
              response.data = JSON.parse(response.data);
            }
            if (_this3.validateStatus(response.statusCode)) {// 成功
              response = _this3.requestComFun(response);
              resolve(response);
            } else {
              response = _this3.requestComFail(response);
              reject(response);
            }
          } };






        if (!next) return;
        var requestTask = uni.uploadFile(_config);
        if (handleRe.getTask) {
          handleRe.getTask(requestTask, handleRe);
        }
      });
    } }, { key: "download", value: function download(

    url) {var _this4 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var next = true;
        var pubConfig = {
          baseUrl: _this4.config.baseUrl,
          url: url,
          method: 'DOWNLOAD',
          header: options.header || _this4.config.header,
          params: options.params || {},
          custom: _objectSpread({}, _this4.config.custom, {}, options.custom || {}),
          getTask: options.getTask || _this4.config.getTask };

        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        var handleRe = _objectSpread({}, _this4.requestBeforeFun(pubConfig, cancel));
        if (!next) return;
        var requestTask = uni.downloadFile({
          url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
          header: handleRe.header,
          complete: function complete(response) {
            response.config = handleRe;
            if (_this4.validateStatus(response.statusCode)) {// 成功
              response = _this4.requestComFun(response);
              resolve(response);
            } else {
              response = _this4.requestComFail(response);
              reject(response);
            }
          } });

        if (handleRe.getTask) {
          handleRe.getTask(requestTask, handleRe);
        }
      });
    } }], [{ key: "posUrl", value: function posUrl(url) {/* 判断url是否为绝对路径 */return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);} }, { key: "mergeUrl", value: function mergeUrl(url, baseUrl, params) {var mergeUrl = Request.posUrl(url) ? url : "".concat(baseUrl).concat(url);if (Object.keys(params).length !== 0) {var paramsH = Request.addQueryString(params);mergeUrl += mergeUrl.includes('?') ? "&".concat(paramsH) : "?".concat(paramsH);}return mergeUrl;} }, { key: "addQueryString", value: function addQueryString(params) {var paramsData = '';Object.keys(params).forEach(function (key) {paramsData += key + '=' + encodeURIComponent(params[key]) + '&';});return paramsData.substring(0, paramsData.length - 1);} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {Function} request 请求拦截器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {Function} response 响应拦截器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */ }]);return Request;}(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * setConfig回调
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {Object} - 返回操作后的config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @callback Request~setConfigCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config - 全局默认config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 请求拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @return {Object} - 返回操作后的config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @callback Request~requestCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Object} config - 全局config
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {Function} [cancel] - 取消请求钩子，调用会取消本次请求
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 响应拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @return {Object} - 返回操作后的response
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @callback Request~responseCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} response - 请求结果 response
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 响应错误拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @return {Object} - 返回操作后的response
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @callback Request~responseErrCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @param {Object} response - 请求结果 response
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map