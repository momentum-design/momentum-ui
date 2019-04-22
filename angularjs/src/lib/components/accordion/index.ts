import * as angular from 'angular';
import { mdAccordion } from './accordion.directive';
import { mdAccordionGroup } from './accordionGroup.directive';
import { mdAccordionHeading } from './accordionHeading.directive';
import { mdAccordionTransclude } from './accordionTransclude.directive';
import mdCollapse from '../../directives/collapse';

export default angular
  .module('momentum.ui.accordion', [
    mdCollapse,
  ])
  .constant('mdAccordionConfig', {
    closeOthers: true,
  })
  .directive('mdAccordion', mdAccordion)
  .directive('mdAccordionGroup', mdAccordionGroup)
  .directive('mdAccordionHeading', mdAccordionHeading)
  .directive('mdAccordionTransclude', mdAccordionTransclude)
  .name;
