'use strict';

var util = require('util');

function toString(fmt) {
  if(!fmt) {
    return function(v) {
      return v + '';
    };
  }

  return function(v) {
    return util.format.apply(null, [fmt, v]);
  };
}

function toNumber(fmt) {
  switch(fmt) {
    case 'int':
      return parseInt;
    case 'float':
      return parseFloat;
    case 'bool':
      return Boolean;
    default:
      return JSON.parse;
  }
}

function callObjectFunc() {
  var object = arguments[0];
  var func_name = arguments[1];
  var args = Array.prototype.slice.call(arguments);
  args = args.slice(2, args.length);
  return function(v) {
    return object.prototype[func_name].apply(v, args);
  };
}

module.exports = {
  toString: toString,
  toNumber: toNumber,
  callObjectFunc: callObjectFunc,
};
