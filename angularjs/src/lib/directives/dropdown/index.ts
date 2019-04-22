import * as angular from 'angular';
import MdPosition from '../../services/position';
import {
  mdDropdown,
  mdDropdownService,
  mdDropdownToggle,
  mdDropdownMenu,
} from './dropdown.directive';

export default angular
  .module('momentum.ui.dropdown', [
    MdPosition,
  ])
  .constant('mdDropdownConfig', {
    appendToOpenClass: 'md-dropdown-open',
    openClass: 'open',
  })
  .service('mdDropdownService', mdDropdownService)
  .directive('mdDropdown', mdDropdown)
  .directive('mdDropdownToggle', mdDropdownToggle)
  .directive('mdDropdownMenu', mdDropdownMenu)
  .name;
