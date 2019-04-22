import * as angular from 'angular';
import { CardMemberComponent } from './cardmember.component';

export default angular
  .module('momentum.ui.card-member', [])
  .component('mdCardMember', new CardMemberComponent())
  .name;
