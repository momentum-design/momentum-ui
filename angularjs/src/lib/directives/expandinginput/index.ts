import * as angular from 'angular';
import {
  csExpandinginput,
  csExpandinginputCtrl,
} from './expandinginput.directive';

export default angular
  .module('collab.ui.expandinginput', [])
  .directive('csExpandinginput', csExpandinginput)
  .controller('csExpandinginputCtrl', csExpandinginputCtrl)
  .name;
