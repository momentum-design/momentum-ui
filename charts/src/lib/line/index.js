import * as d3 from "d3";
import Shape from '../shape/index';

class Line extends Shape {

  constructor (data, config) {
    super();
    super.init(data, config);
  }

  renderSelection(selection, config) {
    config && this.modifyUpdate(selection.main, config);
    this.Path = this.Generator(this.Data);
    this.Stack.push({
      path: this.Path
    });
    selection.attr('d', this.Path);
    return selection;
  }
}
Line.prototype.D3Generator = d3.line();
Line.prototype.IsSingle = true;
Line.prototype.ShapeName = 'line';
Line.prototype.DomName = 'path';
Line.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    attr: {
      fill: 'none'
    },
    classed: {
      'md-chart-line': true
    }
  }
};

export default Line;
