import * as d3 from "d3";
import core from '../utils/core';
import Database from '../database/index';
import Layer from '../utils/layer';
import Preload from '../preload/index';
import Axis from '../axis/index';
import Responsive from '../responsive/index';
import Template from '../template/index';

class Board {
  constructor (query, config, data) {
    this.Con = d3.select(query);
    if (typeof query !== 'string') {
      this.Con._parents = [document.documentElement];
    }
    if (process && process.env && process.env.NODE_ENV === 'test') {
      this.Svg = this.Con.append('svg');
    } else {
      this.Svg = this.Con.append(function () {
        // dynamic add svg because of browser - -
        return document.createElementNS("http://www.w3.org/2000/svg", "svg");
      });
    }
    this.Dom = this.Svg.node();
    this.Layer = new Layer(this.Svg);
    // this.Defs in this.createDefs;
    this.Shapes = {};
    this.PreloadStack = {};
    this.Database = new Database(data, ['data', 'render', 'transition']); // data with event
    this.extendConfig(config);
    this.modify();
  }

  static _registerShape(shape) {
    let name = core.lowerCaseInital(shape.prototype.ShapeName);
    this.prototype[name] = function () {
      const arr = core.toArray(arguments);
      arr.unshift(shape);
      return this.add.apply(this, arr);
    };
  }

  static registerShape() {
    core.extendArguments(arguments, this._registerShape, this);
  }

  static registerShapesObj(shapes) {
    for (let n in shapes) {
      this._registerShape(shapes[n]);
    }
  }

  size() {
    return {
      width: this.Dom.clientWidth,
      height: this.Dom.clientHeight
    };
  }

  extendConfig(config) {
    if (this.Config === undefined) {
      this.Config = Object.assign({}, this.defaultConfig.modify);
    }
    if (config) {
      Object.assign(this.Config, config);
    }
    // this.Config = Object.assign({}, this.defaultConfig.modify, config);
  }

  createDefs() {
    if (this.Defs === undefined) {
      this.Defs = this.Svg.append('defs');
    }
  }

  preload(dataUpdate, shapeLoader) {
    this.createDefs();
    let preLoader = new Preload(dataUpdate, shapeLoader || this.Shapes, this);
    this.PreloadStack[preLoader.Guid] = preLoader;
    return preLoader;
  }

  cancelPreload() {
    for (let id in this.PreloadStack) {
      this.PreloadStack[id].detach();
    }
  }

  modify() {
    core.modifySelection(this.Svg, this.Config);
  }

  call() {
    // call is override by D3.js
    this.Svg.call(arguments);
  }

  clear(ifForce) {
    let shape;
    for (let id in this.Shapes) {
      shape = this.Shapes[id];
      if (!shape.IsStatic || ifForce) {
        this.Shapes[id].clear();
      }
    }
  }

  append(shape, n) {
    const i = typeof n === 'number' ? n : shape.Layer;
    shape.attach(this.Layer.n(i));
  }

  axis(name, config, url) {
    let axis = new Axis(name, config);
    if (typeof url === 'string') {
      axis._$eventFuncIdData = this.Database.bind('data', url, function () {
        !axis.IsStatic && axis.data.apply(axis, arguments);
      });
      axis._$eventFuncIdRender = this.Database.bind('render', url, function () {
        !axis.IsStatic && axis.render.apply(axis, arguments);
      });
      axis._$eventFuncIdTransition = this.Database.bind('transition', url, function () {
        !axis.IsStatic && axis.transition.apply(axis, arguments);
      });
      axis.url(url);
      this.Shapes[axis.Guid] = axis;
    }
    this.append(axis);
    return axis;
  }

  on(eventName, url, func) {
    this.Database.bind(eventName, url, func);
  }

  off(eventName, url, func) {
    this.Database.unbind(eventName, url, func);
  }

  zoom(scale) {
    scale = scale || [0.1, 2];
    let zoom = d3.zoom();
    zoom.scaleExtent(scale);
    zoom.on('zoom', () => {
      this._handleZoom(d3.event.transform);
    });
    this.Svg.call(zoom);
    return zoom;
  }

  _handleZoom(transform) {
    this.Svg.attr("transform", "translate(" +
      transform.x + ',' +
      transform.y + ")scale(" +
      transform.k + ")");
  }

  resetZoom() {
    this._handleZoom({
      x: 1,
      y: 1,
      k: 1
    });
  }

  // data({})
  // data('p',{})
  // data('p')
  // argments: [url], newdata
  data() {
    const arr = core.toArray(arguments),
      url = typeof arr[0] === 'string' ? arr.shift() : './';
    // argments => data, [eventNames]
    if (arr.length > 0) {
      return this.Database.val(url, arr[0], 'data');
    } else {
      // read data
      return this.Database.val(url);
    }
  }

  // null
  // url
  // data
  // url data
  // arguments => [data], [url] , data
  render() {
    const args = core.toArray(arguments);
    if (args.length === 0 || (args.length === 1 && typeof args[0] !== 'string')) {
      args.unshift('./');
    }
    if (args.length === 1) {
      return this.Database.emit('render', args[0]);
    } else {
      return this.Database.val(args[0], args[1], ['data', 'render']);
    }
  }

  // config url data
  transition() {
    const args = core.toArray(arguments),
      config = args.shift();
    if (args.length === 0 || (args.length === 1 && typeof args[0] !== 'string')) {
      args.unshift('./');
    }
    if (args.length === 1) {
      return this.Database.emit('transition', args[0], [config]);
    } else {
      return this.Database.val(args[0], args[1], ['data', 'transition'], [config]);
    }

  }

  // _constructor, dataUrl, config
  add() {
    const arr = core.toArray(arguments),
      _constructor = arr.shift(),
      dataUrl = typeof arr[0] === 'string' ? arr.shift() : '',
      url = this.Database.formatUrl(dataUrl),
      data = this.Database.val(url),
      config = arr.length > 0 ? arr[0] : undefined,
      shape = new _constructor(data, config);
    // add Event Listener
    shape._$eventFuncIdData = this.Database.bind('data', url, function () {
      !shape.IsStatic && shape.data.apply(shape, arguments);
    });
    shape._$eventFuncIdRender = this.Database.bind('render', url, function () {
      !shape.IsStatic && shape.render.apply(shape, arguments);
    });
    shape._$eventFuncIdTransition = this.Database.bind('transition', url, function () {
      !shape.IsStatic && shape.transition.apply(shape, arguments);
    });

    shape.url(url);
    this.Shapes[shape.Guid] = shape;
    this.append(shape);
    return shape;
  }

  remove(shape) {
    const guid = typeof shape === 'string' ? shape : shape.Guid,
      shapeObj = this.Shapes[guid],
      url = shapeObj.url();
    this.Database.unbind('data', url, shape._$eventFuncIdData);
    this.Database.unbind('render', url, shape._$eventFuncIdRender);
    this.Database.unbind('transition', url, shape._$eventFuncIdTransition);
    shapeObj.remove();
    delete this.Shapes[guid];
  }

  responsive() {
    if (this.Responsive === undefined) {
      this.Responsive = new Responsive(this);
    }
    return this.Responsive;
  }

  template(name, config) {
    Template.load(this, name, config);
  }
}

Board.prototype.defaultConfig = {
  modify: {
    classed: {
      'md-chart-board': true
    }
  }
};

export default Board;
