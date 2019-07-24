import * as d3 from "d3";
import Shape from '../shape/index';

class Line extends Shape {

  constructor (data, config) {
    super();
    super.init(data, config);
    this.setGenerator(d3.line());
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

Line.prototype.DomName = 'path';
Line.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    attr: {
      fill: 'none'
    }
  }
};

export default Line;
