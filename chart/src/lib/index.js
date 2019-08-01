import Board from './board/index';
import Shape from './shape/index';
import Line from './line/index';
import Symbol from './symbol/index';
import Area from './area/index';
import Rect from './rect/index';
import Arc from './arc/index';
import Scale from './scale/index';
import Math from './math/index';
import Axis from './axis/index';
import Text from './text/index';
import Link from './link/index';

const components = {
  Line,
  Symbol,
  Area,
  Rect,
  Arc,
  Text,
  Link
};

Board.registerShapesObj(components);

const MomentumChart = Object.assign({
  Shape,
  Math,
  Board,
  Scale,
  Axis
}, components);

if (typeof window !== 'undefined' && window.Board === undefined) {
  window.MomentumChart = MomentumChart;
}

export default MomentumChart;
