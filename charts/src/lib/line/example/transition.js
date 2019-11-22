import MomentumCharts from '../../index.js';

const example = () => {
  const colorSets = MomentumCharts.colors('10Colors'),
    colors = colorSets.scheme(2),
    color1 = colors[0].toString(),
    color2 = colors[1].toString();

  const scaleX = MomentumCharts.scale('scaleLinear', {
    domain: [0, 4],
    range: [100, 700]
  }).Scale;

  const scaleY = MomentumCharts.scale('scaleLinear', {
    domain: [0, 80],
    range: [350, 50]
  }).Scale;

  const lineGenerator = {
    x: function (d, i) {
      return scaleX(i);
    },
    y: function (d) {
      return scaleY(d);
    }
  };

  let boardData = {
    d1: [10, 25, 55, 65, 40],
    d2: [15, 30, 35, 55, 60],
    legends: ['Cisco Webex Teams', 'Cisco Webex Meetings']
  };
  let boardData2 = {
    d1: [20, 30, 40, 70, 50],
    d2: [20, 40, 45, 60, 60]
  };
  let hasChanged = {
    d1: false,
    d2: false
  };
  let animate = function (d, i) {
    var key = 'd' + (+i + 1);
    if (!hasChanged[key]) {
      hasChanged[key] = true;
      board.transition({
        duration: 300
      }, key, boardData2[key]);
    }
  };

  let board = MomentumCharts.board('#app', {
    attr: {
      width: '800',
      height: '400',
      viewBox: "0 0 800 400"
    }
  }, boardData);

  let legends = board.legends('legends', {
    generator: {
      x: 100,
      y: 370,
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

  legends.bind('click', function (d, i) {
    animate(d, i);
  });

  board.axis('x', {
    generator: {
      scale: scaleX,
      y: scaleY.range()[0],
      tickFormat: function () {
        return '';
      },
      tickSize: -10
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
      x: scaleX.range()[0],
      tickSize: scaleX.range()[0] - scaleX.range()[1]
    },
    modify: {
      style: {
        stroke: '#A3A3A3'
      }
    }
  });

  board.line('d1', {
    generator: lineGenerator,
    modify: {
      attr: {
        stroke: color1,
        'stroke-width': 2
      }
    }
  });

  board.line('d2', {
    generator: lineGenerator,
    modify: {
      attr: {
        stroke: color2,
        'stroke-width': 2
      }
    }
  });

  board.render();
};

export default example;
