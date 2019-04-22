import * as angular from 'angular';
import { OverlayPanel } from './overlaypanel.component';

export default angular
  .module('momentum.ui.overlayPanel', ['ngAnimate'])
  .component('mdOverlayPanel', new OverlayPanel())
  .name;
