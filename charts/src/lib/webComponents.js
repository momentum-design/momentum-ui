import _Arc from './arc/_';
import _Area from './area/_';
import _Line from './line/_';
import _Rect from './rect/_';
import _Symbol from './symbol/_';
import _Text from './text/_';
import _Board from './board/_';

let components = [
  _Arc,
  _Area,
  _Line,
  _Rect,
  _Symbol,
  _Text,
  _Board
];

const registorWebComponent = () => {
  if ((process && process.env && process.env.NODE_ENV === 'test')) {
    // currently do not support webcomponent test
  } else {
    if (customElements && customElements.define) {
      components.map((c) => {
        customElements.define(c.prototype.RegistorName, c);
      });
    }
  }

};

export default registorWebComponent;
