import * as angular from 'angular';
import {
  mdTab,
  mdTabset,
  mdTabsetCtrl,
  mdTabHeadingTransclude,
  mdTabContentTransclude,
} from './largetabs.component';

export default angular
  .module('momentum.ui.largetabs', [])
  .controller('mdTabsetCtrl', mdTabsetCtrl)
  .directive('mdTabset', mdTabset)
  .directive('mdTab', mdTab)
  .directive('mdTabHeadingTransclude', mdTabHeadingTransclude)
  .directive('mdTabContentTransclude', mdTabContentTransclude)
  .name;
