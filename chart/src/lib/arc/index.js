import * as d3 from "d3";
import Shape from '../shape/index';
import core from '../core/index';

class Arc extends Shape {

  constructor (data, config) {
    super();
    super.init(data, config);
    this.IfUsePie = !!config.pie;
    if (this.IfUsePie) {
      this.Config.pie = Object.assign({}, this.defaultConfig.pie, config.pie);
      this.generatorPie();
      this.Data = this.Pie(data);
    }
    this.setGenerator(d3.arc());
  }

  generatorPie() {
    this.Pie = d3.pie();
    core.callInner(this.Pie, this.Config.pie);
  }

  updateData(data) {
    this.Data = this.IfUsePie ? this.Pie(data) : data;
    this.Selection.data(this.Data);
  }

  getPreviousStack () {
    const index = this.Stack.length > 1 ? this.Stack.length - 2 : 0;
    return this.Stack[index];
  }

  pathTween(d, i) {
    const _data = this.getPreviousStack().data;
    const start = {
      startAngle: _data[i].startAngle,
      endAngle: _data[i].endAngle
    };
    const interpolate = d3.interpolate(start, d);
    const generator = this.Generator;
    return (t) => {
      return generator(interpolate(t));
    };
  }

  renderSelection(selection) {
    const stackData = {
      pathList: [],
      points: [],
      data: []
    };
    let x, y, path;
    this.G.attr('transform', (d, i) => {
      x = this.fVal(this.Config.generator.x, d, i, 0);
      y = this.fVal(this.Config.generator.y, d, i, 0);
      stackData.points.push({ x, y });
      stackData.data = this.Data;
      return 'translate(' + x + ', ' + y + ')';
    });
    if (selection === this.Selection) {
      selection
        .attr('d', (d) => {
          path = this.Generator(d);
          stackData.pathList.push(path);
          return path;
        });
    } else {
      selection
        .attrTween('d', (d, i) => {
          return this.pathTween(d, i);
        });
    }
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

