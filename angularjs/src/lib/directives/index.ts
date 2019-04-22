import * as angular from 'angular';

// Import all directives
import mdBindHtmlUnsafe from './bindHtmlUnsafe';
import mdBreakpoint from './breakpoint';
import mdBtn from './buttons';
import mdCollapse from './collapse';
import mdDropdown from './dropdown';
import mdErrorPopover from './errorpopover';
import mdExpandinginput from './expandinginput';
import mdInput from './input';
import mdLoader from './loader';
import mdPopover from './popover';
import mdSticky from './sticky';
import mdTimepicker from './timepicker';
import mdTooltip from './tooltip';
import mdTypeahead from './typeahead';
import mdWindowsize from './typeahead';

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
    mdBindHtmlUnsafe,
    mdBreakpoint,
    mdBtn,
    mdCollapse,
    mdDropdown,
    mdErrorPopover,
    mdExpandinginput,
    mdInput,
    mdLoader,
    mdPopover,
    mdSticky,
    mdTimepicker,
    mdTooltip,
    mdTypeahead,
    mdWindowsize,
  ])
  .name;
