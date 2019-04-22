import * as angular from 'angular';

// Import all services
import CsDebounce from './debounce';
import CsTransition from './transition';
import CsPosition from './position';
import CsStackedMap from './stackedmap';
import CsMultiMap from './multimap';
import CsResolve from './resolve';
import csModal from './modal';

// Export all services
export * from './debounce';
export * from './transition';
export * from './position';
export * from './stackedmap';
export * from './multimap';
export * from './resolve';
export * from './modal';

// Export convenience property
export default angular
  .module('md.services', [
    CsDebounce,
    CsTransition,
    CsPosition,
    CsStackedMap,
    CsMultiMap,
    CsResolve,
    csModal,
  ])
  .name;
