import * as d3 from "d3";
import MomentumChart from '../../index.js';
import { profit2010to2018 } from '../../exampleData';

const example = () => {
  const board = document.getElementById('md-board');
  board.ChartConfig = {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    }
  };
  board.ChartData = profit2010to2018;

  const rect = document.getElementById('chart-rect');
  rect.ChartConfig = {
    generator: {
      x: function (d, i) {
        return 10 + i * 30 - 2;
      },
      y: function (d) {
        return 300 - d.profit;
      },
      h: function (d) {
        return d.profit;
      },
      w: 10,
      rx: [5, 5, 1110, 0],
      ry: [5, 5, 1110, 0]
    },
    modify: {
      attr: {
        stroke: 'white',
        fill: '#00a0d1',
        'stroke-width': 3
      }
    }
  };
};

export default example;
