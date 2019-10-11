import Card from './index.vue';

Card.install = function(Vue) {
  Vue.component(Card.name, Card);
};

export default Card;
