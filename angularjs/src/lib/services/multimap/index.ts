import * as angular from 'angular';
import { CsMultiMap } from './multimap.service';

export default angular
  .module('collab.ui.multimap', [])
  .factory('$$multiMap', CsMultiMap)
  .name;
