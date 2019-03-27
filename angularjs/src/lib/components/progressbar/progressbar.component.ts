/**
* @category communication
* @component progress-bar
*/
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
/**
* @component progress-bar
* @section hard-coded
*
*
* @html
 <h3>Hard Coded</h3>
  <div class="row">
    <div class="col-sm-4">
      <div class="progressbarInfo">
        <span class="progressbar-label">Basic</span>
        <span class="progressbar-progress">55</span>
      </div>
      <progressbar value="55"></progressbar>
    </div>

    <div class="col-sm-4">
      <div class="progressbar-info">
        <span class="progressbar-label">Warning stripe</span>
        <span class="progressbar-progress">22%</span>
      </div>
      <progressbar class="progress-striped" value="22" type="warning"></progressbar>
    </div>

    <div class="col-sm-4">
      <div class="progressbar-info">
        <span class="progressbar-label">Danger Active Stripe</span>
        <span class="progressbar-progress">166 MB /200 MB</span>
      </div>
      <progressbar class="progress-striped active" max="200" value="166" type="danger"></progressbar>
    </div>
  </div>
  <hr />
  <div class="row">
  <div class="col-sm-4">
    <div class="progressbar-info">
      <span class="progressbar-label">Success stripe</span>
      <span class="progressbar-progress">55</span>
    </div>
    <progressbar class="progress-striped" value="55" type="success"></progressbar>
  </div>


  <div class="col-sm-4">
    <div class="progressbar-info">
      <span class="progressbar-label">Primary stripe</span>
      <span class="progressbar-progress">22%</span>
    </div>
    <progressbar class="progress-striped" value="22" type="primary"></progressbar>
  </div>

  <div class="col-sm-4">
    <div class="progressbar-info">
      <span class="progressbar-label">Info stripe</span>
      <span class="progressbar-progress">166 MB /200 MB</span>
    </div>
    <progressbar class="progress-striped active" max="200" value="166" type="info"></progressbar>
  </div>
</div>
*/

/**
* @component progress-bar
* @section programmed
*
* @html
<div>
    <div class="progressbar-info">
      <span class="progressbar-label">Uploading...</span>
      <span class="progressbar-progress">{{vm.dynamic}} / {{vm.max}}</span>
    </div>
    <progressbar max="max" value="vm.dynamic"></progressbar>
  </div>

  <div class="progressbar-info">
    <span class="progressbar-label">No animation</span>
    <span class="progressbar-progress">{{vm.dynamic}}%</span>
  </div>
  <progressbar animate="false" value="vm.dynamic" type="success"></progressbar>

  <div class="progressbar-info">
    <span class="progressbar-label">Active</span>
    <span class="progressbar-progress">{{vm.dynamic}} / {{vm.max}}</span>
  </div>
  <progressbar class="progress-striped active" value="vm.dynamic" type="{{vm.type}}"></progressbar>
</div>
*/

