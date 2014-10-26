'use strict';

var ResourceStorageInterface = require('spid-storage-resource-interface');

function MemoryResourceStorage() {
  this._data = {};
}

MemoryResourceStorage.prototype.init = function (configuration, f) {
  f();
};

/**
 * [dispose description]
 * @param  {Function} f(err)
 */
MemoryResourceStorage.prototype.dispose = function (f) {
  this._data = {};
  f();
};

/**
 * [read description]
 * @param  {[type]} url  [description]
 * @param  {[type]} headers [description]
 * @param  {Function} f(err, value), value is null if the `name`
 * @return {[type]}       [description]
 */
MemoryResourceStorage.prototype.read = function (url, headers, f) {

  var key = this.formatKey(url, headers);
  if (!this._data.hasOwnProperty(key)) {
    return f(null, null);
  }

  f(null, this._data[key]);
};

/**
 * [write description]
 * @param  {[type]} url  [description]
 * @param  {[type]} headers  [description]
 * @param  {[type]} value [description]
 * @param  {Function} f(err)
 * @return {[type]}       [description]
 */
MemoryResourceStorage.prototype.write = function (url, headers, value, f) {
  var key = this.formatKey(url, headers);
  this._data[key] = value;
  f(null);
};

/**
 * [formatKey description]
 * @param url
 * @param headers
 * @returns {*}
 */
MemoryResourceStorage.prototype.formatKey = function (url, headers) {
  var key = url;
  if (headers['content-encoding'] && headers['content-encoding'] == 'gzip') {
    key += '_gz';
  }

  return key;
};

module.exports = ResourceStorageInterface.ensureImplements(MemoryResourceStorage);
