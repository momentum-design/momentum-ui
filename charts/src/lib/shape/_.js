import _Board from '../board/_';
import core from '../utils/core';
const ROOTTAG = _Board.prototype.RegistorName.toUpperCase();
class _Shape extends HTMLElement {

  static get observedAttributes() {
    return ['chart-url'];
  }

  set ChartUrl(value) {
    this._Url = value;
  }

  get ChartUrl() {
    return this._Url || '';
  }

  set ChartConfig(value) {
    this._Config = value;
    this._config();
  }

  get ChartConfig() {
    return this._Config;
  }

  constructor () {
    super();
  }

  init(shape) {
    this.ShapeInstance = shape;
    this.style.display = 'none';
    this._ReadyProps = {
      'ChartConfig': false,
      'Board': false
    };
    this._ConfigCallbacks = {
      generator: '_generator',
      modify: '_modify'
    };
  }

  _ready(name, value) {
    if (name) {
      this._ReadyProps[name] = value;
    }
    for (let n in this._ReadyProps) {
      if (!this._ReadyProps[n]) {
        return false;
      }
    }
    return true;
  }

  _config() {
    if (this._ready('ChartConfig', this.ChartConfig !== undefined)) {
      if (this.Shape === undefined) {
        this.create();
      } else {
        this.Shape.extendConfig(this.ChartConfig);
        for (let n in this.ChartConfig) {
          if (this._ConfigCallbacks[n]) {
            this[this._ConfigCallbacks[n]](this.ChartConfig);
          }
        }
        this.Shape.render();
      }
    }
  }

  _generator() {
    this.Shape.setGenerator();
  }

  _modify() {
    this.Shape.modifySelection();
  }

  create() {
    this.findSvgRoot();
    if (this.Shape === undefined && this._ready()) {
      const funcName = core.lowerCaseInital(this.ShapeInstance.prototype.ShapeName);
      this.Shape = this.Board[funcName](this.ChartUrl, this.ChartConfig);
      this.Shape.render();
    }
  }

  remove() {
    if (this.Shape && this.Board) {
      this.Board.remove(this.Shape);
      delete this.Shape;
      delete this.Board;
    }
  }

  findSvgRoot() {
    let svgRoot = this;
    this._ready('Board', false);
    while (svgRoot.parentNode) {
      if (svgRoot.parentNode.tagName === ROOTTAG) {
        this.BoardDom = svgRoot.parentNode;
        this.Board = this.BoardDom.Board;
        this._ready('Board', true);
        return true;
      }
      svgRoot = svgRoot.parentNode;
    }
    return false;
  }

  connectedCallback() {
    this.create();
  }

  disconnectedCallback() {
    this.remove();
  }

  adoptedCallback() {
    this.remove();
    this.create();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'chart-url':
        this.ChartUrl = newValue;
        break;
      default:
        break;
    }
  }

}

export default _Shape;
