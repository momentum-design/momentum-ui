import core from '../utils/core';

class ResponsiveItem {

  constructor (shape, config) {
    this.Shape = shape;
    this.Guid = core.guid();
    this.cacheObject(config);
  }

  change(key) {
    let arr = this.ConfigArr,
      i = 0,
      l = arr.length;
    for (; i < l; i++) {
      if (key <= arr[i]) {
        break;
      }
    }
    i = Math.min(i, l - 1);
    this.Shape.extendConfig(this.ConfigCache[i]);
    this.Shape.modifySelection();
    this.Shape.render();
  }

  cacheObject(config) {
    var arr = [],
      conf = {},
      t;
    for (var name in config) {
      t = +name;
      if (typeof t === 'number') {
        arr.push(t);
      }
    }
    arr.sort(this._sort);
    for (let i = 0, l = arr.length; i < l; i++) {
      conf[i] = this.extendRest(arr, i, config);
    }
    this.ConfigCache = conf;
    this.ConfigArr = arr;
  }

  extendRest(arr, start, configList) {
    let config = {
      generator: {},
      modify: {},
      pie: {}
    };
    for (let i = arr.length - 1; i >= start; i--) {
      this.extend(config, configList[arr[i]]);
    }
    return config;
  }

  extend(object, config) {
    if (config) {
      if (config.generator) {
        Object.assign(object.generator, config.generator);
      }
      if (config.modify) {
        core.assignUnKnownLv2(object.modify, config.modify);
      }
      if (config.pie) {
        Object.assign(object.pie, config.pie);
      }
    }
  }

  _sort(a, b) {
    return a - b;
  }

}

export default ResponsiveItem;

