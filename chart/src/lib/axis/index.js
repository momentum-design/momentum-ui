import * as d3 from "d3";
import Shape from '../shape/index';
import core from '../core/index';

class Axis extends Shape {

  constructor (name, config) {
    super();
    if (this.types[name] === undefined) {
      name = 'axisTop';
    }
    this.init(name, config);
    this.setGenerator();
  }

  init(name, config) {
    this.Name = name;
    this.extendConfig(config);
    this.Generator = d3[this.Name]();
  }

  setGenerator() {
    const config = this.Config.generator;
    const axis = this.Generator;
    for (let name in config) {
      if (typeof axis[name] === 'function') {
        if (this.applyList[name] && core.isArray(config[name]) && config[name].length > 0) {
          axis[name].apply(axis, config[name]);
        } else {
          axis[name](config[name]);
        }
      }
    }
    // core.applyInner(this.Generator, this.Config.generator, this);
  }

  setPosition() {
    let x, y;
    this.Selection
      .attr('transform', (d, i) => {
        x = this.fVal(this.Config.generator.x, d, i, 0);
        y = this.fVal(this.Config.generator.y, d, i, 0);
        return 'translate(' + x + ', ' + y + ')';
      });
  }

  updateData(config) {
    this.extendConfig(config);
    this.setGenerator();
    this.detach();
    this.attach(this.svg);
  }

  transition() {}
  render() {}

  attach(svg) {
    this.Selection = this.G = svg.append('g');
    // please create a new instance if the data length is not the same
    this.G.call(this.Generator);
    this.setPosition();
    this.modify(this.Config.modify);
  }

}

Axis.prototype.applyList = {
  ticks: 'ticks',
  tickFormat: 'tickFormat'
};
Axis.prototype.types = {
  axisTop: 'axisTop',
  axisRight: 'axisRight',
  axisBottom: 'axisBottom',
  axisLeft: 'axisLeft'
};
Axis.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    style: {
      color: '#858688'
    }
  }
};

export default Axis;

