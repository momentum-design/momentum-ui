import * as angular from 'angular';
import { CardNumberComponent } from './cardnumber.component';

export default angular
  .module('momentum.ui.card-number', [])
  .component('mdCardNumber', new CardNumberComponent())
  .name;
