import { JSDOM } from 'jsdom';
import MomentumCharts from '../../index.js';

describe('#Area Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumCharts.Board(document.body);
  });

  it('Register Area', function() {
    expect(board.area).toBeTruthy();
  });

});

