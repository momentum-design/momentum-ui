import MomentumCharts from '../../index.js';

const example = () => {

  MomentumCharts.Plugins.install(MomentumCharts.Board, 'export', function () {
    console.log(this.Svg);
  });

  let board = MomentumCharts.board('#app', {
    attr: {
      width: '1000',
      height: '400',
      viewBox: "0 0 1000 400"
    },
    style: {
      background: 'gray'
    }
  }, [1, 3, 4]);
  board.export();

  MomentumCharts.Plugins.install(MomentumCharts.Board, 'data', function () {
    return 'I am the new data function';
  });
  console.log(board.data());
  console.log(MomentumCharts.Plugins.Storage);

  MomentumCharts.Plugins.uninstall(MomentumCharts.Board, 'data');
  console.log(board.data());
};

export default example;
