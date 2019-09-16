import * as d3 from "d3";

const Math = {};
const merge = function () {
  let name;
  for (let i = 0, l = arguments.length; i < l; i++) {
    name = arguments[i];
    Math[name] = d3[name];
  }
};
merge('min', 'max', 'extent', 'sum', 'mean', 'median', 'quantile', 'variance', 'deviation');

export default Math;

