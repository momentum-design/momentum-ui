import MomentumChart from '../../index.js';

const example = () => {
  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    }
  });

  let scaleX = new MomentumChart.Scale('scaleLinear', {
    range: [200, 800],
    domain: [2000, 2020]
  }).Scale;

  let scaleX2 = new MomentumChart.Scale('scaleLinear', {
    range: [0, 1000],
    domain: [2000, 2020]
  }).Scale;

  let scaleY = new MomentumChart.Scale('scaleLinear', {
    range: [350, 50],
    domain: [0, 400]
  }).Scale;

  let scaleY2 = new MomentumChart.Scale('scaleLinear', {
    range: [400, 0],
    domain: [0, 400]
  }).Scale;

  var axis = board.axis('axisBottom', {
    generator: {
      scale: scaleX,
      ticks: 5,
      y: 350
    },
    dataConvert: function() {
      return {
        generator: {
          scale: scaleX2,
          ticks: 5,
          y: 350
        }
      };
    }
  }, '');

  var axis2 = board.axis('axisLeft', {
    generator: {
      scale: scaleY,
      ticks: 5,
      tickSize: -1000,
      x: 100
    },
    dataConvert: function(data) {
      return {
        generator: {
          scale: scaleY2,
          ticks: 5,
          tickSize: -10,
          x: 0
        }
      };
    }
  }, './');
  axis.IsStatic = false;
  axis2.IsStatic = false;
  board.render();

  setTimeout(function () {
    board.transition({}, []);
  }, 1000);

  board.zoom([1, 2]);

};

export default example;
