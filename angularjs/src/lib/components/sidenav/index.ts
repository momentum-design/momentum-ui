import * as angular from 'angular';
import {
  SidenavAdmin,
  SidenavAdminFooter,
} from './sidenav.admin.component';

export default angular
  .module('momentum.ui.sidenav.admin', [])
  .directive('mdSidenavAdmin', SidenavAdmin.factory)
  .directive('mdSidenavAdminFooter', SidenavAdminFooter.factory)
  .name;
