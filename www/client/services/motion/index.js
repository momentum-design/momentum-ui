//regular expression
var support = {},
  regNum = /(-?\d+)(\.\d+)?/g,
  regMsPrefix = /^-ms-/,
  regDashAlpha = /-([\da-z])/gi,
  cssProps = {
    // normalize float css property
    float: support.cssFloat ? 'cssFloat' : 'styleFloat',
  };

// Used camelCase as callback to replace()
var camelCase = function(string) {
    return string.replace(regMsPrefix, 'ms-').replace(regDashAlpha, fcamelCase);
  },
  fcamelCase = function(all, letter) {
    return letter.toUpperCase();
  },
  upper1st = function(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  },
  lower1st = function(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  },
  // return a css property mapped to a potentially vendor prefixed property
  vendorPropName = function(style, name) {
    // shortcut for names that are not vendor prefixed
    if (name in style) {
      return name;
    }
    // check for vendor prefixed names
    var capName = upper1st(name),
      origName = name;

    name = browser.CssPrefixes + capName;
    if (name in style) {
      return name;
    }

    return origName;
  };

(function() {
  var div, a;
  div = document.createElement('div');
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
  a = div.getElementsByTagName('a')[0];
  style = a && a.style;

  if (!style) {
    return;
  }
  style.cssText = 'float:left;opacity:.5';
  // Verify style float existence
  // (IE uses styleFloat instead of cssFloat)
  support.cssFloat = !!style.cssFloat;
  support.clearCloneStyle = div.style.backgroundClip === 'content-box';
})();

var css = function(dom, key, value) {
    //only deal with dom
    if (!dom || dom.nodeType === 3 || dom.nodeType === 8 || !dom.style) {
      return;
    }

    // Make sure that we're working with the right name
    var ret,
      type,
      origName = camelCase(key),
      style = dom.style;

    name = cssProps[origName] || (cssProps[origName] = vendorPropName(style, origName));

    if (value !== undefined) {
      //return when null and NaN
      if (value == null || value !== value) {
        return;
      }

      try {
        style[name] = value;
      } catch (e) {}
    } else {
      return style[name];
    }
  },
  attr = function(dom, key, value) {
    if (typeof dom === 'object') {
      //dom do not solve the select options
      if (dom.nodeType !== undefined && dom.nodeType === 1) {
        dom.setAttribute(key, value);
        //other
      } else {
        dom[key] = value;
      }
    }
  },
  prop = function(dom, key, value) {
    if (dom != null) {
      dom[key] = value;
    }
  },
  access = function(elem, key, value, fn) {
    var length = elem.length;
    //fake bool
    if (typeof length === 'number') {
      for (var i = 0; i < length; i++) {
        fn(elem[i], key, value);
      }
    } else {
      fn(elem, key, value);
    }
  },
  initViaReg = function(opt, spriteName) {
    var _sprite = opt[spriteName];
    if (_sprite) {
      //not so serious
      var _s1 = _sprite[0],
        _s2 = _sprite[1],
        _prop1,
        _prop2,
        _val1,
        _val2,
        _match1,
        _match2,
        _setWhenStart = {},
        _setAnimation = {},
        _setWhenEnd = {},
        _setWhenStartWithEnd = {},
        _setWhenEndWithStart = {},
        _cacheData = {};
      for (var name in _s1) {
        _prop2 = _s2[name];
        if (_prop2 !== undefined) {
          _val1 = _s1[name] + '';
          _val2 = _s2[name] + '';
          _match1 = _val1.match(regNum);
          _match2 = _val2.match(regNum);
          if (_match1 && _match2 && _match1.length === _match2.length) {
            var _matchDalt = [];
            //_match2-_match2
            for (var i = 0, l = _match1.length; i < l; i++) {
              _match1[i] = Number(_match1[i]);
              _matchDalt.push(Number(_match2[i]) - _match1[i]); //dalt
            }
            _setAnimation[name] = [_val1, _match1, _matchDalt];
            _cacheData[name] = {};
            //set start val and end val
          } else {
            _setWhenStart[name] = _val1;
            _setWhenEnd[name] = _val1;
          }
          //set start val
        } else {
          _setWhenStart[name] = _s1[name] + '';
        }
      }
      for (var name in _s2) {
        _prop1 = _s1[name];
        //end val
        if (_prop1 === undefined) {
          _setWhenEnd[name] = _s2[name] + '';
        }
      }

      Ash.Core.extend(_setWhenStartWithEnd, _setWhenStart);
      Ash.Core.extend(_setWhenStartWithEnd, _setWhenEnd, false);

      Ash.Core.extend(_setWhenEndWithStart, _setWhenEnd);
      Ash.Core.extend(_setWhenEndWithStart, _setWhenStart, false);

      opt.Cache[spriteName] = {
        set_start: _setWhenStart,
        set_end: _setWhenEnd,
        set_startWithEnd: _setWhenStartWithEnd,
        set_endWithStart: _setWhenEndWithStart,
        set_duration: _setAnimation,
        data: _cacheData,
      };
    }
  };

