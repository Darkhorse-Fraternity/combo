/* @flow */

export const LimitableMap = function (limit) {
  this.limit = limit || 10;
  this.map = {};
  this.keys = [];
};

const { hasOwnProperty } = Object.prototype;

LimitableMap.prototype.set = function (key, value) {
  const { map } = this;
  const { keys } = this;
  if (!hasOwnProperty.call(map, key)) {
    if (keys.length === this.limit) {
      const firstKey = keys.shift();
      delete map[firstKey];
    }
    keys.push(key);
  }
  map[key] = value;
};

LimitableMap.prototype.get = function (key) {
  return this.map[key];
};

// let  _limitableMap = new LimitableMap(100) // 构建单例
