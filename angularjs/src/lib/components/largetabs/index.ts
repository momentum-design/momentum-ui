import * as angular from 'angular';
import {
  csTab,
  csTabset,
  csTabsetCtrl,
  csTabHeadingTransclude,
  csTabContentTransclude,
} from './largetabs.component';

export default angular
  .module('collab.ui.largetabs', [])
  .controller('csTabsetCtrl', csTabsetCtrl)
  .directive('csTabset', csTabset)
  .directive('csTab', csTab)
  .directive('csTabHeadingTransclude', csTabHeadingTransclude)
  .directive('csTabContentTransclude', csTabContentTransclude)
  .name;
