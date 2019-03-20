import * as angular from 'angular';
import { csCollapse } from './collapse.directive';
import CsTransition from '../../services/transition';

export default angular
  .module('collab.ui.collapse', [
    CsTransition,
  ])
  .directive('collapse', csCollapse)
  .name;
