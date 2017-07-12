/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _queueItem = __webpack_require__(1);

var _queueItem2 = _interopRequireDefault(_queueItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_queueItem2.default.enqueue(10);
_queueItem2.default.enqueue(11);
_queueItem2.default.enqueue(12);
_queueItem2.default.enqueue(13);
_queueItem2.default.enqueue(17);
console.log(_queueItem2.default.size());

_queueItem2.default.sort();

var iter = _queueItem2.default.getIterator()();
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = iter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var value = _step.value;

    console.log(value);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

console.log(_queueItem2.default.size());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iterableQueue = __webpack_require__(2);

var _iterableQueue2 = _interopRequireDefault(_iterableQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var q = new _iterableQueue2.default();

exports.default = q;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queue = __webpack_require__(3);

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetIterator = function (_Queue) {
  _inherits(GetIterator, _Queue);

  function GetIterator() {
    _classCallCheck(this, GetIterator);

    return _possibleConstructorReturn(this, (GetIterator.__proto__ || Object.getPrototypeOf(GetIterator)).call(this, 100));
  }

  _createClass(GetIterator, [{
    key: 'getIterator',
    value: function getIterator() {
      var self = this;
      return regeneratorRuntime.mark(function getIterator() {
        var i;
        return regeneratorRuntime.wrap(function getIterator$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = self.queue.length - 1;

              case 1:
                if (!(i >= 0)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return self.dequeue();

              case 4:
                i -= 1;
                _context.next = 1;
                break;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, getIterator, this);
      });
    }
  }]);

  return GetIterator;
}(_queue2.default);

exports.default = GetIterator;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = function () {
  function Queue(maxSize) {
    _classCallCheck(this, Queue);

    this.maxSize = maxSize;
    this.queue = [];
  }

  _createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(item) {
      if (!this.isFull()) {
        this.queue.push(item);
      }
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      if (!this.isEmpty()) {
        return this.queue.pop();
      }
      return undefined;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.queue.length === 0;
    }
  }, {
    key: "isFull",
    value: function isFull() {
      return this.queue.length === this.maxSize;
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.queue[this.queue.length];
    }
  }, {
    key: "size",
    value: function size() {
      return this.queue.length;
    }
  }, {
    key: "sort",
    value: function sort(comparator) {
      if (comparator) this.queue.sort(comparator);else this.queue.sort();
    }
  }]);

  return Queue;
}();
/*
enqueue: add to queue
dequeue: remove from queue (and return it)
isEmpty
isFull
peek: get item from queue without removing it
size (getter): get current size of the queue
sort: you can pass comparator parameter to sort queue items


*/


exports.default = Queue;

/***/ })
/******/ ]);