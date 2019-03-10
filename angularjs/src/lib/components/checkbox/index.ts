import * as angular from 'angular';
import { CheckboxComponent } from './checkbox.component';

export default angular
  .module('collab.ui.checkbox', [])
  .component('csCheckbox', new CheckboxComponent())
  .name;
