import core from '../core/index';

class Shape {

  constructor () { }

  init(data, config) {
    this.Guid = core.guid();
    this.Data = data;
    this.Stack = [];
    this.extendConfig(config);
  }

  modify(config) {
    core.modifySelection(this.Selection, config);
  }

  render() {
    const args = Array.prototype.slice.call(arguments);
    if (args.length > 0 && args[0] !== undefined) {
      this.updateData.apply(this, args);
    }
    this.renderSelection(this.Selection);
  }

  renderSelection(selection) {
    return selection;
  }

  updateData(data) {
    // if (data) {
    this.Data = data;
    this.Selection.data(data);
    // }
  }

  // agruments[0].append(selection)
  attach(svg) {
    this.G = svg.append('g');
    this.Svg = svg;
    // please create a new instance if the data length is not the same
    this.Selection = this.G.selectAll(this.DomName).data(this.Data).enter().append(this.DomName);
    this.modify(this.Config.modify);
  }

  transition() {
    const args = Array.prototype.slice.call(arguments);
    const config = args.length > 1 ? args.shift() : {};
    if (args.length > 0 && args[0] !== undefined) {
      this.updateData.apply(this, args);
    }
    let transition = this.Selection.transition();
    transition = core.callInner(transition, config);
    return this.renderSelection(transition);
  }

  clear() {
    this.Stack = [];
    this.Selection && this.Selection.remove();
  }

  detach() {
    this.G.remove();
  }

  setGenerator(generator) {
    this.Generator = core.callInner(generator, this.Config.generator);
  }

  extendConfig(config) {
    this.Config = {
      generator: Object.assign({}, this.defaultConfig.generator),
      modify: Object.assign({}, this.defaultConfig.modify)
    };
    if (config) {
      if (config.generator) {
        Object.assign(this.Config.generator, config.generator);
      }
      if (config.modify) {
        core.assignUnKnownLv2(this.Config.modify, config.modify);
      }
    }
  }

  fVal(funcOrValue, data, index, defaultValue) {
    return core.getFirstValue(core.getReturnOrValue(funcOrValue, data, index), defaultValue);
  }

}
Shape.prototype.defaultConfig = {
  generator: {

  },
  modify: {

  }
};

export default Shape;
