import SidebarNav from './index.vue';

SidebarNav.install = function(Vue) {
  Vue.component(SidebarNav.name, SidebarNav);
};

export default SidebarNav;
