import MomentumCharts from '../../index.js';

describe('#Colors Tests', function () {
  let colors;

  beforeEach(function () {
    colors = new MomentumCharts.Colors();
  });

  it('Register Colors', function () {
    expect(colors).toBeTruthy();
  });

});

