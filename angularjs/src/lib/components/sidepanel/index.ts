import * as angular from 'angular';
import {
  CsSidePanelCtrl,
  csSidepanel,
  csSpHeader,
  csSpContainer,
  csSpSection,
  csSpButtons,
} from './sidepanel.component';

export default angular
  .module('collab.ui.sidepanel', [])
  .controller('CsSidePanelCtrl', CsSidePanelCtrl)
  .directive('csSidepanel', csSidepanel)
  .directive('csSpHeader', csSpHeader)
  .directive('csSpContainer', csSpContainer)
  .directive('csSpSection', csSpSection)
  .directive('csSpButtons', csSpButtons)
  .name;
