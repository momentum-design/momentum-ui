import { JSDOM } from 'jsdom';
import MomentumChart from '../../index.js';

describe('#Line Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumChart.Board(document.body);
  });

  it('Register Line', function() {
    expect(board.line).toBeTruthy();
  });

});
