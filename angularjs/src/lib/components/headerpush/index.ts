import * as angular from 'angular';
import * as ngAnimate from 'angular-animate';
import {
  mdHeaderPushContainer,
  mdHeaderPushTrigger,
  pushService,
} from './headerpush.component';

export default angular
  .module('momentum.ui.headerPush', [
    ngAnimate || 'ngAnimate',
  ])
  .directive('mdHeaderPushContainer', mdHeaderPushContainer)
  .directive('mdHeaderPushTrigger', mdHeaderPushTrigger)
  .factory('pushService', pushService)
  .name;
