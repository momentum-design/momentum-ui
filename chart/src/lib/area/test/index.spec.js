import { JSDOM } from 'jsdom';
import MomentumChart from '../../index.js';

describe('#Area Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumChart.Board(document.body);
  });

  it('Register Area', function() {
    expect(board.area).toBeTruthy();
  });

});

