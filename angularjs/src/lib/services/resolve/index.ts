import * as angular from 'angular';
import { CsResolve } from './resolve.service';

export default angular
  .module('collab.ui.resolve', [])
  .provider('$csResolve', CsResolve)
  .name;
