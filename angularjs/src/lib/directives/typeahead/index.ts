import * as angular from 'angular';
import {
  typeahead,
  typeaheadParser,
  typeaheadPopup,
  typeaheadMatch,
  typeaheadHighlight,
  CsTypeaheadController,
} from './typeahead.directive';
import CsPosition from '../../services/position';
import csBindHtmlUnsafe from '../bindHtmlUnsafe';
import CsDebounce from '../../services/debounce';

export default angular.module('collab.ui.typeahead', [
  CsPosition,
  csBindHtmlUnsafe,
  CsDebounce,
])
  .factory('typeaheadParser', typeaheadParser)
  .controller('CsTypeaheadController', CsTypeaheadController)
  .directive('typeahead', typeahead)
  .directive('typeaheadPopup', typeaheadPopup)
  .directive('typeaheadMatch', typeaheadMatch)
  .filter('typeaheadHighlight', typeaheadHighlight)
  .name;
