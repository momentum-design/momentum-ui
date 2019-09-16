import MomentumChart from '../../index.js';
import { profit2010to2018, profit2010to2018Full } from '../../exampleData';
const example = () => {
  let board = new MomentumChart.Board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    },
    style: {
      'background-color': '#f2f4f5'
    }
  });

  board.data({
    d1: profit2010to2018
  });
  /*
    board.line('d1', {
      generator: {
        x: function (d, i) {
          return 10 + i * 30;
        },
        y: function (d) {
          return 300 - d.profit;
        }
      },
      modify: {
        attr: {
          stroke: '#b4b6b8',
          'stroke-width': 2
        }
      }
    });
  */
  board.arc('d1', {
    generator: {

    },
    pie: {
      value: (d) => {
        return d.profit;
      },
      sortValues: (d1, d2) => {
        return d1.year - d2.year;
      }
    },
    modify: {
      attr: {
        stroke: 'white',
        fill: '#00a0d1'
      }
    }
  });
  // console.log('centroid', arc.centroid());
  board.render();
  let vprofit2010to2018Full = profit2010to2018Full.concat(profit2010to2018Full);
  setTimeout(function () {
    // board.render({ d1: profit2010to2018Full });
    board.transition({ duration: 3000 }, 'd1', vprofit2010to2018Full);
  }, 1000);
  /*
  board.preload({ dataUrl: '', data: profit2010to2018Full});*/

};

export default example;
