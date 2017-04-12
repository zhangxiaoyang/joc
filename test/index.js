'use strict';

var should = require('chai').should();

var Joc = require('../lib');

describe('Joc', function() {

  it('convert 1', function() {
    var template = {
      name: function($) {
        return $.firstname + ' ' + $.lastname;
      },
      email: function($) {
        return $.email;
      },
      phone: function($) {
        return $.phone;
      },
      friends: function($) {
        return $.friends;
      },
      other: {
        age: function($) {
          return $.age;
        },
        height: function($) {
          return $.height;
        },
        weight: function($) {
          return $.weight;
        }
      }
    };
    var json = {
      firstname: 'Sheep',
      lastname: 'X',
      email: 'xsheep@x.com',
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
    conv_json.should.eql({
      name: 'Sheep X',
      email: 'xsheep@x.com',
      phone: '1234567890',
      friends: [
        'Dog A',
        'Cat B'
      ],
      other: {
        age: '18',
        height: '180',
        weight: '70'
      }
    });
  });

  it('convert 2', function() {
    var template = {
      name: [
        '$.firstname',
        '$.lastname',
        function(firstname, lastname) {
          return firstname + ' ' + lastname;
        },
      ],
      email: [
        '$.email',
        function(email) {
          return email;
        }
      ],
      phone: [
        '$.phone',
        function(phone) {
          return phone;
        }
      ],
      friends: [
        '$.friends',
        function(friends) {
          return friends;
        }
      ],
      other: [
        '$.age',
        '$.height',
        '$.weight',
        function(age, height, weight) {
          return {
            age: age,
            height: height,
            weight: weight
          }
        }
      ]
    };
    var json = {
      firstname: 'Sheep',
      lastname: 'X',
      email: 'xsheep@x.com',
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
    conv_json.should.eql({
      name: 'Sheep X',
      email: 'xsheep@x.com',
      phone: '1234567890',
      friends: [
        'Dog A',
        'Cat B'
      ],
      other: {
        age: '18',
        height: '180',
        weight: '70'
      }
    });
  });

  it('convert 3', function() {
    var template = {
      name: [
        '$.firstname',
        '$.lastname',
        function(firstname, lastname) {
          return firstname + ' ' + lastname;
        },
      ],
      email: '$.email',
      phone: '$.phone',
      friends: '$.friends',
      other: {
        age: '$.age',
        height: '$.height',
        weight: '$.weight'
      }
    };
    var json = {
      firstname: 'Sheep',
      lastname: 'X',
      email: 'xsheep@x.com',
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
    conv_json.should.eql({
      name: 'Sheep X',
      email: 'xsheep@x.com',
      phone: '1234567890',
      friends: [
        'Dog A',
        'Cat B'
      ],
      other: {
        age: '18',
        height: '180',
        weight: '70'
      }
    });
  });

  it('convert 4', function() {
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
    conv_json.should.eql({
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
    });
  });

  it('convert 5', function() {
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
      lastname: 'X'
    };
    var conv_json = Joc.convert({
      template: template,
      json: json
    });
    conv_json.should.eql({
      name: 'Sheep X',
      email: undefined,
      phone: undefined,
      friends: undefined,
      other: {
        age: undefined,
        height: undefined,
        weight: undefined
      }
    });
  });
});