var CommonIRD = function(name) {
  this.Name = name;
  this.FN = this.fnPoint[name];
};
CommonIRD.prototype = {
  before: function(sprite) {
    initViaReg(sprite, this.Name);
  },
  excute: function(sprite, time, stateOrder) {
    var lastTime = sprite.time,
      dom = sprite.dom,
      _to_setName;
    //if(time === 0 || time === sprite.dead){

    if (stateOrder === undefined) {
      if (time === 0) {
        _to_setName = time === lastTime ? 'set_endWithStart' : 'set_start';
      } else if (time === lastTime) {
        _to_setName = 'set_end';
      }
    } else {
      if (stateOrder) {
        _to_setName = time === lastTime ? 'set_endWithStart' : 'set_start';
      } else {
        _to_setName = time === 0 ? 'set_startWithEnd' : 'set_end';
      }
    }

    if (_to_setName) {
      var _to_set = sprite.Cache[this.Name][_to_setName];
      for (var name in _to_set) {
        access(dom, name, _to_set[name], this.FN);
      }
    }

    var _replaceIndex,
      _tmp,
      _val,
      data = sprite.Cache[this.Name].set_duration,
      cache = sprite.Cache[this.Name].data,
      tweenFn = sprite.fnTween;
    for (var name in data) {
      _val = cache[name][time];
      if (_val === undefined) {
        _tmp = data[name];
        _replaceIndex = -1;
        //see if can speed up by annoucing this function only once************************************************************>>>>>
        cache[name][time] = _val = _tmp[0].replace(regNum, function(pWord) {
          _replaceIndex++;
          return tweenFn(time, _tmp[1][_replaceIndex], _tmp[2][_replaceIndex], lastTime);
        });
      }
      //this.FN(dom,name,_val);
      access(dom, name, _val, this.FN);
      //access(dom,name,_val,setfunc[spriteName]);
    }
  },
  preExcute: function(sprite) {
    var _replaceIndex,
      _tmp,
      lastTime = sprite.time,
      data = sprite.Cache[this.Name].set_duration,
      cache = sprite.Cache[this.Name].data,
      tween = sprite.fnTween;
    for (var time = 0; time < lastTime; time++) {
      for (var name in data) {
        if (cache[name][time] === undefined) {
          _tmp = data[name];
          _replaceIndex = -1;
          //see if can speed up by annoucing this function only once************************************************************>>>>>
          cache[name][time] = _tmp[0].replace(regNum, function(pWord) {
            _replaceIndex++;
            return tween(time, _tmp[1][_replaceIndex], _tmp[2][_replaceIndex], lastTime);
          });
        }
      }
    }
  },
  fnPoint: {
    css: css,
    attr: attr,
    prop: prop,
  },
};
var IRDCSS = new CommonIRD('css');
var IRDATTR = new CommonIRD('attr');
var IRDPROP = new CommonIRD('prop');
var IRDDELEGATE = new function() {
  this.Name = 'delegate';
  this.before = function(time) {};
  this.excute = function(sprite, time, stateOrder) {
    sprite.delegate(time, sprite.time);
  };
  this.preExcute = function(time) {};
}();

