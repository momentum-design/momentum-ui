import { JSDOM } from 'jsdom';
import MomentumChart from '../../index.js';

describe('#Rect Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumChart.Board(document.body);
  });

  it('Register Rect', function() {
    expect(board.rect).toBeTruthy();
  });

});

