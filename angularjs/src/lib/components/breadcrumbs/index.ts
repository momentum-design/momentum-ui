import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import { csBreadcrumbs } from './breadcrumbs.component';

export default angular
  .module('collab.ui.breadcrumbs', [
    uiRouter || 'ui.router',
  ])
  .directive('csBreadcrumbs', csBreadcrumbs)
    .name;
