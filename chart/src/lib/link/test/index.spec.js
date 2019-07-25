import { JSDOM } from 'jsdom';
import MomentumChart from '../../index.js';

describe('#Link Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumChart.Board(document.body);
  });

  it('Register Link', function() {
    expect(board._shapeList.link).toBeTruthy();
  });

});

