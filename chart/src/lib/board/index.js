import * as d3 from "d3";
import core from '../core/index';
import Axis from '../axis/index';

class Board {
  constructor (query, config) {
    this.Con = d3.select(query);
    if (process && process.env && process.env.NODE_ENV === 'test') {
      this.Svg = this.Con.append('svg');
    } else {
      this.Svg = this.Con.append(function () {
        // dynamic add svg because of browser - -
        return document.createElementNS("http://www.w3.org/2000/svg", "svg");
      });
    }
    this.Shapes = {};
    this.modify(config);
  }

  static _registerShape(shape) {
    this.prototype._shapeList[core.lowerCaseInital(shape.name)] = shape;
  }

  static registerShape() {
    core.extendArguments(arguments, this._registerShape, this);
  }

  static registerShapesObj(shapes) {
    for (let n in shapes) {
      this._registerShape(shapes[n]);
    }
  }

  modify(config) {
    core.modifySelection(this.Svg, config);
  }

  call() {
    // call is override by D3.js
    this.Svg.call(arguments);
  }

  clear() {
    delete this.Shapes;
    this.Shapes = {};
    this.render();
  }

  axis(name, config) {
    let axis = new Axis(name, config);
    axis.attach(this.Svg);
    return axis;
  }

  zoom(scale) {
    scale = scale || [0.1, 2];
    let zoom = d3.zoom();
    zoom.scaleExtent(scale);
    zoom.on('zoom', () => {
      this.handleZoom(d3.event.transform);
    });
    this.Svg.call(zoom);
    return zoom;
  }

  handleZoom(transform) {
    this.Svg.attr("transform", "translate(" +
      transform.x + ',' +
      transform.y + ")scale(" +
      transform.k + ")");
  }

  resetZoom() {
    this.handleZoom({
      x: 1,
      y: 1,
      k: 1
    });
  }

  render() {
    const shapes = this.Shapes;
    for (let name in shapes) {
      shapes[name].render.apply(shapes[name], arguments);
    }
  }

  transition() {
    const shapes = this.Shapes;
    for (let name in shapes) {
      shapes[name].transition.apply(shapes[name], arguments);
    }
  }

  _add(name, data, config) {
    const _constructor = this._shapeList[name];
    let shape;
    if (_constructor) {
      shape = new _constructor(data, config);
      if (shape.Guid && this.Shapes[shape.Guid] === undefined) {
        this.Shapes[shape.Guid] = shape;
        shape.attach(this.Svg);
      }
    }
    return shape;
  }

  add() {
    return core.extendArguments(arguments, this._add, this);
  }

  _remove(obj) {
    const guid = typeof obj === 'string' ? obj : obj.Guid;
    delete this.Shapes[guid];
  }

  remove() {
    return core.extendArguments(arguments, this._remove, this);
  }
}
Board.prototype._shapeList = {};

export default Board;
