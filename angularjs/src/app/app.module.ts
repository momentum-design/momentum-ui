// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

import { App } from './app.component';
import { Root } from './core/root.component';
import { KitchenSink } from './kitchen-sink/kitchen-sink.component';
import { Playground } from './playground/playground.component';

/**
 * Import Module Configuration
 */
import { configuration } from './core/configuration';
import { routing } from './app.routes';

export const moduleName = angular
  .module('application', [
    'ui.router',
    'momentum.ui',
  ])

  /**
   * Register Module Components
   */
  .component(App.selector, App)
  .component(Root.selector, Root)
  .component(KitchenSink.selector, KitchenSink)
  .component(Playground.selector, Playground)

  /**
   * Register Module Configuration
   */
  .config(configuration)
  .config(routing).name;
