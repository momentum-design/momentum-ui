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
  const symbolX = function (d, i) {
    return 10 + i * 30;
  };
  const symbolY = function (d) {
    return 300 - d.profit;
  };

  const symbolTX = function (d, i) {
    return symbolX(d, i) - 50;
  };
  const symbolTY = function (d, i) {
    return symbolY(d, i) - 20;
  };

  board.add('line', profit2010to2018, {
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
        stroke: '#b4b6b8',
        'stroke-width': 2
      }
    }
  });

  board.add('symbol', profit2010to2018, {
    generator: {
      x: symbolX,
      y: symbolY,
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
  });

  board.add('text', profit2010to2018, {
    generator: {
      x: symbolTX,
      y: symbolTY,
      text: function(d) {
        return d.profit;
      }
    },
    modify: {
      attr: {
        stroke: '#9B9B9B'
      }
    }
  });

  board.add('link', {
    source: profit2010to2018,
    target: profit2010to2018
  }, {
    generator: {
      sourceX: symbolX,
      sourceY: symbolY,
      targetX: symbolTX,
      targetY: symbolTY
    },
    modify: {
      attr: {
        stroke: '#9B9B9B'
      }
    }
  });

  board.render();

  board.transition({
    delay: 1000,
    duration: 3000
  }, profit2010to2018Lv2, profit2010to2018Lv2);

};

export default example;
