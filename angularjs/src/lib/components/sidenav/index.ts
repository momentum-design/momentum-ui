import * as angular from 'angular';
import {
  sidenavAdminFactory,
  sidenavAdminFooterFactory,
} from './sidenav.admin.component';

export default angular
  .module('momentum.ui.sidenav.admin', [])
  .directive('mdSidenavAdmin', sidenavAdminFactory)
  .directive('mdSidenavAdminFooter', sidenavAdminFooterFactory)
  .name;
