import * as angular from 'angular';
import {
  MdSidePanelCtrl,
  mdSidepanel,
  mdSpHeader,
  mdSpContainer,
  mdSpSection,
  mdSpButtons,
} from './sidepanel.component';

export default angular
  .module('momentum.ui.sidepanel', [])
  .controller('MdSidePanelCtrl', MdSidePanelCtrl)
  .directive('mdSidepanel', mdSidepanel)
  .directive('mdSpHeader', mdSpHeader)
  .directive('mdSpContainer', mdSpContainer)
  .directive('mdSpSection', mdSpSection)
  .directive('mdSpButtons', mdSpButtons)
  .name;
