// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

import { kitchenSink } from './kitchen-sink/kitchen-sink.module';
import { App } from './app.component';
import { Root } from './core/root.component';
import { Playground } from './playground/playground.component';

/**
 * Import Module Configuration
 */
import { configuration } from './core/configuration';
import { routing } from './app.routes';

export const app = angular
  .module('application', [
    'ui.router',
    'momentum.ui',
    kitchenSink
  ])

  /**
   * Register Module Components
   */
  .component(App.selector, App)
  .component(Root.selector, Root)
  .component(Playground.selector, Playground)

  /**
   * Register Module Configuration
   */
  .config(configuration)
  .config(routing).name;
