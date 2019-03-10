import * as angular from 'angular';
import { CsStackedMap } from './stackedmap.service';

export default angular
  .module('collab.ui.stackedmap', [])
  .factory('$$stackedMap', CsStackedMap)
  .name;
