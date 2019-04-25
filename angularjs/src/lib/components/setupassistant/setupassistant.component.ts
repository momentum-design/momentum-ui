/** @component setup-assistant */

import * as angular from 'angular';
import * as _ from 'lodash';

export function mdSetupAssistant() {
  let mdSetupAssistantDirective = {
    restrict: 'E',
    transclude: true,
    replace: false,
    scope: {
      previous: '=',
      next: '=',
      previousFn: '&',
      nextFn: '&',
      nextText: '&?',
      previousText: '&?',
      nextAriaLabel: '@?',
      previousAriaLabel: '@?',
    },
    template: `
      <div class="md-setupassistant">
        <div class="md-setupassistant--buttons">
          <button id="previousBtn" class="md-button md-button--circle md-button--blue md-button--56 btn--left" ng-click="prevFunc()" ng-class="{'disabled': !previous, invisible: previous === 'hidden'}" aria-label="{{getPreviousAria()}}">
            <span class="icon icon-arrow-back"></span>
            <div class="btn-helptext helptext-btn--left">{{ ::helpTextLeft }}</div>
          </button>
        </div>
        <div class="md-setupassistant--content" ng-transclude></div>
        <div class="md-setupassistant--buttons">
          <button id="nextBtn" class="md-button md-button--circle md-button--blue md-button--56 btn--right" ng-click="nextFunc()" ng-class="{'disabled': !next, invisible: next === 'hidden'}" aria-label="{{getNextAria()}}">
            <span class="icon icon-arrow-next"></span>
            <div class="btn-helptext helptext-btn--right">{{ ::helpTextRight }}</div>
          </button>
        </div>
      </div>
    `,
    link: function (scope, elem, attrs) {
      scope.prevFunc = function () {
        if (scope.previous && angular.isFunction(scope.previousFn)) {
          scope.previousFn();
        }
      };

      scope.getNextAria = function () {
        const nextBtnActive = elem.find('#nextBtn .helptext-btn--right').hasClass('active');

        if (nextBtnActive && _.isString(scope.helpTextRight)) {
          return scope.helpTextRight;
        }
        return scope.nextAriaLabel;
      };

      scope.getPreviousAria = function () {
        const previousBtnActive = elem.find('#previousBtn .helptext-btn--left').hasClass('active');

        if (previousBtnActive && _.isString(scope.helpTextLeft)) {
          return scope.helpTextLeft;
        }
        return scope.previousAriaLabel;
      };

      scope.nextFunc = function () {
        if (scope.next && angular.isFunction(scope.nextFn)) {
          scope.nextFn();
        }
      };

      if (_.isFunction(scope.nextText)) {
        scope.helpTextRight = scope.nextText();
      }

      if (_.isFunction(scope.previousText)) {
        scope.helpTextLeft = scope.previousText();
      }
    },
  };

  return mdSetupAssistantDirective;
}
