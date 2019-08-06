export const configuration = ($locationProvider: angular.ILocationProvider) => {
  'ngInject';
  $locationProvider.hashPrefix('');
};
