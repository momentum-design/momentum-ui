import MomentumChart from '../../index.js';

const example = () => {
  let colorsSet = new MomentumChart.Colors('ColorWheel'),
    colors = colorsSet.scheme(10);

  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    }
  }, {
    title1: ['arc', 'line', 'area', 'rect', 'pie', 'board', 'axis'],
    title2: ['arc', 'line', 'area', 'rect', 'pie', 'board', 'axis'],
    title3: ['arc', 'line', 'area', 'rect', 'pie', 'board', 'axis']
  });

  board.legends('title1', {
    generator: {
      x: 10,
      y: 10,
      type: 'horizontal',
      iconType: 'dot',
      text: function (d) {
        return d;
      },
      iconColor: function (d, i) {
        return colors[i];
      }
    }
  });

  board.legends('title2', {
    generator: {
      x: 10,
      y: 110,
      type: 'horizontal',
      lineWidth: 400,
      iconType: 'line',
      text: function (d) {
        return d;
      },
      iconColor: function (d, i) {
        return colors[i];
      }
    }
  });

  board.legends('title3', {
    generator: {
      x: 10,
      y: 210,
      type: 'vertical',
      iconType: 'square',
      text: function (d) {
        return d;
      },
      iconColor: function (d, i) {
        return colors[i];
      }
    }
  });

  board.render();
};

export default example;
