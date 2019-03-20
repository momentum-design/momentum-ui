import * as angular from 'angular';
import { SearchFilter } from './searchfilter.component';

export default angular
  .module('collab.ui.searchfilter', [])
  .component('csSearchfilter', new SearchFilter())
  .name;
