import Rect from './index';
import _Shape from '../shape/_';

class _Rect extends _Shape {

  constructor () {
    super();
    super.init(Rect);
  }

}
_Rect.prototype.RegistorName = 'md-chart-rect';
export default _Rect;
