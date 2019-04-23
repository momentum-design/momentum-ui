import * as angular from 'angular';

export function mdExpandinginputCtrl() {
  let vm = this;
  vm.elemIsInFocus = false;
}

mdExpandinginput.$inject = ['$timeout'];
export function mdExpandinginput($timeout) {
  let directive = {
    scope: {
      model: '=ngModel',
      focusWidth: '=',
    },
    restrict: 'A',
    controller: mdExpandinginputCtrl,
    controllerAs: 'mdExpandinginput',
    bindToController: true,
    link: function postLink(scope, element, attrs) {

      let wrapper = angular.element('<div style="position:fixed; top:-999px; left:0;"></div>');
      let mirror = angular.element('<span style="white-space:pre;"></span>');

      let defaultMaxwidth = element.css('maxWidth') === 'none' ? element.parent().innerWidth() : element.css('maxWidth');
      element.css('minWidth', attrs.mdExpandinginputMinwidth || element.css('minWidth'));
      element.css('maxWidth', attrs.mdExpandinginputMaxwidth || defaultMaxwidth);
      let elemIsInFocus;

      angular.forEach(['fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
        'letterSpacing', 'textTransform', 'wordSpacing', 'textIndent',
        'boxSizing', 'borderRightWidth', 'borderLeftWidth', 'borderLeftStyle', 'borderRightStyle',
        'paddingLeft', 'paddingRight', 'marginLeft', 'marginRight',
      ], function (value) {
        mirror.css(value, element.css(value));
      });

      angular.element('body').append(wrapper.append(mirror));

      function update() {
        mirror.text(element.val() || attrs.placeholder);
        // only change my width if I need to be wider
        if ((element.val() !== '') && (mirror.outerWidth() > attrs.focusWidth)) {
          element.css('width', mirror.outerWidth() + 1);
        } else if ((element.val() === '') && (elemIsInFocus === false)) {
          // reset me back to the original minwidth cause the box reset
          resetWidth();
        } else {
          element.css('width', attrs.focusWidth);
        }
      }

      function changeWidthonFocus() {
        if ((attrs.focusWidth) && (element.val() === '')) {
          element.css('width', attrs.focusWidth);
        }
      }

      function resetWidth() {
        if (element.val() === '' && !elemIsInFocus) {
          element.css('width', element.css('minWidth'));
        }
      }

      //first time set up
      elemIsInFocus = false;
      resetWidth();

      if (attrs.ngModel) {
        scope.$watch('model', function () {
          update();
        });
      } else {
        element.on('keydown keyup focus input propertychange change', function () {
          update();
        });
      }

      element.on('focus', function () {
        elemIsInFocus = true;
        changeWidthonFocus();
      });

      element.on('blur', function ($event) {
        elemIsInFocus = false;
        $timeout(function () {
          resetWidth();
        }, 100);
      });
    },
  };
  return directive;
}
