import MomentumCharts from '../../index.js';
const example = () => {
  const colors = ['#708FFF', '#14B2A8', '#8218ED', '#EF4C4C'];

  let boardData = [{
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
      outerRadius: 150,
      innerRadius: 120
    },
    pie: {
      value: (d) => {
        return d.sum;
      },
      sortValues: (d1, d2) => {
        return d1.year - d2.year;
      }
    },
    modify: {
      style: {
        fill: function (d, i) {
          return colors[i].toString();
        }
      }
    }
  });

  board.render(boardData);

};

export default example;
