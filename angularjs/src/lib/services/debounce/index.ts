import * as angular from 'angular';
import { $$debounce } from './debounce.service';

export default angular.module('momentum.ui.debounce', [])
.factory('$$debounce', $$debounce)
  .name;
