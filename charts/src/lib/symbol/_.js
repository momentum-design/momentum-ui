import Symbol from './index';
import _Shape from '../shape/_';

class _Symbol extends _Shape {

  constructor () {
    super();
    super.init(Symbol);
  }

}
_Symbol.prototype.RegistorName = 'md-chart-symbol';
export default _Symbol;
