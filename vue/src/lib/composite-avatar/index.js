import CompositeAvatar from './index.vue';

CompositeAvatar.install = function(Vue) {
  Vue.component(CompositeAvatar.name, CompositeAvatar);
};

export default CompositeAvatar;
