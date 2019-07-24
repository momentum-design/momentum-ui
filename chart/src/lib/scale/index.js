import * as d3 from "d3";
import core from '../core/index';

class Scale {

  constructor (name, config) {
    if (this.types[name]) {
      this.Name = name;
      this.Scale = d3[name]();
      this.Config = Object.assign({}, this.defaultConfig, config);
      this.applyConfig();
    }
  }

  applyConfig() {
    core.callInner(this.Scale, this.Config);
  }

}
Scale.prototype.types = {
  scaleLinear: 'scaleLinear',
  scalePow: 'scalePow',
  scaleSqrt: 'scaleSqrt',
  scaleSymlog: 'scaleLog',
  scaleIdentity: 'scalePow',
  scaleTime: 'scalePow',
  scaleUtc: 'scalePow',
  scaleSequential: 'scaleSequential',
  scaleSequentialLog: 'scaleSequentialLog',
  scaleSequentialPow: 'scaleSequentialPow',
  scaleSequentialSqrt: 'scaleSequentialSqrt',
  scaleSequentialSymlog: 'scaleSequentialSymlog',
  scaleSequentialQuantile: 'scaleSequentialQuantile',
  scaleDiverging: 'scaleDiverging',
  scaleDivergingLog: 'scaleDivergingLog',
  scaleDivergingPow: 'scaleDivergingPow',
  scaleDivergingSqrt: 'scaleDivergingSqrt',
  scaleDivergingSymlog: 'scaleDivergingSymlog',
  scaleQuantize: 'scaleQuantize',
  scaleQuantile: 'scaleQuantile',
  scaleThreshold: 'scaleThreshold',
  scaleOrdinal: 'scaleOrdinal',
  scaleImplicit: 'scaleImplicit',
  scaleBand: 'scaleBand',
  scalePoint: 'scalePoint'
};
Scale.prototype.defaultConfig = {

};

export default Scale;

