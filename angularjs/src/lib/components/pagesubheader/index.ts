import * as angular from 'angular';
import { PageSubHeader } from './pagesubheader.component';
import { PageSubHeaderLeft } from './pagesubheader-left.component';
import { PageSubHeaderRight } from './pagesubheader-right.component';

export default angular
  .module('collab.ui.pagesubheader', [])
  .component('csPageSubHeader', new PageSubHeader())
  .component('csPageSubHeaderLeft', new PageSubHeaderLeft())
  .component('csPageSubHeaderRight', new PageSubHeaderRight())
  .name;
