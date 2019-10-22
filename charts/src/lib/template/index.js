import SingleRect from './preset/singleRect';

const Template = {
  Presets: {
    SingleRect
  },
  load: function (board, name, config) {
    if (this.Presets[name] !== undefined) {
      let _Template = this.Presets[name];
      let a = new _Template(board, config);
      return a;
    }
    return false;
  },
  add: function(name, template) {
    this.Presets[name] = template;
  }
};

export default Template;
