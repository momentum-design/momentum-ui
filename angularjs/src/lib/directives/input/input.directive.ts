import * as _ from 'lodash';

mdInput.$inject = ['$compile', '$log', '$exceptionHandler'];
export function mdInput($compile, $log, $exceptionHandler) {
  const directive = {
    restrict: 'A',
    scope: {
      type: '@',
      mdToggle: '@?',
      name: '@',
      id: '@',
      toggleSize: '@?',
      label: '@?mdInputLabel',
      containerSize: '@?mdInputContainerSize', // Size class for outer md-input-container container
      helpText: '@?mdInputHelpText', // Text for help text
      secondaryLabel: '@?mdInputSecondaryLabel', // Secondary label text
      size: '@?mdInputSize', // Size class for input element
      isFilled: '@?mdInputFilled',
      shape: '@?mdInputShape', // Add pill class for pill shaped inputs
      nested: '@?mdInputNested', // Indent the input
      messages: '<?mdInputMessages', // Object containing validation key/value pairs,
      success: '<?mdInputSuccess', // Expression or Boolean to show success message
      successMessage: '@?mdInputSuccessMessage', // Success message
      warning: '<?mdInputWarning', // Expression or Boolean to show warning message
      warningMessage: '@?mdInputWarningMessage', // Warning message
      validators: '<?mdInputValidators',
      asyncValidators: '<?mdInputAsyncValidators',
      labelClass: '@?mdLabelClass',
      ngShow: '=',
      inputBefore: '@?mdInputBefore',
      inputAfter: '@?mdInputAfter',
    },
    require: '?^form',
    compile: compile,
  };

  function compile(tElement, tAttrs) {
    const preLink = (scope, iElement, iAttrs, formCtrl) => {
      scope.initState = {
        messagesCompiled: false,
        helpCompiled: false,
      };

      iElement.addClass('md-input');
      if (scope.shape && scope.shape === 'pill') {
        iElement.addClass('md-input--pill');
      }
      const type = scope.type;
      const show = scope.ngShow ? scope.ngShow : '';
      const containerSizeClasses = scope.containerSize ? `${scope.containerSize} columns` : '';
      const nestedClass = scope.nested ? ` md-input--nested-${scope.nested}`: '';
      let inputContainer = '';
      if (scope.mdToggle && scope.type === 'checkbox') {
        iElement.addClass('md-toggle-switch__input');
        inputContainer = `<div class="md-input-container md-toggle-switch" ng-show="${show}"></div>`;
      } else {
        iElement.addClass('md-' + type + '__input');
        const filledClass = scope.isFilled ? 'md-input--filled' : '';
        inputContainer = `<div class="md-input-container md-${type} ${filledClass} ${containerSizeClasses} ${nestedClass}" ng-show="${show}"></div>`;
      }
      const compiledGroup = $compile(inputContainer)(scope);
      iElement.wrap(compiledGroup);

      const ngModelCtrl = _.get<ng.INgModelController>(formCtrl, scope.name);
      if (ngModelCtrl) {
        if (scope.validators) {
          _.assignIn(ngModelCtrl.$validators, scope.validators);
        }

        if (scope.asyncValidators) {
          _.assignIn(ngModelCtrl.$asyncValidators, scope.asyncValidators);
        }
      };

      const messagesCompile = () => {
        if (scope.initState.messagesCompiled) return;
        scope.error = formCtrl[scope.name].$error;
        const messagesHtml = `
          <div class="md-input__messages" ng-messages="error" role="alert" >
            <div class="md-input__message" ng-repeat="(key, value) in messages" ng-message="{{key}}">{{value}}</div>
            <div class="md-input__message" ng-if="warning">{{::warningMessage}}</div>
            <div class="md-input__message" ng-if="success">{{::successMessage}}</div>
          </div>`;

        const compiledMessages = $compile(messagesHtml)(scope);

        iElement.after(compiledMessages);
        scope.initState.messagesCompiled = true;
      };

      const helpCompile = () => {
        if (scope.initState.helpCompiled) return;
        const helpText = '<p class="md-input__help-text">{{::helpText}}</p>';
        const compiledHelp = $compile(helpText)(scope);

        iElement.after(compiledHelp);
        scope.initState.helpCompiled = true;
      };

      if (scope.messages || scope.warningMessage || scope.successMessage) messagesCompile();

      scope.$watch('successMessage', (newValue, oldValue) => (newValue && !oldValue) && messagesCompile());
      scope.$watch('warningMessage', (newValue, oldValue) => (newValue && !oldValue) && messagesCompile());

      // Add the help text element if specified
      if (scope.helpText) helpCompile();

      scope.$watch('helpText', (newValue, oldValue) => (newValue && !oldValue) && helpCompile());

      // Add the label element if specified
      if (scope.label && !scope.mdToggle) {
        if (scope.type === 'checkbox' || scope.type === 'radio') {
          // Add labels AFTER checkboxes and radios
          const label = '<label class="md-{{::type}}__label" for="{{::id}}"><span>{{::label}}</span></label>';
          const compiledLabel = $compile(label)(scope);

          iElement.after(compiledLabel);
        } else {
          // Add labels BEFORE all other inputs
          const label = '<label class="md-label md-input__label {{::labelClass}}" for="{{::id}}"><span>{{::label}}</span></label>';
          const compiledLabel = $compile(label)(scope);

          iElement.before(compiledLabel);
        }
      } else if (scope.type === 'checkbox' && scope.mdToggle) {
        // Add md-toggle label if md-toggle-switch is true
        const label = `<label class="md-toggle-switch__label {{::toggleSize}}" for="{{::id}}">
            <span class="md-toggle-switch__label__container"></span>
            <span class="md-toggle-switch__label__text">{{label}}</span>
          </label>`;
        const compiledLabel = $compile(label)(scope);

        iElement.after(compiledLabel);
      } else if (scope.type === 'checkbox' || scope.type === 'radio') {
        // checkboxes and radios MUST have labels
        return $exceptionHandler(
          `md-input type="${scope.type}" requires md-input-label to be specified unless it is a toggle switch. See https://momentum.design/components/${scope.type} for more details.`
        );
      }

      let sizeClasses = '';
      if (scope.size || scope.secondaryLabel) {
        // Don't add secondary label or input size to checkbox or radio
        if (scope.type === 'checkbox' || scope.type === 'radio') {
          if (scope.size) {
            return $exceptionHandler(
              `md-input type="${scope.type}" cannot have md-input-size, use md-input-container-size instead. See https://momentum.design/components/${scope.type} for more details.`
            );
          } else {
            return $exceptionHandler(
              `md-input type="${scope.type}" cannot have a md-input-secondary-label. See https://momentum.design/components/${scope.type} for more details.`
            );
          }
        } else {
          if (scope.secondaryLabel) {
            const secondaryLabelHtml = '<label class="md-label md-input__secondary-label">{{::secondaryLabel}}</label>';
            const compiledSecondaryLabel = $compile(secondaryLabelHtml)(scope);
            iElement.after(compiledSecondaryLabel);
          }

          sizeClasses = scope.size ? `${scope.size} columns` : '';
        }
      }
      if (scope.type !== 'checkbox' && scope.type !== 'radio') {
        const inputWrapper = `<div class="md-input__wrapper ${sizeClasses}"></div>`;
        iElement.wrap(inputWrapper);
      }

      if (scope.inputBefore || scope.inputAfter) {
        if (scope.inputBefore) {
          const beforeHtml = `<span class="md-input__before"><i class="md-icon icon icon-${scope.inputBefore}"></i></span>`;
          const compiledBeforeHtml = $compile(beforeHtml)(scope);
          iElement.before(compiledBeforeHtml);
          iElement.addClass('md-input--before');
        }
        if (scope.inputAfter) {
          const afterHtml = `<span class="md-input__after"><i class="md-icon icon icon-${scope.inputAfter}"></i></span>`;
          const compiledAfterHtml = $compile(afterHtml)(scope);
          iElement.after(compiledAfterHtml);
          iElement.addClass('md-input--after');
        }
      }
    }

    const postLink = (scope, iElement, iAttrs, formCtrl) => {
      const inputContainer = iElement.parent().parent();

      if (scope.ngShow === false) inputContainer.addClass('ng-hide');

      if (formCtrl) {
        const name = scope.name;
        const form = formCtrl.$name;
        const inputInvalid = `$parent.${form}.${name}.$invalid`;
        const inputTouched = `$parent.${form}.${name}.$touched`;
        const inputPristine = `$parent.${form}.${name}.$pristine`;
        const inputWarning = 'warning';
        const inputSuccess = 'success';
        scope.$watchGroup(
          [inputInvalid, inputWarning, inputSuccess, inputTouched, inputPristine],
          (newValues, oldValues ) => {
          if (oldValues !== newValues) {
            // Toggle error, warning and success class on .md-input-container
            inputContainer.toggleClass('md-success', !!newValues[2]);
            inputContainer.toggleClass('md-warning', !!newValues[1]);
            inputContainer.toggleClass('md-error', !!newValues[0]);
          }
        });
      }
    }

    return {
      pre: preLink,
      post: postLink,
    };
  }
  return directive;
}
