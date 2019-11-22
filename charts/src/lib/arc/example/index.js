import MomentumCharts from '../../index.js';
const example = () => {
  const colors = ['#708FFF', '#14B2A8', '#8218ED', '#EF4C4C'];
  const boardData = [{
    year: 2016,
    sum: 10
  }, {
    year: 2017,
    sum: 20
  }, {
    year: 2018,
    sum: 25
  }, {
    year: 2019,
    sum: 45
  }];

  let pieData = function () {
    var totalSum = 50,
      i = 0,
      l = boardData.length;
    for (i = 0; i < l; i++) {
      boardData[i].endAngle = 3 / 2 * Math.PI * boardData[i].sum / totalSum;
      boardData[i].index = i;
    }
  };
  pieData();

  let board = MomentumCharts.board('#app', {
    attr: {
      width: '800',
      height: '400',
      viewBox: "0 0 800 400"
    }
  });

  board.arc({
    generator: {
      x: 200,
      y: 200,
      outerRadius: function (d, i) {
        var index = typeof i === 'number' ? i : d.index;
        return index * 20 + 118;
      },
      innerRadius: function (d, i) {
        var index = typeof i === 'number' ? i : d.index;
        return index * 20 + 100;
      },
      padAngle: 0,
      startAngle: 0,
      endAngle: (d) => {
        return d.endAngle;
      }
    },
    modify: {
      style: {
        fill: function (d, i) {
          return colors[i];
        }
      }
    }
  });

  board.render(boardData);
};

export default example;
