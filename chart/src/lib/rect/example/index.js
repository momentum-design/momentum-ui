import MomentumChart from '../../index.js';
import { profit2010to2018, profit2010to2018Full } from '../../exampleData';

const example = () => {
  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    },
    style: {
      'background-color': '#f2f4f5'
    }
  });

  board.data(profit2010to2018);
  var rect = board.rect('', {
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
  });

  board.preload();

  setTimeout(function () {
    board.cancelPreload();
    rect.transition({ delay: 0, duration: 300 }, profit2010to2018Full);
  }, 3000);

  /*
    setTimeout(function () {
    profit2010to2018Lv2.pop();
    profit2010to2018Lv2.pop();
    board.data(profit2010to2018Lv2);
  }, 300);

  board.preload({
    dataUrl: '',
    data: profit2010to2018Full
  });

  setTimeout(function () {
    // profit2010to2018Full.pop();
    // profit2010to2018Full.pop();
    // board.render(profit2010to2018Full);
    rect.transition({ delay: 0, duration: 300 }, profit2010to2018Full);
  }, 10000);
  */

};

export default example;
