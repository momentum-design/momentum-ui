import * as angular from 'angular';

// Import all services
import MdDebounce from './debounce';
import MdTransition from './transition';
import MdPosition from './position';
import MdStackedMap from './stackedmap';
import MdMultiMap from './multimap';
import MdResolve from './resolve';
import mdModal from './modal';

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
    MdDebounce,
    MdTransition,
    MdPosition,
    MdStackedMap,
    MdMultiMap,
    MdResolve,
    mdModal,
  ])
  .name;
