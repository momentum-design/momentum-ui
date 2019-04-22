import * as angular from 'angular';
import { MdResolve } from './resolve.service';

export default angular
  .module('momentum.ui.resolve', [])
  .provider('$mdResolve', MdResolve)
  .name;
