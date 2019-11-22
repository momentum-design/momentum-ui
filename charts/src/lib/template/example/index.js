import MomentumCharts from '../../index.js';
const profit2010to2018 = [{ year: 2000, profit: 10 },
  { year: 2001, profit: 12 },
  { year: 2002, profit: 15 },
  { year: 2003, profit: 20 },
  { year: 2004, profit: 30 },
  { year: 2005, profit: 32 },
  { year: 2006, profit: 40 },
  { year: 2007, profit: 60 },
  { year: 2008, profit: 80 },
  { year: 2009, profit: 100 },
  { year: 2010, profit: 120 },
  { year: 2011, profit: 102 },
  { year: 2012, profit: 130 },
  { year: 2013, profit: 130 },
  { year: 2014, profit: 150 },
  { year: 2015, profit: 160 },
  { year: 2016, profit: 200 },
  { year: 2017, profit: 180 },
  { year: 2018, profit: 210 }];

const example = () => {
  let board = new MomentumCharts.Board('#app', {
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
