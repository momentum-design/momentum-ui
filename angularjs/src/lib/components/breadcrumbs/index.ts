import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import { mdBreadcrumbs } from './breadcrumbs.component';

export default angular
  .module('momentum.ui.breadcrumbs', [
    uiRouter || 'ui.router',
  ])
  .directive('mdBreadcrumbs', mdBreadcrumbs)
    .name;
