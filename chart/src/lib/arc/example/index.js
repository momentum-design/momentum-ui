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

  board.add('line', profit2010to2018, {
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
  });

  board.add('arc', profit2010to2018, {
    generator: {

    },
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
  });

  board.render();
  board.transition({
    delay: 1000,
    duration: 3000
  }, profit2010to2018Lv2);
};

export default example;
