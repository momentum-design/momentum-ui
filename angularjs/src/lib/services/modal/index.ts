import * as angular from 'angular';
import MdMultiMap from '../../services/multimap';
import MdStackedMap from '../../services/stackedmap';
import MdResolve from '../../services/resolve';
import {
  mdModal,
  mdModalBackdrop,
  mdModalWindow,
  mdModalAnimationClass,
  mdModalTransclude,
  mdModalStack,
} from './modal.component';

export default angular.module('momentum.ui.modal', [
  MdMultiMap,
  MdStackedMap,
  MdResolve,
])
  .directive('modalBackdrop', mdModalBackdrop)
  .directive('modalWindow', mdModalWindow)
  .directive('modalAnimationClass', mdModalAnimationClass)
  .directive('modalTransclude', mdModalTransclude)
  .factory('$modalStack', mdModalStack)
  .provider('$modal', mdModal)
  .name;
