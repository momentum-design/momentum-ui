import MomentumCharts from '../../index.js';

const example = () => {
  const colorSets = MomentumCharts.colors('10Colors'),
    colors = colorSets.scheme(10),
    color1 = colors[6].toString(),
    color2 = colors[7].toString();

  const scaleX = MomentumCharts.scale('scaleLinear', {
    domain: [-1, 0, 4, 5],
    range: [100, 150, 650, 700]
  }).Scale;

  const scaleY = MomentumCharts.scale('scaleLinear', {
    domain: [0, 80],
    range: [350, 50]
  }).Scale;

  const boardData = {
    d1: [10, 25, 55, 65, 40],
    d2: [15, 30, 35, 55, 60],
    legends: ['Cisco Webex Teams', 'Cisco Webex Meetings']
  };

  let board = MomentumCharts.board('#app', {
    attr: {
      width: '800',
      height: '400',
      viewBox: "0 0 800 400"
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

  board.axis('y', {
    generator: {
      scale: scaleY,
      x: 100,
      tickSize: -600
    },
    modify: {
      style: {
        stroke: '#A3A3A3'
      }
    }
  });

  board.rect('d1', {
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

  board.rect('d2', {
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

};

export default example;
