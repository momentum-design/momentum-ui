import Text from './index';
import _Shape from '../shape/_';

class _Text extends _Shape {

  constructor () {
    super();
    super.init(Text);
  }

}
_Text.prototype.RegistorName = 'md-chart-text';
export default _Text;
