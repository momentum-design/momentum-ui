import * as angular from 'angular';
import { CardNumberComponent } from './cardnumber.component';

export default angular
  .module('collab.ui.card-number', [])
  .component('csCardNumber', new CardNumberComponent())
  .name;
