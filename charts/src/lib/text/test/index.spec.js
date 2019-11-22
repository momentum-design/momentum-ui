import { JSDOM } from 'jsdom';
import MomentumCharts from '../../index.js';

describe('#Text Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumCharts.Board(document.body);
  });

  it('Register Text', function() {
    expect(board.text).toBeTruthy();
  });

});

