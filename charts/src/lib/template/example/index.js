import MomentumChart from '../../index.js';
import { profit2010to2018 } from '../../exampleData';

const example = () => {
  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    },
    style: {
      'background-color': '#f2f4f5',
      'width': '100%'
    }
  });

  board.data(profit2010to2018);
  board.template('SingleRect', {
    rect: [{
      data: '',
      value: function (d) {
        return d.profit;
      }
    }],
    _responsive: true
  });
  board.render();
};

export default example;
