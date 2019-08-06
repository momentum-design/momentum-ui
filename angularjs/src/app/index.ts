import './core/polyfills';
import './core/vendor';

import * as angular from 'angular';

import './index.scss';

import { moduleName as appModule } from './app.module';

const bootstrapModuleName = angular.module('application.bootstrap', [
  appModule,
]).name;
