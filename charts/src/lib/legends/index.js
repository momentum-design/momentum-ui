import core from '../utils/core';
import ShapeGroup from '../shape/group';
import DatabaseEvent from '../database/databaseEvent';

class Legends extends ShapeGroup {

  constructor (data, config) {
    super();
    super.init(data, config);
  }

  initSelection() {
    this.Selection = this.G.selectAll('text');
    this.SelectionList = {
      main: this.Selection,
      label: this.G.selectAll('path')
    };
  }

  // for update only
  data(data, noConvert) {
    // if (data) {
    const shouldConvert = noConvert !== true;
    if (shouldConvert) {
      this.Data = this.dataConvert(DatabaseEvent.isMine(data) ? data.Data : data);
    }
    this.SelectionList.main = this.Selection = this.Selection.data(this.Data).join(
      enter => {
        let ret = enter.append('text');
        this.bindNewDom(ret);
        this.modifyUpdate(ret);
        return ret;
      },
      undefined, // update
      exit => {
        exit.remove();
      }
    );
    this.SelectionList.label = this.SelectionList.label.data(this.Data).join(
      enter => {
        let ret = enter.append('path');
        return ret;
      },
      undefined, // update
      exit => {
        exit.remove();
      }
    );
    this.EventControls.emit('data', this.Data, this);
  }

  renderSelection(selectionList, config) {
    let selection,
      generator = this.Config.generator;

    selectionList.main.text((d, i) => {
      return this.fVal(generator.text, d, i, '');
    });
    selectionList.main.style('font-size', (d, i) => {
      return this.fVal(generator.lineHeight, d, i, 16) + 'px';
    });
    selectionList.label.attr('fill', (d, i) => {
      return this.fVal(generator.labelColor, d, i, '#FFB159');
    });
    switch (this.fVal(this.Config.generator.type, 0, 0, 'horizontal')) {
      case 'horizontal':
        if (this.fVal(this.Config.generator.lineWidth, 0, 0, Infinity) !== Infinity) {
          selection = this.renderHorizontalBreakLine(selectionList);
        } else {
          selection = this.renderHorizontal(selectionList);
        }
        break;
      case 'vertical':
        selection = this.renderVertical(selectionList);
        break;
      default:
        selection = this.renderHorizontal(selectionList);
    }
    config && this.modifyUpdate(selectionList.main, config);
    return selection;
  }

  renderVertical(selectionList) {
    const generator = this.Config.generator,
      lineHeight = this.fVal(generator.lineHeight, 0, 0, 0),
      marginTop = this.fVal(generator.marginTop, 0, 0, 0),
      labelContainerWidth = this.fVal(generator.labelContainerWidth, 0, 0, 20),
      x = this.fVal(generator.x, 0, 0, 0) + labelContainerWidth,
      y = this.fVal(generator.y, 0, 0, 0),
      labelPath = this.labelPath();
    this.TextPosition = {
      x: {},
      y: {}
    };
    selectionList.main.attr('x', (d, i) => {
      this.TextPosition.x[i] = x;
      return x;
    });
    selectionList.main.attr('y', (d, i) => {
      let _val = y + (lineHeight + marginTop) * i;
      this.TextPosition.y[i] = _val;
      return _val;
    });
    selectionList.label.attr('d', (d, i) => {
      return labelPath.call(this, d, i, x, this.TextPosition.y[i], lineHeight, labelContainerWidth);
    });
    return selectionList;
  }

  getWidth(node) {
    return Math.ceil(node.getBoundingClientRect().width);
  }

  renderHorizontal(selectionList) {
    const generator = this.Config.generator,
      lineHeight = this.fVal(generator.lineHeight, 0, 0, 0),
      marginLeft = this.fVal(generator.marginLeft, 0, 0, 0),
      labelContainerWidth = this.fVal(generator.labelContainerWidth, 0, 0, 20),
      x = this.fVal(generator.x, 0, 0, 0) + labelContainerWidth,
      y = this.fVal(generator.y, 0, 0, 0),
      labelPath = this.labelPath();
    this.TextPosition = {
      x: {},
      y: {}
    };
    let nodes = selectionList.main.nodes();
    selectionList.main.attr('x', (d, i) => {
      let _val;
      if (i !== 0) {
        _val = this.TextPosition.x[i - 1] + this.getWidth(nodes[i - 1]) + marginLeft + labelContainerWidth;
      } else {
        _val = x;
      }
      this.TextPosition.x[i] = _val;
      return _val;
    });
    selectionList.main.attr('y', (d, i) => {
      this.TextPosition.y[i] = y;
      return y;
    });
    selectionList.label.attr('d', (d, i) => {
      return labelPath.call(this, d, i, this.TextPosition.x[i], y, lineHeight, labelContainerWidth);
    });
    return selectionList;
  }

