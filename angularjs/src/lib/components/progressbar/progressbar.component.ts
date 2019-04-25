/** @component progress-bar */

import * as angular from 'angular';

progressController.$inject = ['$scope', '$attrs', 'progressConfig'];
export function progressController($scope, $attrs, progressConfig) {
  let self = this,
    animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = getMaxOrDefault();

  this.addBar = function (bar, element, attrs) {
    if (!animate) {
      element.css({ transition: 'none' });
    }

    this.bars.push(bar);

    bar.max = getMaxOrDefault();
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function (value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function () {
      let totalPercentage = self.bars.reduce(function (total, bar) {
        bar.percent = +(100 * bar.value / bar.max).toFixed(2);
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function () {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function (bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
    this.bars.forEach(function (bar) {
      bar.recalculatePercentage();
    });
  };

  //$attrs.$observe('maxParam', function(maxParam) {
  $scope.$watch('maxParam', function (maxParam) {
    self.bars.forEach(function (bar) {
      bar.max = getMaxOrDefault();
      bar.recalculatePercentage();
    });
  });

  function getMaxOrDefault() {
    return angular.isDefined($scope.maxParam) ? $scope.maxParam : progressConfig.max;
  }
}

export function progress() {
  return {
    replace: true,
    transclude: true,
    controller: 'progressController',
    require: 'progress',
    scope: {
      maxParam: '=?max',
    },
    template: `<div class="progress" ng-class="type" aria-labelledby="{{::title}}" ng-transclude></div>`,
  };
}

export function bar() {
  return {
    replace: true,
    transclude: true,
    require: '^progress',
    scope: {
      value: '=',
      type: '@',
    },
    template: `<div class="meter" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + '%'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>`,
    link: function (scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, element, attrs);
    },
  };
}

export function progressbar() {
  return {
    replace: true,
    transclude: true,
    controller: 'progressController',
    scope: {
      value: '=',
      maxParam: '=?max',
      type: '@',
    },
    template: `
      <div class="progress" ng-class="type">
        <span class="meter" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + '%'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></span>
      </div>
    `,
    link: function (scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, angular.element(element.children()[0]), { title: attrs.title });
    },
  };
}
