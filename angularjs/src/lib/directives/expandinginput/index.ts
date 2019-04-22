import * as angular from 'angular';
import {
  mdExpandinginput,
  mdExpandinginputCtrl,
} from './expandinginput.directive';

export default angular
  .module('momentum.ui.expandinginput', [])
  .directive('mdExpandinginput', mdExpandinginput)
  .controller('mdExpandinginputCtrl', mdExpandinginputCtrl)
  .name;
