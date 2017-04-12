'use strict';

var util = require('util');

function toString(fmt) {
  return function(v) {
    if(v === undefined) {
      return undefined;
    }

    if(!fmt) {
      return v + '';
    }
    return util.format.apply(null, [fmt, v]);
  };
}

function toNumber(fmt) {
  return function(v) {
    if(v === undefined) {
      return undefined;
    }
    switch(fmt) {
      case 'int':
        return parseInt(v);
      case 'float':
        return parseFloat(v);
      case 'bool':
        return Boolean(v);
      default:
        return JSON.parse(v);
    }
  };
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
