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

  let line = document.getElementById('chart-line');
  line.ChartConfig = {
    generator: {
      x: function (d, i) {
        return 10 + i * 30;
      },
      y: function (d) {
        return 300 - d.profit;
      }
    },
    modify: {
      attr: {
        stroke: 'red',
        'stroke-width': 2
      }
    }
  };
};

export default example;
