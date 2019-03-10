import * as angular from 'angular';
import { csSetupAssistant } from './setupassistant.component';

export default angular
    .module('collab.ui.setupassistant', [])
    .directive('csSetupAssistant', csSetupAssistant)
    .name;
