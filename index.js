'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Type = require('./type');

var _Type2 = _interopRequireWildcard(_Type);

var Model = (function () {
  function Model() {
    var attrs = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Model);

    this.attributes = {};
    this.observers = {};
    for (var attr in attrs) {
      if (!this.constructor.attributes[attr]) continue;
      this[attr] = attrs[attr];
    }
  }

  _createClass(Model, [{
    key: 'update',
    value: function update(attrs) {
      for (var attr in attrs) {
        this[attr] = attrs[attr];
      }
      this.notify('changed', attrs);
      return this;
    }
  }, {
    key: 'notify',
    value: function notify(event, data) {
      var observers = this.observers[event];
      if (!observers) {
        return;
      }for (var id in observers) {
        observers[id].call(event, data, this);
      }
      return this;
    }
  }, {
    key: 'on',
    value: function on(events, observer) {
      for (var i = 0; i < events.length; i++) {
        var _event = events[i];
        if (!this.observers[_event]) this.observers[_event] = {};
        this.observers[_event][observer.id] = observer;
      }
      return this;
    }
  }, {
    key: 'off',
    value: function off(events, observer) {
      for (var i = 0; i < events.length; i++) {
        var _event2 = events[i];
        if (!this.observers[_event2]) continue;
        delete this.observers[_event2][observer.id];
      }
      return this;
    }
  }, {
    key: 'getObservers',
    value: function getObservers() {
      return this.observers;
    }
  }, {
    key: 'removeAllObservers',
    value: function removeAllObservers() {
      this.observers = {};
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
      var repr = '';
      for (var attr in this.attributes) {
        repr += '' + attr + ': ' + this[attr] + ' ';
      }
      return '' + this.constructor.name + ' { ' + repr + ' }';
    }
  }], [{
    key: 'build',
    value: function build() {
      var attrs = arguments[0] === undefined ? {} : arguments[0];

      var Through = (function (_Model) {
        function Through() {
          _classCallCheck(this, Through);

          if (_Model != null) {
            _Model.apply(this, arguments);
          }
        }

        _inherits(Through, _Model);

        return Through;
      })(Model);

      ;
      Through.attributes = attrs;

      var _loop = function (attr) {
        Object.defineProperty(Through.prototype, attr, {
          get: function get() {
            return this.attributes[attr];
          },
          set: function set(value) {
            var previous = this.attributes[attr];
            var current = attrs[attr](value);
            if (current === previous) {
              return;
            }this.notify('changed', _defineProperty({}, attr, current));
            this.notify('changed:' + attr, { previous: previous, current: current });
            this.attributes[attr] = current;
          }
        });
      };

      for (var attr in attrs) {
        _loop(attr);
      }
      return Through;
    }
  }]);

  return Model;
})();

Model.type = _Type2['default'];

exports['default'] = Model;
module.exports = exports['default'];