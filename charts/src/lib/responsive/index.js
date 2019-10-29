import EventControl from '../utils/eventControl';
import ResponsiveItem from './responsiveItem';

const EVENT_WIDTH = 'resizeWidth';
const EVENT_HEIGHT = 'resizeHeight';
class Responsive {

  constructor (board) {
    this.Items = {};
    this.Board = board;
    this.Dom = board.Dom;
    this.EventControl = new EventControl();
    this.init();
  }

  init() {
    let _rezie = () => {
      this.resize();
    };
    this.bindResize = () => {
      window.addEventListener('resize', _rezie);
    };
    this.unbindResize = () => {
      window.removeeventlistener('resize', _rezie);
    };
    this.bindResize();
  }

  _sort(a, b) {
    return a - b;
  }

  resize(ifForce) {
    let ifDifferentWidth = this.width(this.Dom.clientWidth),
      ifDifferentHeight = this.height(this.Dom.clientHeight);
    this.setviewBox(ifDifferentWidth, ifDifferentHeight, ifForce);
    if (ifDifferentWidth || ifForce) {
      this.EventControl.emit(EVENT_WIDTH);
    }
    if (ifDifferentHeight || ifForce) {
      this.EventControl.emit(EVENT_HEIGHT);
    }
  }

  width(val) {
    if (val !== undefined) {
      let ifDifferent = val !== this.Width;
      this.Width = val;
      return ifDifferent;
    }
    return this.Width || this.Dom.clientWidth;
  }

  height(val) {
    if (val !== undefined) {
      let ifDifferent = val !== this.Height;
      this.Height = val;
      return ifDifferent;
    }
    return this.Height || this.Dom.clientHeight;
  }

  setviewBox(ifDifferentWidth, ifDifferentHeight, ifForce) {
    let w = this.width(),
      h = this.height();
    if (ifDifferentWidth || ifForce) {
      this.Dom.setAttribute('width', w);
    }
    if (ifDifferentHeight || ifForce) {
      this.Dom.setAttribute('height', h);
    }
    if (ifDifferentWidth || ifDifferentHeight || ifForce) {
      this.Dom.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    }
  }

  add(shape, config) {
    let item = new ResponsiveItem(shape, config);
    this.Items[item.Guid] = item;
    return item;
  }

  w(shape, config) {
    let item = this.add(shape, config);
    item.$resizeHandle = this.EventControl.bind(EVENT_WIDTH, ()=> {
      item.change(this.width());
    });
    return item;
  }

  h(shape, config) {
    let item = this.add(shape, config);
    item.$resizeHandle = this.EventControl.bind(EVENT_HEIGHT, ()=> {
      item.change(this.height());
    });
    return item;
  }

  unbind(funcOrGuid, ifH) {
    let eventName = ifH ? EVENT_HEIGHT : EVENT_WIDTH;
    this.EventControl.unbind(eventName, funcOrGuid);
  }

}

export default Responsive;
