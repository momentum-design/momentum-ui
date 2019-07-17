const RegUpperLetter = /^[A-Z]/;
const ModifyApplyProperty = {
  'style': 1,
  'attr': 1,
  'classed': 1,
  'property': 1,
  'text': 1,
  'html': 1
};

const core = {
  guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0;
      let v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  // to be used or removed
  access: function (elem, key, value, fn) {
    var length = elem.length;
    // fake bool
    if (typeof length === 'number') {
      for (var i = 0; i < length; i++) {
        fn(elem[i], key, value);
      }
    } else {
      fn(elem, key, value);
    }
  },
  isArray: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
  isArguments: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Arguments]';
  },
  // add('ad',1,2) add([])
  // core.extendArguments(arguments, this._remove, this);
  extendArguments: function (args, fn, caller) {
    if (args.length && args.length > 0 && core.isArray(args[0])) {
      const _argList = args[0];
      let _returns = [];
      for (var i = 0, l = _argList.length; i < l; i++) {
        if (core.isArray(_argList[i])) {
          _returns.push(fn.apply(caller, _argList[i]));
        } else {
          _returns.push(fn.call(caller, _argList[i]));
        }
      }
      return _returns;
    } else {
      return fn.apply(caller, args);
    }
  },
  lowerCase: function (word) {
    return word.toLocaleLowerCase();
  },
  lowerCaseInital: function (word) {
    return word.replace(RegUpperLetter, core.lowerCase);
  },
  modifySelection: function (selection, config) {
    let args;
    for (let prop in config) {
      if (ModifyApplyProperty[prop]) {
        args = config[prop];
        for (let n in args) {
          selection[prop](n, args[n]);
        }
      }
    }
  },
  assignUnKnownLv2: function (target, source) {
    for (let prop in source) {
      if (target[prop] === undefined) {
        target[prop] = Object.assign({}, source[prop]);
      } else {
        Object.assign(target[prop], source[prop]);
      }
    }
  },
  getReturnOrValue: function (config, d, i) {
    if (typeof config === 'function') {
      return config(d, i);
    } else {
      return config;
    }
  },
  getFirstValue: function () {
    for (let i = 0, l = arguments.length; i < l; i++) {
      if (arguments[i] !== undefined) {
        return arguments[i];
      }
    }
    return undefined;
  },
  callInner: function (target, config, ifResetTarget) {
    for (let name in config) {
      if (typeof target[name] === 'function') {
        if (ifResetTarget) {
          target = target[name](config[name]);
        } else {
          target[name](config[name]);
        }
      }
    }
    return target;
  },
  applyInner: function (target, config, caller) {
    for (let name in config) {
      if (typeof target[name] === 'function') {
        target[name].apply(caller, config[name]);
      }
    }
    return target;
  }
};

export default core;
