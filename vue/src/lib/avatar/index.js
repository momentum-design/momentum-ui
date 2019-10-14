import Avatar from './index.vue';

Avatar.install = function(Vue) {
  Vue.component(Avatar.name, Avatar);
};

export default Avatar;
