import Topbar from './index.vue';

Topbar.install = function(Vue) {
  Vue.component(Topbar.name, Topbar);
};

export default Topbar;
