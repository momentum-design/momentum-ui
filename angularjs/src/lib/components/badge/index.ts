import * as angular from 'angular';
import { BadgeComponent } from './badge.component';

export default angular
  .module('momentum.ui.badge', [])
  .component('mdBadge', new BadgeComponent())
  .name;
