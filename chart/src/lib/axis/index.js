import * as d3 from "d3";
import ShapeGroup from '../shape/group';
import core from '../utils/core';

class Axis extends ShapeGroup {

  // use config as data in Shape, so the board can update config
  constructor (name, config) {
    super();
    super.overrideViaConfig(config);
    this.init(name, config);
    // this.setGenerator(); // call every render in Axis
  }

  init(name, config) {
    this.Guid = core.guid();
    this.Name = this.types[name] === undefined ? 'axisBottom' : this.types[name];
    this.GeneratorConstructor = d3[this.Name];
    this.Stack = [];
    this.extendConfig(config);
    this._RangeWidth = this.Config._RangeWidth || 1.6;
  }

  initSelection() {
    this.G.call(this.Generator);
    this.SelectionList = {
      main: this.G,
      range: this.G.append('path').attr('class', 'range')
    };
  }

  attach(parent) {
    this._attach(parent);
    this._renderSelection(this.SelectionList, true);
  }

  // update Selection is no need
  data(config, noConvert) {
    return this.dataConfig(config, noConvert);
  }

  _renderSelection(selectionList, isFromAttach) {
    selectionList.main.attr('transform', (d, i) => {
      return 'translate(' + this.fVal(this.Config.generator.x, d, i, 0) +
        ', ' + this.fVal(this.Config.generator.y, d, i, 0) + ')';
    });;
    !isFromAttach && this.Generator(selectionList.main);
    selectionList.range.attr('d', this._generatorRange());
    return selectionList;
  }

  renderSelection(selectionList, config) {
    var selection = this._renderSelection(selectionList);
    config && this.modifyUpdate(selectionList.main, config);
    return selection;
  }

  setGenerator() {
    const axis = this.GeneratorConstructor(),
      config = this.Config.generator;
    for (let name in config) {
      if (typeof axis[name] === 'function') {
        if (this.applyList[name] && core.isArray(config[name]) && config[name].length > 0) {
          axis[name].apply(axis, config[name]);
        } else {
          axis[name](config[name]);
        }
      }
    }
    this.Generator = axis;
  }

  _generatorRange() {
    const plus = this._RangeWidth / 2,
      range = this.Config.generator.range,
      realRange = (core.isArray(range) && range.length > 1) ? range : this.Config.generator.scale.range(),
      last = realRange.length - 1;
    realRange[0] += plus;
    realRange[last] += plus;
    if (this.Name === 'axisTop' || this.Name === 'axisBottom') {
      return ['M', realRange[0], ',', plus + 'H' + realRange[last]].join('');
    } else {
      return ['M', plus, ',', realRange[0] + 'V' + realRange[last]].join('');
    }
  }

}

Axis.prototype.D3Generator = true;
Axis.prototype.Layer = 10;
Axis.prototype.ShapeName = 'axis';
Axis.prototype.IsStatic = true;
Axis.prototype.applyList = {
  ticks: 'ticks',
  tickFormat: 'tickFormat'
};
Axis.prototype.types = {
  x: 'axisBottom',
  y: 'axisLeft',
  axisTop: 'axisTop',
  axisRight: 'axisRight',
  axisBottom: 'axisBottom',
  axisLeft: 'axisLeft'
};
Axis.prototype.defaultConfig = {
  generator: {
    tickSize: 0,
    tickPadding: 10
    // range
  },
  modify: {
    classed: {
      'md-chart-axis': true
    },
    style: {
      color: '#858688'
    }
  }
};

export default Axis;

