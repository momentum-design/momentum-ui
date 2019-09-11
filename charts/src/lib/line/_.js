import Line from './index';
import _Shape from '../shape/_';

class _Line extends _Shape {

  constructor () {
    super();
    super.init(Line);
  }

}
_Line.prototype.RegistorName = 'md-chart-line';
export default _Line;
