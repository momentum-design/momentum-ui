import SidebarNavItem from './index.vue';

SidebarNavItem.install = function(Vue) {
  Vue.component(SidebarNavItem.name, SidebarNavItem);
};

export default SidebarNavItem;
