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

  let arc = document.getElementById('chart-arc');
  arc.ChartConfig = {
    pie: {
      value: (d) => {
        return d.profit;
      },
      sortValues: (d1, d2) => {
        return d1.year - d2.year;
      }
    },
    modify: {
      attr: {
        stroke: 'white',
        fill: '#00a0d1'
      }
    }
  };
};

export default example;
