import MomentumChart from '../../index.js';
import { profit2010to2018, profit2010to2018Lv2 } from '../../exampleData';

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
  board.add('rect', profit2010to2018, {
    generator: {
      x: function(d, i) {
        return 10 + i * 30 - 2;
      },
      y: function(d) {
        return 300 - d.profit;
      },
      h: function(d) {
        return d.profit;
      },
      w: 4
    },
    modify: {
      attr: {
        stroke: 'white',
        fill: '#00a0d1',
        'stroke-width': 3
      }
    }
  });
  board.render();
  board.transition({
    delay: 1000,
    duration: 3000
  }, profit2010to2018Lv2);

};

export default example;
