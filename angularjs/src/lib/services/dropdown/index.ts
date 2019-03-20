import * as angular from 'angular';
import { DropdownService } from './dropdown.service';
import { KeyboardEventCodes } from './eventCodes';

export {
  DropdownService,
  KeyboardEventCodes,
};

export default angular.module('collab.ui.dropdown.service', [])
  .service('$dropdown', DropdownService)
  .name;