  renderHorizontalBreakLine(selectionList) {
    const generator = this.Config.generator,
      lineHeight = this.fVal(generator.lineHeight, 0, 0, 0),
      lineWidth = this.fVal(generator.lineWidth, 0, 0, 500),
      textLength = this.fVal(generator.textLength, 0, 0, 100),
      marginTop = this.fVal(generator.marginTop, 0, 0, 0),
      marginLeft = this.fVal(generator.marginLeft, 0, 0, 0),
      labelContainerWidth = this.fVal(generator.labelContainerWidth, 0, 0, 20),
      x = this.fVal(generator.x, 0, 0, 0) + labelContainerWidth,
      y = this.fVal(generator.y, 0, 0, 0),
      labelPath = this.labelPath();
    this.TextPosition = {
      x: {},
      y: {},
      line: { '-1': -1 }
    };
    selectionList.main.attr('x', (d, i) => {
      let _val,
        _next = i === 0 ? -Infinity : this.TextPosition.x[i - 1] + marginLeft + labelContainerWidth + textLength;

      if (i === 0 || _next > lineWidth) {
        _val = x;
        this.TextPosition.line[i] = this.TextPosition.line[i - 1] + 1;
      } else {
        _val = _next - textLength;
        this.TextPosition.line[i] = this.TextPosition.line[i - 1];
      }
      this.TextPosition.x[i] = _val;
      return _val;
    });
    selectionList.main.attr('y', (d, i) => {
      let _val = y + this.TextPosition.line[i] * (marginTop + lineHeight);
      this.TextPosition.y[i] = _val;
      return _val;
    });
    selectionList.label.attr('d', (d, i) => {
      return labelPath.call(this, d, i, this.TextPosition.x[i], this.TextPosition.y[i], lineHeight, labelContainerWidth);
    });
    return selectionList;
  }

  labelPath() {
    switch (this.fVal(this.Config.generator.labelType, 0, 0, 'square')) {
      case 'square':
        return this.labelPathSquare;
      case 'line':
        return this.labelPathLine;
      case 'dot':
        return this.labelPathDot;
      default:
        return this.labelPathSquare;
    }
  }

  makePoint(x, y) {
    return x + ',' + y;
  }

  makeCommand() {
    return core.toArray(arguments).join(' ');
  }

  labelPathSquare(d, i, textX, textY, lineHeight, labelContainerWidth) {
    const generator = this.Config.generator,
      r = 1,
      size = this.fVal(generator.size, d, i, 8),
      x = textX - (labelContainerWidth - size) / 2 - size,
      y = textY + (lineHeight - size) / 2,
      arcSets = this.makePoint(0, 1),
      path = [];
    path.push(this.makeCommand('M', this.makePoint(x, y + r)));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(r, -r)));
    path.push(this.makeCommand('h', size - r - r));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(r, r)));
    path.push(this.makeCommand('v', size - r - r));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(-r, r)));
    path.push(this.makeCommand('h', -size + r + r));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(-r, -r)));
    path.push('Z');
    return path.join(' ');
  }

  labelPathDot(d, i, textX, textY, lineHeight, labelContainerWidth) {
    const generator = this.Config.generator,
      r = this.fVal(generator.size, d, i, 8) / 2,
      x = textX - (labelContainerWidth - r) / 2 - r,
      y = textY + (lineHeight - r * 2) / 2,
      arcSets = this.makePoint(0, 1),
      path = [];
    path.push(this.makeCommand('M', this.makePoint(x, y + r)));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(r, -r)));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(r, r)));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(-r, r)));
    path.push(this.makeCommand('a', this.makePoint(r, r), 0, arcSets, this.makePoint(-r, -r)));
    path.push('Z');
    return path.join(' ');
  }

  labelPathLine(d, i, textX, textY, lineHeight, labelContainerWidth) {
    const generator = this.Config.generator,
      h = 2,
      w = this.fVal(generator.size, d, i, 12),
      x = textX - (labelContainerWidth - w) / 2 - w,
      y = textY + (lineHeight - h) / 2,
      path = [];
    path.push(this.makeCommand('M', this.makePoint(x, y)));
    path.push(this.makeCommand('h', w));
    path.push(this.makeCommand('v', h));
    path.push(this.makeCommand('h', -w));
    path.push('Z');
    return path.join(' ');
  }
}

Legends.prototype.ShapeName = 'legends';
Legends.prototype.DomName = 'text';
Legends.prototype.defaultConfig = {
  generator: {
    labelContainerWidth: 20,
    marginTop: 12,
    marginLeft: 26,
    lineHeight: 12,
    lineWidth: Infinity,
    textLength: 100,
    type: 'horizontal', // horizontal, vertical
    labelType: 'square', // squrre, dot, line
    labelColor: '#FFB159'
  },
  modify: {
    classed: {
      'md-chart-legends': true
    },
    style: {
      color: '#535759',
      'dominant-baseline': 'hanging'
    }
  }
};

export default Legends;

