import registorWebComponent from './webComponents';
import Math from './utils/math';
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
import Axis from './axis/index';
import Text from './text/index';
import Colors from './colors/index';
import Preload from './preload/index';
import Break from './break/index';
import Template from './template/index';
import Legends from './legends/index';

const components = {
  Line,
  Symbol,
  Area,
  Rect,
  Arc,
  Text,
  Break,
  Legends
};

Board.registerShapesObj(components);

const MomentumCharts = Object.assign({
  Shape,
  Math,
  Board,
  Scale,
  Colors,
  Preload,
  Axis,
  Database,
  DatabaseEvent,
  Template
}, components);

MomentumCharts.board = (query, config, data) => {
  return new Board(query, config, data);
};

MomentumCharts.scale = (name, config) => {
  return new Scale(name, config);
};

MomentumCharts.colors = (name) => {
  return new Colors(name);
};

MomentumCharts.database = (data, eventNames) => {
  return new Database(data, eventNames);
};

registorWebComponent();

if (typeof window !== 'undefined' && window.MomentumCharts === undefined) {
  window.$c = window.MomentumCharts = MomentumCharts;
}

export default MomentumCharts;
