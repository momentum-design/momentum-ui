import * as angular from 'angular';
import { $position } from './position.service';

export default angular
  .module('collab.ui.position', [])
  .factory('$position', $position)
  .name;
