import * as angular from 'angular';
import { SearchFilter } from './searchfilter.component';

export default angular
  .module('momentum.ui.searchfilter', [])
  .component('mdSearchfilter', new SearchFilter())
  .name;
