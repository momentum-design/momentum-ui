import * as angular from 'angular';
import { BadgeComponent } from './badge.component';

export default angular
  .module('collab.ui.badge', [])
  .component('csBadge', new BadgeComponent())
  .name;
