import * as angular from 'angular';
import * as ngAnimate from 'angular-animate';
import {
  csHeaderPushContainer,
  csHeaderPushTrigger,
  pushService,
} from './headerpush.component';

export default angular
  .module('collab.ui.headerPush', [
    ngAnimate || 'ngAnimate',
  ])
  .directive('csHeaderPushContainer', csHeaderPushContainer)
  .directive('csHeaderPushTrigger', csHeaderPushTrigger)
  .factory('pushService', pushService)
  .name;
