import Sample from './sample';

Sample.install = function(Vue) {
  Vue.component(Sample.name, Sample);
};

export default Sample;
