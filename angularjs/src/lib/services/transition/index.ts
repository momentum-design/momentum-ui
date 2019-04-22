import * as angular from 'angular';
import { MdTransition } from './transition.service';

export default angular
  .module('momentum.ui.transition', [])
  .factory('$transition', MdTransition)
  .name;
