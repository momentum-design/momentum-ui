import * as angular from 'angular';
import {
  mdSelect,
  mdSelectCtrl,
  mdSelectSearchable,
  MdSelectService,
} from './select.component';

export default angular
  .module('momentum.ui.select', [])
  .directive('mdSelect', mdSelect)
  .service('MdSelectService', MdSelectService)
  .controller('mdSelectCtrl', mdSelectCtrl)
  .filter('mdsearchable', mdSelectSearchable)
  .name;
