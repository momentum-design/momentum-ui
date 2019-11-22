import MomentumCharts from '../../index.js';

describe('#Scale Tests', function() {

  beforeEach(function() {

  });

  it('Register Scale scaleLinear', function() {
    expect(new MomentumCharts.Scale('scaleLinear')).toBeTruthy();
  });

});

