import * as angular from 'angular';
import { PageHeader } from './pageheader.component';

export default angular
  .module('momentum.ui.pageheader', [])
  .component('mdPageHeader', new PageHeader())
  .name;
