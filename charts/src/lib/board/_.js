import Board from './index';

class _Board extends HTMLElement {

  /* Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return Object.keys(ATTRFUNC);
  }
  */
  set ChartData(value) {
    this._data(this._Data, value);
    this._Data = value;
  }

  get ChartData() {
    return this._Data || {};
  }

  set ChartConfig(value) {
    this._config(this._Config, value);
    this._Config = value;
  }

  get ChartConfig() {
    return this._Config;
  }

  constructor () {
    super();
    this.init();
  }

  init() {
    this.style.display = 'block';
  }

  _data(oldValue, newValue) {
    this.Board.render(newValue);
  }

  _config(oldValue, newValue) {
    this.Board.extendConfig(newValue);
    this.Board.modify();
    this.Board.render();
  }

  connectedCallback() {
    let config = this.ChartConfig || {},
      data = this.ChartData;
    this.Shadow = this.attachShadow({ mode: 'open' });
    this.Board = new Board(this.Shadow, config, data);
  }

  disconnectedCallback() { }

  adoptedCallback() { }

  attributeChangedCallback() { } // name, oldValue, newValue

}

_Board.prototype.RegistorName = 'md-chart-board';
_Board.prototype.ExtendsTag = 'svg';
export default _Board;
