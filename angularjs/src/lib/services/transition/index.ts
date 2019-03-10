import * as angular from 'angular';
import { CsTransition } from './transition.service';

export default angular
  .module('collab.ui.transition', [])
  .factory('$transition', CsTransition)
  .name;
