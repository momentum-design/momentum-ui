import List from './index.vue';

List.install = function(Vue) {
  Vue.component(List.name, List);
};

export default List;
