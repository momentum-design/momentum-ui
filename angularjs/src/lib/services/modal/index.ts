import * as angular from 'angular';
import CsMultiMap from '../../services/multimap';
import CsStackedMap from '../../services/stackedmap';
import CsResolve from '../../services/resolve';
import {
  csModal,
  csModalBackdrop,
  csModalWindow,
  csModalAnimationClass,
  csModalTransclude,
  csModalStack,
} from './modal.component';

export default angular.module('collab.ui.modal', [
  CsMultiMap,
  CsStackedMap,
  CsResolve,
])
  .directive('modalBackdrop', csModalBackdrop)
  .directive('modalWindow', csModalWindow)
  .directive('modalAnimationClass', csModalAnimationClass)
  .directive('modalTransclude', csModalTransclude)
  .factory('$modalStack', csModalStack)
  .provider('$modal', csModal)
  .name;
