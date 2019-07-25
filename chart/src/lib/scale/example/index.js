import MomentumChart from '../../index.js';
import { profit2010to2018Lv2, profit2010to2018 } from '../../exampleData';
import * as d3 from "d3";

const example = () => {

  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    }
  });

  let maxP = MomentumChart.Math.max(profit2010to2018, function (d) {
    return d.profit;
  });

  let scaleX = new MomentumChart.Scale('scaleLinear', {
    range: [0, 1000],
    domain: [2000, 2020]
  });

  let scaleY = new MomentumChart.Scale('scaleLinear', {
    range: [0, 400],
    domain: [0, maxP]
  });

  let line = board.add('line', profit2010to2018, {
    generator: {
      x: function (d) {
        return scaleX.Scale(d.year) >> 0;
      },
      y: function (d) {
        return 400 - scaleY.Scale(d.profit) >> 0;
      }
    },
    modify: {
      attr: {
        stroke: 'red',
        'stroke-width': 2
      }
    }
  });

  board.render();

  line.transition({
    delay: 1000,
    duration: 3000,
    ease: d3.easeCubicOut
  }, profit2010to2018Lv2);

};

export default example;
