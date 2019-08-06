import { App } from './app.component';
import { KitchenSink } from './kitchen-sink/kitchen-sink.component';

export const routing = (
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider,
) => {
  'ngInject';
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      template: `<app></app>`,
    })
    .state('kitchen-sink', {
      parent: 'app',
      url: 'kitchen-sink',
      template: `<kitchen-sink></kitchen-sink>`,
    })
    .state('playground', {
      parent: 'app',
      url: 'playground',
      template: `<playground></playground>`,
    });

  $urlRouterProvider.otherwise('/kitchen-sink');
};
