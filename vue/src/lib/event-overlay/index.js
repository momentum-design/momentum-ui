import EventOverlay from './index.vue';

EventOverlay.install = function(Vue) {
  Vue.component(EventOverlay.name, EventOverlay);
};

export default EventOverlay;
