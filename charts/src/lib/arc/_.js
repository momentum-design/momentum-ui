import Arc from './index';
import _Shape from '../shape/_';

class _Arc extends _Shape {

  constructor () {
    super();
    super.init(Arc);
    this._ConfigCallbacks.pie = '_pie';
  }

  _pie(config) {
    this.Shape.extendConfigPie(config);
  }
}
_Arc.prototype.RegistorName = 'md-chart-arc';
export default _Arc;
