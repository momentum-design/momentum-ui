import MomentumCharts from '../../index.js';

const example = () => {
  const colorSets = MomentumCharts.colors('10Colors'),
    colors = colorSets.scheme(2),
    color1 = colors[0].toString(),
    color2 = colors[1].toString();

  let scaleX = MomentumCharts.scale('scaleLinear', {
    domain: [-1, 0, 4, 5],
    range: [100, 200, 900, 1000]
  }).Scale;

  let scaleX1 = MomentumCharts.scale('scaleLinear', {
    domain: [-1, 0, 4, 5],
    range: [100, 200, 700, 800]
  }).Scale;

  let scaleX2 = MomentumCharts.scale('scaleLinear', {
    domain: [-1, 0, 4, 5],
    range: [100, 200, 500, 600]
  }).Scale;

  let scaleY = MomentumCharts.scale('scaleLinear', {
    domain: [0, 80],
    range: [350, 50]
  }).Scale;

  let boardData = {
    d1: [10, 25, 55, 65, 40],
    d2: [15, 30, 35, 55, 60],
    legends: ['Cisco Webex Teams', 'Cisco Webex Meetings']
  };

  let board = MomentumCharts.board('#app', {
    attr: {
      width: '1200',
      height: '400',
      viewBox: "0 0 1200 400"
    },
    style: {
      width: '100%'
    }
  }, boardData);

  board.legends('legends', {
    generator: {
      x: 100,
      y: 10,
      type: 'horizontal',
      iconType: 'dot',
      text: function (d) {
        return d;
      },
      iconColor: function (d, i) {
        return colors[i].toString();
      }
    }
  });

  let axisX = board.axis('x', {
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
  });

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

  let Res = board.responsive();

  Res.w(axisX, {
    800: {
      generator: {
        scale: scaleX2
      }
    },
    1000: {
      generator: {
        scale: scaleX1
      }
    },
    1200: {
      generator: {
        scale: scaleX
      }
    }
  });

  Res.w(axisY, {
    800: {
      generator: {
        tickSize: -500
      }
    },
    1000: {
      generator: {
        tickSize: -700
      }
    },
    1200: {
      generator: {
        tickSize: -900
      }
    }
  });

  Res.w(rect1, {
    800: {
      generator: {
        x: function (d, i) {
          return scaleX2(i) - 20;
        },
        w: 15
      }
    },
    1000: {
      generator: {
        x: function (d, i) {
          return scaleX1(i) - 25;
        },
        w: 20
      }
    },
    1200: {
      generator: {
        x: function (d, i) {
          return scaleX(i) - 35;
        }
      }
    }
  });

  Res.w(rect2, {
    800: {
      generator: {
        x: function (d, i) {
          return scaleX2(i) + 5;
        },
        w: 15
      }
    },
    1000: {
      generator: {
        x: function (d, i) {
          return scaleX1(i) + 5;
        },
        w: 20
      }
    },
    1200: {
      generator: {
        x: function (d, i) {
          return scaleX(i) + 5;
        }
      }
    }
  });

  board.render();
};

export default example;
