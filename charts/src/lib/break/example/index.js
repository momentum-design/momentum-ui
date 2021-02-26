import MomentumCharts from '../../index.js';

const example = () => {
  const colorSets = MomentumCharts.colors('10Colors'),
    colors = colorSets.scheme(10),
    color1 = colors[6].toString(),
    color2 = colors[7].toString();

  let scaleX = MomentumCharts.scale('scaleLinear', {
    domain: [-1, 0, 4, 5],
    range: [100, 200, 900, 1000]
  }).Scale;
  let scaleY = MomentumCharts.scale('scaleLinear', {
    domain: [0, 200],
    range: [600, 100]
  }).Scale;
  let scaleY2 = MomentumCharts.scale('scaleLinear', {
    domain: [0, 40, 160, 200],
    range: [600, 380, 320, 100]
  }).Scale;
  MomentumCharts.Scale.smooth(scaleY2, scaleY);

  let tickV = MomentumCharts.Scale.breakTicks(scaleY2, { 0: '1', 2: '1' }, 5);
  let boardData = {
    d1: [10, 25, 35, 165, 180],
    d2: [15, 20, 30, 175, 190],
    legends: ['Cisco Webex Teams', 'Cisco Webex Meetings']
  };
  let board = MomentumCharts.board('#app', {
    attr: {
      width: '800',
      height: '400',
      viewBox: "0 0 1200 700"
    },
    style: {
      width: '100%'
    }
  }, boardData);

  let breaks = board.break('break', {
    generator: {
      w: 900,
      h: scaleY(40) - scaleY(160),
      x: 100,
      y: scaleY(160)
    },
    modify: {
      style: {
        opacity: 0
      }
    }
  });

  board.legends('legends', {
    generator: {
      x: 100,
      y: 50,
      type: 'horizontal',
      iconType: 'dot',
      text: function (d) {
        return d;
      },
      iconColor: function (d, i) {
        return colors[(+i + 6)].toString();
      }
    }
  });

  board.axis('x', {
    generator: {
      scale: scaleX,
      y: scaleY.range()[0],
      tickFormat: function () {
        return '';
      },
      tickSize: -5,
      tickValues: [0, 1, 2, 3]
    },
    modify: {
      style: {
        stroke: '#A3A3A3'
      }
    }
  });

  let axisY = board.axis('y', {
    generator: {
      scale: scaleY,
      x: 100,
      tickSize: -900
    },
    modify: {
      style: {
        stroke: '#A3A3A3'
      }
    }
  }, 'axisY');
  axisY.IsStatic = false;

  let rect1 = board.rect('d1', {
    generator: {
      x: function (d, i) {
        return scaleX(i) - 35;
      },
      y: function (d, i) {
        return scaleY(d);
      },
      w: 30,
      h: function (d, i) {
        return scaleY.range()[0] - scaleY(d);
      }
    },
    modify: {
      style: {
        fill: color1
      }
    }
  });

  let rect2 = board.rect('d2', {
    generator: {
      x: function (d, i) {
        return scaleX(i) + 5;
      },
      y: function (d, i) {
        return scaleY(d);
      },
      w: 30,
      h: function (d, i) {
        return scaleY.range()[0] - scaleY(d);
      }
    },
    modify: {
      style: {
        fill: color2
      }
    }
  });

  board.render();

  setTimeout(function () {
    breaks.animate({
      duration: 1000
    }, {
      modify: {
        style: {
          opacity: 0.8
        }
      }
    }, {
      generator: {
        h: scaleY2(40) - scaleY2(160),
        y: scaleY2(160)
      }
    });

    board.transition({
      duration: 1000
    }, 'axisY', {
      generator: {
        scale: scaleY2,
        tickValues: tickV
      }
    });

    rect1.extendConfig({
      generator: {
        y: function (d) {
          return scaleY2(d);
        },
        h: function (d) {
          return scaleY2.range()[0] - scaleY2(d);
        }
      }
    });

    rect2.extendConfig({
      generator: {
        y: function (d) {
          return scaleY2(d);
        },
        h: function (d) {
          return scaleY2.range()[0] - scaleY2(d);
        }
      }
    });

    rect1.transition({
      duration: 1000
    }, boardData.d1);

    rect2.transition({
      duration: 1000
    }, boardData.d2);

  }, 500);

};

export default example;
