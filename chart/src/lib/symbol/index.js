import * as d3 from "d3";
import Shape from '../shape/index';

class Symbol extends Shape {

  static type(stype) {
    return d3['symbol' + stype] || d3.symbolCircle;
  }

  constructor (data, config) {
    super();
    super.init(data, config);
    this.setGenerator(d3.symbol());
  }

  renderSelection(selection) {
    this.Path = this.Generator();
    const stackData = {
      path: this.Path,
      points: []
    };
    let x, y;
    selection
      .attr('d', this.Path)
      .attr('transform', (d, i) => {
        x = this.fVal(this.Config.generator.x, d, i, 0);
        y = this.fVal(this.Config.generator.y, d, i, 0);
        stackData.points.push({ x, y });
        return 'translate(' + x + ', ' + y + ')';
      });
    this.Stack.push(stackData);
    return selection;
  }

}

Symbol.prototype.ShapeName = 'symbol';
Symbol.prototype.DomName = 'path';
Symbol.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    attr: {
      fill: 'none'
    }
  }
};

export default Symbol;

