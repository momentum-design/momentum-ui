import MomentumChart from '../../index.js';
import { profit2010to2018Break } from '../../exampleData';

const example = () => {
  let board = MomentumChart.board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    }
  }, {
    data: profit2010to2018Break
  });

  let scaleY = MomentumChart.scale('scaleLinear', {
    domain: [0, 600, 3600, 4000],
    range: [380, 200, 150, 30]
  }).Scale;

  let scaleY2 = MomentumChart.scale('scaleLinear', {
    domain: [0, 4000],
    range: [380, 30]
  }).Scale;
  MomentumChart.Scale.smooth(scaleY, scaleY2);

  let tickV = MomentumChart.Scale.breakTicks(scaleY),
    tickV2 = MomentumChart.Scale.ticks(scaleY2);

  let rect = board.rect('data', {
    generator: {
      x: function (d, i) {
        return 60 + i * 30 - 2;
      },
      y: function (d) {
        return scaleY(d.profit);
      },
      h: function (d) {
        return 380 - scaleY(d.profit);
      },
      w: 10,
      rx: [5, 5, 0, 0],
      ry: [5, 5, 0, 0]
    },
    modify: {
      attr: {
        stroke: 'white',
        fill: '#00a0d1',
        'stroke-width': 3
      }
    }
  });

  let breaks = board.break('break', {
    generator: {
      w: 800,
      h: scaleY(1000) - scaleY(3200),
      x: 50,
      y: scaleY(3200)
    }
  });

  let axis = board.axis('axisLeft', {
    generator: {
      scale: scaleY,
      x: 50,
      tickValues: tickV,
      tickSize: -800
    }
  }, 'axisLeft');

  axis.IsStatic = false;
  board.render();

  setTimeout(function () {

    board.transition({
      duration: 3000
    }, 'axisLeft', {
      generator: {
        scale: scaleY2,
        tickValues: tickV2
      }
    });

    breaks.animate({
      duration: 3000
    }, {
      modify: {
        style: {
          opacity: 0
        }
      }
    }, {
      generator: {
        h: scaleY2(1000) - scaleY2(3200),
        y: scaleY2(3200)
      }
    });

    rect.extendConfig({
      generator: {
        y: function (d) {
          return scaleY2(d.profit);
        },
        h: function (d) {
          return 380 - scaleY2(d.profit);
        }
      }
    });

    rect.transition({
      duration: 3000
    }, profit2010to2018Break);

  }, 1000);

};

export default example;
