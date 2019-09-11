import Area from './index';
import _Shape from '../shape/_';

class _Area extends _Shape {

  constructor () {
    super();
    super.init(Area);
  }

}
_Area.prototype.RegistorName = 'md-chart-area';
export default _Area;
