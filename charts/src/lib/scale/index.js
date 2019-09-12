import * as d3 from "d3";
import core from '../utils/core';
class Scale {

  static smooth(fromScale, toScale) {
    let fDomain = fromScale.domain(),
      d = [],
      r = [];
    let i, l;
    for (i = 0, l = fDomain.length; i < l; i++) {
      d.push(fDomain[i]);
      r.push(toScale(fDomain[i]));
    }
    toScale.domain(d);
    toScale.range(r);
    return toScale;
  }

  static ticks(scale, count) {
    let domain = scale.domain();
    return d3.ticks(domain[0], domain[domain.length - 1], count || 10);
  }

  static breakTicks(scale, _tickNums, _tickTotal) {
    let domain = scale.domain(),
      tickTotal = typeof _tickTotal === 'number' ? _tickTotal : 10,
      tickNums = typeof _tickNums === 'object' ? _tickNums : { 0: '', 2: '' };

    let lens = {},
      i = 0,
      sum = 0,
      s,
      l = domain.length - 1,
      tickets = [];

    let needCount = false;
    for (let n in tickNums) {
      if (typeof tickNums[n] !== 'number') {
        needCount = true;
        break;
      }
    }
    if (needCount) {
      for (i = 0; i < l; i++) {
        if (tickNums[i] !== undefined) {
          s = domain[i + 1] - domain[i];
          lens[i] = s;
          sum += s;
        }
      }
      let _step = d3.tickStep(domain[0], domain[0] + sum, tickTotal + l);
      for (let m in lens) {
        tickets = tickets.concat(d3.ticks(domain[+m], domain[+m + 1], Math.ceil(Math.abs(lens[m] / _step))));
      }
    }
    return tickets;
  }

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

