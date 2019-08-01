import Shape from './index';
import core from '../utils/core';
import DatabaseEvent from '../database/databaseEvent';

// add before data
class ShapeGroup extends Shape {

  constructor () {
    super();
    this.SelectionList = {};
  }

  initSelection() {
    this.Selection = this.IsSingle ? this.G.append(this.DomName) : this.G.selectAll(this.DomName);
    this.SelectionList.main = this.Selection;
  }

  modifySelection() {
    core.modifySelection(this.SelectionList.main, this.Config.modify);
  }

  // selection, config
  renderSelection(selectionList, config) {
    this.modifyUpdate(selectionList.main, config);
    return selectionList;
  }

  // for update only

  // [data]
  render() {
    const args = core.toArray(arguments);
    // board will call data(), so not update data here
    if (args.length > 0 && args[0] !== undefined && !DatabaseEvent.is1stMine(args)) {
      this.data.apply(this, args);
    }
    this.renderSelection(this.SelectionList);
  }

  // [config] data
  // data is only not required when board call this
  transition() {
    const orginArgs = core.toArray(arguments),
      isFromBoard = DatabaseEvent.is1stMine(orginArgs),
      args = isFromBoard ? orginArgs[0].Args : orginArgs;
    let config;

    if (isFromBoard) {
      config = args && args.length > 0 && args[0] !== undefined ? args[0] : {};
    } else {
      config = orginArgs.length > 1 ? orginArgs.shift() : {};
      if (orginArgs.length > 0 && orginArgs[0] !== undefined) {
        this.data.apply(this, orginArgs);
      }
    }

    let transitionList = {};
    for (let name in this.SelectionList) {
      transitionList[name] = core.callInner(this.SelectionList[name].transition(), config);
    }
    return this.renderSelection(transitionList);
  }

  animate(_transtionConfig, config, data) {
    const transtionConfig = _transtionConfig || {};
    if (data !== undefined) {
      this.data(data);
    }
    let transitionList = {};
    for (let name in this.SelectionList) {
      transitionList[name] = core.callInner(this.SelectionList[name].transition(), transtionConfig);
    }
    return this.renderSelection(transitionList, config);
  }

}
ShapeGroup.prototype.IsStatic = false;
ShapeGroup.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    classed: {
      'md-chart-shape': true
    }
  }
};

export default ShapeGroup;
