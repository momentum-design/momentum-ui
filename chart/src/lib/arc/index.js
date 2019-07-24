import * as d3 from "d3";
import Shape from '../shape/index';
import core from '../core/index';

class Arc extends Shape {

  constructor (data, config) {
    super();
    super.init(data, config);
    this.Config.pie = Object.assign({}, this.defaultConfig.pie, config.pie);
    this.generatorPie();
    this.setGenerator(d3.arc());
  }

  generatorPie() {
    this.Pie = d3.pie();
    core.callInner(this.Pie, this.Config.pie);
    this.Data = this.Pie(this.Data);
  }

  updateData(data) {
    this.Data = this.Pie(data);
    this.Selection.data(this.Data);
  }

  renderSelection(selection) {
    const stackData = {
      pathList: [],
      points: []
    };
    let x, y, path;
    this.G.attr('transform', (d, i) => {
      x = this.fVal(this.Config.generator.x, d, i, 0);
      y = this.fVal(this.Config.generator.y, d, i, 0);
      stackData.points.push({ x, y });
      return 'translate(' + x + ', ' + y + ')';
    });
    selection
      .attr('d', (d) => {
        path = this.Generator(d);
        console.log(d);
        stackData.pathList.push(path);
        return path;
      });
    this.Stack.push(stackData);
    return selection;
  }
}
Arc.prototype.ShapeName = 'arc';
Arc.prototype.DomName = 'path';
Arc.prototype.defaultConfig = {
  generator: {
    x: 100,
    y: 100,
    innerRadius: 0,
    outerRadius: 100,
    cornerRadius: 0,
    startAngle: (d) => {
      return d.startAngle;
    },
    endAngle: (d) => {
      return d.endAngle;
    },
    padAngle: (d) => {
      return d.padAngle;
    },
    padRadius: 0
  },
  pie: {
    value: (d) => {
      if (typeof d === 'object') {
        for (let n in d) {
          return d[n];
        }
      }
      return d;
    },
    padAngle: Math.PI / 90
  },
  modify: {
    attr: {

    }
  }
};

export default Arc;

