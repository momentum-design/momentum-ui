export function mdSticky() {
  return {
    restrict: 'A',
    link: function (scope, el, att, ngModel) {
      el
        .removeClass('sticky')
        .addClass('sticky');
    },
  };
}