//cross browser
var browser = new function() {
  var me = this,
    _regConfig = {
      Chrome: {
        Reg: /.*(chrome)\/([\w.]+).*/,
        Core: 'webkit',
        CssPrefixes: 'Webkit',
      },
      Firefox: {
        Reg: /.*(firefox)\/([\w.]+).*/,
        Core: 'moz',
        CssPrefixes: 'Moz',
      },
      Opera: {
        Reg: /(opera).+version\/([\w.]+)/,
        Core: 'o',
        CssPrefixes: 'O',
      },
      Safari: {
        Reg: /.*version\/([\w.]+).*(safari).*/,
        Core: 'webkit',
        CssPrefixes: 'Webkit',
      },
      /*
                    Microsoft Edge userAgent 2bd
                    */
      IE: {
        Reg: /.*(msie) ([\w.]+).*/,
        Core: 'ms',
        CssPrefixes: 'ms',
      },
    },
    _userAgent = navigator.userAgent.toLowerCase();
  /*
   * Get the detail information of browser
   * @return {object}
   */
  for (var _o in _regConfig) {
    var _result = _regConfig[_o].Reg.exec(_userAgent);
    if (_result != null) {
      me.Name = _result[1];
      me.Version = _result[2];
      me.Prefix = _regConfig[_o].Core;
      me.CssPrefixes = _regConfig[_o].CssPrefixes;
    }
  }
  //mobile
  me.IsIPhone = /iphone/.test(_userAgent);
  me.IsWP8 = /windows phone/.test(_userAgent);
  me.IsIE9 = /msie 9.0/.test(_userAgent);
  me.IsMobile = /mobile/.test(_userAgent);
  me.IsWP8QQ = /msie 9.0/.test(_userAgent) && /mobile/.test(_userAgent);

  this.compatibility = function(root, name, func, specialName) {
    root[name] = root[specialName] || root[name] || root[me.Prefix + upper1st(name)] || func;
  };
}();

//simple override
browser.compatibility(window, 'requestAnimationFrame', function(callback, el) {
  return setTimeout(callback, 16);
});
browser.compatibility(
  window,
  'cancelRequestAnimationFrame',
  function(id, el) {
    return clearTimeout(id, el);
  },
  'cancelAnimationFrame'
);

