import ListItemHeader from './index.vue';

ListItemHeader.install = function(Vue) {
  Vue.component(ListItemHeader.name, ListItemHeader);
};

export default ListItemHeader;
