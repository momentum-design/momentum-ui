import MomentumChart from '../../index.js';
import * as d3 from "d3";
import { profit2010to2018, profit2010to2018Lv2, profit2010to2018Full } from '../../exampleData';

const example = () => {
  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    }
  }, {
    d1: profit2010to2018,
    d2: profit2010to2018Lv2
  });

  let line1 = board.line('d1', {
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
  });

  let line2 = board.line('d2', {
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
        stroke: 'blue',
        'stroke-width': 2
      }
    }
  });

  board.render();

  setTimeout(function () {
    board.render({
      d1: profit2010to2018Lv2,
      d2: profit2010to2018Full
    });
  }, 300);
/*
  board.transition({
    delay: 1000,
    duration: 3000,
    ease: d3.easeCubicOut
  }, {
    d1: profit2010to2018Lv2,
    d2: profit2010to2018Full
  });
*/
};

export default example;
