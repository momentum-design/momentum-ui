import * as d3 from "d3";
import Shape from '../shape/index';

class Area extends Shape {

  constructor(data, config) {
    super();
    this.D3Generator = d3.area();
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

Area.prototype.IsSingle = true;
Area.prototype.ShapeName = 'area';
Area.prototype.DomName = 'path';
Area.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    classed: {
      'md-chart-area': true
    }
  }
};

export default Area;

