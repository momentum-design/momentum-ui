import * as d3 from "d3";
import Shape from '../shape/index';

class Area extends Shape {

  constructor(data, config) {
    super();
    super.init(data, config);
    this.setGenerator(d3.area());
  }

  renderSelection(selection) {
    this.Path = this.Generator(this.Data);
    this.Stack.push({
      path: this.Path
    });
    selection.attr('d', this.Path);
    return selection;
  }
}

Area.prototype.ShapeName = 'area';
Area.prototype.DomName = 'path';
Area.prototype.defaultConfig = {
  generator: {

  },
  modify: {

  }
};

export default Area;

