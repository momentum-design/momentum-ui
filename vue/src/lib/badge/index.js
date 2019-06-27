import Badge from './badge';

Badge.install = function(Vue) {
  Vue.component(Badge.name, Badge);
};

export default Badge;
