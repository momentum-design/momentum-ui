import SidebarHeader from './index.vue';

SidebarHeader.install = function(Vue) {
  Vue.component(SidebarHeader.name, SidebarHeader);
};

export default SidebarHeader;
