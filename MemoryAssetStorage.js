'use strict';

var AssetStorageInterface = require('spid-storage-asset-interface');

function AssetStorageMemory(){
  this._data = {};
}

AssetStorageMemory.prototype.init = function (f) {
  f();
};

/**
 * [dispose description]
 * @param  {Function} f(err)
 */
AssetStorageMemory.prototype.dispose = function (f) {
  this._data = {};
  f();
};

/**
 * [read description]
 * @param  {[type]} key  [description]
 * @param  {[type]} value [description]
 * @param  {Function} f(err, value), value is null if the `name`
 * @return {[type]}       [description]
 */
AssetStorageMemory.prototype.read = function (key, f) {
  if (!this._data.hasOwnProperty(key)) {
    return f(null, null);
  }

  f(null, this._data[key]);
};

/**
 * [write description]
 * @param  {[type]} key  [description]
 * @param  {[type]} value [description]
 * @param  {Function} f(err)
 * @return {[type]}       [description]
 */
AssetStorageMemory.prototype.write = function (key, value, f) {
  this._data[key] = value;
  f();
};

module.exports = AssetStorageInterface.ensureImplements(AssetStorageMemory);
