import * as angular from 'angular';
import {
  Card,
  CardCtrl,
  CardMenu,
  CardMenuCtrl,
  CardMenuFooter,
  CardMenuFooterCtrl,
  CardLayout,
} from './card.component';

export default angular
  .module('collab.ui.cards', [])
  .directive('csCard', Card.factory)
  .controller('csCardCtrl', CardCtrl)
  .directive('csCardMenu', CardMenu.factory)
  .controller('csCardMenuCtrl', CardMenuCtrl)
  .directive('csCardMenuFooter', CardMenuFooter.factory)
  .controller('csCardMenuFooterCtrl', CardMenuFooterCtrl)
  .directive('csCardLayout', CardLayout.factory)
  .name;
