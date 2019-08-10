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
    .state('playground', {
      parent: 'app',
      url: 'playground',
      template: `<playground></playground>`,
    });

  $urlRouterProvider.otherwise('/kitchen-sink');
};
