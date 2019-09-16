import MomentumChart from '../../index.js';

describe('#Scale Tests', function() {

  beforeEach(function() {

  });

  it('Register Scale scaleLinear', function() {
    expect(new MomentumChart.Scale('scaleLinear')).toBeTruthy();
  });

});

