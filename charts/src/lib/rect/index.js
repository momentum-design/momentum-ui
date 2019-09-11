import Shape from '../shape/index';
import core from '../utils/core';

class Rect extends Shape {

  constructor (data, config) {
    super();
    super.init(data, config);
  }

  // topLeft topRight bottomRight bottomLeft;
  extendRxRy(r, max) {
    let R;
    if (!core.isArray(r)) {
      R = r ? [r] : [0];
    } else {
      R = r.concat([]);
    }

    while (R.length < 4) {
      R = R.concat(R);
    }
    R = R.slice(0, 4);
    for (let i in R) {
      R[i] = Math.min(max, R[i]);
    }
    return R;
  }

  ifNeedArc(rx, ry, i) {
    return rx[i] !== 0 && ry[i] !== 0;
  }

  makePoint(x, y) {
    return x + ',' + y;
  }

  makeCommand() {
    return core.toArray(arguments).join(' ');
  }

  generatorPath(d, i) {
    const generator = this.Config.generator,
      x0 = this.fVal(generator.x, d, i, 0),
      y0 = this.fVal(generator.y, d, i, 0),
      w = this.fVal(generator.w, d, i, 0),
      h = this.fVal(generator.h, d, i, 0),
      rMax = Math.min(w, h) / 2,
      rx = this.extendRxRy(this.fVal(generator.rx, d, i, [0]), rMax),
      ry = this.extendRxRy(this.fVal(generator.ry, d, i, [0]), rMax),
      path = [],
      arcSets = this.makePoint(0, 1);

    path.push(this.makeCommand('M', this.makePoint(x0, y0 + ry[0])));

    if (this.ifNeedArc(rx, ry, 0)) {
      path.push(this.makeCommand('a', this.makePoint(rx[0], ry[0]), 0, arcSets, this.makePoint(rx[0], -ry[0])));
    }
    path.push(this.makeCommand('h', w - rx[0] - rx[1]));

    if (this.ifNeedArc(rx, ry, 1)) {
      path.push(this.makeCommand('a', this.makePoint(rx[1], ry[1]), 0, arcSets, this.makePoint(rx[1], ry[1])));
    }
    path.push(this.makeCommand('v', h - ry[1] - ry[2]));

    if (this.ifNeedArc(rx, ry, 2)) {
      path.push(this.makeCommand('a', this.makePoint(rx[2], ry[2]), 0, arcSets, this.makePoint(-rx[2], ry[2])));
    }
    path.push(this.makeCommand('h', -w + rx[2] + rx[3]));

    if (this.ifNeedArc(rx, ry, 3)) {
      path.push(this.makeCommand('a', this.makePoint(rx[3], ry[3]), 0, arcSets, this.makePoint(-rx[3], -ry[3])));
    }
    path.push('Z');

    return path.join(' ');
  }

  renderSelection(selection, config) {
    config && this.modifyUpdate(selection, config);
    let path;
    selection.attr('d', (d, i) => {
      path = this.generatorPath(d, i);
      this.Stack.push({
        path: path
      });
      return path;
    });
    return selection;
  }

}

Rect.prototype.ShapeName = 'rect';
Rect.prototype.DomName = 'path';
Rect.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    classed: {
      'md-chart-rect': true
    }
  }
};

export default Rect;

