import * as angular from 'angular';

import { default as CUI_DIRECTIVES } from './directives';
import { default as CUI_COMPONENTS } from './components';
import { default as CUI_SERVICES } from './services';

export * from './directives';
export * from './components';
export * from './services';

export default angular
  .module('momentum.ui', [
    CUI_DIRECTIVES,
    CUI_COMPONENTS,
    CUI_SERVICES,
  ])
  .name;
