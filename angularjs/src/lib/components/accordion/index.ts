import * as angular from 'angular';
import { csAccordion } from './accordion.directive';
import { csAccordionGroup } from './accordionGroup.directive';
import { csAccordionHeading } from './accordionHeading.directive';
import { csAccordionTransclude } from './accordionTransclude.directive';
import csCollapse from '../../directives/collapse';

export default angular
  .module('collab.ui.accordion', [
    csCollapse,
  ])
  .constant('csAccordionConfig', {
    closeOthers: true,
  })
  .directive('csAccordion', csAccordion)
  .directive('csAccordionGroup', csAccordionGroup)
  .directive('csAccordionHeading', csAccordionHeading)
  .directive('csAccordionTransclude', csAccordionTransclude)
  .name;
