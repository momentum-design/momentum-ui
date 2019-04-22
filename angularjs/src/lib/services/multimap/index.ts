import * as angular from 'angular';
import { MdMultiMap } from './multimap.service';

export default angular
  .module('momentum.ui.multimap', [])
  .factory('$$multiMap', MdMultiMap)
  .name;