var Ash = new function() {
  var Core = new function() {
    var _pkid = 0,
      toString = Object.prototype.toString;
    /*
     * Get the global pkid
     * @return {number}
     */
    this.getPkid = function() {
      _pkid = _pkid + 1;
      if (_pkid > 2000000000) {
        _pkid = 0;
      }
      return _pkid;
    };
    this.extend = function(target, source) {
      var args = [].slice.call(arguments),
        i = 1,
        key,
        ride = typeof args[args.length - 1] == 'boolean' ? args.pop() : true;
      if (args.length == 1) {
        target = !this.window ? this : {};
        i = 0;
      }
      while ((source = args[i++])) {
        for (key in source) {
          if (ride || !(key in target)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    this.eachFn = function(obj, fnName, args) {
      for (var n in obj) {
        obj[n][fnName](args);
      }
    };
    this.isArray = function(obj) {
      return toString.call(obj) === '[object Array]';
    };
  }();
  this.Core = Core;

  /*
   * Tween
   * @Author:     yulianghuang
   * @CreateDate  2015/11/30
   * @param t {num} current time（当前时间）
   * @param b {num} beginning value（初始值）
   * @param c {num} change in value（变化量）
   * @param d {num} duration（持续时间）
   */
  var tween = {
    linear: function(t, b, c, d) {
      return (c * t) / d + b;
    },
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    linearInt: function(t, b, c, d) {
      return parseInt((c * t) / d + b);
    },
    easeInInt: function(t, b, c, d) {
      return parseInt(c * (t /= d) * t + b);
    },
    easeOutInt: function(t, b, c, d) {
      return parseInt(-c * (t /= d) * (t - 2) + b);
    },
    rgbaLinear: function(t, b, c, d) {
      if (b >> 0 === b && c >> 0 === c) {
        return parseInt((c * t) / d + b);
      } else {
        return (c * t) / d + b;
      }
    },
    cubicEaseIn: function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    cubicEaseOut: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    cubicEaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },
    quartEaseIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    quartEaseOut: function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    quartEaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
      return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
    },
    quintEaseIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    quintEaseOut: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    quintEaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
    sineEaseIn: function(t, b, c, d) {
      return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
    },
    sineEaseOut: function(t, b, c, d) {
      return c * Math.sin((t / d) * (Math.PI / 2)) + b;
    },
    sineEaseInOut: function(t, b, c, d) {
      return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
    },
    expoEaseIn: function(t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    expoEaseOut: function(t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
    },
    expoEaseInOut: function(t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    circEaseIn: function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    circEaseOut: function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    circEaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
      return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    bounceEaseIn: function(t, b, c, d) {
      return c - tween.bounceEaseOut(d - t, 0, c, d) + b;
    },
    bounceEaseOut: function(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    bounceEaseInOut: function(t, b, c, d) {
      if (t < d / 2) return tween.bounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
      else return tween.bounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    },
  };
  // Expose API
  this.Tween = tween;

  var IRD = {};
  this.loadIRD = function(ird) {
    if (IRD[ird.Name] === undefined) {
      IRD[ird.Name] = ird;
    }
  };
  this.unLoadIRD = function(ird) {
    delete IRD[ird.Name];
  };

  var Sprite = function(opt) {
    this.init(opt);
  };
  Sprite.prototype = {
    init: function(opt) {
      opt = Core.extend(
        opt,
        {
          delay: 0,
          time: 30,
          tween: 'linear',
        },
        false
      );
      opt.dead = opt.delay + opt.time;
      Core.extend(this, opt);
      this.Cache = {};
      if (typeof this.tween === 'function') {
        this.fnTween = this.tween;
      } else if (typeof this.tween === 'string' && typeof tween[this.tween] === 'function') {
        this.fnTween = tween[this.tween];
      } else {
        this.fnTween = tween.linear;
      }
      this.before();
    },
    update: function(opt) {
      //clear
      for (var p in this) {
        if (this.hasOwnProperty(p)) {
          delete this[p];
        }
      }
      this.init(this);
    },
    before: function() {
      var _ird = [];
      for (var name in IRD) {
        if (this[name] !== undefined) {
          _ird.push(IRD[name]);
        }
      }
      this.Ird = _ird;
      this.fnIRD('before');
    },
    fnIRD: function(name, i, args2) {
      var _ird = this.Ird;
      for (var n in _ird) {
        _ird[n][name](this, i, args2);
      }
    },
    preExcute: function() {
      this.fnIRD('preExcute');
    },
    excute: function(time, stateOrder) {
      if (time >= this.delay && time <= this.dead) {
        this.fnIRD('excute', time - this.delay, stateOrder);
      } else if (stateOrder !== undefined) {
        this.fnIRD('excute', stateOrder ? this.dead : this.delay, stateOrder);
      }
    },
  };

  var Scripts = function() {
    var i = 0,
      l = arguments.length,
      scripts,
      endFunc,
      stopFunc;

    this.Sprites = [];

    //scripts
    if (i >= l || !Core.isArray(arguments[i])) {
      return;
    }
    scripts = arguments[i];
    i++;

    //render gap
    if (typeof arguments[i] !== 'number' || i >= l) {
      this.RenderGap = 1;
    } else {
      this.RenderGap = arguments[i];
      i++;
    }
    this.render = this.RenderGap === 1 ? this.renderEach : this.renderGap;

    //success
    if (i < l) {
      this.endFunc = arguments[i];
      i++;
    }

    //stop
    if (i < l) {
      this.stopFunc = arguments[i];
    }

    this.add(scripts);
  };
  Scripts.prototype = {
    add: function(scripts) {
      var deadTime = this.DeadTime || 0,
        _sprites = [],
        tmpInstance;
      for (var n in scripts) {
        tmpInstance = new Sprite(scripts[n]);
        //set deadTime
        if (tmpInstance.dead > deadTime) {
          deadTime = tmpInstance.dead;
        }
        _sprites.push(tmpInstance);
      }
      this.DeadTime = deadTime;
      this.Sprites = this.Sprites.concat(_sprites);
      this.Sprites.sort(this._sort);
      return _sprites;
    },
    update: function(sprites, scripts) {
      this.remove(sprites);
      var _val = this.add(scripts);
      while (sprites.length > 0) {
        delete sprites.pop();
      }
      for (var i = 0, l = _val.length; i < l; i++) {
        sprites.push(_val[i]);
      }
    },
    update2: function(sprites, scripts) {
      if (sprites.length === scripts.length) {
        var p;
        console.log(1, sprites);
        for (var i = 0, l = sprites.length; i < l; i++) {
          p = sprites[i];
          p.update(scripts[i]);
          if (p.dead > this.DeadTime) {
            this.DeadTime = p.dead;
          }
        }
        this.sort();
      } else {
        this.remove(sprites);
        var _val = this.add(scripts);
        while (sprites.length > 0) {
          delete sprites.pop();
        }
        for (var i = 0, l = _val.length; i < l; i++) {
          sprites.push(_val[i]);
        }
        //console.log(2,sprites);
      }
    },
    remove: function(sprites, ifRelease) {
      var _index, i;
      for (i = sprites.length - 1; i > -1; i--) {
        _index = this.Sprites.indexOf(sprites[i]);
        if (_index != -1) {
          this.Sprites.splice(_index, 1);
        }
      }
      this.sort();
      // ifRelease && sprites = [];
    },
    sort: function() {
      this.DeadTime = 0;
      for (var i = this.Sprites.length - 1; i > -1; i--) {
        this.DeadTime = Math.max(this.DeadTime, this.Sprites[i].dead);
      }
    },
    _sort: function(a, b) {
      var ret;
      if (a.delay === b.delay) {
        ret = a.dead > b.dead;
      } else {
        ret = a.delay > b.delay;
      }
      return ret ? 1 : -1;
    },
    renderEach: function(i) {
      //for(var m in this.Sprites){
      this.each('excute', i);
      //}
    },
    renderGap: function(i) {
      if (i % this.RenderGap === 0) {
        this.each('excute', i);
      }
    },
    preExcute: function() {
      this.each('preExcute');
    },
    each: function(fn, i) {
      for (var m in this.Sprites) {
        this.Sprites[m][fn](i);
      }
    },
    play: function(startFrame, endFrame, repeat) {
      if (this.RequestId == null) {
        var me = this,
          step,
          start = typeof startFrame === 'number' ? startFrame : 0,
          i = start,
          deadTime = typeof endFrame === 'number' ? endFrame : this.DeadTime,
          ifGo;

        if (repeat !== false) {
          me._repeat = typeof repeat === 'number' ? repeat : 1;
        } else {
          // start from continue
          start = me.StartOrigin;
        }

        if (i > deadTime) {
          step = -1;
          ifGo = function() {
            return i >= deadTime;
          };
        } else {
          step = 1;
          ifGo = function() {
            return i <= deadTime;
          };
        }

        this.StartOrigin = start;
        this.AimFrame = deadTime; //record to restart

        var _play = function() {
          me.CurrentFrame = i;
          if (ifGo()) {
            me.render(i);
            me.RequestId = requestAnimationFrame(_play);
            i += step;
          } else {
            //me.RequestId=null;
            //me.endFunc && me.endFunc();
            me._repeat--;
            if (me._repeat === 0) {
              me.RequestId = null;
              me.endFunc && me.endFunc();
            } else {
              i = start;
              me.render(i);
              me.RequestId = requestAnimationFrame(_play);
              i += step;
            }
          }
        };
        _play();
      }
    },
    continue: function() {
      if (this.RequestId == null && this._repeat > 0) {
        this.play(this.CurrentFrame, this.AimFrame, false);
      }
    },
    stop: function() {
      cancelRequestAnimationFrame(this.RequestId);
      this.RequestId = null;
      this.stopFunc && this.stopFunc();
    },
    reverse: function() {
      this.play(this.DeadTime, 0);
    },
    repeat: function(num) {
      this.play(undefined, undefined, num);
    },
    _stateOrder: function(frame) {
      var s = this.Sprites,
        p,
        i = 0,
        l = s.length;
      for (; i < l; i++) {
        p = s[i];
        if (frame >= p.delay) {
          p.excute(frame, true);
        } else {
          break;
        }
      }
    },
    _stateDisOrder: function(frame) {
      var s = this.Sprites,
        p,
        i = s.length;
      for (; i > -1; i--) {
        p = s[i];
        if (frame <= p.dead) {
          p.excute(frame, false);
        } else {
          break;
        }
      }
    },
    state: function(frame, order) {
      frame = frame || this.DeadTime;
      order = order === undefined ? true : order;
      cancelRequestAnimationFrame(this.RequestId);
      this.RequestId = null;
      if (order) {
        this._stateOrder(frame);
      } else {
        this._stateDisOrder(frame);
      }
      this.CurrentFrame = frame;
    },
  };
  //expose!!!
  this.S = Scripts;
  this.Sprite = Sprite;

  this.play = function(scripts, renderGap, endFunc, stopFunc) {
    var _script = new Scripts(scripts, renderGap, endFunc, stopFunc);
    _script.play();
    return _script;
  };
  this.stop = function(script) {
    script.stop();
  };
}();

Ash.Browser = browser;
Ash.loadIRD(IRDCSS);
Ash.loadIRD(IRDATTR);
Ash.loadIRD(IRDPROP);
Ash.loadIRD(IRDDELEGATE);
//attr

module.exports = Ash;

