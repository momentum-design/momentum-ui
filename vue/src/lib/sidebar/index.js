import Sidebar from './index.vue';

Sidebar.install = function(Vue) {
  Vue.component(Sidebar.name, Sidebar);
};

export default Sidebar;
