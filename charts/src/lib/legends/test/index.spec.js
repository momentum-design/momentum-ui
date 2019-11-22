import { JSDOM } from 'jsdom';
import MomentumCharts from '../../index.js';

describe('#Legends Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumCharts.Board(document.body);
  });

  it('Register Legends', function() {
    expect(board.legends).toBeTruthy();
  });

});

