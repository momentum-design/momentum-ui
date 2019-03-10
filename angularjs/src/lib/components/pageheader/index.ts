import * as angular from 'angular';
import { PageHeader } from './pageheader.component';

export default angular
  .module('collab.ui.pageheader', [])
  .component('csPageHeader', new PageHeader())
  .name;
