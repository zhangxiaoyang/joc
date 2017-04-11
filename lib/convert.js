'use strict';

var JSONPath = require('jsonpath-plus');

function isJSONPath(s) {
  return typeof s == 'string' && s.startsWith('$');
}

var convert = function(options) {
  var template = options.template || {};
  var json = options.json || {};

  var conv_json = {};

  for(var key in template) {
    var value = template[key];

    // IF value MATCH { key: [ jsonpath1, jsonpath2, ..., conv_func ] }
    // THEN
    //    conv_json[key] = conv_func(json) 
    // ELSE
    //    conv_json[key] = value
    // ENDIF
    if(value instanceof Array) {
      var args = value;
      var flag = true;
      args.slice(0, args.length - 1).map(function(arg, arg_index) {
        flag &= arg_index < args.length - 1
          ? isJSONPath(arg)
          : (typeof arg == 'function');
      });

      if(flag) {
        var values = args.slice(0, args.length - 1).map(function(path) {
          return JSONPath({
            json: json,
            path: path
          })[0];
        });
        var conv_func = args[args.length - 1];
        conv_json[key] = conv_func.apply(null, values);
      } else {
        conv_json[key] = value;
      }
      continue;
    }

    // IF value MATCH { key: conv_func }
    // THEN
    //    conv_json[key] = conv_func(json) 
    // ENDIF
    if(typeof value == 'function') {
      var conv_func = value;
      conv_json[key] = conv_func(json);
      continue;
    }

    // IF value MATCH { key: { ... } }
    // THEN
    //    convert({ json: json:, template: value })
    // ENDIF
    if(typeof value == 'object') {
      var innter_template = value;
      conv_json[key] = convert({
        json: json,
        template: innter_template
      });
      continue;
    }

    // IF value MATCH { key: jsonpath }
    // THEN
    //    convert({ json: json:, template: value })
    // ENDIF
    if(isJSONPath(value)) {
      var path = value;
      conv_json[key] = JSONPath({
        json: json,
        path: path
      })[0];
      continue;
    }

    // DEFAULT
    //    conv_json[key] = value
    conv_json[key] = value;
  }

  return conv_json;
};

module.exports = convert;
