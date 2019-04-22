import * as angular from 'angular';
import {
  typeahead,
  typeaheadParser,
  typeaheadPopup,
  typeaheadMatch,
  typeaheadHighlight,
  MdTypeaheadController,
} from './typeahead.directive';
import MdPosition from '../../services/position';
import mdBindHtmlUnsafe from '../bindHtmlUnsafe';
import MdDebounce from '../../services/debounce';

export default angular.module('momentum.ui.typeahead', [
  MdPosition,
  mdBindHtmlUnsafe,
  MdDebounce,
])
  .factory('typeaheadParser', typeaheadParser)
  .controller('MdTypeaheadController', MdTypeaheadController)
  .directive('typeahead', typeahead)
  .directive('typeaheadPopup', typeaheadPopup)
  .directive('typeaheadMatch', typeaheadMatch)
  .filter('typeaheadHighlight', typeaheadHighlight)
  .name;
