import TopbarNav from './index.vue';

TopbarNav.install = function(Vue) {
  Vue.component(TopbarNav.name, TopbarNav);
};

export default TopbarNav;
