import * as angular from 'angular';
import { PhoneNumberComponent } from './phoneNumber.component';
import DropdownModule from '../../services/dropdown';

export default angular.module('momentum.ui.phonenumber', [
  DropdownModule,
])
  .component('mdPhoneNumber', new PhoneNumberComponent())
  .name;
