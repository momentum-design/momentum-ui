import * as angular from 'angular';
import { CheckboxComponent } from './checkbox.component';

export default angular
  .module('momentum.ui.checkbox', [])
  .component('mdCheckbox', new CheckboxComponent())
  .name;
