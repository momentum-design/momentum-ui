import MomentumChart from '../../index.js';

describe('#Colors Tests', function () {
  let colors;

  beforeEach(function () {
    colors = new MomentumChart.Colors();
  });

  it('Register Colors', function () {
    expect(colors).toBeTruthy();
  });

});

