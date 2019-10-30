import ComboBox from './index.vue';

ComboBox.install = function(Vue) {
  Vue.component(ComboBox.name, ComboBox);
};

export default ComboBox;
