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
  .module('momentum.ui.cards', [])
  .directive('mdCard', Card.factory)
  .controller('mdCardCtrl', CardCtrl)
  .directive('mdCardMenu', CardMenu.factory)
  .controller('mdCardMenuCtrl', CardMenuCtrl)
  .directive('mdCardMenuFooter', CardMenuFooter.factory)
  .controller('mdCardMenuFooterCtrl', CardMenuFooterCtrl)
  .directive('mdCardLayout', CardLayout.factory)
  .name;
