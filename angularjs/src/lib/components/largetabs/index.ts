import * as angular from 'angular';
import {
  mdLargeTab,
  mdLargeTabset,
  mdLargeTabsetCtrl,
  mdLargeTabHeadingTransclude,
  mdLargeTabContentTransclude,
} from './largetabs.component';

export default angular
  .module('momentum.ui.largetabs', [])
  .controller('mdLargeTabsetCtrl', mdLargeTabsetCtrl)
  .directive('mdLargeTabset', mdLargeTabset)
  .directive('mdLargeTab', mdLargeTab)
  .directive('mdLargeTabHeadingTransclude', mdLargeTabHeadingTransclude)
  .directive('mdLargeTabContentTransclude', mdLargeTabContentTransclude)
  .name;
