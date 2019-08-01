import registorWebComponent from './webComponents';
import Database from './database/index';
import DatabaseEvent from './database/databaseEvent';
import Board from './board/index';
import Shape from './shape/index';
import Line from './line/index';
import Symbol from './symbol/index';
import Area from './area/index';
import Rect from './rect/index';
import Arc from './arc/index';
import Scale from './scale/index';
import Math from './utils/math';
import Axis from './axis/index';
import Text from './text/index';
import Colors from './colors/index';
import Preload from './preload/index';
import Break from './break/index';

const components = {
  Line,
  Symbol,
  Area,
  Rect,
  Arc,
  Text,
  Break
};

Board.registerShapesObj(components);

const MomentumChart = Object.assign({
  Shape,
  Math,
  Board,
  Scale,
  Colors,
  Preload,
  Axis,
  Database,
  DatabaseEvent
}, components);

MomentumChart.board = (query, config, data) => {
  return new Board(query, config, data);
};

MomentumChart.scale = (name, config) => {
  return new Scale(name, config);
};

MomentumChart.colors = (name) => {
  return new Colors(name);
};

MomentumChart.database = (data, eventNames) => {
  return new Database(data, eventNames);
};

registorWebComponent();

if (typeof window !== 'undefined' && window.Board === undefined) {
  window.$Chart = window.MomentumChart = MomentumChart;
}

export default MomentumChart;
