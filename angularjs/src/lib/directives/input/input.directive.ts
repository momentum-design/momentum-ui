import * as _ from 'lodash';

csInput.$inject = ['$compile', '$log', '$exceptionHandler'];
export function csInput($compile, $log, $exceptionHandler) {
  let directive = {
    restrict: 'A',
    scope: {
      type: '@',
      csToggle: '@?',
      name: '@',
      id: '@',
      toggleSize: '@',
      label: '@?csInputLabel',
      groupSize: '@?csInputGroupSize',  // Size class for outer md-input-group container
      helpText: '@?csInputHelpText',  // Text for help text
      secondaryLabel: '@?csInputSecondaryLabel',  // Secondary label text
      size: '@?csInputSize',  // Size class for input element
      nested: '@?csInputNested', // Indent the input
      messages: '<?csInputMessages', // Object containing validation key/value pairs,
      warning: '<?csInputWarning', // Expression or Boolean to show warning message
      warningMessage: '@?csInputWarningMessage', // Warning message
      formly: '@?csInputFormly', // Is this an input in formly form?
      validators: '<?csInputValidators', // Is this an input in formly form?
      asyncValidators: '<?csInputAsyncValidators', // Is this an input in formly form?,
      labelClass: '@?csLabelClass',
      ngShow: '=',
    },
    require: '?^form',
    compile: compile,
  };

  function compile(tElement, tAttrs) {
    return {
      pre: preLink,
      post: postLink,
    };

    function preLink(scope, iElement, iAttrs, formCtrl) {
      iElement.addClass('md-input');
      // Wrap input with the .md-input-group element if not in formly form
      if (!scope.formly) {
        let type = scope.type;
        let show = scope.ngShow;
        let inputGroup = '';
        if (scope.csToggle && scope.type === 'checkbox') {
          iElement.addClass('md-toggle__input');
          inputGroup = '<div class="md-input-group md-toggle" ng-show = "' + show + '"></div>';
        } else {
          iElement.addClass('md-' + type + '__input');
          inputGroup = '<div class="md-input-group md-' + type + '" ng-show = "' + show + '"></div>';
        }
        let compiledGroup = $compile(inputGroup)(scope);
        iElement.wrap(compiledGroup);
      }

      let ngModelCtrl = _.get<ng.INgModelController>(formCtrl, scope.name);
      if (ngModelCtrl) {
        if (scope.validators) {
          _.assignIn(ngModelCtrl.$validators, scope.validators);
        }

        if (scope.asyncValidators) {
          _.assignIn(ngModelCtrl.$asyncValidators, scope.asyncValidators);
        }
      }

      function messagesCompile() {
        let name = scope.name;
        scope.error = formCtrl[name].$error;
        let messagesHtml = '<div class="md-input__messages" ng-messages="error" role="alert" >\n' +
          '<div class="message" ng-repeat="(key, value) in messages" ng-message="{{key}}">{{value}}</div>\n' +
          '<div class="message" ng-if="warning">{{::warningMessage}}</div>\n' +
          '</div>';
        let compiledMessages = $compile(messagesHtml)(scope);

        iElement.after(compiledMessages);
      }

      function helpCompile() {
        let helpText = '<p class="md-input__help-text">{{::helpText}}</p>';
        let compiledHelp = $compile(helpText)(scope);

        iElement.after(compiledHelp);
      }

      // Validation & ng-messages
      if (scope.messages || scope.warningMessage) {
        messagesCompile();
      }

      scope.$watch('warningMessage', function(newValue, oldValue) {
        if (newValue && !oldValue) {
          messagesCompile();
        }
      });

      // Add the help text element if specified
      if (scope.helpText) {
        helpCompile();
      }

      scope.$watch('helpText', function(newValue, oldValue) {
        if (newValue && !oldValue) {
          helpCompile();
        }
      });

      // Add the label element if specified
      if (scope.label && !scope.csToggle) {

        if (scope.type === 'checkbox' || scope.type === 'radio') {
          // Add labels AFTER checkboxes and radios
          let label = '<label class="md-{{::type}}__label" for="{{id}}"><span>{{::label}}</span></label>';
          let compiledLabel = $compile(label)(scope);

          iElement.after(compiledLabel);
        } else {
          // Add labels BEFORE all other inputs
          let label = '<label class="md-input__label {{::labelClass}}" for="{{id}}"><span>{{::label}}</span></label>';
          let compiledLabel = $compile(label)(scope);

          iElement.before(compiledLabel);
        }
      } else if (scope.type === 'checkbox' && scope.csToggle) {
        // Add md-toggle label if md-toggle-switch is true
        let label = '<label class="toggle {{::toggleSize}}" for="{{id}}"><span></span></label>';
        let compiledLabel = $compile(label)(scope);
        iElement.after(compiledLabel);

      } else if (scope.type === 'checkbox' || scope.type === 'radio') {
        // checkboxes and radios MUST have labels
        return $exceptionHandler('md-input type="' + scope.type + '" requires md-input-label to be specified unless it is a toggle switch. See http://momentum-ui.cisco.com/#/' + scope.type + ' for more details.');
      }

      // Add row around input if size or secodary label are specified
      if (scope.size || scope.secondaryLabel) {

        // Don't add secondary label or input size to checkbox or radio
        if (scope.type === 'checkbox' || scope.type === 'radio') {
          if (scope.size) {
            return $exceptionHandler('md-input type="' + scope.type + '" cannot have md-input-size, use md-input-group-size instead. See http://momentum-ui.cisco.com/#/' + scope.type + ' for more details.');
          } else {
            return $exceptionHandler('md-input type="' + scope.type + '" cannot have a md-input-secondary-label. See http://momentum-ui.cisco.com/#/' + scope.type + ' for more details.');
          }
        } else {
          let inputWrapper = '<div class="row"></div>';
          let inputSize = scope.size || 'small-6';

          iElement.wrap(inputWrapper);
          iElement.addClass(inputSize + ' columns');

          if (scope.secondaryLabel && scope.type) {
            let secondaryLabelSize = 12 - (inputSize.split('-')[1]);
            let secondaryLabelClass = 'small-' + secondaryLabelSize;
            let secondaryLabelHtml = '<span class="md-input__secondary-label ' + secondaryLabelClass + ' columns">{{::secondaryLabel}}</span>';
            let compiledSecondaryLabel = $compile(secondaryLabelHtml)(scope);

            iElement.after(compiledSecondaryLabel);
          }
        }
      }
    }

    function postLink(scope, iElement, iAttrs, formCtrl) {

      if (scope.groupSize) {
        let sizeClass = scope.groupSize + ' columns';
        if (scope.secondaryLabel || scope.size) {
          // If secondary label or input size, md-input-group is 2 levels up
          let parentElem = iElement.parent();
          parentElem.parent().addClass(sizeClass);
        } else {
          // Add width class to md-input-group
          iElement.parent().addClass(sizeClass);
        }
      }

      if (scope.ngShow === false) {
        let parentElem = iElement.parent();
        parentElem.addClass('ng-hide');
      }

      if (scope.nested) {
        let nestedClass = 'md-input--nested-' + scope.nested;
        if (scope.secondaryLabel || scope.size) {
          // If secondary label or input size, md-input-group is 2 levels up
          let parentElem = iElement.parent();
          parentElem.parent().addClass(nestedClass);
        } else {
          // Add width class to md-input-group
          iElement.parent().addClass(nestedClass);
        }
      }

      // Toggle .error and .warning classes on .md-input-group based on input states
      if (formCtrl) {
        let name = scope.name;
        let form = formCtrl.$name;
        let inputInvalid = '$parent.' + form + '.' + name + '.$invalid';
        let inputTouched = '$parent.' + form + '.' + name + '.$touched';
        let inputPristine = '$parent.' + form + '.' + name + '.$pristine';
        let inputWarning = 'warning';
        scope.$watchGroup([inputInvalid, inputWarning, inputTouched, inputPristine], function (newValues, oldValues) {
          if (oldValues !== newValues) {
            if (scope.secondaryLabel || scope.size) {
              // If secondary label or input size, .md-input-group is 2 levels up
              let parentElem = iElement.parent();
              parentElem.parent().toggleClass('warning', !!newValues[1]);
              parentElem.parent().toggleClass('error', !!newValues[0]);
            } else {
              // Toggle error class on .md-input-group
              iElement.parent().toggleClass('warning', !!newValues[1]);
              iElement.parent().toggleClass('error', !!newValues[0]);
            }
          }
        });
      }
    }
  }
  return directive;
}
