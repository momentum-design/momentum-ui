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

  let line = document.getElementById('chart-area');
  line.ChartConfig = {
    generator: {
      x: function (d, i) {
        return 10 + i * 30;
      },
      y1: function (d) {
        return 400 - d.profit;
      },
      y0: 400
    },
    modify: {
      attr: {
        stroke: 'white',
        fill: '#00a0d1',
        'stroke-width': 2
      }
    }
  };
};

export default example;
