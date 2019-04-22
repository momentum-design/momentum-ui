import * as angular from 'angular';
import { mdSetupAssistant } from './setupassistant.component';

export default angular
    .module('momentum.ui.setupassistant', [])
    .directive('mdSetupAssistant', mdSetupAssistant)
    .name;
