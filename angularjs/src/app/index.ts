import './core/polyfills';
import './core/vendor';

import * as angular from 'angular';

import './index.scss';

import { app as appModule } from './app.module';

const bootstrapModuleName = angular.module('application.bootstrap', [
  appModule,
]).name;
