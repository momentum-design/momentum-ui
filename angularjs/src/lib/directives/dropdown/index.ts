import * as angular from 'angular';
import CsPosition from '../../services/position';
import {
  csDropdown,
  csDropdownService,
  csDropdownToggle,
  csDropdownMenu,
} from './dropdown.directive';

export default angular
  .module('collab.ui.dropdown', [
    CsPosition,
  ])
  .constant('csDropdownConfig', {
    appendToOpenClass: 'cui-dropdown-open',
    openClass: 'open',
  })
  .service('csDropdownService', csDropdownService)
  .directive('csDropdown', csDropdown)
  .directive('csDropdownToggle', csDropdownToggle)
  .directive('csDropdownMenu', csDropdownMenu)
  .name;
