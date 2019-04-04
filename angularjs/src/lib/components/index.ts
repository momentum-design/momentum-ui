import * as angular from 'angular';
// Import all components
import csAccordion from './accordion';
import csAlertBanner from './alertbanner';
import csBadge from './badge';
import csBreadcrumbs from './breadcrumbs';
import csCardMember from './cardmember';
import csCardNumber from './cardnumber';
import csCard from './cards';
import csCheckbox from './checkbox';
import csDatepicker from './datepicker';
import csHeader from './header';
import csHeaderPush from './headerpush';
import csTabs from './largetabs';
import csLeftNav from './leftnav';
import csOverlayPanel from './overlaypanel';
import csPageHeader from './pageheader';
import csPageSubHeader from './pagesubheader';
import csPhoneNumber from './phoneNumber';
import csProgressbar from './progressbar';
import csRadio from './radio';
import csRadiolist from './radiolist';
import csSearchfilter from './searchfilter';
import csSelect from './select';
import csSetupAssistant from './setupassistant';
import cuiSidenavAdmin from './sidenav';
import csSidepanel from './sidepanel';
import csSlider from './slider';
import csSpinner from './spinner';
import cuiTabs from './tabs';
import csToggleSwitch from './toggleswitch';
import csTokenField from './tokenfield';
import csTopBar from './topbar';
import csTopNav from './topnav';

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
  .module('cui.components', [
    csAccordion,
    csAlertBanner,
    csBadge,
    csBreadcrumbs,
    csCard,
    csCardMember,
    csCheckbox,
    csDatepicker,
    csHeader,
    csHeaderPush,
    csTabs,
    csLeftNav,
    csOverlayPanel,
    csPageHeader,
    csPageSubHeader,
    csProgressbar,
    csRadio,
    csRadiolist,
    csSearchfilter,
    csSelect,
    csSetupAssistant,
    csSidepanel,
    csSlider,
    csSpinner,
    cuiTabs,
    csToggleSwitch,
    csTokenField,
    csTopBar,
    csTopNav,
    csCardNumber,
    csPhoneNumber,
    cuiSidenavAdmin,
  ])
  .name;
