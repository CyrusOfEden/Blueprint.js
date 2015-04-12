'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter2 = require('events');

var _Type = require('./type');

var _Type2 = _interopRequireWildcard(_Type);

var Blueprint = (function (_EventEmitter) {
  function Blueprint() {
    var attrs = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Blueprint);

    _get(Object.getPrototypeOf(Blueprint.prototype), 'constructor', this).call(this);
    this.attributes = {};
    this.observers = {};
    for (var attr in attrs) {
      if (!this.constructor.attributes[attr]) continue;
      this[attr] = attrs[attr];
    }
  }

  _inherits(Blueprint, _EventEmitter);

  _createClass(Blueprint, [{
    key: 'set',
    value: function set(attr, value) {
      var emitChange = arguments[2] === undefined ? true : arguments[2];

      var previous = this.attributes[attr];
      var current = this.constructor.attributes[attr](value);
      if (previous === current) {
        return;
      }this.attributes[attr] = current;
      this.emit('changed:' + attr, { previous: previous, current: current });
      if (emitChange) this.emit('changed', _defineProperty({}, attr, value));
    }
  }, {
    key: 'get',
    value: function get(attr) {
      return this.attributes[attr];
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      for (var attr in attrs) {
        this.set(attr, attrs[attr], false);
      }
      this.emit('changed', attrs);
      return this;
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      return this.attributes;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.attributes.toJSON();
    }
  }], [{
    key: 'build',
    value: function build() {
      var attrs = arguments[0] === undefined ? {} : arguments[0];

      var Model = (function (_Blueprint) {
        function Model() {
          _classCallCheck(this, Model);

          if (_Blueprint != null) {
            _Blueprint.apply(this, arguments);
          }
        }

        _inherits(Model, _Blueprint);

        return Model;
      })(Blueprint);

      ;

      var _loop = function (attr) {
        Object.defineProperty(Model.prototype, attr, {
          get: function get() {
            return this.get(attr);
          },
          set: function set(value) {
            return this.set(attr, value);
          }
        });
      };

      for (var attr in attrs) {
        _loop(attr);
      }
      Model.attributes = attrs;
      return Model;
    }
  }]);

  return Blueprint;
})(_EventEmitter2.EventEmitter);

Blueprint.type = _Type2['default'];

exports['default'] = Blueprint;
module.exports = exports['default'];