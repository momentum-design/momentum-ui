import * as angular from 'angular';
import { MdStackedMap } from './stackedmap.service';

export default angular
  .module('momentum.ui.stackedmap', [])
  .factory('$$stackedMap', MdStackedMap)
  .name;
