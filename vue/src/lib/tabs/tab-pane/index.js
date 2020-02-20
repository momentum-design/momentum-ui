import TabPane from './index.vue';

TabPane.install = function(Vue) {
  Vue.component(TabPane.name, TabPane);
};

export default TabPane;
