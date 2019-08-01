import MomentumChart from '../../index.js';
import { profit2010to2018 } from '../../exampleData';

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
    range: [100, 900],
    domain: [2000, 2020]
  }).Scale;

  let scaleY = new MomentumChart.Scale('scaleLinear', {
    range: [350, 50],
    domain: [0, maxP]
  }).Scale;

  board.axis('axisBottom', {
    generator: {
      scale: scaleX,
      ticks: 20,
      y: 350
    }
  });

  board.axis('axisLeft', {
    generator: {
      scale: scaleY,
      ticks: 10,
      tickPadding: 10,
      tickSizeInner: 2,
      tickSizeOuter: 5,
      x: 100
    }
  });

  board.zoom([1, 2]);

};

export default example;
