import * as d3 from "d3";
import Shape from '../shape/index';

class Link extends Shape {

  constructor (data, config) {
    super();
    super.init(data.source, config);
    this.TargetData = data.target;
    this.Name = (config.type && this.types[config.type]) ? config.type : 'linkVertical';
    this.setGenerator(d3[this.Name]());
  }

  updateData(data, target) {
    this.Data = data;
    this.TargetData = target;
    this.Selection.data(this.Data);
  }

  renderSelection(selection) {
    const stackData = {
      pathList: []
    };
    const config = this.Config.generator;
    const targetData = this.TargetData;
    let path;
    selection.attr('d', (d, i) => {
      path = this.Generator({
        source: {
          x: this.fVal(config.sourceX, d, i, 0),
          y: this.fVal(config.sourceY, d, i, 0)
        },
        target: {
          x: this.fVal(config.targetX, targetData[i], i, 0),
          y: this.fVal(config.targetY, targetData[i], i, 0)
        }
      });
      stackData.pathList.push(path);
      return path;
    });
    this.Stack.push();
    return selection;
  }

}

Link.prototype.ShapeName = 'link';
Link.prototype.DomName = 'path';
Link.prototype.types = {
  linkVertical: 'linkVertical',
  linkHorizontal: 'linkHorizontal'
};
Link.prototype.defaultConfig = {
  generator: {
    x: function (d) {
      return d.x;
    },
    y: function (d) {
      return d.y;
    },
    sourceX: function (d) {
      return d.x;
    },
    sourceY: function (d) {
      return d.y;
    },
    targetX: function (d) {
      return d.x;
    },
    targetY: function (d) {
      return d.y;
    }
  },
  modify: {
    attr: {
      fill: 'none'
    }
  }
};

export default Link;

