import { JSDOM } from 'jsdom';
import MomentumCharts from '../../index.js';

describe('#Axis Tests', function () {
  let board,
    axis;
  const { document } = (new JSDOM('')).window;
  let scaleX = new MomentumCharts.Scale('scaleLinear', {
    range: [100, 900],
    domain: [2000, 2020]
  }).Scale;

  beforeEach(function () {
    board = new MomentumCharts.Board(document.body);
    axis = board.axis('axisBottom', {
      generator: {
        scale: scaleX,
        ticks: 20,
        y: 350
      }
    });
  });

  it('Register Axis', function () {
    expect(axis).toBeTruthy();
  });

});

