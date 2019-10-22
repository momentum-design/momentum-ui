import MomentumChart from '../../index.js';
import { profit2010to2018 } from '../../exampleData';

const example = () => {
  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    },
    style: {
      'background-color': '#f2f4f5',
      'width': '100%'
    }
  });

  board.data(profit2010to2018);
  let rect = board.rect('', {
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
      rx: [5, 5, 0, 0],
      ry: [5, 5, 0, 0]
    },
    modify: {
      attr: {
        fill: '#00a0d1'
      }
    }
  });
  board.render();

  let fakelen = profit2010to2018.length;

  let Res = board.responsive();

  Res.w(rect, {
    400: {
      generator: {
        x: function (d, i) {
          return 5 + i * (Res.width() - 5) / fakelen;
        },
        w: 10
      },
      modify: {
        style: {
          display: function(d, i) {
            return i % 2 === 0 ? 'none' : '';
          }
        }
      }
    },
    700: {
      generator: {
        x: function (d, i) {
          return 5 + i * (Res.width() - 5) / fakelen;
        },
        w: 15
      }
    },
    1000: {
      generator: {
        x: function (d, i) {
          return 5 + i * (Res.width() - 5) / fakelen;
        },
        w: 20
      }
    },
    1200: {
      generator: {
        x: function (d, i) {
          return 5 + i * (Res.width() - 5) / fakelen;
        },
        w: 25
      },
      modify: {
        style: {
          display: ''
        }
      }
    }
  });

  Res.resize(true);
};

export default example;
