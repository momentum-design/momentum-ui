import * as angular from 'angular';
import { PageSubHeader } from './pagesubheader.component';
import { PageSubHeaderLeft } from './pagesubheader-left.component';
import { PageSubHeaderRight } from './pagesubheader-right.component';

export default angular
  .module('momentum.ui.pagesubheader', [])
  .component('mdPageSubHeader', new PageSubHeader())
  .component('mdPageSubHeaderLeft', new PageSubHeaderLeft())
  .component('mdPageSubHeaderRight', new PageSubHeaderRight())
  .name;
