import MomentumCharts from '../../index.js';
const example = () => {
  const scaleX = MomentumCharts.scale('scaleLinear', {
    domain: [0, 4],
    range: [200, 600]
  }).Scale;
  const scaleY = MomentumCharts.scale('scaleLinear', {
    domain: [0, 80],
    range: [350, 50]
  }).Scale;

  const boardData = {
    shape: {
      d1: [10, 25, 55, 65, 40],
      d2: [15, 30, 35, 55, 60],
      d3: [10, 20, 25, 45, 40],
      d4: [5, 10, 15, 25, 30]
    },
    legends: ['Cisco Webex Teams', 'Cisco Webex Meetings', 'Cisco Jabber', 'Device']
  };

  let board = MomentumCharts.board('#app', {
    attr: {
      width: '800',
      height: '400',
      viewBox: "0 0 800 400"
    }
  });

  board.data(boardData);

  board.axis('x', {
    generator: {
      scale: scaleX,
      y: scaleY.range()[0],
      range: [100, 700],
      tickSize: 0
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

  board.render();

};

export default example;
