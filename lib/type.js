"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = type;
var types = {
  date: function date(d) {
    return new Date(d);
  },
  array: function array(a) {
    return Array.isArray(a) ? a.slice() : [a];
  },
  object: function object(o) {
    return Object(o);
  },
  string: function string(s) {
    return String(s);
  },
  number: function number(n) {
    return Number(n);
  }
};

function type(t) {
  return types[t.toLowerCase()];
}

module.exports = exports["default"];