import core from '../utils/core';

class Preset {

  constructor () {
  }

  init(board, config) {
    this.Board = board;
    this.setConfig(config);
    this.build();
  }

  /*
  var template = board.template('singleRect', {
    rect:[{
      data: 'url',
      value: function(x) {
        return x.val;
      }
    }],
    _colors:[],
    _column: 10,
    _axisX: dataUrl,
    _axisY: dataUrl //or null //or null
  });
  */

  setConfig(config) {
    this.Config = {};
    for (var name in config) {
      if (name[0] === '_') {
        this.Config[name] = config[name];
      } else {
        this.Config[name] = this._fillComponentConfig(config[name]);
      }
    }
  }

  _fillComponentConfig(obj) {
    let orginal = core.isArray(obj) ? obj : [obj],
      ret = [];
    for (let i = 0, l = orginal.length; i < l; i++) {
      ret.push(this._fillComponentConfigObj(orginal[i]));
    }
    return ret;
  }

  _fillComponentConfigObj(obj) {
    let ret = typeof obj === 'string' ? { data: obj } : obj;
    if (typeof ret.value !== 'function') {
      ret.value = this.datum;
    }
    return ret;
  }

  build() {

  }

  datum(d) {
    return d;
  }

}

export default Preset;
