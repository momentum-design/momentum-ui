import ListItem from './index.vue';

ListItem.install = function(Vue) {
  Vue.component(ListItem.name, ListItem);
};

export default ListItem;
