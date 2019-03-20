import * as angular from 'angular';
import {
  csSelect,
  csSelectCtrl,
  csSelectSearchable,
  CSSelectService,
} from './select.component';

export default angular
  .module('collab.ui.select', [])
  .directive('csSelect', csSelect)
  .service('CSSelectService', CSSelectService)
  .controller('csSelectCtrl', csSelectCtrl)
  .filter('cssearchable', csSelectSearchable)
  .name;
