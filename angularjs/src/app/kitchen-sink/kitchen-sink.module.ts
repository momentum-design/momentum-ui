import * as angular from 'angular';

import { examples } from '../../lib/examples.module';
import { KitchenSink } from './kitchen-sink.component';
import { routing } from './kitchen-sink.routes';

export const kitchenSink =
  angular.module('kitchenSink', [
      'ui.router',
      'momentum.ui',
      examples
  ])
  .component(KitchenSink.selector, KitchenSink)
  .config(routing)
  .name;
