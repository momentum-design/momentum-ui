import * as angular from 'angular';

// Import all directives
import csBindHtmlUnsafe from './bindHtmlUnsafe';
import csBreakpoint from './breakpoint';
import csBtn from './buttons';
import csCollapse from './collapse';
import csDropdown from './dropdown';
import csErrorPopover from './errorpopover';
import csExpandinginput from './expandinginput';
import csInput from './input';
import csLoader from './loader';
import csPopover from './popover';
import csSticky from './sticky';
import csTimepicker from './timepicker';
import csTooltip from './tooltip';
import csTypeahead from './typeahead';
import csWindowsize from './typeahead';

// Export all directives
export * from './bindHtmlUnsafe';
export * from './breakpoint';
export * from './buttons';
export * from './collapse';
export * from './dropdown';
export * from './errorpopover';
export * from './expandinginput';
export * from './input';
export * from './loader';
export * from './popover';
export * from './sticky';
export * from './timepicker';
export * from './tooltip';
export * from './typeahead';
export * from './typeahead';

// Export convenience property

export default angular
  .module('md.directives', [
    csBindHtmlUnsafe,
    csBreakpoint,
    csBtn,
    csCollapse,
    csDropdown,
    csErrorPopover,
    csExpandinginput,
    csInput,
    csLoader,
    csPopover,
    csSticky,
    csTimepicker,
    csTooltip,
    csTypeahead,
    csWindowsize,
  ])
  .name;
