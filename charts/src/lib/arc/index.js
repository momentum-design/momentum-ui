import * as d3 from "d3";
import Shape from '../shape/index';
import core from '../utils/core';

class Arc extends Shape {

  constructor (data, config) {
    super();
    this.D3Generator = d3.arc();
    super.init(data, config);
  }

  extendConfig(config) {
    if (this.Config === undefined) {
      this.Config = {
        generator: Object.assign({}, this.defaultConfig.generator),
        modify: {},
        pie: Object.assign({}, this.defaultConfig.pie, config.pie)
      };
      core.assignUnKnownLv2(this.Config.modify, this.defaultConfig.modify);
    }
    if (config) {
      if (config.generator) {
        Object.assign(this.Config.generator, config.generator);
        if (this.D3Generator) {
          this.setGenerator();
        }
      }
      if (config.modify) {
        core.assignUnKnownLv2(this.Config.modify, config.modify);
      }
      this.IfUsePie = !!config.pie;
      if (this.IfUsePie) {
        Object.assign(this.Config.pie, config.pie);
        this.generatorPie();
      }
    }
  }

  generatorPie() {
    this.Pie = d3.pie();
    core.callInner(this.Pie, this.Config.pie);
  }

  dataConvert(data) {
    return this.IfUsePie ? this.Pie(data) : data;
  }

  getPreviousStack() {
    const index = this.Stack.length > 1 ? this.Stack.length - 2 : 0;
    return this.Stack[index];
  }

  getOrginalData(d) {
    return this.IfUsePie ? d.data : d;
  }

  _centroid(d, orginalData, i, dPlus) {
    const plus = dPlus ? dPlus * 2 : 0,
      startAngle = d.startAngle,
      endAngle = d.endAngle,
      innerRadius = this.Generator.innerRadius()(orginalData, i),
      outerRadius = this.Generator.outerRadius()(orginalData, i) + plus * 2,
      r = (innerRadius + outerRadius) / 2,
      a = (startAngle + endAngle) / 2 - Math.PI / 2;
    return [Math.cos(a) * r, Math.sin(a) * r];// [x,y]
  }

  _center(d, i) {
    return [this.fVal(this.Config.generator.x, d, i, 0), this.fVal(this.Config.generator.y, d, i, 0)];
  }

  centroid() {
    return this.centroidRelativeList();
  }

  centroidRelativeList(conf, func) {
    let ret = [],
      point;

    this.Selection.each((d, i) => {
      point = this.centroidRelative(d, i, conf, func);
      ret.push(point);
    });
    return ret;
  }

  // d, i, conf, func
  centroidRelative() {
    const args = core.toArray(arguments),
      d = typeof args[0] !== 'number' ? args.shift() : this.fetchData(args[0]);

    if (d) {
      const i = args[0],
        conf = args.length > 1 ? args[1] : undefined,
        func = args.length > 2 ? args[2] : undefined,
        config = Object.assign({
          x: 0,
          y: 0,
          r: 0
        }, conf),
        orginalData = this.getOrginalData(d),
        d3GeneratorXY = this._centroid(d, orginalData, i, config.r),
        transitionXY = this._center(orginalData, i),
        point = {
          x: d3GeneratorXY[0] + transitionXY[0] + config.x,
          y: d3GeneratorXY[1] + transitionXY[1] + config.y,
          x0: transitionXY[0],
          y0: transitionXY[1]
        };
      if (typeof func === 'function') {
        func(point);
      }
      return point;
    }
    return null;
  }

  pathTween(d, index) {
    const _data = this.getPreviousStack().data,
      l = _data.length,
      i = Math.min(l - 1, index);
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

  renderSelection(selection, config) {
    config && this.modifyUpdate(selection.main, config);
    const stackData = {
      pathList: [],
      points: [],
      data: []
    };

    let x, y, path;
    this.Selection.attr('transform', (d, i) => {
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
    classed: {
      'md-chart-arc': true
    }
  }
};

export default Arc;
