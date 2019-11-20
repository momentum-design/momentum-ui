import * as d3 from "d3";
import core from '../utils/core';
import DatabaseEvent from '../database/databaseEvent';
import EventControl from '../utils/eventControl';

// add before data
class Shape {

  constructor () { }

  init(data, config) {
    this.Guid = core.guid();
    this.overrideViaConfig(config);
    this.Stack = [];
    this.extendConfig(config);
    this.Data = this.dataConvert(data);
    this.EventControls = new EventControl();
    this.DomEvents = new EventControl();
  }

  on(key, func) {
    return this.EventControls.bind(key, func);
  }

  off(key, funcOrGuid) {
    return this.EventControls.unbind(key, funcOrGuid);
  }

  bind(key, func) {
    let needBind = this.DomEvents.Events[key] === undefined;
    this.DomEvents.bind(key, func);
    if (needBind) {
      this.Selection.on(key, (d, i) => {
        this.DomEvents.emit(key, [d, i], this);
      });
    }
  }

  position(index) {
    index = index || 0;
    let node = this.Selection.nodes()[index];
    return node.getBoundingClientRect();
  }

  bindNewDom(selection) {
    let list = this.DomEvents.Events;
    for (let key in list) {
      selection.on(key, (d, i) => {
        this.DomEvents.emit(key, [d, i], this);
      });
    }
  }

  unbind(key, funcOrGuid) {
    this.DomEvents.unbind(key, funcOrGuid);
  }

  url(url) {
    if (url !== undefined) {
      this.Url = url;
    }
    return this.Url;
  }

  modifySelection() {
    core.modifySelection(this.Selection, this.Config.modify);
  }

  modifyUpdate(selection, config) {
    if (config && config.modify) {
      core.modifySelection(selection, config.modify);
      this.extendConfig(config);
    } else {
      core.modifySelection(selection, this.Config.modify);
    }
  }

  _attach(parent, dom) {
    this.Parent = parent;
    if (this.G === undefined) {
      this.Parent = parent;
      this.G = dom ? d3.select(dom) : parent.append('g');
      this.initSelection();
    }
    this.data(this.Data, true);
  }

  attach(parent, dom) {
    return this._attach(parent, dom);
  }

  initSelection() {
    this.Selection = this.IsSingle ? this.G.append(this.DomName) : this.G.selectAll(this.DomName);
  }

  // selection, config
  renderSelection(selection, config) {
    config && this.modifyUpdate(selection, config);
    return selection;
  }

  // use for the component use data as Config
  dataConfig(data, noConvert) {
    const shouldConvert = noConvert !== true;
    if (shouldConvert) {
      this.extendConfig(this.dataConvert(DatabaseEvent.isMine(data) ? data.Data : data));
    }
    this.modifySelection();
  }

  // for update only
  data(data, noConvert) {
    // if (data) {
    const shouldConvert = noConvert !== true;
    if (shouldConvert) {
      this.Data = this.dataConvert(DatabaseEvent.isMine(data) ? data.Data : data);
    }
    if (this.IsSingle) {
      this.Selection.data(this.Data);
      this.modifySelection();
    } else {
      this.Selection = this.Selection.data(this.Data).join(
        enter => {
          let ret = enter.append(this.DomName);
          this.bindNewDom(ret);
          this.modifyUpdate(ret);
          return ret;
        },
        undefined, // update
        exit => {
          exit.remove();
        }
      );
    }
    this.EventControls.emit('data', this.Data, this);
  }

  // [data]
  render() {
    const args = core.toArray(arguments);
    // board will call data(), so not update data here
    if (args.length > 0 && args[0] !== undefined && !DatabaseEvent.is1stMine(args)) {
      this.data.apply(this, args);
    }
    this.EventControls.emit('render', this.Data, this);
    this.renderSelection(this.Selection);
  }

  // [Transitionconfig] data
  // data is only not required when board call this
  transition() {
    const orginArgs = core.toArray(arguments),
      isFromBoard = DatabaseEvent.is1stMine(orginArgs),
      args = isFromBoard ? orginArgs[0].Args : orginArgs;
    let config;

    if (isFromBoard) {
      config = args && args.length > 0 && args[0] !== undefined ? args[0] : {};
    } else {
      config = orginArgs.length > 1 ? orginArgs.shift() : {};
      if (orginArgs.length > 0 && orginArgs[0] !== undefined) {
        this.data.apply(this, orginArgs);
      }
    }

    let transition = this.Selection.transition();
    transition = core.callInner(transition, config);
    this.EventControls.emit('transition', this.Data, this);
    return this.renderSelection(transition);
  }

  animate(_transtionConfig, config, data) {
    const transtionConfig = _transtionConfig || {};
    if (data !== undefined) {
      this.data(data);
    }
    let transition = this.Selection.transition();
    transition = core.callInner(transition, transtionConfig);
    return this.renderSelection(transition, config);
  }

  clear() {
    this.Stack = [];
    this.Selection && this.Selection.remove();
  }

  detach() {
    this.G.remove();
  }

  setGenerator(generator) {
    this.Generator = core.callInner(generator || this.D3Generator, this.Config.generator);
  }

  overrideViaConfig(config, _default) {
    if (config && typeof config.dataConvert === 'function') {
      this.dataConvert = config.dataConvert;
    } else if (_default && typeof _default.dataConvert === 'function') {
      this.dataConvert = _default.dataConvert;
    }
  }

  extendConfig(config) {
    if (this.Config === undefined) {
      this.Config = {
        generator: Object.assign({}, this.defaultConfig.generator),
        modify: {}
      };
      core.assignUnKnownLv2(this.Config.modify, this.defaultConfig.modify);
    }
    if (config) {
      if (config.generator) {
        Object.assign(this.Config.generator, config.generator);
        if (this.D3Generator) {
          this.setGenerator();
        }
      }
      if (config.modify) {
        core.assignUnKnownLv2(this.Config.modify, config.modify);
      }
    }
  }

  fVal(funcOrValue, data, index, defaultValue) {
    return core.getFirstValue(core.getReturnOrValue(funcOrValue, data, index), defaultValue);
  }

  dataConvert(data) {
    return data;
  }

  fetchData(i) {
    if (typeof i === 'number') {
      if (core.isArray(this.Data) && this.Data.length > i) {
        return this.Data[i];
      } else {
        return null;
      }
    } else {
      return this.Data;
    }
  }
}
Shape.prototype.D3Generator = false;
Shape.prototype.Layer = 100;
Shape.prototype.IsStatic = false;
Shape.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    classed: {
      'md-chart-shape': true
    }
  }
};

export default Shape;
