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
      x: function(d, i) {
        return 10 + i * 30;
      },
      y: function(d) {
        return 300 - d.profit;
      }
    },
    modify: {
      attr: {
        stroke: '#b4b6b8',
        'stroke-width': 2
      }
    }
  };

  let symbol = document.getElementById('chart-symbol');
  symbol.ChartConfig = {
    generator: {
      x: function(d, i) {
        return 10 + i * 30;
      },
      y: function(d) {
        return 300 - d.profit;
      },
      type: MomentumChart.Symbol.type('circle'),
      size: 40
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
