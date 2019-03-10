import * as angular from 'angular';
import {
  SidenavAdmin,
  SidenavAdminFooter,
} from './sidenav.admin.component';

export default angular
  .module('collab.ui.sidenav.admin', [])
  .directive('cuiSidenavAdmin', SidenavAdmin.factory)
  .directive('cuiSidenavAdminFooter', SidenavAdminFooter.factory)
  .name;
