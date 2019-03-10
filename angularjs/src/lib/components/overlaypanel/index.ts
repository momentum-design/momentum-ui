import * as angular from 'angular';
import { OverlayPanel } from './overlaypanel.component';

export default angular
  .module('collab.ui.overlayPanel', ['ngAnimate'])
  .component('csOverlayPanel', new OverlayPanel())
  .name;
