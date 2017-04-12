[![npm version](https://badge.fury.io/js/joc.svg)](http://badge.fury.io/js/joc)
[![Build Status](https://travis-ci.org/zhangxiaoyang/joc.svg?branch=master)](https://travis-ci.org/zhangxiaoyang/joc)

Object schema converter for JavaScript objects.

Joc
===

Installation
---

npm install joc -g

Example
---

```javascript
var template = {
  name: [
    '$.firstname',
    '$.lastname',
    function(firstname, lastname) {
      return firstname + ' ' + lastname;
    },
  ],
  email: ['$.email', Joc.func.callObjectFunc(String, 'trim')],
  phone: ['$.phone', Joc.func.toString('+86%s')],
  friends: '$.friends',
  other: {
    age: ['$.age', Joc.func.toNumber()],
    height: ['$.height', Joc.func.toNumber('float')],
    weight: ['$.weight', Joc.func.toNumber('float')]
  }
};

var json = {
  firstname: 'Sheep',
  lastname: 'X',
  email: '\t  xsheep@x.com  \t',
  phone: '1234567890',
  age: '18',
  height: '180',
  weight: '70',
  introduction: 'Good boy',
  friends: [
    'Dog A',
    'Cat B'
  ]
};

var conv_json = Joc.convert({
  template: template,
  json: json
});

console.log(conv_json);
/*
{
  name: 'Sheep X',
  email: 'xsheep@x.com',
  phone: '+861234567890',
  friends: [
    'Dog A',
    'Cat B'
  ],
  other: {
    age: 18,
    height: 180.0,
    weight: 70.0
  }
};
*/
```

License
---

MIT
