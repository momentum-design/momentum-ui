import MomentumCharts from '../../index.js';
const example = () => {
  const colorSets = MomentumCharts.colors('10Colors');
  const colors = colorSets.scheme(10);
  const scaleX = MomentumCharts.scale('scaleLinear', {
    domain: [0, 4],
    range: [100, 700]
  }).Scale;
  const scaleY = MomentumCharts.scale('scaleLinear', {
    domain: [0, 80],
    range: [350, 50]
  }).Scale;

  let areaGenerator = {
    x: function (d, i) {
      return scaleX(i);
    },
    y1: function (d) {
      return scaleY(d.y1);
    },
    y0: function (d) {
      return scaleY(d.y0 - 1);
    }
  };

  let shapeData = [
    [20, 35, 55, 65, 50],
    [15, 30, 35, 55, 45],
    [10, 20, 25, 45, 40],
    [5, 10, 15, 25, 30],
    [1, 1, 1, 1, 1]
  ];

  let boardData = {
    shape: {},
    legends: ['Cisco Webex Teams', 'Cisco Webex Meetings', 'Cisco Jabber', 'Device']
  };

  for (let j = 1; j < 5; j++) {
    boardData.shape['d' + j] = [];
    for (let _j = 0; _j < 5; _j++) {
      boardData.shape['d' + j].push({
        y0: shapeData[j - 1][_j],
        y1: shapeData[j][_j]
      });
    }
  }

  let board = MomentumCharts.board('#app', {
    attr: {
      width: '800',
      height: '400',
      viewBox: "0 0 800 400"
    }
  });

  board.data(boardData);
  board.legends('legends', {
    generator: {
      x: 100,
      y: 370,
      type: 'horizontal',
      iconType: 'dot',
      text: function (d) {
        return d;
      },
      iconColor: function (d, i) {
        return colors[+i + 5].toString();
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

  for (var i = 1, l = 5; i < l; i++) {
    board.area('shape/d' + i, {
      generator: areaGenerator,
      modify: {
        style: {
          fill: colors[(+i + 5)].toString(),
          'stroke-width': 2,
          opacity: 0.85
        }
      }
    });
  }

  board.render();

};

export default example;
