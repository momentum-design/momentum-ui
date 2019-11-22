import { JSDOM } from 'jsdom';
import MomentumCharts from '../../index.js';

describe('#Line Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumCharts.Board(document.body);
  });

  it('Register Line', function() {
    expect(board.line).toBeTruthy();
  });

});
