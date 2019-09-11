import { JSDOM } from 'jsdom';
import MomentumChart from '../../index.js';

describe('#Break Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumChart.Board(document.body);
  });

  it('Register Break', function() {
    expect(board.break).toBeTruthy();
  });

});

