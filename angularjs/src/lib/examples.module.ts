// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

import { CheckboxKitchenSink } from './components/checkbox/examples/kitchen-sink.component';
import { InputKitchenSink } from './directives/input/examples/kitchen-sink.component';

export const examples = angular
  .module('examples', [])
  .component(InputKitchenSink.selector, InputKitchenSink)
  .component(CheckboxKitchenSink.selector, CheckboxKitchenSink)
  .name;
