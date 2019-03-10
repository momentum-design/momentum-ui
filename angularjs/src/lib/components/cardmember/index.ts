import * as angular from 'angular';
import { CardMemberComponent } from './cardmember.component';

export default angular
  .module('collab.ui.card-member', [])
  .component('csCardMember', new CardMemberComponent())
  .name;
