import * as angular from 'angular';
import { mdCollapse } from './collapse.directive';
import MdTransition from '../../services/transition';

export default angular
  .module('momentum.ui.collapse', [
    MdTransition,
  ])
  .directive('collapse', mdCollapse)
  .name;
