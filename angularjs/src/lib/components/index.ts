import * as angular from 'angular';
// Import all components
import mdAccordion from './accordion';
import mdAlertBanner from './alertbanner';
import mdBadge from './badge';
import mdBreadcrumbs from './breadcrumbs';
import mdCardMember from './cardmember';
import mdCardNumber from './cardnumber';
import mdCard from './cards';
import mdCheckbox from './checkbox';
import mdDatepicker from './datepicker';
import mdHeader from './header';
import mdHeaderPush from './headerpush';
import mdTabs from './largetabs';
import mdLeftNav from './leftnav';
import mdOverlayPanel from './overlaypanel';
import mdPageHeader from './pageheader';
import mdPageSubHeader from './pagesubheader';
import mdPhoneNumber from './phoneNumber';
import mdProgressbar from './progressbar';
import mdRadio from './radio';
import mdRadiolist from './radiolist';
import mdSearchfilter from './searchfilter';
import mdSelect from './select';
import mdSetupAssistant from './setupassistant';
import mdSidenavAdmin from './sidenav';
import mdSidepanel from './sidepanel';
import mdSlider from './slider';
import mdSpinner from './spinner';
import mdTabs from './tabs';
import mdToggleSwitch from './toggleswitch';
import mdTokenField from './tokenfield';
import mdTopBar from './topbar';
import mdTopNav from './topnav';

// Export all components
export * from './accordion';
export * from './alertbanner';
export * from './badge';
export * from './breadcrumbs';
export * from './cardmember';
export * from './cardnumber';
export * from './cards';
export * from './checkbox';
export * from './datepicker';
export * from './header';
export * from './headerpush';
export * from './largetabs';
export * from './leftnav';
export * from './overlaypanel';
export * from './pageheader';
export * from './pagesubheader';
export * from './phoneNumber';
export * from './progressbar';
export * from './radio';
export * from './radiolist';
export * from './searchfilter';
export * from './select';
export * from './setupassistant';
export * from './sidenav';
export * from './sidepanel';
export * from './slider';
export * from './spinner';
export * from './tabs';
export * from './toggleswitch';
export * from './tokenfield';
export * from './topbar';
export * from './topnav';

// Export convenience property
export default angular
  .module('md.components', [
    mdAccordion,
    mdAlertBanner,
    mdBadge,
    mdBreadcrumbs,
    mdCard,
    mdCardMember,
    mdCheckbox,
    mdDatepicker,
    mdHeader,
    mdHeaderPush,
    mdTabs,
    mdLeftNav,
    mdOverlayPanel,
    mdPageHeader,
    mdPageSubHeader,
    mdProgressbar,
    mdRadio,
    mdRadiolist,
    mdSearchfilter,
    mdSelect,
    mdSetupAssistant,
    mdSidepanel,
    mdSlider,
    mdSpinner,
    mdTabs,
    mdToggleSwitch,
    mdTokenField,
    mdTopBar,
    mdTopNav,
    mdCardNumber,
    mdPhoneNumber,
    mdSidenavAdmin,
  ])
  .name;
