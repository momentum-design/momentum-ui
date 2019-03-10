import * as angular from 'angular';
import { PhoneNumberComponent } from './phoneNumber.component';
import DropdownModule from '../../services/dropdown';

export default angular.module('collab.ui.phonenumber', [
  DropdownModule,
])
  .component('csPhoneNumber', new PhoneNumberComponent())
  .name;
