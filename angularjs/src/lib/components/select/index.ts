import * as angular from 'angular';
import {
  mdSelect,
  mdSelectCtrl,
  mdSelectSearchable,
  CSSelectService,
} from './select.component';

export default angular
  .module('momentum.ui.select', [])
  .directive('mdSelect', mdSelect)
  .service('CSSelectService', CSSelectService)
  .controller('mdSelectCtrl', mdSelectCtrl)
  .filter('foobarearchable', mdSelectSearchable)
  .name;
