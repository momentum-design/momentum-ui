import ShapeGroup from '../shape/group';

class Break extends ShapeGroup {

  constructor (data, config) {
    super();
    super.init(data, config);
  }

  _gBorder(direction) {
    const generator = this.Config.generator,
      deep = generator.deep,
      deep2 = -deep,
      size = generator.size,
      isY = generator.direction === 'y',
      distance = isY ? generator.w : generator.h,
      len = Math.ceil(distance / size) / 2,
      step = direction !== -1 ? size / 2 : -size / 2,
      path = [];

    let commandUp,
      commandDown;

    if (isY) {
      commandUp = 'q' + step + ' ' + deep2 + ', ' + step * 2 + ' ' + 0;
      commandDown = 'q' + step + ' ' + deep + ', ' + step * 2 + ' ' + 0;
    } else {
      commandUp = 'q' + deep2 + ' ' + step + ', ' + 0 + ' ' + step * 2;
      commandDown = 'q' + deep + ' ' + step + ', ' + 0 + ' ' + step * 2;
    }
    for (let i = 1; i <= len; i += 1) {
      path.push(commandUp);
      path.push(commandDown);
    }
    path.push(commandUp);
    return path;
  }

  _gLine(direction) {
    const generator = this.Config.generator,
      step = direction !== -1 ? 1 : -1;
    return generator.direction === 'y'
      ? ['v ' + generator.h * step]
      : ['h ' + generator.w * step];
  }

  generatorPath() {
    const generator = this.Config.generator,
      x = generator.x,
      y = generator.y,
      h = generator.h,
      w = generator.w,
      b1 = this._gBorder(),
      b2 = this._gBorder(-1),
      l1 = this._gLine(),
      l2 = this._gLine(-1),
      start = ['M' + x + ' ' + y];
    let start2,
      shapePath;
    if (generator.direction === 'y') {
      start2 = ['M' + x + ' ' + (y + h)];
      shapePath = b1.concat(l1).concat(b2).concat(l2);
    } else {
      start2 = ['M' + (x + w) + ' ' + y];
      shapePath = l1.concat(b1).concat(l2).concat(b2);
    }
    shapePath.push('Z');
    return {
      shape: start.concat(shapePath).join(' '),
      border1: start.concat(b1).join(' '),
      border2: start2.concat(b1).join(' ')
    };
  }

  initSelection() {
    this.SelectionList = {
      main: this.G,
      shape: this.G.append(this.DomName).attr('class', 'shape'),
      border1: this.G.append(this.DomName).attr('class', 'border'),
      border2: this.G.append(this.DomName).attr('class', 'border')
    };
  }

  data(config, noConvert) {
    return this.dataConfig(config, noConvert);
  }

  renderSelection(selectionList, config) {
    const path = this.generatorPath();
    config && this.modifyUpdate(selectionList.main, config);
    selectionList.shape.attr('d', path.shape);
    selectionList.border1.attr('d', path.border1);
    selectionList.border2.attr('d', path.border2);
    return selectionList;
  }
}

Break.prototype.Layer = 1000;
Break.prototype.IsSingle = true;
Break.prototype.ShapeName = 'break';
Break.prototype.DomName = 'path';
Break.prototype.defaultConfig = {
  generator: {
    direction: 'y',
    size: 8,
    deep: 4
  },
  modify: {
    classed: {
      'md-chart-break': true
    }
  }
};

export default Break;

