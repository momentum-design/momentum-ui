import * as angular from 'angular';
import {
  tab,
  tabset,
  TabsetController,
  tabHeadingTransclude,
  tabContentTransclude,
} from './tabs.component';

export default angular.module('collab.ui.tabs', [])
  .controller('TabsetController', TabsetController)
  .directive('tabset', tabset)
  .directive('tab', tab)
  .directive('tabHeadingTransclude', tabHeadingTransclude)
  .directive('tabContentTransclude', tabContentTransclude)
  .name;
