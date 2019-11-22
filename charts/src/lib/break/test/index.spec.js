import { JSDOM } from 'jsdom';
import MomentumCharts from '../../index.js';

describe('#Break Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumCharts.Board(document.body);
  });

  it('Register Break', function() {
    expect(board.break).toBeTruthy();
  });

});

