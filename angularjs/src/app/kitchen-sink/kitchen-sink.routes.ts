export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';
  $stateProvider
    .state('kitchen-sink', {
      parent: 'app',
      url: 'kitchen-sink',
      template: `<kitchen-sink></kitchen-sink>`,
    })
    .state('kitchen-sink.input', {
      url: '/input',
      template: `<example-input-kitchen-sink></example-input-kitchen-sink>`,
    })
    .state('kitchen-sink.radio', {
      url: '/radio',
      template: `<example-radio-kitchen-sink></example-radio-kitchen-sink>`,
    })
    .state('kitchen-sink.checkbox', {
      url: '/checkbox',
      template: `<example-checkbox-kitchen-sink></example-checkbox-kitchen-sink>`,
    });
};
