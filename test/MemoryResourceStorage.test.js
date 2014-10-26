'use strict';

var MemoryResourceStorage = require('../');
var _ = require('lodash');
var t = require('chai').assert;

var URL = 'http://www.test.org/test.html';
var GZ_HEADERS = {'content-encoding': 'gzip'};
var HEADERS = {};
var VALUE = "data";

describe('MemoryResourceStorage', function () {
  var storage;

  beforeEach(function (done) {
    storage = new MemoryResourceStorage();
    storage.init(_.noop, done);
  });

  describe('.write', function () {
    it('should be able to write to storage', function (f) {
      storage.write(URL, GZ_HEADERS, VALUE, function (err) {
        t.strictEqual(err, null);
        f();
      });
    });

    it('should be able to write to storage without headers', function (f) {
      storage.write(URL, HEADERS, VALUE, function (err) {
        t.strictEqual(err, null);
        f();
      });
    });
  });

  describe('.read', function () {
    it('should be able to read non-existent key', function (f) {
      storage.read(URL, HEADERS, function (err, value) {
        t.strictEqual(err, null);
        t.strictEqual(value, null);
        f();
      });
    });

    it('should be able to read key and gzip header', readsWithHeaders(GZ_HEADERS, "data1"));
    it('should be able to read key and empty header', readsWithHeaders(HEADERS, "data2"));

    function readsWithHeaders(headers, val) {
      return function (f) {
        storage.write(URL, headers, val, function (err, value) {
          storage.read(URL, headers, function (err, value) {
            t.strictEqual(value, val);
            f();
          });
        });
      }
    }
  });

  afterEach(function (f) {
    storage.dispose(f);
  });
});
